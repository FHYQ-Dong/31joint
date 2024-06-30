<?php
    get_header();
    while(have_posts()){
        the_post();
        pageBanner();
        //浏览次数计数
        $original_view = get_post_meta(get_the_ID(),'view_count',true);
        update_post_meta(get_the_ID(),'view_count',$original_view+1);                     
        ?>
        <div class="container container--narrow page-section">
            <div class="metabox metabox--position-up metabox--with-home-link">
                <p class="question-data-box">
                    <a class="metabox__blog-home-link" href="<?php echo get_post_type_archive_link('question');?>">
                        所有问题
                    </a> 
                    <span class="metabox__main">
                        Posted by <?php the_author();?> on 
                        <?php the_time("y年n月j日");?>
                        <i class="gg-search"></i>
                        <span data-count="<?php echo get_field('view_count');?>">
                            <?php echo get_field('view_count')?>
                        </span>
                    </span>
                </p>
            </div>
            <div class="generic-content">
                <div class="question-answer">
                    <?php 
                        the_content();
                    ?>
                </div>
            </div>
        </div>
    <?php }
    get_footer();
?>