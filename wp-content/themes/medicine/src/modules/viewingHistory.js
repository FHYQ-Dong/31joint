import $ from 'jquery';

class ViewingHistory{
    constructor(){
        this.events();
    }
    events(){
        $('.delete-viewing-history').on('click',this.deleteViewingHistory.bind(this));

    }
    deleteViewingHistory(e){
        var thisHistory=$(e.target).parents("li");
        thisHistory.slideUp();
        $.ajax({  
            beforeSend:(xhr)=>{
                xhr.setRequestHeader("X-WP-Nonce",univ_data.nonce);
            },
            type: 'POST',  
            url: univ_data.ajaxurl, // WordPress的AJAX处理URL  
            data: {  
                'action': 'delete_viewing_history', 
                'user_id':univ_data.current_user,
                'page_id':thisHistory.data('page_id'),
            },  
            success: function(response) {  
                // 处理服务器响应  
                thisHistory.slideUp();
                console.log('congrats');
                console.log(response);
            },  
            error: function(error) {  
                // 处理AJAX请求错误  
                console.log('sorry');
                console.log(response);      
            }  
        }); 
    }
}

export default ViewingHistory;