
$(document).ready(function () {
    $(".copyinvite").click(function showAlert() {
        $("#success-alert").fadeTo(2000, 500).slideUp(500, function () {
            $("#success-alert").slideUp(500)
        });
    });
    new ClipboardJS('.copyinvite');

    if ($("tbody").find('tr').length == 0) {
        $("tbody").append('<tr><td colspan="6" class="text-center">It seems you haven\'t created any lectures yet. <a href="https://' + document.location.hostname + '/create">Create one now</a>!</td></tr>');
    }

    $('.dropdown-menu').on('click', '.delete-lecture', function () {
        var id = $(this).closest('tr').find(".lecture-id").text();
        var button = $(this);
        $.ajax({
            url: "https://" + document.location.hostname + "/overview",
            type: 'post',
            crossDomain: true,
            headers: { "Access-Control-Allow-Origin": '*' },
            contentType: "application/json",
            data: JSON.stringify({
                operation: "delete",
                id: id
            })
        }).done(function (data) {
            if (data["success"]) {
                if ($("tbody").find('tr').length == 1) {
                    button.closest('tr').remove();
                    $("tbody").append('<tr><td colspan="6" class="text-center">It seems you haven\'t created any lectures yet. <a href="https://' + document.location.hostname + '/create">Create one now</a>!</td></tr>');
                } else {
                    button.closest('tr').remove();
                }
                console.log("Successfully deleted lecture with id " + id + " and " + data['count'] + " states of mind!")
            }
        });
    });

    $('.dropdown-menu').on('click', '.terminate-lecture', function () {
        var id = $(this).closest('tr').find(".lecture-id").text();
        var button = $(this);
        $.ajax({
            url: "https://" + document.location.hostname + "/overview",
            type: 'post',
            crossDomain: true,
            headers: { "Access-Control-Allow-Origin": '*' },
            contentType: "application/json",
            data: JSON.stringify({
                operation: "terminate",
                id: id
            })
        }).done(function (data) {
            if (data["success"]) {
                document.location.reload()
                console.log("Successfully terminated lecture with id " + id + " on " + data['end'] + "!")
            }
        });
    });

});
