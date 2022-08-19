$(document).ready(function () {
    if ($("#signup").length > 0) {
        $('#signup').click(function () {
            window.location.href = 'https://' + document.location.hostname + '/register';
            return false;
        });

        $('#login').click(function () {
            window.location.href = 'https://' + document.location.hostname + '/login';
            return false;
        });
    } else {
        $('#logout').click(function () {
            window.location.href = 'https://' + document.location.hostname + '/logout';
            return false;
        });
        $('#chgpasswd').click(function () {
            window.location.href = 'https://' + document.location.hostname + '/chgpasswd';
            return false;
        });
        if ($("#create").length > 0) {
            $('#create').click(function () {
                window.location.href = 'https://' + document.location.hostname + '/create';
                return false;
            });
            $('#overview').click(function () {
                window.location.href = 'https://' + document.location.hostname + '/overview';
                return false;
            });
        }
    }
});