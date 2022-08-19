$(document).ready(function () {
    $("form").submit(function (event) {
        var formData = JSON.stringify({
            old: $("#InputOld").val(),
            new: $("#InputPassword").val(),
            new2: $("#InputPassword2").val()
        });
        $.ajax({
            url: "https://" + document.location.hostname + "/chgpasswd",
            type: 'post',
            crossDomain: true,
            headers: { "Access-Control-Allow-Origin": '*' },
            contentType: "application/json",
            data: formData
        }).done(function (data) {

            if (data["success"]) {
                $("form").html(
                    '<div class="alert alert-success mt-5">Password is changed successfully. You will be redirected to the home page shortly!</div>'
                );
                setTimeout(() => { window.location.href = 'https://' + document.location.hostname + '/'; }, 3500);
            } else {

                if (data.errors.old) {
                    $("#InputOld").addClass("is-invalid").delay(7500).queue(function () {
                        $(this).removeClass("is-invalid");
                        $(this).dequeue();
                    });
                    $("#OldGroup").append(
                        '<div class="invalid-tooltip">' + data.errors.old + "</div>"
                    );
                    $("#OldGroup .invalid-tooltip").fadeOut(8000);
                    $("#InputOld").focus(function () {
                        $("#OldGroup .invalid-tooltip").remove();
                        $("#InputOld").removeClass("is-invalid");
                    });
                }

                if (data.errors.new) {
                    $("#InputPassword").addClass("is-invalid").delay(8000).queue(function () {
                        $(this).removeClass("is-invalid");
                        $(this).dequeue();
                    });
                    $("#PasswordGroup").append(
                        '<div class="invalid-tooltip">' + data.errors.new + "</div>"
                    );
                    $("#PasswordGroup .invalid-tooltip").fadeOut(8000);
                    $("#InputPassword").focus(function () {
                        $("#PasswordGroup .invalid-tooltip").remove();
                        $("#InputPassword").removeClass("is-invalid");
                    });
                }

                if (data.errors.new2) {
                    $("#InputPassword2").addClass("is-invalid").delay(8000).queue(function () {
                        $(this).removeClass("is-invalid");
                        $(this).dequeue();
                    });
                    $("#PasswordGroup2").append(
                        '<div class="invalid-tooltip">' + data.errors.new2 + "</div>"
                    );
                    $("#PasswordGroup2 .invalid-tooltip").fadeOut(8000);
                    $("#InputPassword2").focus(function () {
                        $("#PasswordGroup2 .invalid-tooltip").remove();
                        $("#InputPassword2").removeClass("is-invalid");
                    });
                }
            }
        });

        event.preventDefault();
    });
});