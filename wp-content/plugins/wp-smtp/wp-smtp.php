<?php
if ( ! defined( 'ABSPATH' ) ) exit; // Exit if accessed directly

/**
 * Plugin Name: WP SMTP
 * Description: WP SMTP can help us to send emails via SMTP instead of the PHP mail() function and email logger built-in.
 * Version: 1.2.7
 * Author: WPOmnia
 * Author URI: https://www.wpomnia.com/
 * Text Domain: wp-smtp
 * Domain Path: /lang
 * License: GPLv3 or Later
 *
 * Copyright 2012-2022 Yehuda Hassine yehudahas@gmail.com
 * Copyright 2022-2022 WPChill heyyy@wpchill.com
 * Copyright 2023 WPOmnia contact@wpomnia.com
 *
 * This program is free software; you can redistribute it and/or modify
 * it under the terms of the GNU General Public License, version 3, as
 * published by the Free Software Foundation.
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU General Public License for more details.
 *
 * You should have received a copy of the GNU General Public License
 * along with this program; if not, write to the Free Software
 * Foundation, Inc., 51 Franklin St, Fifth Floor, Boston, MA  02110-1301  USA
 */

/*
 * The plugin was originally created by BoLiQuan
 */

define( 'WPSMTP__FILE__', __FILE__ );
define( 'WPSMTP_PLUGIN_BASE', plugin_basename( WPSMTP__FILE__ ) );
define( 'WPSMTP_PATH', plugin_dir_path( WPSMTP__FILE__ ) );
define( 'WPSMTP_URL', plugins_url( '/', WPSMTP__FILE__ ) );
define( 'WPSMTP_ASSETS_PATH', WPSMTP_PATH . 'assets/' );
define( 'WPSMTP_ASSETS_URL', WPSMTP_URL . 'assets/' );
define( 'WPSMTP_VERSION', '1.2.7' );

require_once __DIR__ . '/vendor/autoload.php';

class WP_SMTP {

	private $wsOptions;

	public function __construct() {

		// We setup the vars here also so we make sure that the functions that use them have access to them
		$this->setup_vars();
		$this->hooks();
		$this->check_credentials();
	}

	public function setup_vars(){
		$this->wsOptions = get_option( 'wp_smtp_options' );
	}

	public function hooks() {
		register_activation_hook( __FILE__ , array( $this,'wp_smtp_activate' ) );
		register_deactivation_hook( __FILE__, array( $this, 'wp_smtp_deactivate' ) );

		add_filter( 'plugin_action_links', array( $this, 'wp_smtp_settings_link' ), 10, 2 );
		add_action( 'init', array( $this,'load_textdomain' ) );
		add_action( 'phpmailer_init', array( $this,'wp_smtp' ) );
		add_action( 'admin_notices', array( $this, 'retype_credentials_notice' ) );
		add_action( 'wp_smtp_admin_update', array( $this, 'check_credentials' ) );
		add_action( 'wp_loaded', array( $this, 'wp_smtp_form_actions' ), 15 );
		add_action( 'wp_loaded', array( $this, 'setup_vars' ), 20 );
		add_action( 'wp_loaded', array( $this, 'load_admin_requirements'), 30 );

	}

	public function load_admin_requirements() {
		new WPSMTP\Admin();
		new WPSMTP\Process();
	}

	public function wp_smtp_activate(){
		$wsOptions = array();
		$wsOptions["from"] = "";
		$wsOptions["fromname"] = "";
		$wsOptions["host"] = "";
		$wsOptions["smtpsecure"] = "";
		$wsOptions["port"] = "";
		$wsOptions["smtpauth"] = "yes";
		$wsOptions["username"] = "";
		$wsOptions["password"] = "";
		$wsOptions["deactivate"] = "";

		add_option( 'wp_smtp_options', $wsOptions );

		\WPSMTP\Table::install();

	}

	public function wp_smtp_deactivate() {
		if( $this->wsOptions['deactivate'] == 'yes' ) {
			delete_option( 'wp_smtp_options' );
			delete_option( 'wp_smtp_encrypted' );
		}
	}

	public function load_textdomain() {
		load_plugin_textdomain( 'wp-smtp', false, dirname( plugin_basename( __FILE__ ) ) . '/lang' );
	}

	public function wp_smtp( $phpmailer ) {

		if( ! is_email($this->wsOptions["from"] ) || empty( $this->wsOptions["host"] ) ) {
			return;
		}

		$phpmailer->Mailer = "smtp";
		$phpmailer->From = $this->wsOptions["from"];
		$phpmailer->FromName = $this->wsOptions["fromname"];
		$phpmailer->Sender = $phpmailer->From;
		$phpmailer->AddReplyTo($phpmailer->From,$phpmailer->FromName);
		$phpmailer->Host = $this->wsOptions["host"];
		$phpmailer->SMTPSecure = $this->wsOptions["smtpsecure"];
		$phpmailer->Port = $this->wsOptions["port"];
		$phpmailer->SMTPAuth = ($this->wsOptions["smtpauth"]=="yes") ? TRUE : FALSE;

		if( $phpmailer->SMTPAuth ){
			$phpmailer->Username = base64_decode( $this->wsOptions["username"] );
			$phpmailer->Password = base64_decode( $this->wsOptions["password"] );
		}
	}

	public function wp_smtp_settings_link($action_links,$plugin_file) {
		if( $plugin_file == plugin_basename( __FILE__ ) ) {

			$ws_settings_link = '<a href="admin.php?page=wpsmtp_logs">' . __("Logs") . '</a>';
			array_unshift($action_links,$ws_settings_link);

			$ws_settings_link = '<a href="admin.php?page=' . dirname( plugin_basename(__FILE__) ) . '/wp-smtp.php">' . __("Settings") . '</a>';
			array_unshift($action_links,$ws_settings_link);
		}

		return $action_links;
	}

	/**
	 * Check for credentials
	 *
	 * @param array $options WP SMTP options
	 * 
	 * @return mixed
	 * @since 1.2.5
	 */
	public function check_credentials( $options = array(), $pass_ajax = false ) {

		if ( ! is_admin() || ( ! $pass_ajax && defined( 'DOING_AJAX' ) && DOING_AJAX ) ) {
			return;
		}

		$encription = get_option( 'wp_smtp_status' );

		// Connecting to host can be a resource heavy task, so we only do it if we need to.
		if ( 'encrypted' === $encription ) {
			return true;
		}

		// Connecting to host can be a resource heavy task, so we only do it if we need to.
		if ( 'not_encrypted' === $encription ) {
			add_action( 'admin_notices', array( $this, 'retype_credentials_notice' ) );
			add_action( 'wp_smtp_admin_notices', array( $this, 'retype_credentials_wp_smtp_notice' ) );

			return false;
		}

		if ( empty( $options ) ) {
			$options = get_option( 'wp_smtp_options' );
		}

		if ( ! isset( $options['username'] ) || ! isset( $options['password'] ) || ! isset( $options['host'] ) || ! isset( $options['port'] ) || ! isset( $options['smtpauth'] ) || ! isset( $options['smtpsecure'] ) || '' === $options['username'] || '' === $options['password'] || '' === $options['host'] || '' === $options['port'] || '' === $options['smtpauth'] ) {
			return false;
		}

		global $phpmailer;

		// (Re)create it, if it's gone missing.
		if ( ! ( $phpmailer instanceof PHPMailer\PHPMailer\PHPMailer ) ) {
			require_once ABSPATH . WPINC . '/PHPMailer/PHPMailer.php';
			require_once ABSPATH . WPINC . '/PHPMailer/SMTP.php';
			require_once ABSPATH . WPINC . '/PHPMailer/Exception.php';
			$phpmailer = new PHPMailer\PHPMailer\PHPMailer( true );
		}

		// Set the timeout to 15 seconds, so if it doesn't connect to not let the user in standby.
		$smtp                      = $phpmailer->getSMTPInstance();
		$smtp->Timeout             = 15;
		$smtp->Timelimit           = 15;
		$phpmailer->Timeout        = 15;
		$phpmailer->Timelimit      = 15;
		$phpmailer->Mailer         = "smtp";
		$phpmailer->Host           = $options['host'];
		$phpmailer->SMTPAuth       = 'yes' === $options['smtpauth']; // Ask it to use authenticate using the Username and Password properties
		$phpmailer->Port           = $options['port'];
		$phpmailer->SMTPKeepAlive  = false;

		if ( $phpmailer->SMTPAuth ) {
			$phpmailer->Username = base64_decode( $options['username'] );
			$phpmailer->Password = base64_decode( $options['password'] );
		}

		$phpmailer->SMTPSecure = $options['smtpsecure']; // preferable but optional

		try {
			if ( $phpmailer->smtpConnect() ) {
				update_option( 'wp_smtp_status', 'encrypted' );
				return true;
			} else {
				update_option( 'wp_smtp_status', 'not_encrypted' );
				return false;
			}
		} catch ( Exception $e ) {
			update_option( 'wp_smtp_status', 'not_encrypted' );
			return false;
		}
	}

	/**
	 * Add notice to retype credentials and info about the server
	 *
	 * @return void
	 * @since 1.2.5
	 */
	public function retype_credentials_notice() {

		$status = get_option( 'wp_smtp_status' );

		if ( ! $status || 'not_encrypted' !== $status) {
			return;
		}

		?>
		<div class="notice notice-error is-dismissible">
			<h3><?php echo esc_html__( 'WP SMTP connection error', 'wp-smtp' ); ?></h3>
			<p><?php echo esc_html__( 'Seems like there are some problems with the enterd information. Please re-check & re-enter it and hit the "Save changes" button.', 'wp-smtp' ); ?></p>
			<?php
			// This might be a problem introduced in version 1.2.4 of the plugin when we started to base64_encode the username and password. Let the user know
			if ( version_compare( '1.2.8', WPSMTP_VERSION, '>' ) ) {
				echo '<p>' . esc_html__( 'We recently made some changes regarding how we save the username and password in the database, namely we are encrypting them, so that might be the reason for the connection error. Re-entering and saving them should solve the issue.', 'wp-smtp' ) . '</p>';
			}
			?>
		</div>
		<?php
	}

	/**
	 * Save WP SMTP options
	 */
	public function wp_smtp_form_actions() {

		// Catch the SMTP settings
		if (isset($_POST['wp_smtp_update']) && isset($_POST['wp_smtp_nonce_update'])) {
			if (!wp_verify_nonce(trim($_POST['wp_smtp_nonce_update']), 'my_ws_nonce')) {
				wp_die('Security check not passed!');
			}

			if ( ! current_user_can( 'manage_options' ) ) {
				wp_die('Security check not passed!');
			}

			$this->wsOptions                 = array();
			$this->wsOptions["from"]         = sanitize_email( wp_unslash( trim( $_POST['wp_smtp_from'] ) ) );
			$this->wsOptions["fromname"]     = sanitize_text_field( trim( $_POST['wp_smtp_fromname'] ) );
			$this->wsOptions["host"]         = sanitize_text_field( wp_unslash( trim( $_POST['wp_smtp_host'] ) ) );
			$this->wsOptions["smtpsecure"]   = sanitize_text_field( wp_unslash( trim( $_POST['wp_smtp_smtpsecure'] ) ) );
			$this->wsOptions["port"]         = is_numeric( trim( $_POST['wp_smtp_port'] ) ) ? absint( trim( $_POST['wp_smtp_port'] ) ) : '';
			$this->wsOptions["smtpauth"]     = sanitize_text_field( wp_unslash( trim( $_POST['wp_smtp_smtpauth'] ) ) );
			$this->wsOptions["username"]     = base64_encode( defined( 'WP_SMTP_USER' ) ? WP_SMTP_USER : sanitize_text_field( wp_unslash( trim( $_POST['wp_smtp_username'] ) ) ) );
			$this->wsOptions["password"]     = base64_encode( defined( 'WP_SMTP_PASS' ) ? WP_SMTP_PASS : sanitize_text_field( trim( $_POST['wp_smtp_password'] ) ) );
			$this->wsOptions["deactivate"]   = ( isset($_POST['wp_smtp_deactivate'] ) ) ? sanitize_text_field( wp_unslash( trim( $_POST['wp_smtp_deactivate'] ) ) ) : '';
			$this->wsOptions["disable_logs"] = ( isset($_POST['wp_smtp_disable_logs'] ) ) ? sanitize_text_field( wp_unslash( trim( $_POST['wp_smtp_disable_logs'] ) ) ) : '';

			update_option("wp_smtp_options", $this->wsOptions);

			// Let's delete the status option, so that if the user hits the "Save changes" button, it will be re-checked.
			delete_option( 'wp_smtp_status' );
			do_action( 'wp_smtp_admin_update' );
		}
	}

}

new WP_SMTP();
?>
