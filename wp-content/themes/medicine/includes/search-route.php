<?php 
//自定义rest_api
add_action('rest_api_init','univRegisterSearch');
function univRegisterSearch(){
    //搜索路径
    //http://localhost/wp1/wp-json/univ/v1/search?term=
    register_rest_route('univ/v1','search',array(
        'methods'=>WP_REST_SERVER::READABLE,
        //callback:返回函数
        'callback'=>'univSearchResults',
    ));
}
//$data搜素内容，'term'为?term用于标识data
function univSearchResults($data){
    $search_term = sanitize_text_field($data['term']);
    $combined_results = array(
        'policies' => array(),
        'questions' => array(),
        'notices' => array(),
    );
    // 如果搜索词不在替换列表中，则直接按原搜索词进行搜索
    $main_query = new WP_Query(array(
        'post_type' => array('policy', 'question', 'notice'),
        's' => $search_term,
        'filter_search' => true, // 启用自定义搜索过滤器  
        'search_columns' => array('post_title', 'post_content', 'post_excerpt'), // 搜索的列  
    ));
    // 循环处理搜索结果
    while ($main_query->have_posts()) {
        $main_query->the_post();
        $post_type = get_post_type();
        $result_item = array(
            'title' => get_the_title(),
            'permalink' => get_the_permalink(),
            'id'=>get_the_ID(),//用来搜索时的查重
        );
        // 根据文章类型将结果添加到相应的数组中
        if ($post_type == 'policy') {
            $combined_results['policies'][] = $result_item;
        } elseif ($post_type == 'notice') {
            $combined_results['notices'][] = $result_item;
        } elseif ($post_type == 'question') {
            $combined_results['questions'][] = $result_item;
        }
    }
    // 重置 WP_Query
    wp_reset_postdata();
    // 返回搜索结果数组
    return $combined_results;
}




?>