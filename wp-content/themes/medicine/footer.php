
<footer class="site-footer">
      <div class="site-footer__inner container container--narrow">
        <div class="group">
          <div class="site-footer__col-two-three-group">
            <div class="site-footer__col-two">
              <h3 class="headline headline--small site-footer-nav-list">发现</h3  >
              <nav class="nav-list site-footer-nav-list">
                <ul>
                  <li><a target="_blank" href="<?php echo get_post_type_archive_link('notice');?>">须知文件</a></li>
                  <li><a target="_blank" href="<?php echo get_post_type_archive_link('policy');?>">政策文件</a></li>
                  <li><a target="_blank" href="<?php echo get_post_type_archive_link('question');?>">热门问题</a></li>
                  <li><a target="_blank" href="<?php echo site_url('/viewing-history');?>">浏览历史</a></li>
                </ul>
              </nav>
            </div>

            <div class="site-footer__col-three">
              <h3 class="headline headline--small site-footer-nav-list">相关链接</h3>
              <nav class="nav-list site-footer-nav-list">                
                <ul>
                  <li><a target="_blank" href="http://www.nhsa.gov.cn/">国家医保局</a></li>
                  <li><a target="_blank" href="https://ybj.beijing.gov.cn/">北京市医疗保障局</a></li>     
                  <li><a target="_blank" href="https://www.beijing.gov.cn/">首都之窗</a></li>
                  <li><a target="_blank" href="<?php echo get_template_directory_uri().'/images/westMedQRcode.jpg';?>">北京市西城区医疗保障局微信公众号</a></l>
                </ul>
              </nav>
            </div>
          </div> 
          <!--div class="site-footer__col-one">
            <img class="gongzhonghao-img" src="<?php //echo get_template_directory_uri().'/images/westMedQRcode.jpg';?>">
          </div-->
        </div>
      </div>
      <button class="backTop" id="backToTopBtn" title="回到顶部"><i class="gg-arrow-up-o"></i></button>
    </footer>

<?php wp_footer();?>
</body>
</html>