function getParameterByName(name, url) {
    if (!url) url = window.location.href;
    name = name.replace(/[\[\]]/g, '\\$&');
    var regex = new RegExp('[?&]' + name + '(=([^&#]*)|&|#|$)'),
        results = regex.exec(url);
    if (!results) return null;
    if (!results[2]) return '';
    return decodeURIComponent(results[2].replace(/\+/g, ' '));
}

function formateUrl(uri, key, value) {
    var re = new RegExp("([?&])" + key + "=.*?(&|$)", "i");
    var separator = uri.indexOf('?') !== -1 ? "&" : "?";
    if (uri.match(re)) {
        return uri.replace(re, '$1' + key + "=" + value + '$2');
    } else {
        return uri + separator + key + "=" + value;
    }
}

function navPage(url){
    window.location.href = url
}
function isFunction(functionToCheck) {
    return functionToCheck && {}.toString.call(functionToCheck) === '[object Function]';
}
function loadHeaderFooter(cb){

    // console.log("loader pages")
    var d1 = new $.Deferred();
    var d2 = new $.Deferred();



    $.when(d1, d2).then(function() {
        isFunction(cb) && cb()
    });
    $.get('./fragments/footer.html', function(ele) {
        console.log("load footer")
        $("#footer").replaceWith(ele);
        d2.resolve();
    });
    $.get('./fragments/header.html', function(ele) {
        console.log("load header" )
        $("#header").replaceWith(ele);
        d1.resolve(); });


}