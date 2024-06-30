import $ from 'jquery';

class smartSearch{
    //1.describe object
    //constructor中的代码在创建对象时会立刻执行
    constructor(){
        $(document).ready(() => {  
            this.openBtn = $("#smart-search"); // 指向搜索按钮的class（注意这里应该是.class而不是#id）  
            this.searchField = $('#smart-search-item'); // id 用#来获取  
            this.submitBtn = $('.smart-search-submit');  
            this.status = 'none'; // 初始化状态  
            this.ans_id = null; // 初始化答案ID  
            this.events();  
            this.searched_question='';//AI搜索问题
            this.answer='';//AI搜索答案
            this.interval_time=2500;
            this.hrefs;//搜索时禁止a标签href，储存删除的href
            //两个计时器要在ajax结束时清除
            this.intervalId;
            this.intervalId3;
        });  
    }
    
    //2.events
    events(){
        //检测用户聚焦搜索框，并检测回车键
        this.searchField.on('keydown', (e) => {
            if (e.key === 'Enter') {
                e.preventDefault(); // 阻止默认的回车事件，避免表单提交
                this.submitBtn.trigger('click'); // 模拟点击提交按钮
            }
        });
        this.submitBtn.on('click',this.askAI.bind(this));  
        //登录后 隐藏智能搜素提示 显示智能搜索框
        if($('.login-notice').data('user')!=0){
            //console.log($('.login-notice').data('user'));
            $('.login-notice').addClass('login-notice-hide');
            $('.search-form').removeClass('search-form-hide');
        }
    }
    //3.functions   
    //进度条函数
    progressBar(status) { 
        if(status=='none'){
            currentValue=0;
        }
        var progress_bar = $('.search-progress'); // 假设这是一个 <progress> 元素  
        var currentValue = parseInt(progress_bar.attr('value')); // 获取当前值，如果未设置则默认为0  
        if(status=='Processing'&& currentValue<=85){
            this.intervalId = setInterval(()=>{ 
                if (currentValue >= 85) {  
                    clearInterval(this.intervalId); // 当达到或超过76时，停止增加  
                } else {  
                    currentValue++; // 或者，如果你使用百分比，可以这样做：currentValue += (100 / 76);  
                    progress_bar.attr('value', currentValue.toString()); // 更新进度条的值  
                }  
            }, 175); // 每0.175秒更新一次              
        }else if(status=='Success'){
            clearInterval(this.intervalId); // 当达到或超过76时，停止增加  
            status='Success';
            currentValue = 100; // 设置当前值为100  
            progress_bar.attr('value', currentValue.toString()); // 更新进度条的值  
        }
    } 

    //搜索时禁用的设置
    noRedirect(){
        this.ans_id=null;
        this.status='none';
        this.answer='';
        //隐藏站内搜索框
        $('#site-search').addClass('site-search-hide');
        //搜索时显示不要跳转页面的警告
        $('.search-alert').removeClass('search-alert-hide');
        //隐藏搜索按钮
        this.submitBtn.addClass('submit-hide');
        //禁止输入框行为：输入
        $('.s').prop('disabled',true);
        let self = this; // 使用外部变量来保存外部 this 的引用  
        // 搜索时保存主页所有a标签的href属性  
        self.hrefs = $('.home a').map(function() {  // 使用普通函数而不是箭头函数  
            return $(this).attr('href');    
        }).get();  
        // 移除 href 属性以防止跳转页面  
        $('.home a').removeAttr('href');   
    }
    //搜索后重置函数
    allowRedirect(){
        //显示站内搜索框
        $('#site-search').removeClass('site-search-hide');
        //搜索结束隐藏不要跳转页面的警告
        $('.search-alert').addClass('search-alert-hide');
        //显示搜索按钮
        this.submitBtn.removeClass('submit-hide');
        $('.s').prop('disabled',false);
        let self = this; // 使用外部变量来保存外部 this 的引用  
        // 搜索结束时主页恢复a标签的href属性  
        $('.home a').each(function(index) {  // 使用普通函数  
            // 注意这里的 this 指向的是当前遍历到的 DOM 元素  
            $(this).attr('href', self.hrefs[index]);  // 使用之前保存的 self 变量  
        });  
        //重置进度条
        $('.progress-container').addClass('progress-container-hide');
        $('.search-progress').attr('value', 0);
        this.ans_id=null;
        this.status='none';
        this.searched_question='';
        this.answer='';
        this.interval_time=2500;
        this.searchField.val('');
        clearInterval(this.intervalId);
        clearInterval(this.intervalId3);
    }
    //提问函数
    askAI(){
        //判断搜索框是否为空
        if(this.searchField.val()==''){
            alert('你还没有输入内容哦');
        }
        else if(this.searchField.val!=''){
            this.noRedirect();
            let searchTerm = this.searchField.val(); 
            //用完就立刻重置，免得出现奇怪的bug，例如多次进入if函数 :(
            let url = 'http://101.42.183.176:51114/ask/?question='+searchTerm;  
            this.searched_question=searchTerm;
            //提交问题
            $.ajax({  
                url: url, // 完整的URL，包括查询参数  
                type: 'GET', // 请求类型：GET  
                dataType: 'json', // 期望的返回数据类型  
                success: (data)=>{   
                    // 在这里处理返回的数据  
                    this.ans_id=data.id;
                    this.status='Processing';
                    $('.progress-container').removeClass('progress-container-hide');
                    this.progressBar(this.status);
                    this.intervalId3 = setInterval(() => {  
                        this.retrieveAns(); // 检索答案的函数  
                        // 假设在某个条件下，我们检索到了答案并想停止间隔调用  
                        if (this.status=='Success') {  
                            this.status = 'Success';  
                            clearInterval(this.intervalId3);
                        }  
                    }, this.interval_time); // 每两点五秒调用一次  
                },  
                error: (jqXHR, textStatus, errorThrown)=> {  
                    // 请求失败时的回调函数  
                    console.error('Error:', textStatus, errorThrown);  
                }  
            }); 
        }
    }
    //获取答案
    retrieveAns(){
        if(this.status=='Processing'){  
            let answer_url = 'http://101.42.183.176:51114/retrieve/?id='+this.ans_id;  
            $.ajax({  
                url: answer_url, // 完整的URL，包括查询参数  
                type: 'GET', // 请求类型：GET  
                dataType: 'json', // 期望的返回数据类型  
                success: (data)=>{   
                    if(data.status=='Success'){
                        this.status='Success';
                        this.answer=data.answer;
                        //console.log(data.answer); 
                        this.interval_time=500;
                    }
                },  
                error: (jqXHR, textStatus, errorThrown)=>{  
                    console.error('Error:', textStatus, errorThrown);  
                }  
            });            
        } 
        //发布答案页面
        if(this.status=='Success'){ 
            var newQuestion={
                'title':this.searched_question+':'+this.ans_id,
                'content':this.answer,
                'status':'publish',
            }
            $.ajax({  
                beforeSend:(xhr)=>{
                    xhr.setRequestHeader("X-WP-Nonce",univ_data.nonce);
                },  
                url: univ_data.root_url+'/wp-json/wp/v2/question/',
                data: newQuestion,  
                type: 'POST',  
                success:(response)=>{
                    this.progressBar(this.status);
                    //在生成post之后立刻用ajax请求初始化custom field
                    //使页面功能可以正常运作
                    $.ajax({  
                        beforeSend:(xhr)=>{
                            xhr.setRequestHeader("X-WP-Nonce",univ_data.nonce);
                        },
                        type: 'POST',  
                        url: univ_data.ajaxurl, // WordPress的AJAX处理URL  
                        data: {  
                            //ajax action 钩子->传到php调用相应action的函数
                            'action': 'initiate_view_count', 
                            //传递id
                            'question_id':response.id,
                        },  
                        success: (metaresponse)=>{  
                            this.allowRedirect();
                            $.ajax({  
                                beforeSend:(xhr)=>{
                                    xhr.setRequestHeader("X-WP-Nonce",univ_data.nonce);
                                },
                                url: univ_data.ajaxurl, // 这个URL通常是由WordPress提供的，指向admin-ajax.php                     
                                type: 'POST',  
                                dataType: 'json',  
                                data: {  
                                    action: 'update_question_style', // 自定义的action名称，用于在后端识别这个请求             
                                    post_id: response.id,                                  
                                },                      
                                success: function(update_response) {                      
                                    // 处理成功响应                  
                                    //console.log(update_response);  
                                    window.open(response.link, '_blank');                                },  
                                error: function(response_error) {                
                                    // 处理错误                  
                                    console.log(response_error);               
                                }  
                            });
                        },  
                        error: (error)=>{  
                            // 处理AJAX请求错误  
                            console.log(error);  
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

export default smartSearch