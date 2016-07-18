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