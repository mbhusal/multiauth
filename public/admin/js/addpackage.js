"use strict";
// bootstrap wizard//

$('.dateRange').datepicker({
    dateFormat: 'yyyy-mm-dd',
    clearButton: !0,
    autoClose: !0,
    range: !0,
    language: 'en',
    multipleDatesSeparator: ' / '
});
/*$("#select21").select2({
    theme:"bootstrap",
    placeholder:"Select a destination"
});
$("#select22").select2({
    theme:"bootstrap",
    placeholder:"Select a activity"
});
$("#currency").select2({
    theme:"bootstrap",
    placeholder:"Select a value"
});
$("#select23").select2({
    theme:"bootstrap",
    placeholder:"Select difficulty"
});
$("#multiselect1").multiselect({
    enableFiltering: false,
    includeSelectAllOption: false,
    maxHeight: 800,
    dropUp: true
});
$("#multiselect2").multiselect({
    enableFiltering: false,
    includeSelectAllOption: false,
    maxHeight: 800,
    dropUp: true
});
$(".customMulti").multiselect({
    enableFiltering: false,
    includeSelectAllOption: false,
    maxHeight: 800,
    dropUp: true
});
$(".customSelect").select2({
    theme:"bootstrap",
    placeholder:"Select a value"
});*/


tinymce.init({
    selector: ".tinymce_basic",
    plugins: [
        'advlist autolink lists link image charmap print preview anchor',
        'searchreplace visualblocks code fullscreen',
        'insertdatetime media table contextmenu paste code'
    ],
    toolbar: 'insertfile undo redo | styleselect | bold italic | alignleft aligncenter alignright alignjustify | bullist numlist outdent indent | link image'
});

$("#createPackage").bootstrapValidator({
    fields: {
        destination_id: {
            validators: {
                notEmpty: {
                    message: 'The destination is required'
                }
            },
            required: true,
            minlength: 3
        },
        activity_id: {
            validators: {
                notEmpty: {
                    message: 'The activity is required'
                }
            },
            required: true,
            minlength: 3
        },
        package_title: {
            validators: {
                notEmpty: {
                    message: 'The package title is required'
                }
            },
            required: true,
            minlength: 3
        },
        group_size: {
            validators: {
                notEmpty: {
                    message: 'The Group Size is required'
                },
                numeric:{
                    message: 'The value should be number'
                }
            },
            required: true,
            minlength: 3
        },
        min_group_size: {
            validators: {
                notEmpty: {
                    message: 'The Minimum Group Size is required'
                },
                numeric:{
                    message: 'The value should be number'
                }
            },
            required: true,
            minlength: 3
        },
        duration: {
            validators: {
                notEmpty: {
                    message: 'The Duration is required'
                },
                numeric:{
                    message: 'The value should be number'
                }
            },
            required: true,
            minlength: 3
        },
        group_price: {
            validators: {
                notEmpty: {
                    message: 'The Group Price is required'
                },
                numeric:{
                    message: 'The value should be number'
                }
            },
            required: true,
            minlength: 3
        },
        individual_price: {
            validators: {
                notEmpty: {
                    message: 'The Individual Price is required'
                },
                numeric:{
                    message: 'The value should be number'
                }
            },
            required: true,
            minlength: 3
        }
    }
});

