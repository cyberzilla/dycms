/*! Copyright (c) 2018 Abu Dzakiyyah (https://abu.dzakiyyah.com)
 * Licensed under the MIT (http://www.opensource.org/licenses/mit-license.php)
 *
 * Version: 1.0
 *
 */

$(document).ajaxStart(function () {
    Pace.restart()
})
contentAutoHeight({element: ".mainContent", scroll: true, drag: false, substract: 170, plugin: "slimScroll"});
function contentAutoHeight(parameters){
    var element = parameters.element;
    var scroll = parameters.scroll;
    var drag = parameters.drag;
    var substract = parameters.substract;
    var plugin = parameters.plugin;
    var options = "";
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
    $(element).slimScroll({
      height:contentHeight,
      size:"3px"
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

function getTabData(key){
  var dataTabs = JSON.parse(localStorage[key]===undefined?null:localStorage[key]);
  return dataTabs;
}

function saveTabData(key,data){
  var dataTabs = JSON.parse(localStorage[key]===undefined?JSON.stringify([]):localStorage[key]);
      dataTabs.push(data);
      localStorage.setItem(key,JSON.stringify(dataTabs));
}

function findTabData(key,param,query){
  var dataTabs = JSON.parse(localStorage[key]);
  for(var i=0;i<dataTabs.length;i++){
    if(query === dataTabs[i][param]){
      return dataTabs[i];
      //console.log(dataTabs[i]);
    }
  }
}

function updateTabData(key,param,query){
  var dataTabs = JSON.parse(localStorage[key]);
  for (var i = 0; i < dataTabs.length; i++) {
     if( query === dataTabs[i].tabIndex){
         dataTabs[i][param] = 'active';
     }else{
         dataTabs[i][param] = '';
     }
  }
  localStorage.setItem(key,JSON.stringify(dataTabs));
}

function deleteTabData(key,param,query){
  var dataTabs = JSON.parse(localStorage[key]===undefined?JSON.stringify([]):localStorage[key]),
      tabsFilter = dataTabs.filter(function(item) {
       return item[param] !== query;
  });
  localStorage.setItem(key,JSON.stringify(tabsFilter));
}

function bindCloseTab(){
  $("span.closeTab").click(function(){
    var parent = $(this).parents("li a"),
        id = parent[0].hash,
        tabId = id.split("#"),
        prev = $(this).parents("li.active").prev(),
        next = $(this).parents("li.active").next();
    $(this).parents("li").remove();
    $(id).remove();
    deleteTabData('mainTabs','tabId',tabId[1]);
    if(next.length===0){
      prev.find("a").click();
    }else{
      next.find("a").click();
    }
  });
}

function loadURL(url,element, param){
  $.get(url,param,function(response){
    $(element).html(response);
  }).fail(function(xhr){
    var errorPage = '<div class="error-page"><h2 class="headline text-yellow" style="margin-top: -25px; margin-bottom: 0px;"> 404</h2><div class="error-content"><h3><i class="fa fa-warning text-yellow"></i> Oops! Terjadi Kesalahan...</h3><p>Sistem tidak dapat menemukan halaman yang anda akses, silahkan menghubungi Administrator untuk masalah ini.</p></div></div>';
    $(element).html(errorPage);
  })
}

function restoreSettings(){
  var tabs = getTabData('mainTabs'),
      sidebar = getTabData('sidebarSetting');
  //Restore Tabs
  if(tabs!==null){
    restoreTabs(tabs);
  }else{
    //Home Setting
    var home = {
        tabIndex:0,
        tabId:"home",
        tabUrl:"pages/home.html",
        tabTitle:"Beranda",
        tabIcon:"fa fa-home",
        tabDesc:"Selamat Datang Admin",
        tabStatus:'active'
    };
    saveTabData('mainTabs',home);
    tabTrigger("a[href='#home']");
    $("a[href='#home']").tab('show');
    loadURL(home.tabUrl,"#"+home.tabId+"Content")
    //Save Setting For Home
  }

  //Restore Sidebar
    if(sidebar!==null){
      if(sidebar.mode==="sidebar-collapse"){
          $("body").addClass(sidebar.mode);
      }else{
          $("body").removeClass(sidebar.mode);
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
          navTitle = '<li data-index="'+tab['tabIndex']+'"><a href="#'+tab['tabId']+'" data-toggle="tab"><i class="'+tab['tabIcon']+'"></i> '+tab['tabTitle']+' <span class="closeTab"><i class="fa fa-times-circle"></i></span></a></li>';
          navContent = '<div class="tab-pane" id="'+tab['tabId']+'"><section class="content-header"><h1>'+parentName+'<small>'+tab['tabDesc']+'</small></h1><ol class="breadcrumb"><li><a><i class="'+parentIcon+'"></i> '+parentName+'</a></li><li class="active">'+tab['tabTitle']+'</li></ol></section><section id="'+tab['tabId']+'Content" class="content text-justify mainContent"></section></div>';
    }
    navTitleContainer.append(navTitle);
    navContentContainer.append(navContent);
    if(tab['tabStatus']==="active"){
        activeId = tab['tabId'];
        activeUrl = tab['tabUrl'];
    }else{
        reloadButton = '<div class="error-page"><div class="error-content text-center" style="margin-left: 0px;"><h3><i class="fa fa-info-circle text-primary"></i> Mode penghemat daya aktif...</h3><p>Sebaiknya anda tidak merefresh browser, Silahkan tekan tombol reload untuk memuat halaman<br><br><button class="btn btn-primary" onclick="restoreContent(\''+tab['tabId']+'\',\''+tab['tabUrl']+'\');" data-toggle="tooltip" title="Tekan untuk reload halaman" data-container=".tab-content" ><i class="fa fa-spinner fa-spin"></i> Reload</button></p></div></div>';
        $("#"+tab['tabId']+"Content.mainContent").append(reloadButton);
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
  bindCloseTab();
  bindDynamicTab();
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
}

function buildTabs(opt){
  var navTitleContainer = $(".mainNav>ul.nav"),
      navContentContainer = $(".mainNav>div.tab-content"),
      parentIcon = $(opt.parent[0]).find("i").attr("class"),
      parentName = $(opt.parent[0]).find("span").html(),
      checkTabs = navTitleContainer.find("a[href='#"+opt.id+"']"),
      prevIndex = navTitleContainer.find("li:last-child").attr("data-index"),
      index = parseInt(prevIndex)+1,
      navTitle = '<li data-index="'+index+'"><a href="#'+opt.id+'" data-toggle="tab"><i class="'+opt.icon+'"></i> '+opt.title+' <span class="closeTab"><i class="fa fa-times-circle"></i></span></a></li>',
      navContent = '<div class="tab-pane" id="'+opt.id+'"></div>';
      navContentHeader = '<section class="content-header"><h1>'+parentName+'<small>'+opt.desc+'</small></h1><ol class="breadcrumb"><li><a><i class="'+parentIcon+'"></i> '+parentName+'</a></li><li class="active">'+opt.title+'</li></ol></section><section id="'+opt.id+'Content" class="content text-justify mainContent"></section>';

  if(checkTabs.length<1){
    navTitleContainer.append(navTitle);
    navContentContainer.append(navContent);
    $("#"+opt.id).append(navContentHeader);
    //Save To Local Storage
    var tabsData = {
      tabIndex:index,
      tabId:opt.id,
      tabUrl:opt.url,
      tabTitle:opt.title,
      tabIcon:opt.icon,
      tabDesc:opt.desc,
      tabStatus:''
    };
    saveTabData('mainTabs',tabsData);
    //Save To Local Storage
    bindCloseTab();
    contentAutoHeight({
        element: "#" + opt.id + "Content",
        scroll: true,
        drag: false,
        substract: 170,
        plugin: "slimScroll"
    });
    loadURL(opt.url,"#"+opt.id+"Content");
    bindDynamicTab();
    tabTrigger("a[href='#"+opt.id+"']");
    return true;
  }else{
    bindDynamicTab();
    return false;
  }
}

function bindDynamicTab(){
  $(".draggable").draggable_nav({
    axis: 'x' // only horizontally
  });
  // jquery ui draggable
  $(".draggable").draggable({
    axis: 'x', // only horizontally
    drag: function(e, ui) {
      var $element = ui.helper;
      // calculate
      var w = $element.width();
      var pw = $element.parent().width();
      var maxPosLeft = 0;
      if (w > pw) {
        maxPosLeft = - (w - pw);
      }
      var h = $element.height();
      var ph = $element.parent().height();
      var maxPosTop = 0;
      if (h > ph) {
        maxPosTop = h - ph;
      }
      // horizontal
      if (ui.position.left > 0) {
        ui.position.left = 0;
      } else if (ui.position.left < maxPosLeft) {
        ui.position.left = maxPosLeft;
      }
      // vertical
      if (ui.position.top > 0) {
        ui.position.top = 0;
      } else if (ui.position.top < maxPosTop) {
        ui.position.top = maxPosTop;
      }
    }
  });
}

function tabTrigger(element){
  $(element).on('shown.bs.tab', function (e) {
    index = parseInt($(this).parent("li").attr("data-index"));
    updateTabData('mainTabs','tabStatus',index);
  });
}

function saveSettingSidebar(key,param){
    var settings = {mode: param};
    localStorage.setItem(key,JSON.stringify(settings));
}

$(function(){
  restoreSettings();

  //Save Sidebar Collapse Setting
  $('.sidebar-toggle').click(function() {
      if($('body').delay(300).hasClass('sidebar-collapse')) {
          saveSettingSidebar("sidebarSetting","");
      }
      else {
          saveSettingSidebar("sidebarSetting","sidebar-collapse");
      }
  });

  //Menu Top Right {Message, Notification, Task}
  $(".dropdown-menu li>.menu").slimScroll({
    height:"200px",
    size:"3px"
  });

  //Tooltip Activation
   // $("[data-toggle=tooltip]").tooltip();
  //Submenu Action
  $(".subMenu").click(function(){
    var opt = {
        url : $(this).data("url"),
        id : $(this).data("id"),
        desc : $(this).data("desc"),
        parent : $(this).parents("li.treeview").find("a"),
        icon : $(this).find("i").attr("class"),
        title : $(this).find("span").html()
      };

    var checkTabs = buildTabs(opt);
    var currentTab = $('.mainNav>ul>li>a[href="#'+opt.id+'"]'),
        index = parseInt(currentTab.parent("li").attr("data-index"));
    currentTab.tab('show');
    if(checkTabs===false){
      updateTabData('mainTabs','tabStatus',index);
    }
  });
});
