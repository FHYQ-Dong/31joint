<?php 
get_header();
pageBanner(array(
  'title'=>'所有须知',
  'subtitle'=>'你要的须知都在这里啦~',
));
?>


<div class="container container--narrow page-section">
<?php 
    if(is_user_logged_in()){
        upload_new_notices();
        $current_usr=wp_get_current_user();  
        //只有管理员能上传政策
        if($current_usr->roles[0]=='administrator'){?>
            <form id="notice-submit-form" method="post" name="new-notice" enctype="multipart/form-data">
                <div class="create-note">
                    <h2 class="headline headline--small">上传新文件(最大同时上传文件数:12,不同文件类型请分批上传,上传后请手动刷新页面)</h2>
                    <input class="new-notice" type="file" name="upload-notice[]" multiple>
                    <span id="submit-notice-btn" class="submit-notice " value="uploaded-file">提交</span>
                    <input id="upload-notice-btn" class="upload-notice-hide" type="submit" value="上传">  
                    <p class="notice-limit-message">请按上传键以显示新政策</p>    
                    <label for="notice-type-select">选择文件类型:</label>  
                    <select id="notice-type-select" name="notice-type">
                        <option value="none" >无分类</option>    
                        <option value="workInjure">工伤</option>  
                        <option value="basicMed">基本医疗</option>  
                        <option value="birth">生育</option>  
                        <option value="outServiceSpecial">门诊特殊病</option>       
                    </select>                     
                </div>          
            </form>
        <?php }
    }
?>
<ul class="link-list min-list" id="current_notice" >
    <?php 
        $notice_workInjure = new WP_Query(array(
            'post_type'=>'notice',
            'post_per_page'=>-1 ,
            'meta_key'=>'notice_type',
            'order'=>'DESC',
            'meta_query'=>array(
                array(
                  'key'=>'notice_type',//比较量
                  'compare'=>'=',//比较符号
                  'value'=>'workInjure',//右值
                ),
            ),
        ));?>
        <div>  
            <div class="notice-flex-container">
                <h2>分类：工伤</h2>  
                <button class="showFiles show-workInjure">显示文件</button>                  
            </div>
        </div>
        <?php
        while($notice_workInjure->have_posts()){
            $notice_workInjure->the_post();
            $post_date=get_post_field('post_date', get_the_ID());
            $upload_year = date("Y",strtotime($post_date));
            $upload_month = date("m",strtotime($post_date));
            $clear_title = preg_replace('/\s+/', '-',get_the_title());
            $clear_title = str_replace(array("(",")","[","]"),'',$clear_title);
            $delete_url = 'wp-content/uploads/'.$upload_year.'/'.$upload_month.'/'.$clear_title.'.';
            $file_suffix = get_the_excerpt();
            $file_download = home_url().'/wp-content/uploads/'.$upload_year.'/'.$upload_month.'/'.$clear_title.'.'.$file_suffix;    
        ?>
        <div class="file-list file-list-workInjure">  
            <ul>  
                <li class="notice-unit" data-file="<?php echo $file_download;?>" data-content="<?php echo get_field('got_content');?>" data-id="<?php the_ID();?>" data-delete_url="<?php echo $delete_url;?>" data-suffix="<?php echo get_the_excerpt();?>">
                <a target="_blank" href="<?php the_permalink();?>"><?php the_title();?></a>
                <?php 
                    if(is_user_logged_in()){
                        if($current_usr->roles[0]=='administrator'){?>
                            <button class="delete-note delete-notice">删除</bu>
                        <?php }
                    }
                ?>
                </li>
            </ul>  
        </div>  
        <?php }
        wp_reset_query();
    ?>
    <?php 
        //基本医疗
        $notice_basicMed = new WP_Query(array(
            'post_type'=>'notice',
            'post_per_page'=>-1,
            'meta_key'=>'notice_type',
            'order'=>'DESC',
            'meta_query'=>array(
                array(
                  'key'=>'notice_type',//比较量
                  'compare'=>'=',//比较符号
                  'value'=>'basicMed',//右值
                ),
            ),
        ));?>
        <div>  
            <div class="notice-flex-container">
                <h2>分类：基本医疗</h2>  
                <button class="showFiles show-basicMed">显示文件</button>                  
            </div>
        </div>
        <?php
        while($notice_basicMed->have_posts()){
            $notice_basicMed->the_post();
            $post_date=get_post_field('post_date', get_the_ID());
            $upload_year = date("Y",strtotime($post_date));
            $upload_month = date("m",strtotime($post_date));
            $clear_title = preg_replace('/\s+/', '-',get_the_title());
            $clear_title = str_replace(array("(",")"),'',$clear_title);
            $delete_url = 'wp-content/uploads/'.$upload_year.'/'.$upload_month.'/'.$clear_title.'.';
            $file_suffix = get_the_excerpt();
            $file_download = home_url().'/wp-content/uploads/'.$upload_year.'/'.$upload_month.'/'.$clear_title.'.'.$file_suffix;    
        ?>
        <div class="file-list file-list-basicMed">  
            <ul>  
                <li class="notice-unit" data-file="<?php echo $file_download;?>" data-content="<?php echo get_field('got_content');?>" data-id="<?php the_ID();?>" data-delete_url="<?php echo $delete_url;?>" data-suffix="<?php echo get_the_excerpt();?>">
                <a target="_blank" href="<?php the_permalink();?>"><?php the_title();?></a>
                <?php 
                    if(is_user_logged_in()){
                        if($current_usr->roles[0]=='administrator'){?>
                            <button class="delete-note delete-notice">删除</bu>
                        <?php }
                    }
                ?>
                </li>
            </ul>  
        </div>  
        <?php }
        wp_reset_query();
    ?>
    <?php 
        //生育
        $notice_birth = new WP_Query(array(
            'post_type'=>'notice',
            'post_per_page'=>-1,
            'meta_key'=>'notice_type',
            'order'=>'DESC',
            'meta_query'=>array(
                array(
                  'key'=>'notice_type',//比较量
                  'compare'=>'=',//比较符号
                  'value'=>'birth',//右值
                ),
            ),
        ));?>
        <div>  
            <div class="notice-flex-container">
                <h2>分类：生育</h2>  
                <button class="showFiles show-birth">显示文件</button>                  
            </div>
        </div>
        <?php
        while($notice_birth->have_posts()){
            $notice_birth->the_post();
            $post_date=get_post_field('post_date', get_the_ID());
            $upload_year = date("Y",strtotime($post_date));
            $upload_month = date("m",strtotime($post_date));
            $clear_title = preg_replace('/\s+/', '-',get_the_title());
            $clear_title = str_replace(array("(",")"),'',$clear_title);
            $delete_url = 'wp-content/uploads/'.$upload_year.'/'.$upload_month.'/'.$clear_title.'.';
            $file_suffix = get_the_excerpt();
            $file_download = home_url().'/wp-content/uploads/'.$upload_year.'/'.$upload_month.'/'.$clear_title.'.'.$file_suffix;    
        ?>
        <div class="file-list file-list-birth">  
            <ul>  
                <li class="notice-unit" data-file="<?php echo $file_download;?>" data-content="<?php echo get_field('got_content');?>" data-id="<?php the_ID();?>" data-delete_url="<?php echo $delete_url;?>" data-suffix="<?php echo get_the_excerpt();?>">
                <a target="_blank" href="<?php the_permalink();?>"><?php the_title();?></a>
                <?php 
                    if(is_user_logged_in()){
                        if($current_usr->roles[0]=='administrator'){?>
                            <button class="delete-note delete-notice">删除</bu>
                        <?php }
                    }
                ?>
                </li>
            </ul>  
        </div>  
        <?php }
        wp_reset_query();
    ?>
    <?php 
        //门诊特殊病
        $notice_outServiceSpecial = new WP_Query(array(
            'post_type'=>'notice',
            'post_per_page'=>-1,
            'meta_key'=>'notice_type',
            'order'=>'DESC',
            'meta_query'=>array(
                array(
                  'key'=>'notice_type',//比较量
                  'compare'=>'=',//比较符号
                  'value'=>'outServiceSpecial',//右值
                ),
            ),
        ));?>
        <div>  
            <div class="notice-flex-container">
                <h2>分类：门诊特殊病</h2>  
                <button class="showFiles show-outServiceSpecial">显示文件</button>                  
            </div>
        </div>
        <?php
        while($notice_outServiceSpecial->have_posts()){
            $notice_outServiceSpecial->the_post();
            $post_date=get_post_field('post_date', get_the_ID());
            $upload_year = date("Y",strtotime($post_date));
            $upload_month = date("m",strtotime($post_date));
            $clear_title = preg_replace('/\s+/', '-',get_the_title());
            $clear_title = str_replace(array("(",")"),'',$clear_title);
            $delete_url = 'wp-content/uploads/'.$upload_year.'/'.$upload_month.'/'.$clear_title.'.';
            $file_suffix = get_the_excerpt();
            $file_download = home_url().'/wp-content/uploads/'.$upload_year.'/'.$upload_month.'/'.$clear_title.'.'.$file_suffix;    
        ?>
        <div class="file-list file-list-outServiceSpecial">  
            <ul>  
                <li class="notice-unit" data-file="<?php echo $file_download;?>" data-content="<?php echo get_field('got_content');?>" data-id="<?php the_ID();?>" data-delete_url="<?php echo $delete_url;?>" data-suffix="<?php echo get_the_excerpt();?>">
                <a target="_blank" href="<?php the_permalink();?>"><?php the_title();?></a>
                <?php 
                    if(is_user_logged_in()){
                        if($current_usr->roles[0]=='administrator'){?>
                            <button class="delete-note delete-notice">删除</bu>
                        <?php }
                    }
                ?>
                </li>
            </ul>  
        </div>  
        <?php }
        wp_reset_query();
    ?>

</ul>
</div> 
<?php 
    get_footer();
?>