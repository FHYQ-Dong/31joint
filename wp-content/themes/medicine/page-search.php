<?php
    get_header();
    while(have_posts()){
        the_post();
        pageBanner(array(
            //'title'=>'title here',
            //'subtitle'=>'subtitle here',
            //'photo'=>'http://localhost/wp1/wp-content/uploads/2024/05/%E5%BE%AE%E4%BF%A1%E6%88%AA%E5%9B%BE_20240304085630-300x179.jpg',
        ));
        ?>
        <div class="container container--narrow page-section">
        <?php 
            //echo get_the_ID();    
            //echo wp_get_post_parent_id(get_the_ID());//获取父级的id
            $parent_id = wp_get_post_parent_id(get_the_ID());
            if($parent_id){?>
                <div class="metabox metabox--position-up metabox--with-home-link">
                    <p>
                        <a class="metabox__blog-home-link" href="<?php echo get_permalink($parent_id);?>">
                            <i class="fa fa-home" aria-hidden="true"4f></i>
                            <?php echo get_the_title($parent_id);?>
                        </a> 
                        <span class="metabox__main"><?php the_title();?></span>
                    </p>
                </div>                
            <?php }
        ?>

        <?php 
        $testArray = get_pages(array(
            'child_of' => get_the_ID()
        ));
        if($parent_id || $testArray){?>
            <div class="page-links">
                <h2 class="page-links__title"><a href="<?php echo get_permalink($parent_id);?>"><?php echo get_the_title($parent_id);?></a></h2>
                <ul class="min-list">
                    <?php
                        if($parent_id){
                            $findChildrenOf = $parent_id;
                        } 
                        else{
                            $findChildrenOf = get_the_ID();
                        }
                        wp_list_pages(array(
                            'title_li' => NULL,
                            'child_of' => $findChildrenOf,
                            'sort_colume' => 'menu_order'
                        ));
                    ?>
                </ul>
            </div>        
        <?php }//php后面空一格再写！！！
        ?>


        <div class="generic-content">
            <form class="search-form" method="get" action="<?php echo esc_url(site_url('/'));?>">
                <label class="headline headline--medium" for="s">搜索:</label>
                <div class="search-form-row">
                    <input placeholder="请输入" class="s" id="s" type="search" name="s">
                    <input class="search-submit" type="submit" value="搜索">                    
                </div>

            </form>
        </div>
    </div>

    <?php }
    get_footer();
?>