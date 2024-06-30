<div class="search-container">  
    <form id="site-search" class="search-form" method="get" action="<?php echo esc_url(site_url('/'));?>">  
        <label class="headline headline--medium headline--search-color" for="s">
            站内搜索
            <p class="login-notice" data-user="<?php echo get_current_user_id();?>">登录以使用智能搜索<br>(注册后收不到邮件请查看垃圾箱)</p>
        </label>  
        <div class="search-form-row">  
            <input placeholder="请输入" class="s" id="s1" type="search" name="s">  
            <input class="search-submit" type="submit" value="搜索">  
        </div>  
    </form>  

    <div id="smart-search" class="search-form search-form-hide">  
        <label class="headline headline--medium headline--search-color" >人工智能搜索<span class="search-alert search-alert-hide"><br>搜索进行时请勿跳转页面</span></label>  
        <div class="search-form-row">  
            <input placeholder="请输入" class="s" id="smart-search-item" type="search">  
            <button class="smart-search-submit">搜索</button>  
        </div>  
        <div class="progress-container progress-container-hide">  
            <progress class="search-progress" value="0" max="100"></progress>  
        </div> 
    </div>  
     
</div>