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


function handleSubMenu(item , sub) {
    /*
                   * categoryName (string, optional): 名称 ,
   categoryState (integer, optional): 类型 1 富文本 3产品 4资料下载 5新闻 ,
   children (Array[首页栏目], optional),
   enName (string, optional): 英文名 ,
   id (integer, optional): 主键 ,
   parentId (integer, optional): 上级编号 ,
   state (integer, optional)*/
    console.log("item" , "sub" , item , sub)
    var url = ""
    switch (item.categoryState) {
        case 1:
            url = "./about.html"
            url = formateUrl(url , "id" , item.id)
            url = formateUrl(url , "columnId" , sub.id)
            break
        case 3:
            break
        case 4:
            break
        case 5:
            url = "./news.html"
            url = formateUrl(url , "id" , item.id)
            url = formateUrl(url , "columnId" , sub.id)
            alert( url)
            break
    }
    if(!!url){
        navPage(url)
    }
}