<?php
//if uninstall not called from WordPress exit
if ( !defined( 'WP_UNINSTALL_PLUGIN' ) ) 
    exit();
		
/**
 * Remove Options upon Uninstall
 */
delete_option('pdfviewer_options');
?>