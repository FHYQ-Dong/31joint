import time
from fastapi import FastAPI
from zhipuai import ZhipuAI
import threading
import sys
import argparse


global threadpool, args
threadpool = None
args = None

class MyThread(threading.Thread):
    def __init__(self, func, args=()):
        super(MyThread, self).__init__()
        self.func = func
        self.args = args
        
    def run(self):
        self.result = self.func(*self.args)
        
    def get_result(self):
        threading.Thread.join(self)
        try:
            return self.result
        except Exception:
            return None


class AssistantOf31JointByChatGLM():
    def __init__(self, apikey:str, model_type:str, knowledge_id:str):
        self.apikey       = apikey
        self.knowledge_id = knowledge_id
        self.client       = ZhipuAI(api_key=self.apikey)
        self.message      = []
        self.answer       = ""
        self.model_type   = model_type

    def get_ans_from_knowledge_base(self, question: str):
        self.message = [
            {"role": "system", "content": "作为 AI 助手，你的任务是帮助用户查找和理解政策。用户询问某些政策的具体实例。你将通过搜索政策知识库或相关文档，找到最新的规定。根据搜索到的内容，提供相关的详细信息。请确保所提供信息的准确性和适用性，帮助用户完全理解相关政策。"},
            {"role": "system", "content": "你首先根据用户的问题总结出3至11个关键词，然后在政策知识库中搜索这些关键词。如果找到了相关的政策，你将提供相关的详细信息。如果找不到相关的政策，你将使用自己的知识回答问题。"},
            # {"role": "system", "content": "如果用户的问题与\"工伤\"、\"离休人员\"、\"门诊特殊病\"、\"生育\"有关，你将返回知识库中相关的须知、标准、规定等文件。注意，只有用户的提问与这些关键词有关时，你才会考虑这些"},
            {"role": "user", "content": question}
        ]
        tools=[
            {
                "type": "retrieval",
                "retrieval": {
                    "knowledge_id": self.knowledge_id,
                    "prompt_template": "从文档\n\"\"\"\n{{knowledge}}\n\"\"\"\n中找问题\n\"\"\"\n{{question}}\n\"\"\"\n的答案，找到答案就仅使用文档语句回答问题，找不到答案就用自身知识回答并且告诉用户该信息不是来自文档。\n不要复述问题，直接开始回答。"
                }
            },
            {
                "type": "web_search",
                "web_search": {
                    "enable": False
                }
            }
        ]
        resp = self.client.chat.completions.create(
                    messages = self.message,
                    tools    = tools,
                    model    = self.model_type
                )
        return resp
    
    def get_ans_from_websearch(self, question: str):
        self.message = [
            {"role": "system", "content": "作为 AI 助手，你的任务是帮助用户查找和理解政策。用户询问某些政策的具体实例。你将通过搜索互联网，找到最新的规定。根据搜索到的内容，提供相关的详细信息。请确保所提供信息的准确性和适用性，帮助用户完全理解相关政策。"},
            {"role": "user", "content": question}
        ]
        tools = [{
            "type": "web_search",
            "web_search": {
                "enable": True,
                "search_result": True
            }
        }]
        resp = self.client.chat.completions.create(
                    messages = self.message,
                    tools    = tools,
                    model    = self.model_type
                )
        return resp
    
    def ask(self, question: str):
        # use multi-threading to get answers from knowledge base and web search
        knowledge_base_worker = MyThread(self.get_ans_from_knowledge_base, args=(question,))
        websearch_worker = MyThread(self.get_ans_from_websearch, args=(question,))
        knowledge_base_worker.start()
        websearch_worker.start()
        knowledge_base_answer = knowledge_base_worker.get_result()
        websearch_answer = websearch_worker.get_result()
            
        # parse the answer from knowledge base
        knowledge_base_answer = "### 政策规章\n" + knowledge_base_answer.choices[0].message.content
        
        # parse the answer from web search
        ref_links = websearch_answer.web_search
        # print(ref_links)
        ref_links_md = ""
        if ref_links:
            for ref_link in ref_links:
                media = ref_link["media"] + " - " if "media" in ref_link else ""
                title = ref_link["title"] if "title" in ref_link else ""
                link = ref_link["link"] if "link" in ref_link else ""
                ref_links_md += f"- [{media}{title}]({link})\n"
        websearch_answer = "### 网络搜索\n" + websearch_answer.choices[0].message.content + "\n" + "**来源链接：**\n" + ref_links_md

        return knowledge_base_answer, websearch_answer


class QuestionObject():
    def __init__(self, id, question):
        self.id = id
        self.question = question

class AnswerObject():
    def __init__(self, id, question, answer, create_time):
        self.id = id
        self.question = question
        self.answer = answer
        self.create_time = create_time

class ThreadPool():
    def __init__(self, max_threads):
        self.max_threads = max_threads
        self.threads = []
        self.questions: list[QuestionObject] = [] 
        self.answers: dict[AnswerObject] = {}
        self.cur_id = 1000000
        self.question_lock = threading.Lock()
        self.answer_lock = threading.Lock()
        
    def __get_id(self) -> int|None:
        self.answer_lock.acquire()
        cur_id = self.cur_id
        while self.cur_id in self.answers:
            if self.cur_id == 9999999:
                self.cur_id = 1000000
            else:
                self.cur_id += 1
            if self.cur_id == cur_id:
                return None
        res_id = self.cur_id
        self.cur_id += 1
        self.answer_lock.release()
        return res_id
    
    def __answer_one(self):
        global args
        while True:
            self.question_lock.acquire()
            if len(self.questions) != 0:
                QuesObj = self.questions.pop(0)
                self.question_lock.release()

                self.answer_lock.acquire()
                self.answers[QuesObj.id] = None
                self.answer_lock.release()
                
                myAIAssistant = AssistantOf31JointByChatGLM(apikey=args.apikey[0], model_type="glm-4", knowledge_id=args.knowledge_id[0])
                knowledgebase_ans, webseach_ans = myAIAssistant.ask(QuesObj.question)
                AnsObj = AnswerObject(QuesObj.id, QuesObj.question, knowledgebase_ans + '\n\n' + webseach_ans, int(time.time()))
                self.answer_lock.acquire()
                self.answers[QuesObj.id] = AnsObj
                self.answer_lock.release()
            else:
                self.question_lock.release()
                time.sleep(1)  
                
    def __clean_answer(self):
        while True:
            now_time = int(time.time())
            self.answer_lock.acquire()
            ids = list(self.answers.keys())
            for id in ids:
                if self.answers[id] is not None and now_time - self.answers[id].create_time > 300:
                    self.answers.pop(id)
            self.answer_lock.release()
            time.sleep(60)              
                
    def submit(self, question) -> int|None:
        id = self.__get_id()
        if id is None:
            return None
        QuesObj = QuestionObject(id, question)
        self.question_lock.acquire()
        self.questions.append(QuesObj)
        self.question_lock.release()
        return id
    
    def retrieve(self, id) -> AnswerObject|None:
        self.answer_lock.acquire()
        if id in self.answers:
            AnsObj: AnswerObject|None = self.answers[id]
            self.answer_lock.release()
            if AnsObj == None:
                AnsObj = AnswerObject(id, "", "", 0)
            return AnsObj
        else:
            self.answer_lock.release()
            return None
    
    def serve(self):
        for i in range(self.max_threads):
            thread = MyThread(self.__answer_one)
            self.threads.append(thread)
            thread.start()
        for i in range(1):
            thread = MyThread(self.__clean_answer)
            self.threads.append(thread)
            thread.start()


if __name__ == "__main__":
    argParser = argparse.ArgumentParser()
    argParser.add_argument("address", type=str, nargs=1, help="The address of the server")
    argParser.add_argument("--port", "-p", type=int, default=8000, nargs=1, help="The port of the server")
    argParser.add_argument("--apikey", "-a", type=str, nargs=1, help="The api key of the zhipuai")
    argParser.add_argument("--knowledge_id", "-k", type=str, nargs=1, help="The id of the knowledge base")
    args = argParser.parse_args(sys.argv[1:])
    if args.port is None or args.apikey is None or args.knowledge_id is None:
        print("Please provide the port, apikey and knowledge id")
        exit(1)

    app = FastAPI()
    @app.on_event("startup")
    async def startup_event():
        global threadpool
        threadpool = ThreadPool(5)
        threadpool.serve()

    @app.get("/ask/")
    async def get_answer(question: str=''):
        # print(question)
        if question == '':
            return {"status": "Fail", "message": "No question"}
        id = threadpool.submit(question)
        if id is None:
            return {"status": "Fail", "message": "Too many requests"}
        else:
            return {"status": "Success", "id": id}

    @app.get("/retrieve/")
    async def retrieve_answer(id: int=0):
        if id == 0:
            return {"status": "Fail", "message": "No id"}
        AnsObj = threadpool.retrieve(id)
        if AnsObj is None:
            return {"status": "Fail", "message": "No such question or answer expired"}
        elif AnsObj.answer == "":
            return {"status": "Processing", "question": AnsObj.question, "answer": AnsObj.answer}
        else:
            return {"status": "Success", "question": AnsObj.question, "answer": AnsObj.answer}

    @app.get("/test/")
    async def read_root():
        return {"Hello": "World"}

    import uvicorn
    uvicorn.run(app, host=args.address[0], port=args.port[0])