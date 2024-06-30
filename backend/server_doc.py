import fastapi, uvicorn
import docx, fitz
import argparse
import sys
from fastapi.middleware.cors import CORSMiddleware
from io import BytesIO
import os


def get_text(raw, file_type):
    try:
        if file_type == 'pdf':
            doc = fitz.open("pdf", raw)
            fullText = []
            for page in doc:
                fullText.append(page.get_text())
            return ''.join(fullText).replace('\n', '').replace(' ', '').replace('\t', '').replace('\r', '').replace('\u3000', '')
        elif file_type == 'docx':
            raw = BytesIO(raw)
            doc = docx.Document(raw)
            raw.close()
            fullText = []
            for para in doc.paragraphs:
                fullText.append(para.text)
            return ''.join(fullText).replace('\n', '').replace(' ', '').replace('\t', '').replace('\r', '').replace('\u3000', '')
        else:
            return ""
    except Exception as e:
        return ""


if __name__ == '__main__':
    argParser = argparse.ArgumentParser()
    argParser.add_argument("address", type=str, nargs=1, help="The address of the server")
    argParser.add_argument("--port", "-p", type=int, default=8000, nargs=1, help="The port of the server")
    args = argParser.parse_args(sys.argv[1:])
    if not args.address:
        print("Please provide the address of the server")
        sys.exit(1)
    if not args.port:
        print("Please provide the port of the server")
        sys.exit(1)
    
    app = fastapi.FastAPI()
    
    """
    改变接口形式
    """
    # @app.post("/get_text/pdf/")
    # def get_text_endpoint(file: bytes = fastapi.File(...)):
    #     file_type = "pdf"
    #     return {
    #         "text": get_text(file, file_type)
    #     }
    
    # @app.post("/get_text/docx/")
    # def get_text_endpoint(file: bytes = fastapi.File(...)):
    #     file_type = "docx"
    #     return {
    #         "text": get_text(file, file_type)
    #     }
        
    @app.get("/get_text/")
    def get_text_endpoint(filepath: str):
        print(filepath)
        if os.path.splitext(filepath)[1] == ".pdf":
            return {"text": get_text(open(filepath, "rb").read(), "pdf")}
        elif os.path.splitext(filepath)[1] == ".docx":
            return {"text": get_text(open(filepath, "rb").read(), "docx")}
        else:
            return {"text": ""}
        
    
    app.add_middleware(
        CORSMiddleware,
        allow_origins     = ["*"],
        allow_credentials = True,
        allow_methods     = ["*"],
        allow_headers     = ["*"],
    )
    uvicorn.run(app, host=args.address[0], port=args.port[0])