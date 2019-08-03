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
            // alert( url)
            break
    }
    if(!!url){
        navPage(url)
    }
}

function loadBootstrap() {

    var url = window.location.href;		//获取当前URL
    if(url.indexOf("/about")>=0){
        $(".pcto_menu_xun ").eq(1).addClass('on');
    }
    else if(url.indexOf("/product")>=0){
        $(".pcto_menu_xun ").eq(2).addClass('on');
    }
    else if(url.indexOf("/service")>=0){
        $(".pcto_menu_xun ").eq(3).addClass('on');
    }
    else if(url.indexOf("/new")>=0){
        $(".pcto_menu_xun ").eq(4).addClass('on');
    }
    else if(url.indexOf("/job")>=0){
        $(".pcto_menu_xun ").eq(5).addClass('on');
    }
    else if(url.indexOf("/contact")>=0){
        $(".pcto_menu_xun ").last().addClass('on');
    }
    else{
        $(".pcto_menu_xun ").eq(0).addClass('on');
    }

    if(url.indexOf("/en/")>=0&&$(".fenye").length>0){
        var len=$(".fenye_nei a").length;
        var ht;
        for(var i=0;i<len;i++){
            ht=$(".fenye_nei a").eq(i).html();
            if(ht=="上一页"){
                $(".fenye_nei a").eq(i).html("PREVIOUS");
            }
            else if(ht=="下一页"){
                $(".fenye_nei a").eq(i).html("NEXT");
            }
        }
    }
// });
// $(document).ready(function(e) {
    //下拉菜单
    $(".menuicon").click(function(){
        $(".moxiala").slideToggle();
    });
    //产品中心下拉菜单
    $(".proxiala_chakan").click(function(){
        $(".proxiala_menu").slideToggle();
    });
// });

// $(document).ready(function(e) {
    var oldh=$(".indexabout_box").height();

    $(".iaov .iaov2").click(function(){
        $(this).hide();
        $(".iaov .iaov1").show();
        $(".indexabout_box").css({"height":"240px"});
    });
    $(".iaov .iaov1").click(function(){
        $(this).hide();
        $(".iaov .iaov2").show();
        $(".indexabout_box").css({"height":"auto"});
    });
// });

// $(document).ready(function(e) {
    var zi=window.setInterval(function(){
        $(".moxl").height(($(window).height()-50));
        //$(".moxl_box").width(($(window).width()));
    },1);
    var a=-1,ind;
    $(".openicon").click(function(){
        $(this).hide();
        $(".cloesicon").show();
        $(".moxl").css({"left":0});
        $("body").css("overflow","hidden");
        s=1;
    });

    $(".cloesicon").click(function(){
        $(this).hide();
        $(".openicon").show();
        $(".moxl").css({"left":"-100%"});
        $(".moxl_xun_img2").click();
        $("body").css("overflow","inherit");
        s=0;
    });
    $(".moxl_xun_img1").click(function(){
        // alert('click')
        $(".moxl_xun_img1").show();
        $(this).hide();
        $(".moxl_xun_img2").hide();
        $(this).next().show();
        $(".moxl_erji").slideUp();
        ind=$(this).parents(".moxl_xun").index();
        if(a!=ind){
            $(this).parents(".moxl_xun").find(".moxl_erji").slideDown();
            a=ind;
        }else{
            a=-1;
        }
    });
    $(".moxl_xun_img2").click(function(){
        $(".moxl_xun_img1").show();
        $(this).hide();
        $(".moxl_xun_img2").hide();
        $(".moxl_erji").slideUp();
        a=-1;
    });

// });


//招聘列表展开收起
// $(document).ready(function(e) {
    var oldind=-1,newind;
    $(".job_liebiao .job_liebiao_title").click(function(){
        newind=$(this).index();
        $(".job_liebiao_box").slideUp();
        $(".job_liebiao_title").removeClass("on");
        if(newind!=oldind){
            $(this).addClass("on");
            $(this).next(".job_liebiao_text").find(".job_liebiao_box").slideToggle();
            oldind=newind;
        }else{oldind=-1}
    });
// });

}