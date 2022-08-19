var subtopic_item = `<div class="mb-4">
<div class="input-group flex-fill">
    <div class="form-outline form-white flex-fill">
        <input type="text" name="subtitle" class="InputSubtopic form-control form-control-lg rounded" />
        <label class="form-label" for="InputSubtopic">Subtopic Title</label>
    </div>
    <div class="form-outline form-white flex-fill">
        <input type="number" name="from" class="InputFrom form-control form-control-lg rounded" min="0" />
        <label class="form-label" for="InputFrom">Starts at (in
            minutes)</label>
    </div>
    <div class="form-outline form-white flex-fill">
        <input type="number" name="to" class="InputTill form-control form-control-lg rounded" min="5" />
        <label class="form-label" for="InputTill">Ends at (in
            minutes)</label>
    </div>
    <button type="button" class="btn btn-lg flex-fill border border-light add"
        data-mdb-ripple-color="dark"
        style="background-color: rgba(12, 63, 201, 0.761); color: white; font-size: 1.2rem;">
        <i class="fas fa-plus"></i>
    </button>
    <button type="button" class="btn btn-lg flex-fill border border-light reset"
        data-mdb-ripple-color="dark"
        style="background-color: rgba(240, 0, 148, 0.761); color: white; font-size: 1.2rem; display: none;">
        <i class="fas fa-trash"></i>
    </button>
</div>
</div>`

var reset = `<button type="button" class="btn btn-lg flex-fill border border-light reset"
data-mdb-ripple-color="dark"
style="background-color: rgba(240, 0, 148, 0.761); color: white; font-size: 1.2rem;">
<i class="fas fa-trash"></i>
</button>`

var subtopic_input = ['.InputSubtopic', '.InputFrom', '.InputTill']

$('#Subtopics').on('click', '.delete', function () {
    $(this).parent().parent().remove();
});

$('#Subtopics').on('click', '.reset', function () {
    if ($('#Subtopics').find('.mb-4').length >= 2) {
        $(this).parent().parent().next().find('.delete').addClass('reset').removeClass('delete');
        if ($('#Subtopics').find('.mb-4').length == 2) {
            $(this).parent().parent().next().find('.reset').hide();
            $('.reset').parent().find('input').on('input', function () {
                $('.reset').show();
            });
        }
        $(this).parent().parent().remove();
    } else {
        $(this).parent().find('input').each(function () {
            $(this).val('');
        });
        $(this).hide();

    }
});

$('.reset').parent().find('input').on('input', function () {
    $('.reset').show();
});

$('#Subtopics').on('click', '.add', function () {
    $(subtopic_item).insertAfter($(this).parent().parent());
    document.querySelectorAll('.form-outline').forEach((formOutline) => {
        new mdb.Input(formOutline).update();
    });
    $('#Subtopics').find('.reset').show();
});

// AJAX Form Submit
$(document).ready(function () {
    $("form").submit(function (event) {
        var subtopics = [];
        $("#Subtopics .input-group").each(function () {
            var temp = []
            $(this).find('input').each(function() {temp.push($(this).val())});
            subtopics.push(
                {
                    title: temp[0],
                    from: temp[1],
                    to: temp[2]
                }
            );
        });
        var formData = JSON.stringify({
            title: $("#InputTitle").val(),
            course: $("#InputCourse").val(),
            duration: $("#InputDuration").val(),
            link: $("#InputLink").val(),
            subtopics: subtopics
        });
        $.ajax({
            url: "https://" + document.location.hostname + "/create",
            type: 'post',
            crossDomain: true,
            headers: { "Access-Control-Allow-Origin": '*' },
            contentType: "application/json",
            data: formData
        }).done(function (data) {

            if (data["success"]) {
                $("form").html(
                    '<div class="alert alert-success mt-5">Lecture is created successfully. You will be redirected to the overview page shortly!</div>'
                );
                setTimeout(() => { window.location.href = 'https://' + document.location.hostname + '/overview'; }, 2500);
            } else {
                if (Object.keys(data.errors.subtopics).length > 0) {
                    for (const [key, error] of Object.entries(data.errors.subtopics)) {
                        n = parseInt(key)
                        var invalid_input = $("" + subtopic_input[parseInt(error[0])]).eq(n);
                        invalid_input.addClass("is-invalid").delay(7500).queue(function () {
                            $(this).removeClass("is-invalid");
                            $(this).dequeue();
                        });
                        invalid_input.parent().find('.invalid-tooltip').remove();
                        $('<div class="invalid-tooltip">' + error[1] + "</div>").insertAfter(invalid_input);
                        $(invalid_input).parent().find('.invalid-tooltip').fadeOut( 8000 );
                    }
                }
            }
        });

        $("input").on('focus', function () {
            if ($(this).parent().find('.invalid-tooltip').length) {
                $(this).parent().find('.invalid-tooltip').remove();
                $(this).removeClass("is-invalid");
            }
        });

        event.preventDefault();
    });
});
