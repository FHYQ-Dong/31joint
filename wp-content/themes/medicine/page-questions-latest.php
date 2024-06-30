<?php 
get_header();
pageBanner(array(
  'title'=>'热门问题',
  'subtitle'=>'这里或许有你想要的答案？',
));
?>


<div class="container container--narrow page-section">

<ul class="link-list min-list">
    <p>排序方式:
      <button class="sort-question-default"><a href="<?php echo get_post_type_archive_link('question');?>">默认</a></button>
      <button class="sort-question-view-count"><a href="<?php echo home_url('/archive-question-latest');?>">最新</a></button>
      <?php 
        //登陆了的话就显示提示语句
        if(is_user_logged_in()){?>
      您的提问已标为<span style="background-color: rgb(242, 255, 61);">黄色</span>
        <?php }
      ?>
    </p>

        <div class="query-box">
          <?php
          $customQuestion = new WP_Query(array(        
            'posts_per_page'=>10,
            'post_type'=>'question',
            'paged' => get_query_var('paged') ? get_query_var('paged') : 1, // 添加分页参数  
            ),
          );?>     
        </div>
        <?php
        while($customQuestion->have_posts()){
          $customQuestion->the_post();?>
        <li data-id="<?php the_ID();?>">
          <a target="_blank" class="question-title" data-author="<?php echo esc_attr(get_the_author_meta('ID'));?>" href="<?php the_permalink();?>">
            <?php 
              echo preg_replace('/:.*$/','',get_the_title());
            ?>
          </a>
          <i class="gg-search"></i>
          <span data-count="<?php echo get_field('view_count');?>">
            <?php echo get_field('view_count')?>
          </span>
          <?php 
            if(is_user_logged_in()){
                if(wp_get_current_user()->roles[0]=='administrator'){?>
                    <button class="delete-note delete-question">删除</button>
                <?php }
            }
          ?>
        </li>
        <?php }

        // 计算总页面数    
        $total_pages = $customQuestion->max_num_pages;    
        // 获取当前页码    
        $current_page = max(1, get_query_var('paged'));    
        // 分页参数    
        $pagination_args = array(    
            'total' => $total_pages,    
            'current' => $current_page,    
            'show_all' => false,    
            // 如果需要添加额外的查询参数，可以使用 'add_args'  
        );    
        // 生成分页链接  
        $paginate_links = paginate_links($pagination_args);  
        ?>  

        <?php if ($paginate_links) { ?>  

        <nav class="navigation pagination" role="navigation">  

            <?php echo $paginate_links; ?>  

        </nav>  

        <?php } ?>  

        </div> <!-- .query-box -->  

</ul>

</div>

<?php get_footer();
?>