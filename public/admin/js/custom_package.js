
var cnt = $('.available_container').children().length;
$('.addDates').on('click',function(){
    
    cnt++;
    var container = '<div calss="available_wrap" style="border:1px solid #ddd;padding: 10px 20px;margin-bottom: 10px;">'+
                    '<div class="form-group">'+
                    '<label for="start_date" class="col-sm-2 control-label">Date Range</label>'+
                    '<div class="col-sm-8">'+
                        '<div class="input-group">'+
                            '<input type="text" class="form-control dateRange'+cnt+'" name="aDates['+cnt+'][daterange]"  placeholder="Select date range">'+
                            '<div class="input-group-addon">'+
                                '<i class="fa fa-calendar"></i>'+
                            '</div>'+
                        '</div>'+
                    '</div>'+
                    '<div class="col-sm-2">'+
                        '<a href="javascript:void(0);" class="removeDate'+cnt+' btn btn-danger btn-sm">Remove</a>'+
                    '</div>'+
                    '</div>'+
                    '</div>';
    $('.available_container').append(container);

    $('.dateRange'+cnt+'').datepicker({
        dateFormat: 'yyyy-mm-dd',
        clearButton: !0,
        autoClose: !0,
        range: !0,
        language: 'en',
        multipleDatesSeparator: ' / '
    });

    $('.removeDate'+cnt).on('click',function(){
        $(this).parent().parent().parent().remove();
    });
});

var icnt = $('.itinerary_container').children().length;
$('.addItinerary').on('click',function(){
    
    icnt++;
    var icontainer = '<div calss="itinerary_wrap" style="border:1px solid #ddd;padding: 10px 20px;margin-bottom: 10px;">'+
                    '<div class="form-group">'+
                        '<label for="iday" class="col-sm-2 control-label">Day</label>'+
                        '<div class="col-sm-8">'+
                            '<input type="text" class="form-control" id="iday" name="itineraries['+icnt+'][iday]"  placeholder="Day">'+
                        '</div>'+
                    '</div>'+
                    '<div class="form-group">'+
                        '<label for="ititle" class="col-sm-2 control-label">Title</label>'+
                        '<div class="col-sm-8">'+
                            '<input type="text" class="form-control" id="ititle" name="itineraries['+icnt+'][ititle]"  placeholder="Title">'+
                        '</div>'+
                    '</div>'+
                    '<div class="form-group">'+
                        '<label for="idetail" class="col-sm-2 control-label">Detail</label>'+
                        '<div class="col-sm-8">'+
                            '<textarea class="tinymce_basic" name="itineraries['+icnt+'][idetail]" rows="3"></textarea>'+
                        '</div>'+
                        '<div class="col-sm-2">'+
                            '<a href="javascript:void(0);" class="removeItinerary'+icnt+' btn btn-danger btn-sm">Remove</a>'+
                        '</div>'+
                    '</div>'+
                    '</div>';
    $('.itinerary_container').append(icontainer);

    tinymce.init({
        selector: ".tinymce_basic",
        plugins: [
            'advlist autolink lists link image charmap print preview anchor',
            'searchreplace visualblocks code fullscreen',
            'insertdatetime media table contextmenu paste code'
        ],
        toolbar: 'insertfile undo redo | styleselect | bold italic | alignleft aligncenter alignright alignjustify | bullist numlist outdent indent | link image'
    });

    $('.removeItinerary'+icnt).on('click',function(){
        $(this).parent().parent().parent().remove();
    });
});

$('.remove').on('click',function(){
    $(this).parent().parent().parent().remove();
});

/*function removeDate(aid){
    $.ajax({
        url:  '/backend/packages/removeDate/'+aid,
        success: function (data) {
            //console.log(data);
        },
        error: function (data) {
            //console.log('Error:', data);
        }
    });
}

function removeItinerary(iid){
    $.ajax({
        url:  '/backend/package/removeItinerary/'+iid,
        success: function (data) {
            //console.log(data);
        },
        error: function (data) {
            //console.log('Error:', data);
        }
    });
}*/

$('#select21').on('change',function(){
    var did = $(this).val();
    $.get('/backend/package/getActivity/'+did, function(data, status){
        var d = JSON.parse(data);
        if(status == 'success'){
            $('#select22').html(d.content);
        }
    });
});

$('.saveBtn').on('click',function(){
    $('#chooseImage').modal('hide');
    $.get('/backend/package/loadImages', function(data, status){
        var d = JSON.parse(data);
        if(status == 'success'){
            $('#images_container').html(d.content);
        }
    });
});

$("#chooseImage").on("hidden.bs.modal", function () {
    $.get('/backend/package/loadImages', function(data, status){
        var d = JSON.parse(data);
        if(status == 'success'){
            $('#images_container').html(d.content);
        }
    });
});

function calculateAndDisplayRoute(directionsService, directionsDisplay) {
    var waypts = [];
    var waypoints = document.getElementById('waypoints').value;
        waypoints = waypoints.split(',');
    if(waypoints != ''){
        for (var i = 0; i < waypoints.length; i++) {
            waypts.push({
              location: waypoints[i],
              stopover: true
            });
        }
    }
    directionsService.route({
        origin: document.getElementById('dir_start_point').value,
        destination: document.getElementById('dir_end_point').value,
        waypoints: waypts,
        optimizeWaypoints: true,
        travelMode: 'WALKING'
    },function(response, status) {
        if (status === 'OK') {
            directionsDisplay.setDirections(response);
            /*var route = response.routes[0];
            var summaryPanel = document.getElementById('directions-panel');
            summaryPanel.innerHTML = '';
            // For each route, display summary information.
            for (var i = 0; i < route.legs.length; i++) {
                var routeSegment = i + 1;
                summaryPanel.innerHTML += '<div class="col-sm-2"><b>Route Segment: ' + routeSegment +
                  '</b></div>';
                summaryPanel.innerHTML += route.legs[i].start_address + ' to ';
                summaryPanel.innerHTML += route.legs[i].end_address + '<br>';
                summaryPanel.innerHTML += route.legs[i].distance.text + '<br>';
            }
            document.getElementById('directions-panel').style.display = 'block';*/
        } else {
            window.alert('Directions request failed due to ' + status);
        }
    });
}

