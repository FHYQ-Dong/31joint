<!DOCTYPE html>
<html <?php language_attributes();?> class="home">
    <head id="projectName" name="<?php echo get_bloginfo('home');?>">
        <meta charset="<?php bloginfo('charset');?>">
        <meta name="viewport" content="width=deviice-width,initial-scale=1">
        <?php wp_head();?>
    </head>
    <body <?php body_class();?> >
        <header class="site-header">
        <div class="container">
            <h1 class="school-logo-text float-left">
                <a href="<?php echo site_url()?>"><strong>三医联动</strong></a>
            </h1>
            <!--a href="<?php //echo esc_url(site_url("/search"));?>" class="js-search-trigger site-header__search-trigger"><i class="gg-search" aria-hidden="true"></i></a-->
            <i class="site-header__menu-trigger gg-details-more" aria-hidden="true"></i>
            <div class="site-header__menu group">
                <nav class="main-navigation">
                    <ul>
                        <li <?php //用于使导航条在当前页面点亮
                        if(is_page('about-us')||wp_get_post_parent_id(get_the_ID())==17) echo 'class="current-menu-item"'; ?>><a href="<?php echo site_url('/about-us')?>">关于我们</a></li>
                        <li <?php if(get_post_type()=='policy'||is_post_type_archive('policy')) echo "class='current-menu-item'";?>><a href="<?php echo get_post_type_archive_link('policy');?>">相关政策</a></li>
                        <li <?php if(get_post_type()=='notice'||is_post_type_archive('notice'))echo "class='current-menu-item'";?>><a href="<?php echo get_post_type_archive_link('notice');?>">报销须知</a></li>
                        <li <?php if(get_post_type()=='question'||is_post_type_archive('question')) echo "class='current-menu-item'"; ?>><a href="<?php echo get_post_type_archive_link('question')?>">热门问题</a></li>
                        <li <?php if(get_the_ID()==2095) echo "class='current-menu-item'"; ?>><a href="<?php echo site_url('/viewing-history');?>">浏览历史</a></li>
                        <?php
                            if(!is_page('home')){
                                ?>
                                <li id="site-search"><i class="gg-search" aria-hidden="true"></i></li>                                
                            <?php }
                        ?>
                    </ul>
                </nav>
                <div class="site-header__util">
                    <?php 
                        if(is_user_logged_in()){?>
                            <a href="<?php echo wp_logout_url();?>" class=" btn btn--small btn--orange float-left push-right">
                                <span class="btn__text">登出</span>
                            </a>
                        <?php }else{?>
                            <a href="<?php echo wp_login_url();?>" class="btn btn--small btn--orange float-left push-right">登录</a>
                            <a href="<?php echo wp_registration_url();?>" class="btn btn--small btn--dark-orange float-left">注册</a>        
                        <?php }
                    ?>
                </div>
            </div>
        </div>
        </header>
