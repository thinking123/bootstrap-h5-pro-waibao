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
function handleSubMenuPhone(e , index) {
    var list = index.listColumn
    console.log(e)
    var i = e.target.tagName.toLowerCase() == "li" ?
        $(e.target).index() : $(e.target).closest("li").index()
    console.log('index' , i)

    for(item of list){
        if(item.categoryState == 3 && i == 1){
            return handleSubMenu(item , item.children[0])
        }

        if(item.categoryState == 5 && i == 2){
            return handleSubMenu(item , item.children[0])
        }
    }
    switch (i) {
        // case 0 :
        //
        //     break
//         case 1 :
// //pro
//             break
//         case 2 :
// //news
//             var news = list[]
//
//             break
        case 3 :
//home
           navPage("./index.html")
            break
    }
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
            url = "./products.html"
            url = formateUrl(url , "id" , sub.id)
            break
        case 4:
            url = "./download.html"
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
    // if(url.indexOf("/about")>=0){
    //     $(".pcto_menu_xun ").eq(1).addClass('on');
    // }
    // else if(url.indexOf("/product")>=0){
    //     $(".pcto_menu_xun ").eq(2).addClass('on');
    // }
    // else if(url.indexOf("/service")>=0){
    //     $(".pcto_menu_xun ").eq(3).addClass('on');
    // }
    // else if(url.indexOf("/new")>=0){
    //     $(".pcto_menu_xun ").eq(4).addClass('on');
    // }
    // else if(url.indexOf("/job")>=0){
    //     $(".pcto_menu_xun ").eq(5).addClass('on');
    // }
    // else if(url.indexOf("/contact")>=0){
    //     $(".pcto_menu_xun ").last().addClass('on');
    // }
    // else{
    //     $(".pcto_menu_xun ").eq(0).addClass('on');
    // }

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
        console.log("click")
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
        console.log("click dsf")
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


    $(document).ready(function(e) {
        var ind=0;
        $(".newssel_nei_op").eq(ind).addClass("on");
        // $(".newsxxk").hide();
        // $(".newsxxk").eq(ind).show();
        $(".newssel_nei_op").click(function(){
            ind=$(this).index();
            $(this).addClass("on").siblings().removeClass("on");
            // $(".newsxxk").hide();
            // $(".newsxxk").eq(ind).show();
        });
    });
//首页产品中心选项卡切换
    $(document).ready(function(e) {
        var ind=0;
        if($(".prosel_nei div").length == 0){
            return
        }

        // return;
        $(".prosel_nei div").eq(ind).addClass("on");
        $(".proxxk_xun").eq(ind).show();
        var ml=$(".prosel_nei div.on").offset().left;
        var w=$(".prosel_nei div.on").width();
        $(".prosel_xian div").css({"margin-left":ml,"width":w});

        $(".prosel_nei div").hover(function(){
            ml=$(this).offset().left;
            w=$(this).width();
            $(".prosel_xian div").css({"margin-left":ml,"width":w});
        },function(){
            ml=$(".prosel_nei div.on").offset().left;
            w=$(".prosel_nei div.on").width();
            $(".prosel_xian div").css({"margin-left":ml,"width":w});

        });

        $(".prosel_nei div").click(function(){
            console.log("you lick")
            var t = $(this).closest(".prosel_nei")
            var tIndex = $(this).closest(".prosel_nei").index();
            console.log("t index" , tIndex)

            t.children("div:first-child").addClass("on")
            t.siblings().children("div:first-child").removeClass("on")

            // ind=$(this).index();
            // $(this).addClass("on").siblings().removeClass("on");

            ml=$(".prosel_nei div.on").offset().left;
            w=$(".prosel_nei div.on").width();
            $(".prosel_xian div").css({"margin-left":ml,"width":w});
            // $(".proxxk_xun").hide();
            // $(".proxxk_xun").eq(ind).show();

        });

        var boxlen=$(".proxxk_xun").length;
        var neilen,maxw,xunml,boxw;
        for(var i=0; i<boxlen; i++){
            neilen=$(".proxxk_xun").eq(i).find("a").length;
            maxw=neilen*283;
            $(".proxxk_xun").eq(i).attr({"lenght":neilen,"maxwidth":maxw});
            $(".proxxk_xun").eq(i).find(".pxb_xun").css({"width":maxw});
        }

        $(".proxxk_xun_right").click(function(){
            boxw=parseInt($(this).parents(".proxxk_xun").width())+32;
            maxw=parseInt($(this).parents(".proxxk_xun").attr("maxwidth"));

            xunml=parseInt($(this).parents(".proxxk_xun").find(".pxb_xun").css("margin-left"));
            xunml=xunml-283;

            if($(this).parents(".proxxk_xun").find(".pxb_xun").width()<boxw){
                return;
            }


            if(xunml<(boxw-maxw)){
                xunml=(boxw-maxw);
            }
            $(this).parents(".proxxk_xun").find(".pxb_xun").animate({"margin-left":xunml});
        });


        $(".proxxk_xun_left").click(function(){

            xunml=parseInt($(this).parents(".proxxk_xun").find(".pxb_xun").css("margin-left"));
            xunml=xunml+283;
            if(xunml>=0){
                xunml=0;
            }
            $(this).parents(".proxxk_xun").find(".pxb_xun").animate({"margin-left":xunml});
        });

    });

// JavaScript Document
    $(document).ready(function(){

//首页banner箭头位置
// ban 效果
        var next1 = 0;
        var prev2 = 0;
        var click_shu = false;
        var str="<li class='licurr'></li>"
        $(function(){
            var li_width=$("#ban .ban_bj").width();
            // 获取ban 滚动就是 li 的宽度
            $('#ban .ban_bj li').not(':first').css({left:li_width});
            // 获取 li的个数 也就是 发、滚动的次数
            li_shu = $('#ban .ban_bj li').length;
            for(var i=1;i<li_shu;i++){
                str=str+"<li></li>";
            }
            $(".ul_dian").html(str);
            // 自动 滚动 定时器
            movezi = window.setInterval(function(){
                zimove(prev2,next1);
            },5000)
            // 触碰 下面小图（就是触碰停止 自动滚动 离开启动 自动滚动 代码）
            $('#ban ul.ul_dian li').hover(function(){
                clearInterval(movezi)
            },function(){
                movezi = window.setInterval(function(){
                    zimove(prev2,next1);
                },5000);
            })/**/
            // 触碰 banner（就是触碰停止 自动滚动 离开启动 自动滚动 代码）
            $('.ban_bj li').hover(function(){
                clearInterval(movezi);
            },function(){
                movezi = window.setInterval(function(){
                    zimove(prev2,next1);
                },5000);
            })
            $('.jiantou div').hover(function(){
                clearInterval(movezi);
            },function(){
                movezi = window.setInterval(function(){
                    zimove(prev2,next1);
                },5000);
            })
            $(".jiantou .jiantou_left").click(function(){

                if(next1 <=0){
                    next1 = li_shu-1;
                    prev2 = 0;
                }else{
                    prev2 = next1;
                    next1 = next1-1;
                }
                moveleft(prev2,next1);

            });
            $("#flexslider").hover(function(){
                $(".jiantou").css("display","inline-block");
            },function(){
                $(".jiantou").hide(10)
            });
            $(".jiantou .jiantou_right").click(function(){

                if(next1 >=(li_shu-1)){
                    next1 = 0;
                    prev2 = li_shu-1;
                }else{
                    prev2 = next1;
                    next1 = next1+1;
                }
                moveright(prev2,next1);

            });
            // 点击 下面小图 执行的代码
            $('#ban ul.ul_dian li').click(function(){
                // 这个是获取 点击小图标 是第几个 返回的数 bannercurrIndex 就是 prev2
                var bannercurrIndex = $('#ban ul.ul_dian li').index(this);

                // 这个就是  自动滚动 代码
                moveright(next1,bannercurrIndex);
                // 这样 是为了  下面 执行 滚动
                next1 = bannercurrIndex;
            })
        })
//首页向   右   自动移动
        function moveright(_prev,_next){
            li_width=$("#ban .ban_bj").width();
            $('#ban .ban_bj li').eq(_next).addClass("on").siblings().removeClass("on");
            $('#ban .ban_bj li').eq(_prev).stop(true,false).animate({left:-li_width},1000,function(){})
            // 小图标 remove add  .Class
            $('#ban ul.ul_dian li').eq(_prev).removeClass('licurr');
            $('#ban ul.ul_dian li').eq(_next).addClass('licurr');
            $('#ban .ban_bj li').eq(_next).css({left:li_width}).stop(true,false).animate({left:0},1000,function(){
                click_shu = false;
            })
        }
//首页向  左   自动移动
        function moveleft(_prev,_next){
            li_width=$("#ban .ban_bj").width();
            $('#ban .ban_bj li').eq(_next).addClass("on").siblings().removeClass("on");
            $('#ban .ban_bj li').eq(_prev).stop(true,false).animate({left:li_width},1000,function(){})
            $('#ban ul.ul_dian li').eq(_prev).removeClass('licurr');
            $('#ban ul.ul_dian li').eq(_next).addClass('licurr');
            $('#ban .ban_bj li').eq(_next).css({left:-li_width}).stop(true,false).animate({left:0},1000,function(){
                click_shu = false;
            })
        }
// 自动移动 实际 执行代码
        function zimove(){
            if(next1 >=(li_shu-1)){
                next1 = 0;
                prev2 = li_shu-1;
            }else{
                prev2 = next1;
                next1 = next1+1;
            }
            moveright(prev2,next1);
        }
        $(document).ready(function(e) {
            $('.flex_comBtn').hover(function(){
                window.clearInterval(movezi)
            },function(){
                movezi = window.setInterval(function(){
                    zimove(prev2,next1);
                },5000)
            })
        });
    })








}