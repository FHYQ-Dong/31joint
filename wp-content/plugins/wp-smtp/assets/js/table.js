function format ( d ) {
    return d.message;
}

jQuery(document).ready(function($) {
    var selectedIds = [];
    var security = $('#md-security').data('security');
    var dt = $('#example').DataTable( {
        "idSrc": "mail_id",
        rowId: 'mail_id',
        select: true,
        paging: true,
        "pagingType": "full_numbers",
        "processing": true,
        "serverSide": true,
        "ajax": wpsmtp.ajaxurl + '?action=wpsmtp_get_logs&security=' + security,
        "columns": [
            {
                "class":          "details-control",
                "orderable":      true,
                "data":           null,
                "defaultContent": ""
            },
            { "data": "to" },
            { "data": "timestamp" },
            { "data": "subject" },
            { "data": "error" },
        ],
        "order": [[2, 'desc']],
        dom: 'lBfrtip',
        buttons: [
            { extend: 'copy', className: 'button' },
            { extend: 'csv', className: 'button' },
            {
                text: 'Delete Selected Rows',
                className: 'button',
                action: function ( e, dt, node, config ) {
                    var count = dt.rows( { selected: true } ).ids().toArray();

                    console.log( count.join(',') );

                    var button = $(e.target);
                    var security = $('#md-security').data('security');

                    $.ajax({
                        url: wpsmtp.ajaxurl + '?action=wpsmtp_delete_rows&ids=' + count.join(',') + '&security=' + security,
                        success : function(data){
                            //delete the row
                            dt.row('.selected').remove().draw( false );
                        },
                        error: function(xhr){
                            alert( 'There was an error delete the row' );
                        }
                    });
                }
            },
            {
                text: 'Delete All Rows',
                className: 'button',
                action: function ( e, dt, node, config ) {

                    var r = confirm( 'Are you sure you want to delete all log records?' );

                    if ( r === false ) {
                        return;
                    }

                    var button = $(e.target);
                    var security = $('#md-security').data('security');

                    $.ajax({
                        url: wpsmtp.ajaxurl + '?action=wpsmtp_delete_all_rows&security=' + security,
                        success : function(data){
                            location.reload();
                        },
                        error: function(xhr){
                            alert( 'There was an error delete the row' );
                        }
                    });
                }
            }
        ]
    } );

    dt.on('select.dt', function(e, dt, type, indexes) {
        selectedIds.push(indexes[0]);
    })

    dt.on('deselect.dt', function(e, dt, type, indexes) {
        selectedIds.splice(selectedIds.indexOf(indexes[0]), 1);
    })

    // Array to track the ids of the details displayed rows
    var detailRows = [];

    $('#example tbody').on( 'click', 'tr td.details-control', function () {
        var tr = $(this).closest('tr');
        var row = dt.row( tr );
        var idx = $.inArray( tr.attr('id'), detailRows );

        if ( row.child.isShown() ) {
            tr.removeClass( 'details' );
            row.child.hide();

            // Remove from the 'open' array
            detailRows.splice( idx, 1 );
        }
        else {
            tr.addClass( 'details' );
            row.child( format( row.data() ) ).show();

            // Add to the 'open' array
            if ( idx === -1 ) {
                detailRows.push( tr.attr('id') );
            }
        }
    } );


    // On each draw, loop over the `detailRows` array and show any child rows
    dt.on( 'draw', function () {
        $.each( detailRows, function ( i, id ) {
            $('#'+id+' td.details-control').trigger( 'click' );
        } );
    } );

} );