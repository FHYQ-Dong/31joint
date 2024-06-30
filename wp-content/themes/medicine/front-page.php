<?php get_header();?>

<div class="page-banner">
      <div class="page-banner__bg-image" style="background-image: url(<?php echo get_field('page_banner_background_image')['sizes']['pageBanner'];?>)"></div>
      <div class="page-banner__content container t-center c-white">
        <h1 class="headline headline--large">欢迎!</h1>

        <h3 class="headline headline--small"><strong>THU</strong></h3>
        <?php 
            get_template_part('template-parts/content','double_searchform');
          ?>
        <div class="search-trigger js-search-trigger"></div>
        
      </div>
    </div>
    <div class="full-width-split group">
      <div class="full-width-split__one">
        <div class="full-width-split__inner">
          <h2 class="headline headline--small-plus t-center">相关政策</h2>
          <?php
            $homepagePolicies = new WP_Query(array(
              'posts_per_page'=>3,
              'post_type'=>'policy',
              'orderby'=>'meta_value_num',
              'meta_key'=>'policy_priority',
              'order'=>'DESC',
            ));
            while($homepagePolicies->have_posts()){
              $homepagePolicies->the_post();
              get_template_part('template-parts/content','policy');
            } wp_reset_postdata();
          ?>
          <p class="t-center no-margin"><a target="_blank" href="<?php echo get_post_type_archive_link("policy");?>" class="btn btn--yellow">更多政策</a></p>
        </div>
      </div>
      <div class="full-width-split__two">
        <div class="full-width-split__inner">
          <h2 class="headline headline--small-plus t-center">报销须知</h2>
          <?php
            $homepageNotices = new WP_Query(array(
              'posts_per_page'=>3,
              'post_type'=>'notice',
              'order'=>'DESC',
            ));
            while($homepageNotices->have_posts()){
              $homepageNotices->the_post();
              get_template_part('template-parts/content','notice');
            } wp_reset_postdata();
          ?>
          <p class="t-center no-margin"><a target="_blank" href="<?php echo get_post_type_archive_link("notice");?>" class="btn btn--blue">更多须知</a></p>
        </div>
      </div>
      <div class="full-width-split__three">
        <div class="full-width-split__inner">
          <h2 class="headline headline--small-plus t-center">热门问题</h2>
          <?php 
            $today = date('Ymd');
            //custom query
            $homepageQuestions = new WP_Query(array(
              'posts_per_page'=>3,
              'post_type'=>'question',
              'orderby'=>'meta_value_num',//用metavalue排序
              'meta_key'=>'view_count',//metavalue为view_count
              'order'=>'DESC',
              ),
            );
            while($homepageQuestions->have_posts()){
              $homepageQuestions->the_post();
              get_template_part('template-parts/content','question');
            } wp_reset_postdata();
          ?>

          <p class="t-center no-margin"><a target="_blank"  href="<?php echo get_post_type_archive_link('question');?>" class="btn btn--yellow">更多问题</a></p>
        </div>
      </div>

    </div>

<?php get_footer();?>
