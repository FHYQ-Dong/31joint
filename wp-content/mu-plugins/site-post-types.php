<?php
//添加自定义post类型
function site_post_types(){
    //问题
    register_post_type('question',array(
        'capability_type'=>'question',
        'map_meta_cap'=>true,
        'show_in_rest'=>true,
        'supports'=>array('title','editor'),
        'has_archive'=>true,
        'rewrite'=>array(
            'slug'=>'Questions',
        ),
        'public'=>true,
        'labels'=>array(
            'name'=>'Questions',
            'add_new_item'=>'Add New Questions',
            'edit_item'=>'Edit Questions',
            'all_item'=>'all Questions',
            'singular_name'=>'question',

        ),
        'menu_icon'=>'dashicons-info',
    ));
    //政策
    register_post_type('policy',array(
        'capability_type'=>'policy',
        'map_meta_cap'=>true,
        'show_in_rest'=>true,
        'supports'=>array('title','editor','excerpt'),
        'has_archive'=>true,
        'rewrite'=>array(
            'slug'=>'Policies',
        ),
        'public'=>true,
        'labels'=>array(
            'name'=>'Policies',
            'add_new_item'=>'Add New Policies',
            'edit_item'=>'Edit Policies',
            'all_item'=>'all Policies',
            'singular_name'=>'policy',

        ),
        'menu_icon'=>'dashicons-book',
    ));
    //须知
    register_post_type('notice',array(
        'capability_type'=>'notice',
        'map_meta_cap'=>true,
        'show_in_rest'=>true,
        'supports'=>array('title','editor','excerpt'),
        'has_archive'=>true,
        'rewrite'=>array(
            'slug'=>'Notices',
        ),
        'public'=>true,
        'labels'=>array(
            'name'=>'Notices',
            'add_new_item'=>'Add New Notices',
            'edit_item'=>'Edit Notices',
            'all_item'=>'all Notices',
            'singular_name'=>'notice',

        ),
        'menu_icon'=>'dashicons-warning',
    ));
}
//在wordpress初始化时就调用函数
add_action('init','site_post_types');
?>