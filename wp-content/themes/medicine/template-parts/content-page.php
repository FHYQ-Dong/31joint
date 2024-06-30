<div class="post-item">
    <h2>
        <a class="headline headline--medium headline--post-title" href="<?php the_permalink();?>"><?php the_title();?></a>
    </h2>
    <div class="generic-content">
        <?php the_excerpt();?>
        <p><a class="btn btn--blue" href="<?php the_permalink();?>">Continue reading &raquo;</a></p>
    </div>

</div>