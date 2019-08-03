var baseUrl = "http://39.96.36.17:8080"

console.log("http file")
function isHttpOk(status) {
    return !!status && status.substring(0,1) == "2"
}

function addQuery(url , params) {
    var str = "";
    for (var key in params) {
        if (str != "") {
            str += "&";
        }
        str += key + "=" + encodeURIComponent(params[key]);
    }

    if(!!str){
        url += "?"
    }
    url = url + str

    return url
}
function gethttp(url , params) {
    url = addQuery(url , params)
    return $.get(url).then(function (data) {
        if(!!data && isHttpOk(data.status)){
            return data.rows
        }else{
            var error = './error.html'
            var msg = {
                message : !!data && !!data.message ? data.message : "获取数据失败"
            }
            error = addQuery(error , msg)
            navPage(error)
            return
        }
    })
}

$(document).ajaxError(function myErrorHandler(event, xhr, ajaxOptions, thrownError) {
    // alert("There was an ajax error!");


    console.log("global error" , event)
});

function getKideDes(id , columnId) {
    var url = baseUrl + "/api/index/kideDes "
    var params = {
        "id":id,
        "columnId": columnId
    }
    return gethttp(url , params)
}


function getIndex() {
    var url = baseUrl + "/api/index"
    return gethttp(url)
}

function getProduct(productId , pageNum) {
    var url = baseUrl + "/api/index/product"
    var params = {
        "productId":productId,
        "pageNum": pageNum
    }
    return gethttp(url)
}
function getNewDes(id) {
    var url = baseUrl + "/api/index/advantageDetails"
    var params = {
        "id":id
    }
    return gethttp(url , params)
}
function getNewsList(id , columnId , pageNum) {
    var url = baseUrl + "/api/index/newsList"
    var params = {
        "id":id,
        "columnId":columnId,
        "pageNum": pageNum
    }
    return gethttp(url , params)
}
function getProductDes(productId) {
    var url = baseUrl + "/api/index/productDes"
    var params = {
        "productId":productId
    }
    return gethttp(url , params)
}
function getAdvantage(columnId) {
    var url = baseUrl + "/api/index/advantage "
    var params = {
        "columnId":columnId
    }
    return gethttp(url , params)
}
function getFileList(pageNum) {
    var url = baseUrl + "/api/index/fileList"
    var params = {
        "pageNum":pageNum
    }
    return gethttp(url , params)
}