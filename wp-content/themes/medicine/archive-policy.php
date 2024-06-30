<?php 
get_header();
pageBanner(array(
  'title'=>'所有政策',
  'subtitle'=>'政策文件都在这啦',
));
?>
<div class="container container--narrow page-section">
<?php 
    if(is_user_logged_in()){
        //update_posts_content();
        $current_usr=wp_get_current_user();  
        //只有管理员能上传政策
        if($current_usr->roles[0]=='administrator'){?>
            <form id="policy-submit-form" method="post" name="new-policy" enctype="multipart/form-data">
                <div class="create-note">
                    <h2 class="headline headline--small">上传新文件(最大同时上传文件数:12,不同文件类型请分批上传,上传后请手动刷新页面)</h2>
                    <input class="new-file" type="file" name="upload-policy[]" multiple>
                    <span id="submit-policy-btn" class="submit-note" value="uploaded-file">提交</span>
                    <input id="upload-policy-btn" class="upload-policy-hide" type="submit" value="上传">  
                    <p class="note-limit-message">请按上传键以显示新政策</p>    
                    <?php 
                        upload_new_policies();       
                    ?>
                </div>            
            </form>
        <?php }
    }
?>
<ul class="link-list min-list" id="current_policy" >
    <?php 
        while(have_posts()){
        the_post();
        $post_date=get_post_field('post_date', get_the_ID());
        $upload_year = date("Y",strtotime($post_date));
        $upload_month = date("m",strtotime($post_date));
        $clear_title = preg_replace('/\s+/', '-',get_the_title());
        $clear_title = str_replace(array("(",")","[","]"),'',$clear_title);
        $delete_url = 'wp-content/uploads/'.$upload_year.'/'.$upload_month.'/'.$clear_title.'.';
        $file_suffix = get_the_excerpt();
        $file_download = home_url().'/wp-content/uploads/'.$upload_year.'/'.$upload_month.'/'.$clear_title.'.'.$file_suffix;
        //strtotime字面意思
        if(get_the_content()==''&&$file_suffix=='docx'){
            update_posts_content($clear_title,get_the_ID(),$upload_year,$upload_month,$file_suffix);
        }
        ?>
        <li class="policy-unit" data-content="<?php echo get_field('got_content');?>" data-file="<?php echo $file_download;?>" data-id="<?php the_ID();?>" data-delete_url="<?php echo $delete_url;?>" data-suffix="<?php echo get_the_excerpt();?>">
            <a target="_blank" href="<?php the_permalink();?>"><?php the_title();?></a>
            <?php 
                if(is_user_logged_in()){
                    if($current_usr->roles[0]=='administrator'){?>
                        <button class="delete-note delete-policy">删除</bu>
                    <?php }
                }
            ?>
        </li>
        <?php }
        echo paginate_links();
    ?>
</ul>
</div>
<?php get_footer();
?>