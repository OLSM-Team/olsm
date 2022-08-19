$(document).ready(function () {
    $("form").submit(function (event) {
        var formData = JSON.stringify({
            fname: $("#InputFName").val(),
            lname: $("#InputLName").val(),
            email: $("#InputEmail").val(),
            password: $("#InputPassword").val(),
            password2: $("#InputPassword2").val(),
            gender: $("#RadioGender input[type='radio']:checked").val(),
            role: $("#RadioRole input[type='radio']:checked").val()
        });
        $.ajax({
            url: "https://" + document.location.hostname + "/register",
            type: 'post',
            crossDomain: true,
            headers: { "Access-Control-Allow-Origin": '*' },
            contentType: "application/json",
            data: formData
        }).done(function (data) {

            if (data["success"]) {
                $("form").html(
                    '<div class="alert alert-success mt-5">Registration is complete. You will be redirected to login page shortly!</div>'
                );
                setTimeout(() => { window.location.href = 'https://' + document.location.hostname + '/login'; }, 2500);
            } else {
                if (data.errors.fname) {
                    $("#InputFName").addClass("is-invalid").delay(7500).queue(function () {
                        $(this).removeClass("is-invalid");
                        $(this).dequeue();
                    });
                    $("#FNameGroup .invalid-tooltip").remove();
                    $("#FNameGroup").append(
                        '<div class="invalid-tooltip">' + data.errors.fname + "</div>"
                    );
                    $("#FNameGroup .invalid-tooltip").fadeOut(8000);
                    $("#InputFName").on('focus', function () {
                        $("#FNameGroup .invalid-tooltip").remove();
                        $("#InputFName").removeClass("is-invalid");
                    });
                }

                if (data.errors.lname) {
                    $("#InputLName").addClass("is-invalid").delay(7500).queue(function () {
                        $(this).removeClass("is-invalid");
                        $(this).dequeue();
                    });
                    $("#LNameGroup .invalid-tooltip").remove();
                    $("#LNameGroup").append(
                        '<div class="invalid-tooltip">' + data.errors.lname + "</div>"
                    );
                    $("#LNameGroup .invalid-tooltip").fadeOut(8000);
                    $("#InputLName").on('focus', function () {
                        $("#LNameGroup .invalid-tooltip").remove();
                        $("#InputLName").removeClass("is-invalid");
                    });
                }

                if (data.errors.email) {
                    $("#InputEmail").addClass("is-invalid").delay(7500).queue(function () {
                        $(this).removeClass("is-invalid");
                        $(this).dequeue();
                    });
                    $("#EmailGroup .invalid-tooltip").remove();
                    $("#EmailGroup").append(
                        '<div class="invalid-tooltip">' + data.errors.email + "</div>"
                    );
                    $("#EmailGroup .invalid-tooltip").fadeOut(8000);
                    $("#InputEmail").on('focus', function () {
                        $("#EmailGroup .invalid-tooltip").remove();
                        $("#InputEmail").removeClass("is-invalid");
                    });
                }

                if (data.errors.password) {
                    $("#InputPassword").addClass("is-invalid").delay(7500).queue(function () {
                        $(this).removeClass("is-invalid");
                        $(this).dequeue();
                    });
                    $("#PasswordGroup .invalid-tooltip").remove();
                    $("#PasswordGroup").append(
                        '<div class="invalid-tooltip">' + data.errors.password + "</div>"
                    );
                    $("#PasswordGroup .invalid-tooltip").fadeOut(8000);
                    $("#InputPassword").on('focus', function () {
                        $("#PasswordGroup .invalid-tooltip").remove();
                        $("#InputPassword").removeClass("is-invalid");
                    });
                }

                if (data.errors.password2) {
                    $("#InputPassword2").addClass("is-invalid").delay(7500).queue(function () {
                        $(this).removeClass("is-invalid");
                        $(this).dequeue();
                    });
                    $("#Password2Group .invalid-tooltip").remove();
                    $("#Password2Group").append(
                        '<div class="invalid-tooltip">' + data.errors.password2 + "</div>"
                    );
                    $("#Password2Group .invalid-tooltip").fadeOut(8000);
                    $("#InputPassword2").on('focus', function () {
                        $("#Password2Group .invalid-tooltip").remove();
                        $("#InputPassword2").removeClass("is-invalid");
                    });
                }
                document.querySelectorAll('.form-outline').forEach((formOutline) => {
                    new mdb.Input(formOutline).init();
                });
            }
        });

        event.preventDefault();
    });
});

(() => {
    'use strict';

    // Fetch all the forms we want to apply custom Bootstrap validation styles to
    const forms = document.querySelectorAll('.needs-validation');

    // Loop over them and prevent submission
    Array.prototype.slice.call(forms).forEach((form) => {
        form.addEventListener('submit', (event) => {
            if (!form.checkValidity()) {
                event.preventDefault();
                event.stopPropagation();
            }
            form.classList.add('was-validated');
        }, false);
    });
})();