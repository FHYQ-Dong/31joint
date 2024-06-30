import $ from 'jquery';

//获取文件名
function getFileNameWithoutExtension(filePath) {  
    // 使用最后一个'.'作为分隔符来分割字符串  
    const parts = filePath.split('.');  
    // 获取除了最后一个部分（即扩展名）之外的所有部分，并使用'.'连接它们（如果有的话）  
    const fileNameWithoutExtension = parts.slice(0, -1).join('.');  
    return fileNameWithoutExtension;  
}
//获取文件后缀
function getFileExtension(filePath) {  
    // 使用lastIndexOf找到最后一个'.'的位置  
    const lastIndex = filePath.lastIndexOf('.');  
    // 如果找到了'.'，则返回从该'.'到字符串末尾的所有字符  
    if (lastIndex !== -1) {  
        return filePath.slice(lastIndex + 1); // 使用slice方法，从lastIndex+1开始到字符串末尾  
    }  
}  


class NewPolicy{
    constructor(){
        this.fileNames = []; // 将 fileNames 设置为类的属性 
        this.events();
    }
    events(){
        $("#current_policy").on('click','.delete-policy',this.deletePolicy.bind(this));
        $('.new-file').on('change',this.checkFiles.bind(this));  
        $(".submit-note").on('click',this.submitPolicy.bind(this));
        this.getText();
    }
    //获取pdf/docx文件内容
    getText() {  
        //获取archive-policy页面上所有policy
        $('.policy-unit').each(function() {  
            // 在这里，'this' 指的是当前遍历到的 .policy-unit DOM 元素  
            //获取是否已提取文本的flag
            var got_content=$(this).data('content');
            //若为零，则未提取并继续
            if(!got_content){
                //获取文件所在路径
                var urlString = $(this).data('file');
                //通过正则来后去需要的那部分的路径
                // 使用正则表达式匹配从'wp-content'开始之后的所有内容              
                var regex = /wp-content\/(.*?\.[a-zA-Z]{2,4})/;    
                var match = urlString.match(regex);     
                if (match && match.length > 1) {  
                    var contentPath = match[1]; // 匹配到的第一个捕获组  
                } else {  
                    console.log('No match found.');  
                
                }
                //提取文本的接口，合成url
                let answer_url = 'http://101.42.183.176:51115/get_text/?filepath=/www/wwwroot/101.42.183.176/wp-content/'+contentPath;  
                //从html中提取policy的id
                let post_id = $(this).data('id');
                //向提取文本的接口发送请求
                $.ajax({  
                    beforeSend:(xhr)=>{
                        xhr.setRequestHeader("X-WP-Nonce",univ_data.nonce);
                    },  
                    url: answer_url,
                    type: 'GET', // 请求类型：GET  
                    dataType: 'json', // 期望的返回数据类型  
                    success:(response)=>{
                        //console.log(response);
                        //请求成功后，将得到的文本通过action在php端更新policy
                        $.ajax({  
                            beforeSend:(xhr)=>{
                                xhr.setRequestHeader("X-WP-Nonce",univ_data.nonce);
                            },  
                            url: univ_data.ajaxurl,
                            data: {  
                                'action': 'getTextForUpdate', 
                                'file_text': response.text, // 要传递的数据  
                                'post_id':post_id,
                            },  
                            type: 'POST',  
                            success:(response2)=>{
                                //console.log(response2);
                                //更新成功后取消flag
                                $.ajax({
                                    beforeSend:(xhr)=>{
                                        xhr.setRequestHeader("X-WP-Nonce",univ_data.nonce);
                                    },  
                                    url: univ_data.ajaxurl,
                                    data: {
                                        'action':'already_got_content_post',
                                        'post_id':post_id,
                                    },  
                                    type: 'POST',  
                                    success:(response3)=>{
                                        //console.log(response3);
                                    },
                                    error:(response3)=>{
                                        console.log(response3);
                                    }
                                });
                            },
                            error:(response2)=>{
                                console.log(response2);
                            }
                        });     
                    },
                    error:(response)=>{
                        console.log(response);
                    }
                });  
            }

        });  
    }


    //检查选择文件数是否超过12
    checkFiles(e){
        //window.alert(123);
        var input = $('.new-file')[0]; // 使用 [0] 或 .get(0) 来获取 DOM 元素  
        var files = input.files;  
        var maxFiles = 12;  
        if (files.length > maxFiles) {  
            alert('您最多只能选择' + maxFiles + '个文件:请重新选择文件。');  
            // 清除当前选择，以便用户重新选择  
            input.value = '';  
            input.value = null;
            // 注意：在某些浏览器中，直接设置 input.value = '' 可能不起作用  
            // 一种替代方法是使用 input.value = null（但并非所有浏览器都支持）  
        }else{
            this.fileNames = []; // 清空之前的文件名  
            var files = $(e.target).prop('files');  
            for (var i = 0; i < files.length; i++) {  
                this.fileNames.push(files[i].name);  
            }  
            //console.log(this.fileNames); // 控制台输出  
        }
    }

    //提交文件
    async submitPolicy(){
        for(let i=0;i<this.fileNames.length;i++){
            //判断当前文件policy的post是否存在的flag
            var exist_policy=false;
            //正则提取文字的标题
            var raw_title = this.fileNames[i];
            //提取文件后缀e.g. docx/pdf
            var suffix = getFileExtension(raw_title);
            //去除文件名后缀
            var clear_title = getFileNameWithoutExtension(raw_title)
            //查重
            for(let k=0;k<univ_data.policies.length;k++){
                if(clear_title==univ_data.policies[k]){
                    exist_policy=true;
                }
            }
            if(exist_policy){
                alert("您上传的文件已存在:"+this.fileNames[i]);
                continue;
            }
            if(!exist_policy){
                var newFile={
                    'title':clear_title,
                    'excerpt':suffix,
                    'content':'',
                    'status':'publish',
                }
                $.ajax({  
                    beforeSend:(xhr)=>{
                        xhr.setRequestHeader("X-WP-Nonce",univ_data.nonce);
                    },  
                    url: univ_data.root_url+'/wp-json/wp/v2/policy/',
                    data: newFile,  
                    type: 'POST',  
                    success:(response)=>{
                        $(".note-limit-message").addClass("active");
                        $("#upload-policy-btn").removeClass("upload-policy-hide");
                        $("#submit-policy-btn").addClass("upload-policy-hide");
                        //发布后更新post令got_content的flag生效
                        $.ajax({
                            beforeSend:(xhr)=>{
                                xhr.setRequestHeader("X-WP-Nonce",univ_data.nonce);
                            },  
                            url: univ_data.ajaxurl,
                            data: {
                                'action':'initiate_policy',
                                'policy_id':response.id,
                            },  
                            type: 'POST',  
                            success:(response2)=>{
                                //console.log(response2);
                            },
                            error:(response2)=>{
                                console.log(response2);
                            }
                        });
                    },
                    error:(response)=>{
                        console.log("error");
                        console.log(response);
                    }
                });                   
            }
        }          
    }

    //delete
    deletePolicy(e){
        var thisPolicy=$(e.target).parents("li");
        //删除wordpress中policy post的请求
        $.ajax({
            beforeSend:(xhr)=>{
                xhr.setRequestHeader("X-WP-Nonce",univ_data.nonce);
            },
            url:univ_data.root_url+'/wp-json/wp/v2/policy/'+thisPolicy.data('id'),
            type:'DELETE',
            success:(response)=>{
                thisPolicy.slideUp();
            },
            error:(response)=>{
                console.log('sorry');
                console.log(response);               
            },
        });
        //删除上传的文档的请求
        var delete_url_no_suffix = thisPolicy.data('delete_url');
        var delete_url = delete_url_no_suffix+thisPolicy.data('suffix');
        //console.log(delete_url);
        $.ajax({  
            beforeSend:(xhr)=>{
                xhr.setRequestHeader("X-WP-Nonce",univ_data.nonce);
            },
            type: 'POST',  
            url: univ_data.ajaxurl, // WordPress的AJAX处理URL  
            data: {  
                'action': 'delete_file',
                'file_path': delete_url // 要传递的数据  
            },  
            success: function(response) {  
                // 处理服务器响应  
                console.log(response);  
                if (response.success) {  
                    //alert('文件已成功删除！');  
                } else {  
                    alert('删除文件时发生错误：' + response.data);  
                }  
            },  
            error: function(error) {  
                // 处理AJAX请求错误  
                console.log(error);  
            }  
        });         
    
        
    }
    submit_form(e){
        console.log('#policy-submit-form');
        //e.preventDefault();  
        //console.log('#policy-submit-form');
        var formData = new FormData();
        var fileInput = $('.new-file')[0];  
        if (fileInput.files.length > 0) {  
            // 添加文件到FormData  
            for(let i=0;i<fileInput.files.length;i++){

                formData.append('upload-policy', fileInput.files[i]); 
            }
            
        }  
        formData.append('action', 'uploadNewPolicies');  
        console.log(formData);
        $.ajax({  
            beforeSend:(xhr)=>{
                xhr.setRequestHeader("X-WP-Nonce",univ_data.nonce);
            },
            type: 'POST',  
            url: univ_data.ajaxurl, // WordPress的AJAX处理URL  
            data: formData,
            processData: false, // 告诉jQuery不要去处理发送的数据  
            success: function(res) {  
                // 处理服务器响应  
                console.log(res);  
            },  
            error: function(error) {  
                // 处理AJAX请求错误  
                console.log(error);  
            }  
        });
    }    
    
}

export default NewPolicy;