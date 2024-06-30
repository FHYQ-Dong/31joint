<?php

namespace WPSMTP;


class Db {

	private $db;

	private $table;

	private static $instance;

	public static function get_instance() {

		if ( ! self::$instance ) {
			self::$instance = new static();
		}

		return self::$instance;
	}

	private function __construct() {
		global $wpdb;

		$this->db = $wpdb;
		$this->table = $wpdb->prefix . 'wpsmtp_logs';
	}

	public function insert( $data ) {

		array_walk( $data, function ( &$value, $key ) {
			if ( is_array( $value ) ) {
				$value = maybe_serialize( $value );
			}
		});

		$result_set = $this->db->insert(
			$this->table,
			$data,
			array_fill( 0, count( $data ), '%s' )
		);

		if ( ! $result_set ) {
			error_log( 'WP SMTP Log insert error: ' . $this->db->last_error );

			return false;
		}

		return $this->db->insert_id;
	}

	public function update( $data, $where = array() ) {
		array_walk( $data, function ( &$value, $key ) {
			if ( is_array( $value ) ) {
				$value = maybe_serialize( $value );
			}
		});

		$this->db->update(
			$this->table,
			$data,
			$where,
			array_fill( 0, count( $data ), '%s' ),
			array( '%d' )
		);
	}

	public function get_item( $id ) {
		$sql = sprintf( "SELECT * from {$this->table} WHERE `id` = '%d';", $id );

		return $this->db->get_results( $sql, ARRAY_A );

	}

	public function get() {
		$where = '';
		$where_cols = array();
		$prepare_array = array();

		if ( isset($_GET['search']['value'] ) && ! empty( $_GET['search']['value'] ) ) {
			$search = sanitize_text_field( $_GET['search']['value'] );

			foreach ( $_GET['columns'] as $key => $col ) {
				if ( $col['searchable'] && ! empty( $col['data'] ) && $col['data'] !== 'timestamp' ) {
					$column          = sanitize_text_field( wp_unslash( $col['data'] ) );
					if ( ! in_array( $column, $this->get_allowed_columns(), true ) ) {
						// the column is not in the list, moving.
						continue;
					}
					$where_cols[]    = "`{$column}` LIKE %s";
					$prepare_array[] = '%' . $this->db->esc_like( $search ) . '%';
				}
			}

			if ( ! empty( $where_cols ) ) {
				$where = implode( ' OR ', $where_cols );
			}

		}

		$limit = array();
		if ( isset( $_GET['start'] ) ) {
			$limit[] = absint( $_GET['start'] );
		}

		if ( isset( $_GET['length'] ) ) {
			$limit[] = absint( $_GET['length'] );
		}

		$limit_query = '';
		if ( ! empty( $limit ) ) {
			$limit_query = implode( ',', $limit );
		}

		$orderby = 'timestamp';
		$order = 'DESC';

		if ( ! empty( $_GET['order'][0] ) ) {
			$col_num   = absint( $_GET['order'][0]['column'] );
			$col_name  = sanitize_text_field( wp_unslash( $_GET['columns'][$col_num]['data'] ) );
			$order_dir = strtolower( sanitize_text_field( wp_unslash( $_GET['order'][0]['dir'] ) ) );
			if ( in_array( $order_dir, [
					'asc',
					'desc'
				], true ) && in_array( $col_name, $this->get_allowed_columns(), true ) ) {
				$orderby = "`{$col_name}`";
				$order   = "{$order_dir}";
			}
		}

		// If there is something to search for we need to add the search query to the query.
		if ( ! empty( $prepare_array ) ) {
			$sql = $this->db->prepare( "SELECT * from {$this->table} WHERE {$where} ORDER BY {$orderby} {$order} LIMIT {$limit_query};", $prepare_array );
		} else {
			$sql = $this->db->prepare( "SELECT * from {$this->table} ORDER BY {$orderby} {$order} LIMIT {$limit_query};", $orderby );
		}

		return $this->db->get_results( $sql, ARRAY_A );

	}

	/**
	 * Retrieve an array of allowed columns for sorting and query in the wp_wpsmtp_logs table.
	 *
	 * @return string[]
	 */
	private function get_allowed_columns():array {
		return [
			'mail_id',
			'timestamp',
			'to',
			'subject',
			'message',
			'headers',
			'error'
		];
	}

	public function delete_items( $ids ) {
		return $this->db->query( "DELETE FROM {$this->table} WHERE mail_id IN(" . implode(',', $ids) . ")" );
	}

	public function delete_all_items() {
		return $this->db->query( "TRUNCATE {$this->table};" );
	}

	public function records_count() {
		return $this->db->get_var( "SELECT COUNT(*) FROM {$this->table};" );
	}
}