$(document).ready(function() {
    $('#oauth2callback').html(window.location.origin + "/oauth2callback");
    $('#origin').html(window.location.origin);
    $(".originAnchorAuth").attr("href", window.location.origin + "/auth");
    $(".originAnchorOperations").attr("href", window.location.origin + "/operations");
    $.get('/client', function(data) {
        var clientID = data.client_id;
        var clientSecret = data.client_secret;
        $('#clientID').val(clientID);
        $('#clientSecret').val(clientSecret);
    }).fail(function() {
        console.log("CLIENT FAIL");
    });
    $.get('/latlong', function(data) {
        var lat = data.lat;
        var long = data.long;
    }).fail(function() {
        console.log("LAT LONG FAIL");
    });
    $.get('/patients', function(data) {
        for (var patient in data.patients) {
            $('#patients').append(getPatientHTML(data.patients[patient]));
        }

    }).fail(function() {
        console.log("PATIENTS FAIL");
    });
});


var allergies = [];
var prescriptions = [];
var medicalHistory = [];

$('#addAllergy').click(function(event) {
    var value = $('#inputAllergies').val();
    allergies.push(value);
    $('#inputAllergies').val("");
    var html = "";
    allergies.forEach(function(allergy) {
        html += allergy + ", ";
    })
    $('#allergy-help').html(html);
    event.preventDefault();
});
$('#addPrescription').click(function(event) {
    var value = $('#inputPrescriptions').val();
    prescriptions.push(value);
    $('#inputPrescriptions').val("");
    var html = "";
    prescriptions.forEach(function(prescription) {
        html += prescription + ", ";
    })
    $('#prescription-help').html(html);
    event.preventDefault();
});
$('#addMedicalHistory').click(function(event) {
    var value = $('#inputMedicalHistory').val();
    medicalHistory.push(value);
    $('#inputMedicalHistory').val("");
    var html = "";
    medicalHistory.forEach(function(history) {
        html += history + ", ";
    })
    $('#medicalHistory-help').html(html);
    event.preventDefault();
});
$('#savePatient').click(function(event) {
    var name = $('#inputName').val();
    var age = String($('#inputAge').val());
    var sex = $('#inputSex').val();
    var bloodType = $('#inputBloodType').val();
    var organDonor = false;
    if ($('#optionsRadios1').is(':checked')) {
        organDonor = true;
    }


    var object = {
        age: age,
        allergies: allergies,
        bloodType: bloodType,
        medicalHistory: medicalHistory,
        name: name,
        organDonor: organDonor,
        prescriptions: prescriptions,
        sex: sex
    };
    console.log(object);
    $.post('/patients', {
        patient: object
    }, function() {});
    $('#successPatient').html('<div class="alert alert-success fade in"><a href="#" class="close" data-dismiss="alert">&times;</a><strong>Success!</strong></br>The Patient' + name + ' has been saved.</div>');
    setTimeout(function() {
        //your code to be executed after 1 second
    }, 1500);
    $.get('/patients', function(data) {
        $('#patients').empty();
        for (var patient in data.patients) {
            $('#patients').append(getPatientHTML(data.patients[patient]));
        }

    })
    $('#inputName').val("");
    $('#inputAge').val("");
    $('#inputSex').val("");
    $('#inputBloodType').val("");
    $('#inputAllergies').val("");
    $('#inputPrescriptions').val("");
    $('#inputMedicalHistory').val("");
    $('#allergy-help').html("None Listed");
    $('#prescription-help').html("None Listed");
    $('#medicalHistory-help').html("None Listed");

    allergies = [];
    prescriptions = [];
    medicalHistory = [];




    $('#inputSex').val("");
    $('#inputName').val("");
    $('#inputAge').val("");
    $('#inputBloodType').val("");
    $('#inputAllergies').val("");
    $('#inputPrescriptions').val("");
    $('#inputMedicalHistory').val("");
    allergies = [];
    prescriptions = [];
    medicalHistory = [];
    event.preventDefault();
});

$('#saveClientInfo').click(function(event) {
    var clientID = $('#clientID').val();
    var clientSecret = $('#clientSecret').val()
    console.log(clientID);
    console.log(clientSecret);
    $.post('/client', {
        client_id: clientID,
        client_secret: clientSecret
    }, function() {});
    $("#successClient").html('<div class="alert alert-success fade in"><a href="#" class="close" data-dismiss="alert">&times;</a><strong>Success!</strong></br> Client ID ' + clientID + ' & Secret ' + clientSecret + ' has been saved.</div>');
    event.preventDefault();
});

function initMap() {
    var latVar = 41.881832;
    var longVar = -87.623177;
    $.get('/latlong', function(data) {
        latVar = parseFloat(data.lat);
        longVar = parseFloat(data.long);

        var location = {
            lat: latVar,
            lng: longVar
        };
        var map = new google.maps.Map(document.getElementById('map'), {
            zoom: 12,
            center: location,
            mapTypeId: google.maps.MapTypeId.ROADMAP,
            mapTypeControl: false,
            streetViewControl: false
        });

        //updateAvailableAmbulances();
        initRightClick(map);
        initSearchBox(map);
    });
}

function initRightClick(map) {
    var icon = {
        url: 'https://maps.gstatic.com/mapfiles/place_api/icons/geocode-71.png',
        size: new google.maps.Size(71, 71),
        origin: new google.maps.Point(0, 0),
        anchor: new google.maps.Point(17, 34),
        scaledSize: new google.maps.Size(25, 25)
    };

    var marker = new google.maps.Marker({
        icon: icon,
        title: 'location'
    });


    google.maps.event.addDomListener(map, 'rightclick', function(e) {
        var lat = e.latLng.lat();
        var long = e.latLng.lng();
        console.log(lat);
        console.log(long);
        $.post('/latlong', {
            lat: lat,
            long: long
        });
        event.preventDefault();
        marker.setPosition(e.latLng);
        marker.setMap(map);
    });
}

function initSearchBox(map) {
    var input = document.getElementById('pac-input');
    var searchBox = new google.maps.places.SearchBox(input);
    map.controls[google.maps.ControlPosition.TOP_LEFT].push(input);

    // Bias the SearchBox results towards current map's viewport.
    map.addListener('bounds_changed', function() {
        searchBox.setBounds(map.getBounds());
    });

    var markers = [];
    // [START region_getplaces]
    // Listen for the event fired when the user selects a prediction and retrieve
    // more details for that place.
    searchBox.addListener('places_changed', function() {
        var places = searchBox.getPlaces();
        var lastOrOnlyPlace;
        if (places.length == 0) {
            return;
        }

        // Clear out the old markers.
        markers.forEach(function(marker) {
            marker.setMap(null);
        });
        markers = [];

        // For each place, get the icon, name and location.
        var bounds = new google.maps.LatLngBounds();
        places.forEach(function(place) {
            var icon = {
                url: 'https://maps.gstatic.com/mapfiles/place_api/icons/geocode-71.png',
                size: new google.maps.Size(71, 71),
                origin: new google.maps.Point(0, 0),
                anchor: new google.maps.Point(17, 34),
                scaledSize: new google.maps.Size(25, 25)
            };

            var marker = new google.maps.Marker({
                map: map,
                icon: icon,
                title: place.name,
                position: place.geometry.location
            });
            lastOrOnlyPlace = marker;
            $.post('/latlong', {
                lat: marker.position.lat(),
                long: marker.position.lng()
            });
            // Create a marker for each place.
            markers.push(marker);
            if (place.geometry.viewport) {
                // Only geocodes have viewport.
                bounds.union(place.geometry.viewport);
            } else {
                bounds.extend(place.geometry.location);
            }
        });
        if (places.length > 1) {
            map.panToBounds(bounds);
        } else {
            map.setCenter(lastOrOnlyPlace.getPosition());
        }
    });
}

function getPatientHTML(patient) {
    console.log(patient)
    return '<div class="col-xs-12 col-sm-12 col-md-6 col-lg-6 toppad" > <div class="panel panel-info"> <div class="panel-heading"> <h3 class="panel-title">' + patient.name +
        '</h3> </div> <div class="panel-body"> <div class="row"> <div class=" col-md-12 col-lg-12 "> <table class="table table-user-information"> <tbody> <tr> ' +
        '<td>Age:</td> <td>' + patient.age + '</td> </tr> <tr> ' +
        '<td>Sex:</td> <td>' + patient.sex + '</td> </tr> <tr> ' +
        '<td>Blood Type:</td> <td>' + patient.bloodType + '</td> </tr> <tr> <tr> ' +
        '<td>Organ Donor:</td> <td>' + patient.organDonor + '</td> </tr> <tr> ' +
        '<td>Allergies</td> <td>' + patient.allergies + '</td> </tr> <tr>' +
        '<td>Prescriptions</td> <td>' + patient.prescriptions + '</td></tr> ' +
        '<td>Medical History</td> <td>' + patient.medicalHistory + '</td> </tr> ' +
        '</tbody> </table> </div> </div> </div> </div> </div>'
}
