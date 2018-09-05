/*! Copyright (c) 2018 Abu Dzakiyyah (https://abu.dzakiyyah.com)
 * Licensed under the MIT (http://www.opensource.org/licenses/mit-license.php)
 *
 * Version: 3.3a
 *
 */

$(document).ajaxStart(function () {
    Pace.restart()
});

function contentAutoHeight(parameters){
    var element = parameters.element,
        scroll = parameters.scroll,
        drag = parameters.drag,
        substract = parameters.substract,
        plugin = parameters.plugin,
        options = "";
  var contentHeight = $(document).height() - substract;
  if(plugin==="niceScroll"){
    $(element).attr("style","height:"+contentHeight+"px;");
    if(drag===true){
      options = {
        touchbehavior:true,
        usetransition:true,
        hwacceleration:true
        //horizrailenabled:false
      }
    }else{
      options = "";
    }
    if(scroll===true){
      $(element).niceScroll(options);
    }
  }else if(plugin==="slimScroll"){
    $(window).resize(function(){
          var height=$(window).height()-(substract+7);
          $(element).height(height);
          $(element).parent('.slimScrollDiv').height(height+7);
    });
    
    $(element).slimScroll({
      height:contentHeight,
      wheelStep : 10,
      touchScrollStep : 75,
      size:"4px",
      distance: '2px',
      railVisible: true
    });
  }else{
    console.log("No Plugin");
  }
}

function getNext(){
  var next = $(".mainNav>ul>li.active").next();
  next.find("a").click();
}

function getPrev(){
  var prev = $(".mainNav>ul>li.active").prev();
  prev.find("a").click();
}

function initCloseTab(){
  $("span.closeTab").click(function(){
    var parent = $(this).parents("li a"),
        id = parent[0].hash,
        tabId = id.split("#"),
        prev = $(this).parents("li.active").prev(),
        next = $(this).parents("li.active").next();
    $(this).parents("li").remove();
    $(id).remove();
    //Remove Storage Data
    deleteData({
        key:'mainTabs',
        param:'tabId',
        find:tabId[1]
    });
    if(next.length===0){
      prev.find("a").click();
    }else{
      next.find("a").click();
    }
  });
}

function renderPage(html,data){
    for (var key in data) {
        //console.log("property name: " + key + ", property value: " + data[key]);
        html = html.replace('{{'+key+'}}', data[key]);
    }
    return html;
}

function ajaxServices(params){
    var module = params.module, //Nama Module
        form = params.form, //form ID
        data = params.data, //form serialize
        action = params.action, //form url
        method = params.method, //form method
        type = params.type, //type of response data
        request = params.request, //module name
        target = params.target; //element of target

    if(method.toLowerCase()==='post'){
        $.post(action,data+'&request='+request,function(response){
            $(module).find(target).html(renderPage(response.views,response.content));
        },'json');
        $(module).find(form).find('[type=submit]').button('reset');
    }else if(method.toLowerCase()==='get'){
        $.get(action,data,function (response) {
            console.log(response);
            $(target).html(response);
        });
    }else{
        console.log("Method Not Found");
    }

}

function loadURL(url,element, param){
  $.get(url,param,function(response){
      $(element).html(response);
    //Load Form Setting
    initializeForm();
  }).fail(function(){
    var errorPage = '<div class="error-page"><h2 class="headline text-yellow" style="margin-top: -25px; margin-bottom: 0;"> 404</h2><div class="error-content"><h3><i class="fa fa-warning text-yellow"></i> Oops! Terjadi Kesalahan...</h3><p>Sistem tidak dapat menemukan halaman yang anda akses, silahkan menghubungi Administrator untuk masalah ini.</p></div></div>';
    $(element).html(errorPage);
  })
}

function restoreSettings(){
  var tabs = getData({key:'mainTabs'}),
      appSettings = getData({key:'appSettings'});
  //Restore Tabs
  if(tabs!==null){
    restoreTabs(tabs);
  }else{
    //Home Setting
    pushData({
       key:'mainTabs',
       data:[{
           tabIndex:0,
           tabId:"home",
           tabUrl:"pages/home.html",
           tabTitle:"Beranda",
           tabIcon:"fa fa-home",
           tabDesc:"Selamat Datang Admin",
           tabStatus:'active'
       }]
    });

    tabTrigger("a[href='#home']");
    $("a[href='#home']").tab('show');
    loadURL("pages/home.html","#homeContent");
    //Save Setting For Home
  }

  //Restore Setting
    if(appSettings!==null){
      //restore Sidebar style
      if(appSettings[0].sidebar==="sidebar-collapse"){
          $("body").addClass(appSettings[0].sidebar);
      }else{
          $("body").removeClass(appSettings[0].sidebar);
      }

      //Restore Color Scheme
      if(appSettings[0].skin!==null){
          $("body").addClass(appSettings[0].skin);
      }
    }

}

function restoreTabs(jsonData){
  var navTitleContainer = $(".mainNav ul.nav"),
      navContentContainer = $(".mainNav div.tab-content"),
      navTitle = "",
      navContent = "",
      activeId = "",
      activeUrl = "",
      reloadButton="";
  $.each(jsonData,function(index, tab) {
    if(tab['tabId']!=='home'){
      var selector = $(".subMenu[data-id='"+tab['tabId']+"']"),
          parentName = selector.parents("li.treeview").find("span").html(),
          parentIcon = selector.parents("li.treeview").find("i").attr("class");
          navTitle = '<li data-index="'+tab['tabIndex']+'"><a href="#'+tab['tabId']+'" data-toggle="tab" title="'+tab['tabDesc']+'"><i class="'+tab['tabIcon']+'"></i> '+tab['tabTitle']+' <span class="closeTab" title="Close Tab"><i class="fa fa-times"></i></span></a></li>';
          navContent = '<div class="tab-pane" id="'+tab['tabId']+'"><section class="content-header"><h1>'+parentName+'<small>'+tab['tabDesc']+'</small></h1><ol class="breadcrumb"><li><a><i class="'+parentIcon+'"></i> '+parentName+'</a></li><li class="active">'+tab['tabTitle']+'</li></ol></section><section id="'+tab['tabId']+'Content" class="content text-justify mainContent  animated fadeIn"></section></div>';
    }
    navTitleContainer.append(navTitle);
    navContentContainer.append(navContent);
    if(tab['tabStatus']==="active"){
        activeId = tab['tabId'];
        activeUrl = tab['tabUrl'];
    }else{
        var mainContent = $("#"+tab['tabId']+"Content.mainContent");
        reloadButton = '<div class="error-page"><div class="error-content text-center" style="margin-left: 0;"><h3><i class="fa fa-info-circle text-primary"></i> Mode penghemat daya aktif...</h3><p>Anda telah merefresh browser, Silahkan tekan tombol reload untuk memuat halaman<br><br><button class="btn btn-primary" onclick="restoreContent(\''+tab['tabId']+'\',\''+tab['tabUrl']+'\');" data-toggle="tooltip" title="Tekan untuk reload halaman" data-container=".tab-content" ><i class="fa fa-spinner fa-spin"></i> Reload</button></p></div></div>';
        mainContent.append(reloadButton);
        mainContent.addClass("reload");
    }
    tabTrigger("a[href='#"+tab['tabId']+"']");
    contentAutoHeight({
        element: "#" + tab['tabId'] + "Content",
        scroll: true,
        drag: false,
        substract: 170,
        plugin: "slimScroll"
    });
  });
  initCloseTab();
  initDynamicTab();
  $("a[href='#"+activeId+"']").tab('show');
  loadURL(activeUrl,"#"+activeId+"Content");
}

function restoreContent(element,url){
  contentAutoHeight({
      element: "#" + element + "Content",
      scroll: true,
      drag: false,
      substract: 170,
      plugin: "slimScroll"
  });
  loadURL(url,"#"+element+"Content");
  $("#"+element+"Content").removeClass("animated fadeIn").width('auto').addClass("animated fadeIn");
}

function buildTabs(opt){
  var navTitleContainer = $(".mainNav>ul.nav"),
      navContentContainer = $(".mainNav>div.tab-content"),
      parentIcon = $(opt.parentMenu).find("i").attr("class")===undefined?opt.parentIcon:$(opt.parentMenu).find("i").attr("class"),
      parentName = $(opt.parentMenu).find("span").html()===undefined?opt.parentMenu:$(opt.parentMenu).find("span").html(),
      checkTabs = navTitleContainer.find("a[href='#"+opt.id+"']"),
      prevIndex = navTitleContainer.find("li:last-child").attr("data-index"),
      index = parseInt(prevIndex)+1,
      navTitle = '<li data-index="'+index+'"><a href="#'+opt.id+'" data-toggle="tab" title="'+opt.desc+'"><i class="'+opt.icon+'"></i> '+opt.title+' <span class="closeTab" title="Close Tab"><i class="fa fa-times"></i></span></a></li>',
      navContent = '<div class="tab-pane" id="'+opt.id+'"></div>',
      navContentHeader = '<section class="content-header"><h1>'+parentName+'<small>'+opt.desc+'</small></h1><ol class="breadcrumb"><li><a><i class="'+parentIcon+'"></i> '+parentName+'</a></li><li class="active">'+opt.title+'</li></ol></section><section id="'+opt.id+'Content" class="content text-justify mainContent  animated fadeIn"></section>';

  if(checkTabs.length<1){
    navTitleContainer.append(navTitle);
    navContentContainer.append(navContent);
    $("#"+opt.id).append(navContentHeader);
    //Save To Local Storage
    pushData({
        key:'mainTabs',
        data:[{
            tabIndex:index,
            tabId:opt.id,
            tabUrl:opt.url,
            tabTitle:opt.title,
            tabIcon:opt.icon,
            tabDesc:opt.desc,
            tabStatus:''
        }]
    });
    //Save To Local Storage
    initCloseTab();
    contentAutoHeight({
        element: "#" + opt.id + "Content",
        scroll: true,
        drag: false,
        substract: 170,
        plugin: "slimScroll"
    });
    loadURL(opt.url,"#"+opt.id+"Content");
    initDynamicTab();
    tabTrigger("a[href='#"+opt.id+"']");
    return true;
  }else{
    var checkReload = $("#"+opt.id+"Content");
    if(checkReload.hasClass("reload")===true){
        loadURL(opt.url,"#"+opt.id+"Content");
        checkReload.removeClass("animated fadeIn").width('auto').addClass("animated fadeIn");
        checkReload.removeClass("reload");
    }
    initDynamicTab();
    return false;
  }
}

function tabTrigger(element){
  $(element).on('shown.bs.tab', function() {
    var find = parseInt($(this).parent("li").attr("data-index"));
    changeData({
        key:'mainTabs',
        findParam:'tabIndex',
        setParam:'tabStatus',
        find:find,
        setValue:'active:'
    });
  });
}

function initMenuClick() {
    //Skin Click
    $(".tb-skin td").click(function(){
        var skin = $(this).find('img').attr("alt"),
            oldSkin = getData({key:"appSettings"});
        //$("body").switchClass(oldSkin[0].skin,skin);
        $("body").removeClass(oldSkin[0].skin).addClass(skin);
        updateData({key:'appSettings',setParam:'skin',replace:true,setValue:skin});
    });

    //Save Sidebar Collapse Setting
    $('.sidebar-toggle').click(function() {
        var sidebar = getData({key:'appSettings'});
        if($('body').delay(300).hasClass('sidebar-collapse')) {
            if(sidebar!==null){
                updateData({key:'appSettings',findParam:'sidebar',setParam:'sidebar',find:'sidebar-collapse',setValue:""});
            }else{
                pushData({key:'appSettings',data:[{sidebar:"",skin:"skin-blue"}]});
            }
        }
        else {
            if(sidebar!==null){
                updateData({key:'appSettings',findParam:'sidebar',setParam:'sidebar',find:'',setValue:"sidebar-collapse"});
            }else{
                pushData({key:'appSettings',data:[{sidebar:"sidebar-collapse",skin:"skin-blue"}]});
            }
        }
    });

    //Menu Top Right {Message, Notification, Task}
    $(".dropdown-menu li>.menu").slimScroll({height:"200px",size:"3px"});

    //Tooltip Activation
    //$("[title]").tooltip();
    //Submenu Action
    $(".subMenu").click(function(){
        var opt = {
            url : $(this).data("url"),
            id : $(this).data("id"),
            desc : $(this).data("desc"),
            parentMenu : $(this).parents("li.treeview").find("a"),
            icon : $(this).find("i").attr("class"),
            title : $(this).find("span").html()
        };
        var checkTabs = buildTabs(opt);
        var currentTab = $('.mainNav>ul>li>a[href="#'+opt.id+'"]'),
            index = parseInt(currentTab.parent("li").attr("data-index"));
        currentTab.tab('show');
        if(checkTabs===false){
            changeData({key:'mainTabs',findParam:'tabIndex',setParam:'tabStatus',find:index, setValue:'active:'});
        }
    });

    $(".tabCreate").click(function () {
        var opt = {
            url : $(this).data("url"),
            id : $(this).data("id"),
            desc : $(this).data("desc"),
            parentMenu : $(this).data("parent"),
            parentIcon : $(this).data("parent-icon"),
            icon : $(this).data("icon"),
            title : $(this).data("title")
        };
        var checkTabs = buildTabs(opt);
        var currentTab = $('.mainNav>ul>li>a[href="#'+opt.id+'"]'),
            index = parseInt(currentTab.parent("li").attr("data-index"));
        currentTab.tab('show');
        if(checkTabs===false){
            changeData({key:'mainTabs',findParam:'tabIndex',setParam:'tabStatus',find:index, setValue:'active:'});
        }
    });
}

function buildMenu(opt) {
    //Build Menu
    var menu = opt.menu,
        sidebarContainer = $("ul.sidebar-menu"),
        mainMenu = "",
        subMenu = "";
    $.each(menu,function(i_main, main) {
        if(main.mainMenuChild===true){
            mainMenu += '<li class="treeview"><a><i class="'+main.mainMenuIcon+'"></i> <span class="mainTitle">'+main.mainMenuTitle+'</span><span class="pull-right-container"><i class="fa fa-angle-left pull-right"></i></span></a>';
            subMenu = '<ul class="treeview-menu">';
            $.each(main.mainMenuContent,function (i_sub, sub) {
                subMenu += '<li><a class="subMenu" data-url="'+sub.subMenuUrl+'" data-id="'+sub.subMenuId+'" data-desc="'+sub.subMenuDesc+'"><i class="'+sub.subMenuIcon+'"></i> <span>'+sub.subMenuTitle+'</span></a></li>';
            });
            subMenu += '</ul>';
        }else{
            mainMenu += '<li class="treeview"><a class="subMenu" data-url="'+main.mainMenuUrl+'" data-id="'+main.mainMenuId+'" data-desc="'+main.mainMenuDesc+'"><i class="'+main.mainMenuIcon+'"></i> <span>'+main.mainMenuTitle+'</span></a>';
        }
        mainMenu += subMenu+'</li>';
    });

    sidebarContainer.append(mainMenu);
}

function buildAppInfo(){
  var appData = $.ajax({url:'app.json',type:'get',async:false,success: function (data) {return data;}}),
      AppName = appData.responseJSON[0].AppName,
      AppDesc = appData.responseJSON[0].AppDesc,
      AppVersion = appData.responseJSON[0].AppVersion,
      AppLink = appData.responseJSON[0].AppLink,
      AppLogo = appData.responseJSON[0].AppLogo,
      AppWebsite = appData.responseJSON[0].AppWebsite,
      AppAuthor = appData.responseJSON[0].AppAuthor,
      AuthorWebsite = appData.responseJSON[0].AuthorWebsite,
      moduleMenu = appData.responseJSON[0].DataContent[0].moduleData;

  var appInfo = getData({key:'appInfo'}),
      menu = getData({key:'moduleMenu'}),
      appSettings = getData({key:'appSettings'}),
      c_AppLink = $("body>.wrapper>.main-header>a"),
      c_AppName = $("body>.wrapper>.main-header>a>span.logo-lg"),
      c_AppLogo = $("body>.wrapper>.main-header>a>span.logo-mini"),
      c_AppVersion = $("footer.main-footer>div>span.version"),
      c_AppAuthor = $("footer.main-footer>span.copyright>a");

  if(appInfo===null){
    pushData({key:'appInfo',data:[{AppName:AppName,AppDesc:AppDesc,AppVersion:AppVersion,AppLink:AppLink,AppLogo:AppLogo,AppWebsite:AppWebsite,AppAuthor:AppAuthor,AuthorWebsite:AuthorWebsite}]});
    // Set Title
    document.title = AppName+" | "+AppDesc;
    //Set Web Info
    c_AppLink.attr("href",AppLink);
    c_AppName.html(AppName);
    c_AppLogo.html("<i class='fa fa-shopping-bag'></img>");
    c_AppVersion.html(AppVersion);
    c_AppAuthor.html(AppAuthor);
    c_AppAuthor.attr("href",AuthorWebsite);
  }else{
      if(AppVersion!==appInfo[0].AppVersion){
        jConfirm("current: app.json("+appInfo[0].AppVersion+")<br>new update: app.json("+AppVersion+")<br><br>Terdapat Update Setting, Update Sekarang?","Update Setting",function(r){
            if(r){
                pushData({replace:true,key:'appInfo',data:[{AppName:AppName,AppDesc:AppDesc,AppVersion:AppVersion,AppLink:AppLink,AppLogo:AppLogo,AppWebsite:AppWebsite,AppAuthor:AppAuthor,AuthorWebsite:AuthorWebsite}]});
                // Set Title
                document.title = AppName+" | "+AppDesc;
                //Set Web Info
                c_AppLink.attr("href",AppLink);
                c_AppName.html(AppName);
                c_AppLogo.html("<i class='fa fa-shopping-bag'></img>");
                c_AppVersion.html(AppVersion);
                c_AppAuthor.html(AppAuthor);
                c_AppAuthor.attr("href",AuthorWebsite);
            }else{
                document.title = appInfo[0].AppName+" | "+appInfo[0].AppDesc;
                //Set Web Info
                c_AppLink.attr("href",appInfo[0].AppLink);
                c_AppName.html(appInfo[0].AppName);
                c_AppLogo.html("<i class='fa fa-shopping-bag'></img>");
                c_AppVersion.html(appInfo[0].AppVersion);
                c_AppAuthor.html(appInfo[0].AppAuthor);
                c_AppAuthor.attr("href",appInfo[0].AuthorWebsite);
            }
        });
      }else {
          document.title = appInfo[0].AppName+" | "+appInfo[0].AppDesc;
          //Set Web Info
          c_AppLink.attr("href",appInfo[0].AppLink);
          c_AppName.html(appInfo[0].AppName);
          c_AppLogo.html("<i class='fa fa-shopping-bag'></img>");
          c_AppVersion.html(appInfo[0].AppVersion);
          c_AppAuthor.html(appInfo[0].AppAuthor);
          c_AppAuthor.attr("href",appInfo[0].AuthorWebsite);
      }
  }

  //cek LocalStorage if data exist
  if(menu===null){
      //Build Menu
      buildMenu({menu:moduleMenu});
      //Save Menu Data Into local Storage
      pushData({key:'moduleMenu',data:moduleMenu});
      //Restore To Home
      pushData({
          key:'mainTabs',
          replace:true,
          data:[{
              tabIndex:0,
              tabId:"home",
              tabUrl:"pages/home.html",
              tabTitle:"Beranda",
              tabIcon:"fa fa-home",
              tabDesc:"Selamat Datang Admin",
              tabStatus:'active'
          }]
      });
      //Restore Setting if refresh browser
      restoreSettings();
      //Reset Menu Click
      initMenuClick();
  }else{
      if(JSON.stringify(moduleMenu)!==JSON.stringify(menu)){
          jConfirm("Terjadi perubahan struktur menu, Anda yakin akan <br> memuat konfigurasi menu yang baru?",AppName+" v. "+AppVersion,function(r){
             if(r){
                 //Build Menu
                 buildMenu({menu:moduleMenu});
                 //Save Menu Data Into local Storage
                 pushData({key:'moduleMenu',data:moduleMenu,replace:true});
                 //Restore To Home
                 pushData({
                     key:'mainTabs',
                     replace:true,
                     data:[{
                         tabIndex:0,
                         tabId:"home",
                         tabUrl:"pages/home.html",
                         tabTitle:"Beranda",
                         tabIcon:"fa fa-home",
                         tabDesc:"Selamat Datang Admin",
                         tabStatus:'active'
                     }]
                 });
                 //Restore Setting if refresh browser
                 restoreSettings();
                 //Reset Menu Click
                 initMenuClick();
             }else{
                 //Build Menu
                 buildMenu({menu:menu});
                 //Restore Setting if refresh browser
                 restoreSettings();
                 //Reset Menu Click
                 initMenuClick();
             }
          });
      }else{
          //Build Menu
          buildMenu({menu:menu});
          //Restore Setting if refresh browser
          restoreSettings();
          //Reset Menu Click
          initMenuClick();
      }
  }
  //set default
  if(appSettings===null){
        pushData({key:'appSettings',data:[{sidebar:"",skin:"skin-blue"}]});
        $("body").addClass("skin-blue");
  }
}

function initializeForm(){
    //Set Match HTML5

    //Init Select2 with Validation
    $('.select2').each(function (i,obj) {
        $(obj).select2().on("change",function(){
            if($(this).val()!==""){
                $(this).valid();
            }
        });
    });

    //fixed height with slimscroll
    $("[data-fixedheight]").each(function (i,obj){
        // var opt = $(obj).data("fixedheight")[0];
        //     opt.width = ""+$(obj).width()+"px"; //add key and value into array object
        //     console.log(opt);
        // $(obj).slimScroll(opt).bind("slimscroll", function (i,pos) {
        //     console.log(pos);
        // });
        $(obj).slimScroll($(obj).data("fixedheight")[0]);
    });

    //Pretty Checkbox
    //Checkbox
    $("[type=checkbox]").each(function (i,obj) {
        var checkboxStyle = $(obj).data("style")!==undefined?$(obj).data("style"):"",
            checkboxToggle = $(obj).data("label-toggle")!==undefined?$(obj).data("label-toggle"):"",
            checkboxLabelType = $(obj).data("label-type")!==undefined?$(obj).data("label-type"):"",
            checkboxIcon = "",checkboxIconOn="",checkboxIconOff="";

            if(checkboxToggle!==true || checkboxToggle===undefined){
                var checkboxLabel = $(obj).data("label")!==undefined?$(obj).data("label"):"",
                    checkboxLabelStyle = $(obj).data("label-style")!==undefined?$(obj).data("label-style"):"";
                if(checkboxLabelType==="icon"){
                    checkboxStyle += " p-icon";
                    checkboxIcon = $(obj).data("label-icon")!==undefined?"<i class='icon "+$(obj).data("label-icon")+"'></i>":"";
                }else if(checkboxLabelType==="image"){
                    checkboxStyle += " p-image";
                    checkboxIcon = $(obj).data("label-icon")!==undefined?"<img src='" + $(obj).data("label-icon") + "'/>":"";
                }else{
                    checkboxStyle += " p-default";
                    checkboxIcon = "";
                }
                if($(obj).parent('.pretty').length<1){
                    $(obj).wrap('<div class="pretty '+checkboxStyle+'"></div>');
                    $(obj).after('<div class="state '+checkboxLabelStyle+'">'+checkboxIcon+'<label>'+checkboxLabel+'</label></div>');
                }
            }else{
                var checkboxLabelOn = $(obj).data("label-on")!==undefined?$(obj).data("label-on"):"",
                    checkboxLabelOff = $(obj).data("label-off")!==undefined?$(obj).data("label-off"):"",
                    checkboxLabelStyleOn = $(obj).data("label-style-on")!==undefined?$(obj).data("label-style-on"):"",
                    checkboxLabelStyleOff = $(obj).data("label-style-off")!==undefined?$(obj).data("label-style-off"):"";

                if(checkboxLabelType==="icon"){
                    checkboxStyle += " p-icon p-toggle";
                    checkboxIconOn = $(obj).data("label-icon-on")!==undefined?"<i class='icon "+$(obj).data("label-icon-on")+"'></i>":"";
                    checkboxIconOff = $(obj).data("label-icon-off")!==undefined?"<i class='icon "+$(obj).data("label-icon-off")+"'></i>":"";
                }else if(checkboxLabelType==="image"){
                    checkboxStyle += " p-image p-toggle";
                    checkboxIconOn = $(obj).data("label-icon-on")!==undefined?"<img src='" + $(obj).data("label-icon-on") + "'/>":"";
                    checkboxIconOff = $(obj).data("label-icon-off")!==undefined?"<img src='" + $(obj).data("label-icon-off") + "'/>":"";
                }else{
                    checkboxStyle += " p-default";
                    checkboxIconOn = "";
                    checkboxIconOff = "";
                }
                if($(obj).parent('.pretty').length<1){
                    $(obj).wrap('<div class="pretty '+checkboxStyle+'"></div>');
                    $(obj).after('<div class="state '+checkboxLabelStyleOn+' p-on">'+checkboxIconOn+'<label>'+checkboxLabelOn+'</label></div>');
                    $(obj).after('<div class="state '+checkboxLabelStyleOff+' p-off">'+checkboxIconOff+'<label>'+checkboxLabelOff+'</label></div>');
                }
            }
    });

    //Radio
    $("[type=radio]").each(function (i,obj) {
        var radioStyle = $(obj).data("style")!==undefined?$(obj).data("style"):"",
            radioLabelType = $(obj).data("label-type")!==undefined?$(obj).data("label-type"):"",
            radioLabel = $(obj).data("label")!==undefined?$(obj).data("label"):"",
            radioLabelStyle = $(obj).data("label-style")!==undefined?$(obj).data("label-style"):"",
            radioIcon = "";
            if(radioLabelType==="icon"){
                radioStyle += " p-icon";
                radioIcon = $(obj).data("label-icon")!==undefined?"<i class='icon "+$(obj).data("label-icon")+"'></i>":"";
            }else if(radioLabelType==="image"){
                radioStyle += " p-image";
                radioIcon = $(obj).data("label-icon")!==undefined?"<img src='" + $(obj).data("label-icon") + "'/>":"";
            }else{
                radioStyle += " p-default";
                radioIcon = "";
            }
            if($(obj).parent('.pretty').length<1){
                $(obj).wrap('<div class="pretty '+radioStyle+'"></div>');
                $(obj).after('<div class="state '+radioLabelStyle+'">'+radioIcon+'<label>'+radioLabel+'</label></div>');
            }
    });

    //Textarea Auto Height
    $("textarea[data-autoheight=true]").each(function (i,obj) {
        var shift = $(obj).data("autoheight-shift")!==undefined?$(obj).data("autoheight-shift"):false;
        if(shift===true){
            $(obj).keydown(function(e){
                if (e.keyCode === 13 && !e.shiftKey)
                {
                    e.preventDefault();
                }else
                {
                    autosize($(obj));
                }
            });
        }else{
            autosize($(obj));
        }
    });

    //Jquery Validation Form
    $("form[data-service=ajax]").each(function (i,obj) {
        var formAction = $(obj).attr("action"),
            formMethod = $(obj)[0].method,
            formName = $(obj)[0].name,
            formTarget = $(obj).data("target"),
            formType = $(obj).data("type"),
            formRequest = $(obj).data("request"),
            formId = "#"+$(obj)[0].id,
            formModule = "#"+$(formId).parents(".mainContent")[0].id;
        $(obj).validate({
            submitHandler: function(){
                $(obj).find('[type=submit]').button('loading');
                var formData = $(obj).serialize();
                ajaxServices({
                   module:formModule,
                   form:formId,
                   action: formAction,
                   method:formMethod,
                   target:formTarget,
                   request:formRequest,
                   type:formType,
                   data:formData
                });
            }
        });
    });
}

function loadDefaultSettings(){
    //Build App Info and Setting
    buildAppInfo();
    //Load Default Form Function
    contentAutoHeight({element: ".mainContent", scroll: true, drag: false, substract: 170, plugin: "slimScroll"});
}

$(function(){
    loadDefaultSettings();
});
