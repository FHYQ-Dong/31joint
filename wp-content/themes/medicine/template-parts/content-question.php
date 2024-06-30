<div class="event-summary">
    <div class="event-summary__content">
        <span class="event-summary__title headline headline--tiny">
            <a target="_blank" href="<?php the_permalink();?>">
                <?php 
                    //不显示id部分
                    echo preg_replace('/:.*$/','',get_the_title());
                ?>
            </a>
            <span class="question-view-count">
                <i class="gg-search"></i>
                <span data-count="<?php get_field('view_count');?>"><?php echo get_field('view_count')?></span>
            </span>
        </span>
        
    </div>
</div>