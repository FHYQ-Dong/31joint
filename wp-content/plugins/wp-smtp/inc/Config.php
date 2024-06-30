<?php
namespace WPSMTP;

class Config {

	public static function get_setup() {
		return array(
			'gmail' => array(
				'host' => 'smtp.gmail.com',
				'security' => array(
					'ssl' => 465,
					'tls' => 587,
				),
			),
			'sendgrid' => array(
				'host' => 'smtp.sendgrid.net',
				'security' => array(
					'ssl' => 465,
					'tls' => 587,
				),
				'username' => 'api'
			),
			'mailgun' => array(
				'host' => 'smtp.mailgun.org',
				'security' => array(
					'ssl' => 465,
					'tls' => 587,
				),
			),
			'sendinblue' => array(
				'host' => 'smtp-relay.sendinblue.com',
				'security' => array(
					'tls' => 587,
				),
			)
		);
	}

}
