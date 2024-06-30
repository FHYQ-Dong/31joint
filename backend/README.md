# 31joint-backend

==**注意：本项目严禁安装在可以由公网直接访问的计算机/地址/端口上。**==

## 安装

- 在 `python>=3.11`中测试通过
- 安装依赖

  ```bash
  # git clone 
  git clone https://github.com/FHYQ-Dong/31joint.git
  cd ./31joint
  # 推荐在当前目录下创建python虚拟环境
  python -m venv ./venv
  ./venv/Scripts/activate
  # 安装pip包
  pip install -r ./requirements.txt
  ```

## 运行

### AI回答模块

- 命令行参数：`python server_ai.py [-h] [--port PORT] [--apikey APIKEY] [--knowledge_id KNOWLEDGE_ID] address`
- 样例：
  ```bash
  python ./server_ai.py 0.0.0.0 -p 8000 -a <your_api_key> -k <your_knowledge_base_id>
  ```

### 文件解析模块

- 命令行参数：`python server_doc.py [-h] [--port PORT] address`
- 样例：

```bash
  python ./server_doc.py 0.0.0.0 -p 8001
```

## 使用

### AI回答模块

由于调用 `chatglm` 接口较为耗时，本项目采用先上传问题获取 `id`，一段时间后根据 `id` 获取答案的方式，避免了阻塞。前端可以设计相应等待动画。

1. 使用 `http get` 方式访问 `http://localhost:8000/ask/?question=<your_question>`，返回为一个 `json` 格式字符串，包含状态码 `status` 和信息。具体样例：

   ```json
   // 访问 http://localhost:8000/ask/?question=没带医保卡怎么就医？
   // 返回：
   {
       "status": "Success",
       "id": 1000000
   }

   // 若未传送question的值，返回：
   {
       "status": "Fail", 
       "message": "No question"
   }

   // 若同一时间的访问量过多，造成id不够分配，返回：
   {
       "status": "Fail", 
       "message": "Too many requests"
   }
   ```
2. 拿到 `id` 后使用 `http get` 方式访问 `http://localhost:8000/retrieve/?id=<your_id>` 获取答案，答案同样为一个 `json` 格式字符串，包含状态码 `status` 和信息。具体样例：

   ```json
   // 访问 http://localhost:8000/retrieve/?id=1000000
   // 若答案已经生成完成：
   {
       "status": "Success",
       "question": "没带医保卡怎么就医？",
       "answer": "### 政策规章\n根据文档中的信息，如果参保人员在急诊时未携带医保卡或未出示医保电子凭证，他们仍然可以就医并在事后进行手工报销。具体操作流程如下：\n\n1. 在定点医疗机构急诊未持社保卡或未出示医保电子凭证的费用可以申报。\n2. 参保人员需要进行手工医疗费用结算，准备相应的申报材料。\n3. 申报范围包括急诊未持卡的费用、欠费期间就医发生的费用等。\n4. 注意事项包括未持卡的非急诊费用不予支付，参保人员因外伤就诊需提供受伤说明等。\n5. 申报所需材料包括《北京市基本医疗保险手工报销费用明细表》、《急诊诊断证明书》、收费票据等。\n\n因此，如果未带医保卡，参保人员可以在急诊就医后，按照上述流程准备相关材料进行手工报销。\n\n### 网络搜索\n如果您在就医时忘记携带了医保卡，可以利用以下几种方式完成医保结算：\n\n1. **医保电子凭证**：通过手机上的支付宝、微信或者其他授权应用，使用医保电子凭证进行扫码结算。这是一种方便快捷的方式，可以有效减少患者在医院排队的时间，实现线上挂号、缴费等全流程服务。\n\n   - 例如，中牟县人民医院就支持使用微信服务号或支付宝完成线上医保结算。\n\n2. **刷脸支付**：在一些地区的医院和社区卫生服务中心，医保刷脸支付系统已经上线。患者可以通过人脸识别技术完成医保结算，整个过程只需几十秒，即使没有携带手机或医保卡也同样可以。\n\n   - 杭州市上城区九堡街道社区卫生服务中心就是一个例子，他们通过放置刷脸终端设备，让没有携带医保卡的患者也能快速完成结算。\n\n3. **其他线上服务**：部分地区可能有自己的医保服务平台，如“津医保”平台，患者可以通过手机完成线上挂号、缴费等服务。\n\n   - 在天津，居民可以通过“津医保”平台使用手机完成线上挂号和缴费。\n\n4. **紧急情况下的报销**：如果在异地发生意外，且没有携带医保卡，部分地区（如天津、北京、河北省）支持直接使用医保电子凭证进行联网报销，无需垫付。\n\n在使用以上服务时，请确保您的医保信息已在相应平台注册并激活，同时遵循当地医保局的具体规定和指导。\n\n总的来说，随着互联网技术与医疗服务的融合，即使没有携带实体的医保卡，也不会影响您的就医流程和医保结算。这些便民措施大大提高了患者的就医体验，减少了因忘带医保卡带来的不便。\n**来源链接：**\n- [知乎专栏 - （转载）北京朝阳：参保居民就医购药可用医保卡（发布时间：2024-05-26 13:46:13）](https://zhuanlan.zhihu.com/p/699901062)\n- [搜狐 - 看病没带医保卡？别担心，不用手机，光靠“刷脸”就行（发布时间：2024-01-22 09:13:35）](https://www.sohu.com/a/773935669_121627717)\n"
   }

   // 若答案正在生成：
   {
       "status": "Processing",
       "question": "没带医保卡怎么就医？",
       "answer": ""
   }

   // 若id错误或答案已被清理：
   {
       "status": "Fail",
       "message": "No such question or answer expired"
   }

   // 若没有传送id的值
   {
       "status": "Fail",
       "message": "No id"
   }
   ```

   **注意答案为 `Markdown` 格式**

   **为避免历史答案占用太多内存空间，系统会在答案生成5分钟后删除答案，请及时获取。**

### 文件解析模块

使用 `http get` 方式访问 `http://localhost:8001/get_text/?filepath=<filepath>`，返回为一个 `json` 格式字符串，包含解析结果文本。具体样例：

```json
  // 访问 http://localhost:8001/get_text/?filepath=./test.pdf
  // 若正确：
  {
    "text": "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789abcdefghijklmnopqrstuvwxyz"
  }

  // 若地址不正确或其他问题：
  {
    "text": ""
  }
```
