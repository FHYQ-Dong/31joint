<?php
require get_theme_file_path('/includes/search-route.php');
//添加搜索字段
function univ_custom_rest(){
    register_rest_field('post','authorName',array(
        'get_callback'=>function(){return get_the_author();},
    ));
}

add_action('rest_api_init','univ_custom_rest');

function univ_file(){
    //是script！不是style
    //wp_enqueue_script("google-map",'//maps.googleapis.com/maps/api/js?key=AIzaSyB_0XGStEyDdFHqkytdUV_lTJ15kKhk0Cc',null,"1.0",true);
    wp_enqueue_script("univ_main-js",get_theme_file_uri('/build/index.js'),array('jquery'),"1.0",true);
    //wp_enqueue_style("custome-google-font",'https://fonts.googleapis.com/css?family=Roboto+Condensed:300,300i,400,400i,700,700i|Roboto:100,300,400,400i,700,700i');
    //wp_enqueue_style("font-awesome",'https://maxcdn.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css');
    //CSS.gg国内可用
    wp_enqueue_style('gg_icon','https://cdn.jsdelivr.net/npm/css.gg/icons/icons.css');
    wp_enqueue_style("univ_main_style",get_theme_file_uri('/build/style-index.css'));
    wp_enqueue_style("univ_extra_style",get_theme_file_uri('/build/index.css'));
    //policy
    $exist_policy = new WP_Query(array(
        'posts_per_page'=>-1,
        'post_type'=>'policy',

    ));
    $policy_titles=[];
    while($exist_policy->have_posts()){
        $exist_policy->the_post();
        //push(前面是原数组，后面是添加的元素)
        array_push($policy_titles,get_the_title());
    
    } wp_reset_postdata();
    //notice
    $exist_notice = new WP_Query(array(
        'posts_per_page'=>-1,
        'post_type'=>'notice',

    ));
    $notice_titles=[];
    while($exist_notice->have_posts()){
        $exist_notice->the_post();
        //push(前面是原数组，后面是添加的元素)
        array_push($notice_titles,get_the_title());
    
    } wp_reset_postdata();

    //将univ_data数组传到js文件中去使用
    wp_localize_script('univ_main-js','univ_data',array(
        'root_url'=>get_site_url(),
        'nonce'=>wp_create_nonce('wp_rest'),
        'policies'=>$policy_titles,
        'notices'=>$notice_titles,
        'ajaxurl' => admin_url('admin-ajax.php'),
        'current_user'=>get_current_user_id(),
    ));
}    
//wp内置函数用于调用函数
add_action("wp_enqueue_scripts",'univ_file');
function univ_features(){
    //register_nav_menu("headerMenuLocation","Hearder Menu Location");
    register_nav_menu("footerLocation1","Footer Location One");
    register_nav_menu("footerLocation2","Footer Location two");
    add_theme_support('title-tag');
    add_theme_support('post-thumbnails');
    add_image_size('professorLandscape',400,260,true);//增加上传照片的存储尺寸
    add_image_size('professorPortrait',480,650,true);
    add_image_size('pageBanner',1500,350,true);

}
add_action('after_setup_theme','univ_features');

//edit default query
function univ_ajust_queries($query){
    //地图显示所有项目
    if(!is_admin()&&is_post_type_archive('campus')&&is_main_query()){
        $query->set('posts_per_page',-1);
    }
    
    
    if(!is_admin()&&is_post_type_archive('program')&&is_main_query()){
        $query->set('orderby',"title");
        $query->set('order','ASC');
        $query->set('posts_per_page',-1);
    }


    if(!is_admin() && is_post_type_archive('event') && $query->is_main_query()){
        $today = date('Ymd');
        //$query->set('posts_per_page','1');
        $query->set('meta_key','event_date');
        $query->set('orderby','meta_value_num');
        $query->set('order','ASC');
        $query->set('meta_query',array(
            array(
            'key'=>'event_date',//比较量
            'compare'=>'>=',//比较符号
            'value'=>$today,//右值
            'type'=>'numeric',//比较类型
            ),
        ));
    }
}
//页面背景照片函数
function pageBanner($args=array(
    'title'=>NULL,
    'subtitle'=>NULL,
    'photo'=>NULL,
)){
    //直接用isset判断数组中的键值存不存在，!取反
    if(!isset($args['title'])){
        //令标题中的id部分不显示
        $args['title']=preg_replace('/:.*$/','',get_the_title());
    }
    if(!isset($args['subtitle'])){
        $args['subtitle']=get_field('page_banner_subtitle');
    }
    if(!isset($args['photo'])){
        if(get_field('page_banner_background_image')){
            $args['photo']=get_field('page_banner_background_image')['sizes']['pageBanner'];
        }
        else{
            $args['photo']=get_theme_file_uri('/images/index_bg.jpg');
        }
}
    ?>
    <div class="page-banner">
        <div class="page-banner__bg-image" style="background-image: url(<?php 
        //$pageBannerImage = get_field('page_banner_background_image'); 
        echo $args['photo'];//$pageBannerImage['sizes']['pageBanner'];?>)"></div>
        <div class="page-banner__content container container--narrow">
            <h1 class="page-banner__title"><?php echo $args['title'];//print_r($pageBannerImage);?></h1>
            <div class="page-banner__intro">
            <p><?php echo $args['subtitle'];?></p>
            </div>
        </div>
    </div>
<?php }

add_action('pre_get_posts','univ_ajust_queries');

function univMapKey($api){
    $api['key']='AIzaSyB_0XGStEyDdFHqkytdUV_lTJ15kKhk0Cc';
    return $api;
}

add_filter('acf/fields/google_map/api','univMapKey');


// 添加动作钩子，当用户登录时调用 redirectToHomePage 函数
add_action('wp_login', 'redirectToHomePage');
// 定义函数，用于在用户登录时重定向到首页
function redirectToHomePage() {
    // 获取登录后要重定向的地址，这里设置为网站首页
    $redirect_url = home_url();
    // 使用 wp_redirect 函数将用户重定向到首页
    wp_redirect($redirect_url);
    // 立即终止脚本执行
    exit;
}

//add_action('admin_init','redirectSubscribe');
//注册、登录后导航
//这个函数不能设为用户角色，不然无法update？？？
/*function redirectSubscribe(){
    $cur_usr=wp_get_current_user();
    if(count($cur_usr->roles)==1 && $cur_usr->roles[0]=='subscriber'){
        wp_redirect(home_url());
        exit;
        
    }
}*/

add_action('wp_loaded','noSubsAdmin');
//注册、登录后无管理员导航条
function noSubsAdmin(){
    $cur_usr=wp_get_current_user();
    if(count($cur_usr->roles)==1 && $cur_usr->roles[0]=='subscriber'){
        show_admin_bar(false);
    }
}

//设置登录页面
add_filter('login_headerurl','loginHeaderUrl');
function  loginHeaderUrl(){
    return esc_url(site_url('/'));

}
add_action('login_enqueue_scripts','loginCSS');
function loginCSS(){
    wp_enqueue_style("univ_main_style",get_theme_file_uri('/build/style-index.css'));
    wp_enqueue_style("univ_extra_style",get_theme_file_uri('/build/index.css'));
    //wp_enqueue_style("custome-google-font",'https://fonts.googleapis.com/css?family=Roboto+Condensed:300,300i,400,400i,700,700i|Roboto:100,300,400,400i,700,700i');
}
add_filter('login_headertitle','loginTitle');
function loginTitle(){
    return '三医联动指南';
}

//政策上传
function upload_new_policies() {  
    if(isset($_FILES['upload-policy']) && is_array($_FILES['upload-policy']['name']) 
    && count($_FILES['upload-policy']['name']) > 0){    
        if (!function_exists('wp_handle_upload')) {    
            require_once(ABSPATH . 'wp-admin/includes/file.php');    
        }    
        $upload_dir = wp_upload_dir(date('Y') . '/' . date('m'));    
        $upload_path = $upload_dir['path'];    
        foreach ($_FILES['upload-policy']['name'] as $key => $file_name) {    
            $file_extension = pathinfo($file_name, PATHINFO_EXTENSION);   
            $filenameOnly = preg_replace('/\s+/', '-', pathinfo($file_name, PATHINFO_FILENAME));                     
            $file_test_name = $filenameOnly . '.' . $file_extension;     
            $file_test_name=str_replace(array("(",")"),'',$file_test_name);
            if(!file_exists($upload_path . '/' . $file_test_name)){  
                $uploadedfile = array(    
                    'name'     => $_FILES['upload-policy']['name'][$key],  
                    'type'     => $_FILES['upload-policy']['type'][$key],  
                    'tmp_name' => $_FILES['upload-policy']['tmp_name'][$key],  
                    'error'    => $_FILES['upload-policy']['error'][$key],  
                    'size'     => $_FILES['upload-policy']['size'][$key]  
                );    
                wp_handle_upload($uploadedfile, array('test_form' => false));    
           }
        }       
    }  
}



//初始化问题浏览次数
add_action('wp_ajax_initiate_view_count', 'view_count_initiation');
function view_count_initiation(){
    update_post_meta($_POST['question_id'],'view_count',0);                     
}



//删除政策文件
//ajax请求牛逼！！！
add_action('wp_ajax_delete_file', 'delete_policy_file');
function delete_policy_file() {  
    $file_path = $_POST['file_path']; // 获取传递的文件路径  
    $file_path = ABSPATH . $file_path; // 确保路径是绝对路径  
    // 安全检查和其他逻辑...  
    if (file_exists($file_path) && is_writable($file_path)) {  
        if (unlink($file_path)) {  
            wp_send_json_success('文件已成功删除！');  
        } else {  
            wp_send_json_error('无法删除文件。');  
        }  
    } else {  
        wp_send_json_error('文件不存在或不可写。');  
    }  
    wp_die(); // 终止请求  
}  

//删除须知文件
add_action('wp_ajax_delete_notice', 'delete_notice_file');
function delete_notice_file() {  
    $file_path = $_POST['file_path']; // 获取传递的文件路径  
    $file_path = ABSPATH . $file_path; // 确保路径是绝对路径  
    // 安全检查和其他逻辑...  
    if (file_exists($file_path) && is_writable($file_path)) {  
        if (unlink($file_path)) {  
            wp_send_json_success('文件已成功删除！');  
        } else {  
            wp_send_json_error('无法删除文件。');  
        }  
    } else {  
        wp_send_json_error('文件不存在或不可写。');  
    }  
    wp_die(); // 终止请求  
}  

function upload_new_notices() {  
    if(isset($_FILES['upload-notice']) && is_array($_FILES['upload-notice']['name']) && count($_FILES['upload-notice']['name']) > 0){    
        if (!function_exists('wp_handle_upload')) {    
            require_once(ABSPATH . 'wp-admin/includes/file.php');    
        }    
        $upload_dir = wp_upload_dir(date('Y') . '/' . date('m'));    
        $upload_path = $upload_dir['path'];    
        foreach ($_FILES['upload-notice']['name'] as $key => $file_name) {    
            $file_extension = pathinfo($file_name, PATHINFO_EXTENSION);   
            $filenameOnly = preg_replace('/\s+/', '-', pathinfo($file_name, PATHINFO_FILENAME));                     
            $file_test_name = $filenameOnly . '.' . $file_extension;     
            $file_test_name=str_replace(array("(",")"),'',$file_test_name);
            if(!file_exists($upload_path . '/' . $file_test_name)){  
                $uploadedfile = array(    
                    'name'     => $_FILES['upload-notice']['name'][$key],  
                    'type'     => $_FILES['upload-notice']['type'][$key],  
                    'tmp_name' => $_FILES['upload-notice']['tmp_name'][$key],  
                    'error'    => $_FILES['upload-notice']['error'][$key],  
                    'size'     => $_FILES['upload-notice']['size'][$key]  
                );    
                wp_handle_upload($uploadedfile, array('test_form' => false));    
            }
        }
    }  
}

//初始化须知类型
add_action('wp_ajax_initiate_notice_type', 'notice_type_initiation');
function notice_type_initiation(){
    update_post_meta($_POST['notice_id'],'notice_type',$_POST['notice_type']);  
    update_post_meta($_POST['notice_id'],'got_content',0);                     
}

//初始化问题的格式
add_action('wp_ajax_update_question_style','updateQuestionStyle');
function updateQuestionStyle(){
    // 检查用户是否有权限编辑帖子  
    if ( ! current_user_can( 'edit_posts' ) ) {  
        wp_send_json_error( '你没有权限编辑帖子' );  
    }  
    // 获取POST数据  
    $post_id = isset( $_POST['post_id'] ) ? absint( $_POST['post_id'] ) : 0;  
    // 检查帖子ID是否有效  
    if ( empty( $post_id ) ) {  
        wp_send_json_error( '无效的帖子ID' );  
    }  
    $my_post = array(  
        'ID'         => $post_id,  
    );  
    // 使用wp_update_post函数更新帖子  
    $post_id = wp_update_post( $my_post ); 
    // 检查是否更新成功  
    if ( ! is_wp_error( $post_id ) ) {  
        wp_send_json_success( '帖子已更新' );  
    } else {  
        wp_send_json_error( $post_id->get_error_message() );  
    }  
}

// 开始会话
add_action('init', 'start_session', 1);
function start_session() {
    if (!session_id()) {
        session_start();
    }
}

function get_file_content($post_title,$upload_year,$upload_month,$suffix) {
    $file_url = ABSPATH.'wp-content/uploads/'.$upload_year.'/'.$upload_month.'/'.$post_title.'.'.$suffix;
    //echo $file_url;
    $docx = new ZipArchive;
    if ($docx->open($file_url) === TRUE) {
        // 读取文档内容
        $content = $docx->getFromName('word/document.xml');
        $docx->close();
        // 提取文本内容
        $xml = new SimpleXMLElement($content);
        $texts = $xml->xpath('//w:t'); // 获取所有文本节点
        $docx_content = '';
        foreach ($texts as $text) {
            $docx_content .= (string) $text . ' ';
        }
        // 显示文档内容
        return $docx_content;
    }else{
        return 'false';
    }
}
//更新已发布post的内容
function update_posts_content($post_title,$post_id,$upload_year,$upload_month,$suffix){
    $post_content = get_file_content($post_title,$upload_year,$upload_month,$suffix);
    $post_data = array(
        'ID'           => $post_id,
        'post_content' => $post_content,
    );
    wp_update_post($post_data); 
}

add_action('wp_ajax_getTextForUpdate','get_post_text_for_update');
function get_post_text_for_update(){
    $post_id = $_POST['post_id'];
    $post_content = $_POST['file_text'];
    $post_data = array(
        'ID'           => $post_id,
        'post_content' => $post_content,
    );
    wp_update_post($post_data);  
}

//初始化政策是否已获取内容的flag
add_action('wp_ajax_initiate_policy', 'got_content_initiation');
function got_content_initiation(){
    update_post_meta($_POST['policy_id'],'got_content',0);                     
}
//获取政策文件内容后取消flag
add_action('wp_ajax_already_got_content_post', 'alreadyGotContentPost');
function alreadyGotContentPost(){
    update_post_meta($_POST['post_id'],'got_content',1);                     
}

