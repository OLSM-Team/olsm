const FRAME_INTERVAL = 2990
const BATCH_INTERVAL = 15000

function getTimestampInSeconds() {
    return Math.floor((Date.now() - (BATCH_INTERVAL / 2)) / 1000);
}

function getChunk(startStamp) {
    return Math.round((getTimestampInSeconds() - startStamp) / (BATCH_INTERVAL / 1000)) - 1;
}

$(document).ready(function() {
    Webcam.set({
        // live preview size
        width: 640,
        height: 480,
    
        // device capture size
        dest_width: 640,
        dest_height: 480,
    
        // final cropped size
        crop_width: 640,
        crop_height: 480,
    
        // format and quality
        image_format: 'jpg',
        jpeg_quality: 40,
    
        // flip horizontal (mirror mode)
        flip_horiz: true
    });
    Webcam.attach( '#camera' );
    $('#cam-btn').click(function() {
        $('#camera').toggle()
        text = $('#cam-btn').text()
        if (text == 'Show Webcam Preview!') {
            $('#cam-btn').text('Hide Webcam Preview!')
        } else {
            $('#cam-btn').text('Show Webcam Preview!')
        }
    });

    var lecId = $("meta[name='lecture']").attr("content")
    var stdId = $("meta[name='student']").attr("content")
    var startStamp = $("meta[name='start']").attr("content")
    var image_list = []
    setInterval(function() {
        if (navigator.mediaDevices.getUserMedia) {
            navigator.mediaDevices.getUserMedia({ video: true })
                .then(function (stream) {
                    Webcam.freeze();
                    Webcam.snap(function(data_uri) {
                        // display results in page
                        image_list.push(data_uri)
                        Webcam.unfreeze();
                    });
                })
                .catch(function (err0r) {
                });
        }
    }, FRAME_INTERVAL);

    setInterval(function() {
        var chunkId = getChunk(startStamp)
        $.ajax({
            url: 'https://' + document.location.hostname + ':8000/predict',
            type: 'post',
            crossDomain: true,
            headers: {"Access-Control-Allow-Origin": '*'},
            contentType: 'application/json',
            data: JSON.stringify({
                images: image_list,
                lecture: lecId,
                student: stdId,
                chunk: chunkId
            }),
            success: function(response) {
                if (typeof response.state !== "undefined" ) {
                    $('#error').text('')
                    $('#chunk').text(response.chunk)
                    $('#state').text(response.state)
                    console.log(response)
                } else {
                    $('#error').text('Something went wrong!')
                }
            }
        });
        image_list = []
    }, BATCH_INTERVAL)
});
