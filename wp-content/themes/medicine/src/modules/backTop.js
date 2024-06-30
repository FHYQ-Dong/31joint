import $ from 'jquery';

//回到最顶部的按钮
class BackToTop{
    constructor(){
        this.mybutton = $(".backTop");
        this.events();

    }
    events(){
        this.mybutton.on('click',this.backtotop_click.bind(this));
        // 当用户向下滚动20px时显示按钮，向上滚动时隐藏按钮  
        $(window).scroll(function() {  

            if ($(this).scrollTop() > 20) {  
                $('#backToTopBtn').fadeIn();  
            } else {  
                $('#backToTopBtn').fadeOut();  
            }  
        });
    }
    backtotop_click(){
        console.log('clicked');
        $('body,html').animate({  

            scrollTop: 0  

        }, 500); // 800是滚动动画的持续时间，单位是毫秒  
       
    }
}


export default BackToTop;
  
