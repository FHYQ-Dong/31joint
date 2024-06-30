<?php 
get_header();
pageBanner(array(
  'title'=>'浏览历史',
  'subtitle'=>'来考古了？',
));
?>


<div class="container container--narrow page-section">

<?php 
    display_user_page_views();

?>

</div>

<?php get_footer();
?>