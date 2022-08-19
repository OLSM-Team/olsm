$(document).ready(function () {
    $("form").submit(function (event) {
        var formData = JSON.stringify({
            email: $("#InputEmail").val(),
            password: $("#InputPassword").val()
        });
        $.ajax({
            url: "https://" + document.location.hostname + "/login",
            type: 'post',
            crossDomain: true,
            headers: { "Access-Control-Allow-Origin": '*' },
            contentType: "application/json",
            data: formData
        }).done(function (data) {

            if (data["success"]) {
                if ('next_url' in data) {
                    window.location.href = data["next_url"]
                } else {
                    window.location.href = 'https://' + document.location.hostname + '/';
                }
            } else {

                if (data.errors.email) {
                    $("#InputEmail").addClass("is-invalid").delay(7500).queue(function () {
                        $(this).removeClass("is-invalid");
                        $(this).dequeue();
                    });
                    $("#EmailGroup").append(
                        '<div class="invalid-tooltip">' + data.errors.email + "</div>"
                    );
                    $("#EmailGroup .invalid-tooltip").fadeOut(8000);
                    $("#InputEmail").focus(function () {
                        $("#EmailGroup .invalid-tooltip").remove();
                        $("#InputEmail").removeClass("is-invalid");
                    })
                }

                if (data.errors.password) {
                    $("#InputPassword").addClass("is-invalid").delay(7500).queue(function () {
                        $(this).removeClass("is-invalid");
                        $(this).dequeue();
                    });
                    $("#PasswordGroup").append(
                        '<div class="invalid-tooltip">' + data.errors.password + "</div>"
                    );
                    $("#PasswordGroup .invalid-tooltip").fadeOut(8000);
                    $('#InputPassword').focus(function () {
                        $("#PasswordGroup .invalid-tooltip").remove();
                        $("#InputPassword").removeClass("is-invalid");
                    });
                } else {

                }
            }
        });

        event.preventDefault();
    });
});