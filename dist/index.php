<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
    <meta http-equiv="x-ua-compatible" content="ie=edge">
    <!-- The above 3 meta tags *must* come first in the head; any other head content must come *after* these tags -->

    <!-- Basic meta tags -->
    <title>Home page</title>
    <meta name="description" content="I am a main page">

    <!-- Add anything you want here, OG tags, Analytics, stylesheets... -->
    <link rel="stylesheet" href="/stylesheets/main.css">
</head>

<body>
				  
	<nav>
	<a href="/">Home</a>
	<a href="/about">About</a>
</nav>

	<h1 class="test">This is the home page</h1>
	<p>Link to <a href="/about">About page</a></p>

	<script type="text/javascript">
    function loadScript(url, callback) {
        var script = document.createElement("script");
        script.type = "text/javascript";
        script.async = true;
        if (script.readyState) {
            script.onreadystatechange = function () {
                if (script.readyState == "loaded" || script.readyState == "complete") {
                    script.onreadystatechange = null;
                    if (callback && typeof callback === "function") {
                        callback();
                    }
                }
            };
        } else {
            script.onload = function () {
                if (callback && typeof callback === "function") {
                    callback();
                }
            };
        }
        script.src = url;
        (document.getElementsByTagName('head')[0] || document.getElementsByTagName('body')[0]).appendChild(script);
    }
    // Load jQuery async
    loadScript("https://code.jquery.com/jquery-3.0.0.min.js", function () {
      loadScript("/js/main.js"); // You can load any js files you want here
    });
</script>

</body>
</html>