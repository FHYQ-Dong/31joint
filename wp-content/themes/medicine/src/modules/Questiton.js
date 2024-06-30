import $ from 'jquery';

class Question{
    constructor(){
        this.events();
    }
    events(){

        $('.delete-question').on('click',this.deleteQuestion.bind(this));
        this.highlightMyQuestion(); 
        this.replaceQuestionsContent();
    }
    //替换字符以及给a标签增加新标签页
    replaceQuestionsContent() {  
        var question_content = $('.generic-content').html();  
        // 创建一个临时的div来容纳HTML  
        var tempDiv = $('<div>').html(question_content);  
        // 检查是否存在.question-answer类  
        var questionFlag = tempDiv.find('.question-answer').length > 0;  
        if (questionFlag) {              
            // 在.question-answer类下的a标签上操作  
            tempDiv.find('.question-answer a').each(function() {  
                // 替换&amp;为&  
                var href = $(this).attr('href').replace(/&amp;/g, '&');  
                console.log(href);
                $(this).attr('href', href);     
                // 添加target="_blank"（如果还没有的话）  
                if (!$(this).attr('target') || $(this).attr('target') !== '_blank') {  
                    $(this).attr('target', '_blank');  
                }  
            });  
            // 将修改后的div转回为字符串（如果需要的话）  
            var modifiedString = tempDiv.html();  
            //console.log(modifiedString);  
            // 把修改后的内容放回原处，可以使用：  
            $('.generic-content').html(modifiedString);  
        }  
    }


    highlightMyQuestion() {
        //console.log(univ_data.current_user);
        $('.question-title').each(function() {
            if ($(this).data('author') == univ_data.current_user) {
                $(this).addClass('question-title-highlight');
            }
        });
    }
    deleteQuestion(e){
        var thisQuestion=$(e.target).parents("li");
        //删除wordpress中policy post的请求
        $.ajax({
            beforeSend:(xhr)=>{
                xhr.setRequestHeader("X-WP-Nonce",univ_data.nonce);
            },
            url:univ_data.root_url+'/wp-json/wp/v2/question/'+thisQuestion.data('id'),
            type:'DELETE',
            success:(response)=>{
                thisQuestion.slideUp();
                console.log('congrats');
                console.log(response);
            },
            error:(response)=>{
                console.log('sorry');
                console.log(response);               
            },
        });
    }
}

export default Question;