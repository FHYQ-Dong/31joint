<?php
if ( ! defined( 'ABSPATH' ) ) {
	exit; // Exit if accessed directly
}

$ws_nonce = wp_create_nonce( 'my_ws_nonce' );

// Catch the test form
if ( isset( $_POST['wp_smtp_test'] ) && isset( $_POST['wp_smtp_nonce_test'] ) ) {

	if ( ! wp_verify_nonce( trim( $_POST['wp_smtp_nonce_test'] ), 'my_ws_nonce' ) ) {
		wp_die( 'Security check not passed!' );
	}

	$to      = sanitize_email( wp_unslash( trim( $_POST['wp_smtp_to'] ) ) );
	$subject = sanitize_text_field( trim( $_POST['wp_smtp_subject'] ) );
	$message = sanitize_textarea_field( trim( $_POST['wp_smtp_message'] ) );
	$status  = false;
	$class   = 'error';

	if ( ! empty( $to ) && is_email( $to ) && ! empty( $subject ) && ! empty( $message ) ) {
		try {
			$result = wp_mail( $to, $subject, $message );
		} catch ( Exception $e ) {
			$status = $e->getMessage();
		}
	} else {
		$status = __( 'Some of the test fields are empty or an invalid email supplied', 'wp-smtp' );
	}

	if ( ! $status ) {
		if ( $result === true ) {
			$status = __( 'Message sent!', 'wp-smtp' );
			$class  = 'success';
		} else {
			$status = \WPSMTP\Admin::$phpmailer_error->get_error_message();
		}
	}

	echo '<div id="message" class="notice notice-' . esc_attr( $class ) . ' is-dismissible"><p><strong>' . wp_kses_post( $status ) . '</strong></p></div>';
}
?>
<div class="wrap">

	<h1>
		WP SMTP
	</h1>
	<?php
	 // Let's output some info so the user knows what's going on.
	if ( isset( $_POST['wp_smtp_update'] ) && isset( $_POST['wp_smtp_nonce_update'] ) ) {

		if ( ! is_email( $this->wsOptions['from'] ) ) {
			echo '<div id="message" class="updated fade"><p><strong>' . esc_html__( 'The field "From" must be a valid email address!', 'WP-SMTP' ) . '</strong></p></div>';
		} elseif ( empty( $this->wsOptions['host'] ) ) {
					echo '<div id="message" class="updated fade"><p><strong>' . esc_html__( 'The field "SMTP Host" can not be left blank!', 'WP-SMTP' ) . '</strong></p></div>';
		} else {
			echo '<div id="message" class="updated fade"><p><strong>' . esc_html__( 'Options saved.', 'WP-SMTP' ) . '</strong></p></div>';
		}
	}

	?>

	<form action="" method="post" enctype="multipart/form-data" name="wp_smtp_form">

		<table class="form-table">
			<tr valign="top">
				<th scope="row">
					<?php esc_html_e( 'From', 'wp-smtp' ); ?>
				</th>
				<td>
					<label>
						<input type="email" name="wp_smtp_from" value="<?php echo esc_attr( $this->wsOptions['from'] ); ?>" size="43"
							   style="width:272px;height:24px;" required/>
					</label>
				</td>
			</tr>
			<tr valign="top">
				<th scope="row">
					<?php esc_html_e( 'From Name', 'wp-smtp' ); ?>
				</th>
				<td>
					<label>
						<input type="text" name="wp_smtp_fromname" value="<?php echo esc_attr( $this->wsOptions['fromname'] ); ?>"
							   size="43" style="width:272px;height:24px;" required />
					</label>
				</td>
			</tr>
			<tr valign="top">
				<th scope="row">
					<?php esc_html_e( 'SMTP Host', 'wp-smtp' ); ?>
				</th>
				<td>
					<label>
						<input type="text" name="wp_smtp_host" value="<?php echo esc_attr( $this->wsOptions['host'] ); ?>" size="43"
							   style="width:272px;height:24px;" required />
					</label>
				</td>
			</tr>
			<tr valign="top">
				<th scope="row">
					<?php esc_html_e( 'SMTP Secure', 'wp-smtp' ); ?>
				</th>
				<td>
					<label>
						<input name="wp_smtp_smtpsecure" type="radio"
							   value=""
							   <?php
								if ( $this->wsOptions['smtpsecure'] == '' ) {
									?>
									 checked="checked"<?php } ?> />
						None
					</label>
					&nbsp;
					<label>
						<input name="wp_smtp_smtpsecure" type="radio"
							   value="ssl"
							   <?php
								if ( $this->wsOptions['smtpsecure'] == 'ssl' ) {
									?>
									 checked="checked"<?php } ?> />
						SSL
					</label>
					&nbsp;
					<label>
						<input name="wp_smtp_smtpsecure" type="radio"
							   value="tls"
							   <?php
								if ( $this->wsOptions['smtpsecure'] == 'tls' ) {
									?>
									 checked="checked"<?php } ?> />
						TLS
					</label>
				</td>
			</tr>
			<tr valign="top">
				<th scope="row">
					<?php esc_html_e( 'SMTP Port', 'wp-smtp' ); ?>
				</th>
				<td>
					<label>
						<input type="text" name="wp_smtp_port" value="<?php echo esc_attr( $this->wsOptions['port'] ); ?>" size="43"
							   style="width:272px;height:24px;"/>
					</label>
				</td>
			</tr>
			<tr valign="top">
				<th scope="row">
					<?php esc_html_e( 'SMTP Authentication', 'wp-smtp' ); ?>
				</th>
				<td>
					<label>
						<input name="wp_smtp_smtpauth" type="radio"
							   value="no"
							   <?php
								if ( $this->wsOptions['smtpauth'] == 'no' ) {
									?>
									 checked="checked"<?php } ?> />
						No
					</label>
					&nbsp;
					<label>
						<input name="wp_smtp_smtpauth" type="radio"
							   value="yes"
							   <?php
								if ( $this->wsOptions['smtpauth'] == 'yes' ) {
									?>
									 checked="checked"<?php } ?> />
						Yes
					</label>
				</td>
			</tr>
			<tr valign="top">
				<th scope="row">
					<?php esc_html_e( 'Username', 'wp-smtp' ); ?>
				</th>
				<td>
					<label>
						<input type="text" name="wp_smtp_username" value="<?php echo esc_attr( base64_decode( $this->wsOptions['username'] ) ); ?>"
							   size="43" style="width:272px;height:24px;"/>
					</label>
				</td>
			</tr>
			<tr valign="top">
				<th scope="row">
					<?php esc_html_e( 'Password', 'wp-smtp' ); ?>
				</th>
				<td>
					<label>
						<input type="password" name="wp_smtp_password" value="<?php echo esc_attr( base64_decode( $this->wsOptions['password'] ) ); ?>"
							   size="43" style="width:272px;height:24px;"/>
					</label>
				</td>
			</tr>
			<tr valign="top">
				<th scope="row">
					<?php esc_html_e( 'Delete Options', 'wp-smtp' ); ?>
				</th>
				<td>
					<label>
						<input type="checkbox" name="wp_smtp_deactivate"
							   value="yes" 
							   <?php
								if ( $this->wsOptions['deactivate'] == 'yes' ) {
									echo 'checked="checked"';}
								?>
								 />
						<?php esc_html_e( 'Delete options when deactivating this plugin.', 'wp-smtp' ); ?>
					</label>
				</td>
			</tr>
			<tr valign="top">
				<th scope="row">
					<?php esc_html_e( 'Disable Logs', 'wp-smtp' ); ?>
				</th>
				<td>
					<label>
						<input type="checkbox" name="wp_smtp_disable_logs"
							   value="yes" 
							   <?php
								if ( isset( $this->wsOptions['disable_logs'] ) && 'yes' === $this->wsOptions['disable_logs'] ) {
									echo 'checked="checked"';}
								?>
								 />
						<?php esc_html_e( 'Disable the email logging functionality.', 'wp-smtp' ); ?>
					</label>
				</td>
			</tr>
		</table>

		<p class="submit">
			<input type="hidden" name="wp_smtp_update" value="update"/>
			<input type="hidden" name="wp_smtp_nonce_update" value="<?php echo $ws_nonce; ?>"/>
			<input type="submit" class="button-primary" name="Submit" value="<?php esc_attr_e( 'Save Changes' ); ?>"/>
		</p>

	</form>

	<form action="" method="post" enctype="multipart/form-data" name="wp_smtp_testform">
		<h2><?php esc_html_e( 'Test your settings', 'wp-smtp' ); ?></h2>
		<table class="form-table">
			<tr valign="top">
				<th scope="row">
					<?php esc_html_e( 'To:', 'wp-smtp' ); ?>
				</th>
				<td>
					<label>
						<input type="email" name="wp_smtp_to" value="" size="43" style="width:272px;height:24px;" required />
					</label>
				</td>
			</tr>
			<tr valign="top">
				<th scope="row">
					<?php esc_html_e( 'Subject:', 'wp-smtp' ); ?>
				</th>
				<td>
					<label>
						<input type="text" name="wp_smtp_subject" value="" size="43" style="width:272px;height:24px;" required />
					</label>
				</td>
			</tr>
			<tr valign="top">
				<th scope="row">
					<?php esc_html_e( 'Message:', 'wp-smtp' ); ?>
				</th>
				<td>
					<label>
						<textarea type="text" name="wp_smtp_message" value="" cols="45" rows="3"
								  style="width:284px;height:62px;" required></textarea>
					</label>
				</td>
			</tr>
		</table>
		<p class="submit">
			<input type="hidden" name="wp_smtp_test" value="test"/>
			<input type="hidden" name="wp_smtp_nonce_test" value="<?php echo $ws_nonce; ?>"/>
			<input type="submit" class="button-primary" value="<?php esc_attr_e( 'Send Test', 'wp-smtp' ); ?>"/>
		</p>
	</form>
