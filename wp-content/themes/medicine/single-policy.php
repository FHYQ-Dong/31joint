<?php

use PDFEmbedder\Shortcodes\PdfEmbedder;

    get_header();
    while(have_posts()){
        the_post();
        pageBanner();
        //动态获取文件存储位置
        $upload_year = get_post_time('Y',false,get_the_ID(),true);
        $upload_month = get_post_time('m',false,get_the_ID(),true);        
        $file_name = get_the_title();
        //将标题中出现空格的位置换成“-”
        $file_name=preg_replace('/\s+/', '-', $file_name);     
        //把括号替换为空字符
        $file_name=str_replace(array("(",")","[","]"), '', $file_name);  
        //政策摘要位置存储了文件后缀
        $file_suffix = get_the_excerpt();
        //文件下载地址
        //urlencode加密来使用中文路径
        $file_download = home_url().'/wp-content/uploads/'.$upload_year.'/'.$upload_month.'/'.urlencode($file_name).'.'.$file_suffix;
        ?>
        <div class="container container--narrow page-section">
        <div class="metabox metabox--position-up metabox--with-home-link">
                <p>
                    <a class="metabox__blog-home-link" href="<?php echo get_post_type_archive_link('policy');?>">
                        所有政策
                    </a> 
                    <span class="metabox__main">
                        <a target="_blank" data-suffix="<?php echo $file_suffix;?>" href="<?php echo $file_download;?>">
                            下载文档<span class="download-title">:<?php echo get_the_title();?></span>
                        </a>
                    </span>
                </p>
            </div>
            <div class="generic-content">
                <div class="embedded_pdf">
                    <?php
                    if($file_suffix=='docx'){
                        the_content();  
                    }
                    ?>
                    <?php         
                            //使用插件定义的shortcode                
                            $pdf_shortcode = do_shortcode('[pdfviewer width="100%" height="100%"]'.$file_download.'[/pdfviewer]');
                            echo $pdf_shortcode;
                    ?>
                </div>
            </div>
        </div>
    <?php }
    get_footer();
?>