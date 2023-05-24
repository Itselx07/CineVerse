function show_episodes(list) {
    for (i = 0; i < 11; i++) {
        if (i != list) {
            $("#episodes-server-" + i).addClass("hidden");
            $("#server-" + i).removeClass("active");
        }
    }
    $("#episodes-server-" + list).removeClass("hidden");
    $("#server-" + list).addClass("active");
    if (list == 1) $(".playing-on").text("Server Openload");
    if (list == 2) $(".playing-on").text("Server eStream");
    if (list == 10) $(".playing-on").text("Server 1");
}

function load_episode(e, s) {
    $.ajax({
        url: base_url + "123ajax/movie_load_embed/" + e + ".html",
        method: "GET",
        dataType: "json",
        success: function(t) {
            if (s == 1) $("#iframe-embed").attr("src", t.openload);
            if (s == 2) $("#iframe-embed").attr("src", t.estream);
            if (s == 10) $("#iframe-embed").attr("src", t.server_1);
            var episodes = $('#episodes-server-' + s).data("episodes");
            var array = episodes.split('|');
            var uri = window.location.toString();
            if (!uri.includes(String(s) + "/watching/")) {
                if (s == 1) {
                    var ss = 2;
                    var ss1 = 10;
                }
                if (s == 2) {
                    var ss = 1;
                    var ss1 = 10;
                } else {
                    var ss = 1;
                    var ss1 = 2;
                }
            } else {
                var ss = s;
            }
            for (var i = 0; i < array.length; i++) {
                if (uri.includes(String(array[i]))) {
                    var clean_uri = uri.replace(String(array[i]) + "-" + String(ss), String(e) + "-" + String(s));
                    if (clean_uri == uri)
                        var clean_uri = uri.replace(String(array[i]) + "-" + String(ss1), String(e) + "-" + String(s));
                    var ok = true;
                }
            }
            var episodesss = $('#episodes-server-' + s).data("episodes");
            var myArray = episodesss.split("|");
            for (var i = 0; i < myArray.length; i++) {
                $("#episodes-server-1 #episode-" + myArray[i]).removeClass("active");
                $("#episodes-server-2 #episode-" + myArray[i]).removeClass("active");
                $("#episodes-server-10 #episode-" + myArray[i]).removeClass("active");
            }
            $("#episodes-server-" + s + " #episode-" + e).addClass("active");
            window.history.replaceState({}, document.title, clean_uri);
        }
    })
}

function load_movie(e, s) {
    $.ajax({
        url: base_url + "123ajax/movie_load_embed/" + e + ".html",
        method: "GET",
        dataType: "json",
        success: function(t) {
            var uri = window.location.toString();
            if (s == 1) {
                $("#iframe-embed").attr("src", t.openload);
                $(".playing-on").text("Server Openload");
                $("#episode-2").removeClass("active");
                $("#episode-10").removeClass("active");
                $("#episode-1").addClass("active");
                if (uri.indexOf("/2/") != -1)
                    var clean_uri = uri.replace("/2/", "/1/");
                else if (uri.indexOf("/10/") != -1)
                    var clean_uri = uri.replace("/10/", "/1/");
                else if (uri.indexOf("/12/") != -1)
                    var clean_uri = uri.replace("/12/", "/1/");
            } else if (s == 2) {
                $("#iframe-embed").attr("src", t.estream);
                $(".playing-on").text("Server eStream");
                $("#episode-1").removeClass("active");
                $("#episode-10").removeClass("active");
                $("#episode-2").addClass("active");
                if (uri.indexOf("/1/") != -1)
                    var clean_uri = uri.replace("/1/", "/2/");
                else if (uri.indexOf("/10/") != -1)
                    var clean_uri = uri.replace("/10/", "/2/");
                else if (uri.indexOf("/12/") != -1)
                    var clean_uri = uri.replace("/12/", "/2/");
            } else if (s == 10) {
                $("#iframe-embed").attr("src", t.server_1);
                $(".playing-on").text("Server 1");
                $("#episode-1").removeClass("active");
                $("#episode-2").removeClass("active");
                $("#episode-10").addClass("active");
                if (uri.indexOf("/2/") != -1)
                    var clean_uri = uri.replace("/2/", "/10/");
                else if (uri.indexOf("/1/") != -1)
                    var clean_uri = uri.replace("/1/", "/10/");
                else if (uri.indexOf("/12/") != -1)
                    var clean_uri = uri.replace("/12/", "/10/");
            }
            window.history.replaceState({}, document.title, clean_uri);
        }
    })
}