<?php 
get_header();
pageBanner(array(
  'title'=>'搜索结果',
  'subtitle'=>'搜索内容:&ldquo;'.esc_html(get_search_query(false)).'&rdquo;',
));
?>  

<div class="container container--narrow page-section">
  <?php 
    if(have_posts()){
        while(have_posts()){
            the_post();
            get_template_part('template-parts/content',get_post_type());
        }
        echo paginate_links();        
    }else{
        echo '<h2 class="headline headline--small-plus">no results</h2>';
    }?>
    
    <div class="generic content">
        <?php get_search_form();?>
    </div>


</div>

<?php get_footer();
?>