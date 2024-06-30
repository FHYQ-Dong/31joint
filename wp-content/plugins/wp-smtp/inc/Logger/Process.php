<?php

namespace WPSMTP;

use WP_Error;

class Process {

	private $mail_id;
	private $wsOptions;

	public function __construct() {
		global $wpdb;

		$this->wsOptions = get_option( 'wp_smtp_options' );

		if ( ! isset( $this->wsOptions['disable_logs'] ) || 'yes' !== $this->wsOptions['disable_logs'] ) {
			add_filter( 'wp_mail', array( $this, 'log_mails' ), PHP_INT_MAX );
		}

		add_action( 'wp_mail_failed', array( $this, 'update_failed_status' ), PHP_INT_MAX );

	}

	public function log_mails( $parts ) {

		global $wpdb;

		$data = $parts;

		unset( $data['attachments'] );

		$this->mail_id = Db::get_instance()->insert( $data );

		return $parts;
	}

	/**
	 * @param WP_Error $wp_error
	 */
	public function update_failed_status( $wp_error ) {

		Admin::$phpmailer_error = $wp_error;

		if ( ! isset( $this->wsOptions['disable_logs'] ) || 'yes' !== $this->wsOptions['disable_logs'] ) {

			global $wpdb;
			$data = $wp_error->get_error_data('wp_mail_failed' );

			unset( $data['phpmailer_exception_code'] );
			unset( $data['attachments'] );

			$data['error'] = $wp_error->get_error_message();

			if ( ! is_numeric( $this->mail_id ) ) {
				Db::get_instance()->insert( $data );
			} else {
				Db::get_instance()->update( $data, array( 'mail_id' => $this->mail_id ) );
			}
		}
	}
}