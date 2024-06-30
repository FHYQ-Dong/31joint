<?php
/*
Plugin Name: User Viewed Posts
Description: Track and display recently viewed posts by logged-in users.
Version: 1.0
Author: Xsk
*/

//添加不需要记录浏览记录的页面
function checkPageId() {
    //浏览历史页面、主页、bug可能是id为0的页面？
    $noRecordPage = array(2095,43,0);
    $page_id = get_the_ID(); // 获取当前页面的ID
    foreach ($noRecordPage as $Id) {
        if ($page_id == $Id) {
            return true; // 如果找到匹配的页面ID，返回 true
        }
    }
    return false; // 如果没有匹配的页面ID，返回 false
}

// 记录页面浏览记录，如果已存在相同记录则更新
function record_page_view() {
    //不是page/archive
    if (is_user_logged_in()&&!checkPageId()&&!is_archive()&&!is_page()) {
        $user_id = get_current_user_id();
        $page_id = get_the_ID(); // 获取当前页面的ID

        global $wpdb;
        $table_name = $wpdb->prefix . 'user_page_views';

        // 检查是否已存在相同的浏览记录
        $existing_record = $wpdb->get_row(
            $wpdb->prepare(
                "SELECT * FROM $table_name WHERE user_id = %d AND page_id = %d",
                $user_id,
                $page_id
            )
        );
        if ($existing_record) {
            // 如果已存在记录，则更新现有记录的时间
            $wpdb->update(
                $table_name,
                array('view_time' => current_time('mysql')),
                array('id' => $existing_record->id)
            );
        } else {
            // 否则插入新的浏览记录
            $wpdb->insert(
                $table_name,
                array(
                    'user_id' => $user_id,
                    'page_id' => $page_id,
                    'view_time' => current_time('mysql'),
                )
            );
        }
    }
}
add_action('wp', 'record_page_view');


// 显示用户的浏览记录
function display_user_page_views() {
    if (is_user_logged_in()) {
        $user_id = get_current_user_id();
        global $wpdb;
        $table_name = $wpdb->prefix . 'user_page_views';

        // 查询用户的浏览记录
        $results = $wpdb->get_results(
            $wpdb->prepare(
                "SELECT * FROM $table_name WHERE user_id = %d ORDER BY view_time DESC",
                $user_id
            )
        );
        // 浏览记录页面显示
        if ($results) {
            echo '<ul>';
            foreach ($results as $result) {
                //只要文字部分的标题（去掉id部分）
                $clear_title= preg_replace('/:.*$/','',get_the_title($result->page_id));
                echo '<li data-page_id='.$result->page_id.'><a target="_blank" href="'.get_the_permalink($result->page_id).'">' . $clear_title . ' - ' . $result->view_time . '</a>';
                if(is_user_logged_in()){
                    if(wp_get_current_user()->roles[0]=='administrator'||1){?>
                        <button class="delete-viewing-history"><i class="gg-trash icon-delete-viewing-history"></i></button>
                    <?php }
                }
                echo '</li>';

            }
            echo '</ul>';
        } else {
            echo '没有浏览记录。';
        }
    } else {
        echo '请先登录以查看浏览记录。';
    }
}
add_shortcode('user_page_views', 'display_user_page_views');

// 用户删除自己的浏览历史
add_action('wp_ajax_delete_viewing_history', 'deleteViewingHistory');
function deleteViewingHistory() {
    global $wpdb;
    // 获取当前用户和页面ID
    $user_id = $_POST['user_id'];
    $page_id = $_POST['page_id'];
    // 构建数据库表名
    $table_name = $wpdb->prefix . 'user_page_views';
    // 执行删除操作
    $wpdb->delete(
        $table_name,
        array(
            'user_id' => $user_id,
            'page_id' => $page_id
        )
    );
    // 返回成功或失败信息（可选）
    wp_send_json_success();
    wp_die();
}

?>