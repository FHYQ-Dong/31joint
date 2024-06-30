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


class NewNotice{
    constructor(){
        this.fileNames = []; // 将 fileNames 设置为类的属性 
        this.events();
        this.notice_type = 'none';
    }
    events(){
        $("#current_notice").on('click','.delete-notice',this.deleteNotice.bind(this));
        $('.new-notice').on('change',this.checkFiles.bind(this));  
        $(".submit-notice").on('click',this.submitNotice.bind(this));
        $('.showFiles').on('click',this.showFiles);
        this.getText();
    }
    getText() {  
        //获取archive-notice页面上所有notice
        $('.notice-unit').each(function() {  
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
                console.log(answer_url);
                //从html中提取notice的id
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
                        //请求成功后，将得到的文本通过action在php端更新notice
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

    showFiles(){
        if($(this).hasClass('show-workInjure')){
            $('.file-list-workInjure').toggleClass('visible');
        }  
        if($(this).hasClass('show-basicMed')){
            $('.file-list-basicMed').toggleClass('visible');
        }  
        if($(this).hasClass('show-outServiceSpecial')){
            $('.file-list-outServiceSpecial').toggleClass('visible');
        }  
        if($(this).hasClass('show-birth')){
            $('.file-list-birth').toggleClass('visible');
        }  
    }


    //检查选择文件数是否超过12
    checkFiles(e){
        var input = $('.new-notice')[0]; // 使用 [0] 或 .get(0) 来获取 DOM 元素  
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
            console.log(this.fileNames); // 控制台输出  
        }
    }

    //提交文件
    async submitNotice(){
        this.notice_type = $('#notice-type-select').val();
        for(let i=0;i<this.fileNames.length;i++){
            var exist_notice=false;
            //正则提取文字的标题
            var raw_title = this.fileNames[i];
            //提取文件后缀e.g. docx/pdf
            var suffix = getFileExtension(raw_title);
            //去除文件名后缀
            var clear_title = getFileNameWithoutExtension(raw_title)
            //查重
            for(let k=0;k<univ_data.policies.length;k++){
                if(clear_title==univ_data.notices[k]){
                    exist_notice=true;
                }
            }
            if(exist_notice){
                alert("您上传的文件已存在:"+this.fileNames[i]);
                continue;
            }
            if(!exist_notice){
                var newFile={
                    'title':clear_title,
                    'excerpt':suffix,
                    'content':'',
                    'status':'publish',
                }
                //发布notice post
                $.ajax({  
                    beforeSend:(xhr)=>{
                        xhr.setRequestHeader("X-WP-Nonce",univ_data.nonce);
                    },  
                    url: univ_data.root_url+'/wp-json/wp/v2/notice/',
                    data: newFile,  
                    type: 'POST',  
                    success:(response)=>{
                        $(".notice-limit-message").addClass("active");
                        $("#upload-notice-btn").removeClass("upload-notice-hide");
                        $("#submit-notice-btn").addClass("upload-notice-hide");
                        //初始化notice-type,顺便初始化got_content
                        $.ajax({  
                            beforeSend:(xhr)=>{
                                xhr.setRequestHeader("X-WP-Nonce",univ_data.nonce);
                            },
                            type: 'POST',  
                            url: univ_data.ajaxurl, // WordPress的AJAX处理URL  
                            data: {  
                                //ajax action 钩子->传到php调用相应action的函数
                                'action': 'initiate_notice_type', 
                                //传递id
                                'notice_id':response.id,
                                'notice_type':this.notice_type,
                            },  
                            success: (metaresponse)=>{  
                                //console.log(metaresponse);  
                            },  
                            error: (error)=>{  
                                // 处理AJAX请求错误  
                                console.log(error);  
                            }  
                        }); 
                    },
                    error:(response)=>{
                        console.log(response);
                    }
                });        
            }
        }          
    }

    //delete
    deleteNotice(e){
        var thisNotice=$(e.target).parents("li");
       $.ajax({
            beforeSend:(xhr)=>{
                xhr.setRequestHeader("X-WP-Nonce",univ_data.nonce);
            },
            url:univ_data.root_url+'/wp-json/wp/v2/notice/'+thisNotice.data('id'),
            type:'DELETE',
            success:(response)=>{
                thisNotice.slideUp();
                //console.log('congrats');
                //console.log(response);
            },
            error:(response)=>{
                console.log('sorry');
                console.log(response);               
            },
        });
        //删除上传的文档的请求
        var delete_url_no_suffix = thisNotice.data('delete_url');
        var delete_url = delete_url_no_suffix+thisNotice.data('suffix');
        //console.log(delete_url);
        $.ajax({  
            beforeSend:(xhr)=>{
                xhr.setRequestHeader("X-WP-Nonce",univ_data.nonce);
            },
            type: 'POST',  
            url: univ_data.ajaxurl, // WordPress的AJAX处理URL  
            data: {  
                'action': 'delete_notice', // 自定义的action名称:文心一言牛逼！！！
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
        console.log('#notice-submit-form');

        var formData = new FormData();
        var fileInput = $('.new-notice')[0];  
        if (fileInput.files.length > 0) {  
            // 添加文件到FormData  
            for(let i=0;i<fileInput.files.length;i++){

                formData.append('upload-notice', fileInput.files[i]); 
            }
            
        }  
        formData.append('action', 'uploadNewNotices');  
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
                console.log(111);  
                console.log(res);  
            },  
            error: function(error) {  
                // 处理AJAX请求错误  
                console.log(222);  
                console.log(error);  
            }  
        });
    }
}

export default NewNotice;