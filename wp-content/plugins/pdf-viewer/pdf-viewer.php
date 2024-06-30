<?php
/*
Plugin Name: PDF Viewer
Plugin URI: http://wordpress.org/plugins/pdf-viewer/
Description: HTML5-compliant PDF Viewer
Version: 1.1.0
Author: Envigeek Web Services
Author URI: http://www.envigeek.com/
Requires PHP: 7.0
Requires at least: 3.8

    This program is free software: you can redistribute it and/or modify
    it under the terms of the GNU General Public License as published by
    the Free Software Foundation, either version 3 of the License, or
    (at your option) any later version.

    This program is distributed in the hope that it will be useful,
    but WITHOUT ANY WARRANTY; without even the implied warranty of
    MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
    GNU General Public License for more details.

    You should have received a copy of the GNU General Public License
    along with this program.  If not, see <http://www.gnu.org/licenses/>.

*/
register_activation_hook( __FILE__, array( 'PDFviewer', 'activation' ) );

add_action( 'plugins_loaded', array( 'PDFviewer', 'init' ) );
 
class PDFviewer
{
	const VER = '1.1.0';

	protected $options;
	
	protected static $instance;
    public static function init()
    {
        is_null( self::$instance ) AND self::$instance = new self;
        return self::$instance;
    }
	
    public function __construct()
    {
		$this->properties();
		$this->textdomain();
		
		add_filter( 'plugin_action_links_'.plugin_basename(__FILE__) , array( $this, 'plugin_links' ) );
		add_filter( 'plugin_row_meta', array( $this, 'plugin_meta' ), 10, 2 );
		
		add_action( 'admin_menu', array( $this, 'settings_menu' ) );
        add_action( 'admin_init', array( $this, 'settings_init' ) );
		
		add_action( 'admin_print_footer_scripts', array( $this, 'add_quicktags' ) );
		add_shortcode( 'pdfviewer', array( $this, 'add_shortcode' ) );
    }
	
	/**
	 *	Load Class Values
	 */
	public function properties() {
		$this->options = get_option('pdfviewer_options');
	}
	
	/**
	 *	Load Plugin Textdomain
	 */
	public function textdomain() {
		load_plugin_textdomain( 'pdfviewer', false, dirname( plugin_basename( __FILE__ ) ) . '/lang/' ); 
	}
	
	/**
	 * Register Default Values upon Activation
	 */
	public static function activation() 
	{	
		if ( ! current_user_can( 'activate_plugins' ) )
            return;
        $plugin = isset( $_REQUEST['plugin'] ) ? $_REQUEST['plugin'] : '';
        check_admin_referer( "activate-plugin_{$plugin}" );
		
		$default_width = !empty($content_width) ? $content_width : '600';
		$default_height = ceil($default_width * 1.414);
		
		$default_options = array(
			'tx_width' => $default_width.'px',
			'tx_height' => $default_height.'px',
			'olderIE' => 9,
			'ta_notice' => '<p>It appears that your browser does not support our web PDF viewer. You can <a href="%%PDF_URL%%">download the PDF</a> to view the document.</p>',
		);
		// add_option already include self check if option already exists
		add_option('pdfviewer_version', self::VER);
		add_option('pdfviewer_options', $default_options);
    }
	
	/**
	 * Add links to Plugin list page
	 */
	public function plugin_links($links) {
		return array_merge(
			array('settings' => '<a href="'.site_url('/wp-admin/options-general.php?page=pdfviewer').'">Settings</a>'),
			$links
		);
	}
	public function plugin_meta( $links, $file ) {
		if ( $file == plugin_basename(__FILE__) ) {
			return array_merge(
				$links, array('<a href="http://wordpress.org/support/plugin/pdf-viewer">Plugin support forum</a>')
			);
		}
		return $links;
	}
	
		/**
     * Add settings menu and page
     */
    public function settings_menu()
    {
        $page = add_options_page(
            'PDF Viewer Settings', 
            'PDF Viewer', 
            'manage_options', 
            'pdfviewer', 
            array( $this, 'settings_page' )
        );
    }

    /**
     * Settings page callback
     */
    public function settings_page()
    {
        ?>
        <div class="wrap">
            <h2><?php _e('PDF Viewer Settings','pdfviewer') ?></h2>
            <form method="post" action="options.php" id="pdfviewer-settings">
            <?php
				settings_fields( 'pdfviewer_configure_settings' );   
				do_settings_sections( 'pdfviewer_configure_page' );
                submit_button(); 
            ?>
            </form>
			<table style="border:1px solid black">
				<tr><td>PDF.js</td><td>Version</td><td>Date</td></tr>
			<thead>
			</thead>
			<tbody>
				<tr><td>Stable</td><td>3.2.146</td><td>Jan 02, 2023</td></tr>
			</tbody>
			</table>
			<br/>
			<a class="button button-secondary" href="http://mozilla.github.io/pdf.js/features/" target="_blank">Test Browser for PDF.js</a>
        </div>
        <?php
    }
	
	/**
     * Register and add settings
     */
    public function settings_init()
    {   	
        register_setting(
            'pdfviewer_configure_settings',
            'pdfviewer_options',
            array( $this, 'sanitize' )
        );

        add_settings_section(
            'pdfviewer_configure_section', // ID
            'How to embed PDF Viewer', // Title
            array( $this, 'print_settings_section' ), // Callback
            'pdfviewer_configure_page' // Page
        );
		
		add_settings_field(
            'tx_width', 
            'Default Width', 
            array( $this, 'text_callback' ), 
            'pdfviewer_configure_page',
            'pdfviewer_configure_section',
			array( 'field' => 'tx_width', 'desc' => 'Viewer will use this width if not specified in the shortcode. Accept px or %.' )	
        );
		
		add_settings_field(
            'tx_height', 
            'Default Height', 
            array( $this, 'text_callback' ), 
            'pdfviewer_configure_page',
            'pdfviewer_configure_section',
			array( 'field' => 'tx_height', 'desc' => 'Viewer will use this height if not specified in the shortcode. Accept px or %.' )	
        );
		
		add_settings_field(
            'olderIE', // ID
            'Disable IE support', // Title 
            array( $this, 'number_callback' ), // Callback
            'pdfviewer_configure_page', // Page
            'pdfviewer_configure_section', // Section	
			array( 'field' => 'olderIE', 'desc' => 'Internet Explorer may work awkwardly with PDFjs. To avoid user disappointment, disable support for IE version lower than this number. Accept integer only.' )
        );
		
		add_settings_field(
            'ta_notice', // ID
            'Disabled Notice', // Title 
            array( $this, 'textarea_callback' ), // Callback
            'pdfviewer_configure_page', // Page
            'pdfviewer_configure_section', // Section	
			array( 'field' => 'ta_notice', 'desc' => 'Message to display for those using IE version lower than number specified above. Use %%PDF_URL%% to replace with document URL for downloading. HTML allowed.' )
        );
    }

    /**
     * Sanitize each setting field as needed
     *
     * @param array $input Contains all settings fields as array keys
     */
    public function sanitize( $input )
    {
        $new_input = array();
		$input_error = false;
		
		foreach ($input as $field => $value) {
			//only save new settings if not empty
			if ( empty($value) ) {
				$input_error = true;
				$new_input[$field] = $this->options[$field];
			} else {
				$exp = explode('_',$field);
				if ($exp[0] == 'ta') {
					$new_input[$field] = esc_textarea($value);
				} elseif ($exp[0] == 'tx') {
					$new_input[$field] = sanitize_text_field($value);
				} else {
					$new_input[$field] = absint($value);
				}
			}
		}
		
		if ($input_error) {
			add_settings_error(
				'pdfviewer_options',
				esc_attr( 'settings_updated' ),
				__('Any settings cannot be empty. Blank fields are reverted to previous values.'),
				'error'
			);
		}
		
        return $new_input;
    }

    /** 
     * Print the Section text
     */
    public function print_settings_section()
    {
		$width = $this->options['tx_width'];
		$height = $this->options['tx_height'];
		
		echo '<p>Use <code>[pdfviewer width="'.$width.'" height="'.$height.'"]http://full-url/document.pdf[/pdfviewer]</code> in post editor to embed the PDF Viewer.</p>';
    }
	
	/** 
     * Get the settings option array and print one of its values
     */
    public function checkbox_callback($args)
    {
		$field = $args['field'];
		$label = $args['label'];
		$checked = !empty($this->options[$field]) ? checked( 1, $this->options[$field], false ) : '';
        printf( '<input type="checkbox" id="pdfviewer_%1$s" name="pdfviewer_options[%1$s]" value="1" %2$s />',  $field, $checked );
		printf( '<label for="pdfviewer_%1$s"> %2$s</label>', $field, $label );
    }

    public function number_callback($args)
    {
		$field = $args['field'];
		$desc = $args['desc'];
        printf(
            '<input type="text" name="pdfviewer_options[%1$s]" class="small-text" value="%2$s" /><span class="description"> %3$s</span>',
            $field, isset( $this->options[$field] ) ? esc_attr($this->options[$field]) : '', $desc
        );
    }

    public function text_callback($args)
    {	
		$field = $args['field'];
		$desc = $args['desc'];
        printf(
            '<input type="text" name="pdfviewer_options[%1$s]" class="regular-text" value="%2$s" /><span class="description"> %3$s</span>',
            $field, isset( $this->options[$field] ) ? esc_attr($this->options[$field]) : '', $desc
        );
    }
	
	public function textarea_callback($args)
    {	
		$field = $args['field'];
		$desc = $args['desc'];
        printf(
            '<textarea name="pdfviewer_options[%1$s]" class="large-text" rows="3">%2$s</textarea><br><span class="description"> %3$s</span>',
            $field, isset( $this->options[$field] ) ? esc_attr($this->options[$field]) : '', $desc
        );
    }
	
	/**
	 * Add PDF Viewer Shortcode Button to Post Editor
	 */
	public function add_quicktags() {
		if ( wp_script_is('quicktags') ){
			$width = $this->options['tx_width'];
			$height = $this->options['tx_height'];
		?>
		<script type="text/javascript">
		QTags.addButton( 'pdfviewer', 'PDF Viewer', '[pdfviewer width="<?php echo $width; ?>" height="<?php echo $height; ?>"]', '[/pdfviewer]' );
		</script>
		<?php
		}
	}
	
	// Helper Function to check older IE
	private function older_ie($version) {
		global $is_IE;
		 
		// Return early, if not IE
		if ( ! $is_IE ) return false;
		 
		// Include the file, if needed
		if ( ! function_exists( 'wp_check_browser_version' ) )
			include_once( ABSPATH . 'wp-admin/includes/dashboard.php' );
		 
		// IE version conditional enqueue
		$response = wp_check_browser_version();
		if ( 0 > version_compare( intval( $response['version'] ) , $version ) )
			return true;
	}
	
	/*
	 * Add [pdfviewer] shortcode
	 */
	public function add_shortcode( $atts, $content = "" ) {
		$content = esc_url($content);
		if ( !empty($content) && filter_var($content, FILTER_VALIDATE_URL) ) {

			//TODO: filter URL to check if PDF only
			
			if ( $this->older_ie($this->options['olderIE']) ) {
				
				$notice = str_replace('%%PDF_URL%%', $content, $this->options['ta_notice']);
				echo html_entity_decode($notice);
				
			} else {
				
				$atts = shortcode_atts(
					array(
						'width' => $this->options['tx_width'],
						'height' => $this->options['tx_height']
					), 
					$atts,
					'pdfviewer' 
				);
				
				$pdfjs_url = plugin_dir_url( __FILE__ ).'stable/web/viewer.html?file='.$content;
				
				$pdfjs_iframe = '<iframe class="pdfjs-viewer" width="'.esc_attr($atts['width']).'" height="'.esc_attr($atts['height']).'" src="'.$pdfjs_url.'"></iframe> ';
				
				return $pdfjs_iframe;
			}
		} else {
			return 'Invalid URL for PDF Viewer';
		}
	}

}
?>