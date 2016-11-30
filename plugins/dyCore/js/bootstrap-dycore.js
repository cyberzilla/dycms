//Author			: Abu Ayyub
//Created			: 14 November 2015, 10:12:30
//File Name		: bootstrap-dycore.js
//Modul Name	: Core dyCMS
//Description		: Berisi Fungsi2 pendukung dyCMS	
//Visit My Web 	: www.dedymiswar.com
//Version			: 1.48

/*
#Log 1.48
Improve Notification Modal

#Log 1.47
Add Filemanager Page (KCFinder)
- Testing JSON (Optional)

#Log 1.46
Bug Fix SliderTab
Add Fullscreen Function

#Log 1.45
Add Chart Page (C3.js)
Change From TabDrop To SliderTab

#Log 1.44
change Tab variable to Object
Fix Tab Title (Without define in attr)
Add Sidebar Search Function

#Log 1.43
Fix Tab Rooticon (Without define in attr)
Fix Tab Root Name (Without define in attr)
Fix Tab Icon (Without define in attr)
*/

$(document).ajaxStart(function() {
		
	Pace.on("start", function(){
    $("div.paceDiv").show();
	});

	Pace.on("done", function(){
		$("div.paceDiv").hide();
	});
	
	Pace.restart(); 
});
	
$('#bhome').click(function(){
	  $('.nav-tabs > #lhome').find('a').trigger('click');
});
	
$(function () {
  showNotif("Selamat datang di DyCMS...");
  getVersion(1.48 , 2016);
  $('.nav-tabs > li > a:first').tab('show');
  responsiveTab();
  showTabEvent();
  sidebarSearch();
  //loadUrl("","./SecureAccess-home.php","#chome");
  loadUrl("","./SecureAccess.php?access="+replace(btoa("home")),"#chome");
  
  $(".fullscreen").click(function(){
	  x = $(this).find("a>i").attr("class") ;
	  if(x == "fa fa-expand")
	  {	
		showFullscreen(document.documentElement);
		$(this).find("a").html('<i class="fa fa-compress" data-toggle="tooltip" title="Exit Fullscreen"  data-placement="bottom"></i>');
	  }else{
		exitFullscreen();
		$(this).find("a").html('<i class="fa fa-expand" data-toggle="tooltip" title="Fullscreen"  data-placement="bottom"></i>');
	  }
  });
  
  $(".left").click(function(){
		var $posisi = $(".nav-tabs-custom > ul > li.active");
		if($posisi.prev("li").length > 0)
		{
			$posisi = $posisi.prev();
			toLeft = $posisi.width();
			$posisi.find("a").tab('show');
			$(".nav-tabs-custom > ul").animate( { scrollLeft: '-='+(toLeft) }, 500);
		}else{
			$(".nav-tabs-custom > ul").animate( { scrollLeft: '-='+($posisi.width()) }, 500);
		}
	});
	
	$(".right").click(function(){
		var $posisi = $(".nav-tabs-custom > ul > li.active");
		if($posisi.next("li").length > 0)
		{
			$posisi = $posisi.next();
			toRight = $posisi.width();
			$posisi.find("a").tab('show');
			$(".nav-tabs-custom > ul").animate( { scrollLeft: '+='+(toRight)}, 500);
		}else{
			$(".nav-tabs-custom > ul").animate( { scrollLeft: '+='+($posisi.width()) }, 500);
		}
	});
});

function postData(url,target){
	$.post("SecureAccess.php?access="+replace(btoa(url)), "" , function (response) {
	  if (response == "error") {
        var msg = '<div class="error-page"><h2 class="headline text-yellow" style="margin-top: -25px; margin-bottom: 0px;"> 404</h2><div class="error-content"><h3><i class="fa fa-warning text-yellow"></i> Oops! Terjadi Kesalahan...</h3><p>Halaman tidak dapat ditemukan, silahkan menghubungi <a href="mailto:administrator@dycms.com">administrator</a>.</p></div></div>';
		$("#"+target).html(msg);
		popupNotifikasi('error', '<i class="fa fa-heart text-danger"></i> Halaman tidak dapat ditemukan!');
      }else{
			var isi = $.parseJSON(response);
			$("#"+target).html(isi.Merek+'<br>'+isi.Khasiat+'<br>');
			console.log(isi);
	  }
  });
}

function popupNotifikasi(type, text) {
	//alert,information,error,warning,notification,success
    var n = noty({
        text	: text,
        type	: type,
        dismissQueue: true,
        layout      : 'topRight',
        closeWith   : ['click'],
        theme       : 'relax',
        maxVisible  : 10,
        animation   : {
            open  : 'animated bounceInDown',
            close : 'animated bounceOutRight',
            easing: 'swing',
            speed : 500
        }
	});
}

function responsiveTab(){
	$(".nav-tabs-custom > ul").niceScroll({
		    touchbehavior:true,
            cursoropacitymax:0,
            usetransition:true,
            hwacceleration:true,
            autohidemode:"hidden"
	});
}

function sidebarSearch(){
	$('.sidebar-form').submit(function (e) {
			e.preventDefault();
			var searchTab = {
				title : "Pencarian",
				url: "search",
				info: $(this).find("input").val(),
				icon : "fa fa-search",
				root: "Pencarian",
				rooticon:"fa fa-search",
				containerTab :  $('#tabtitle'),
				contentTab : $('#tabcontent'),
				findTab: $('#tabtitle').find("#lsearch"),
				header:$('#search'),
				search: $(this).serialize(),
				leftPos: $(".nav-tabs-custom > ul").scrollLeft()
			}
			if(searchTab.info!=null && searchTab.info!="")
			{
				if(searchTab.findTab.length==0)
				{
					searchTab.containerTab.append('<li id="l'+searchTab.url+'"><a href="#' + searchTab.url + '" data-toggle="tab"><i class="'+searchTab.icon+'"></i>&nbsp;'+searchTab.title+'<span class="close closeTab" onclick="showNotif(\''+searchTab.url+'\',\'modal-md\',\''+searchTab.title+'\',\''+searchTab.icon+'\',\'closeTab\',\'alertConfirm\');" data-toggle="modal" data-target="#alertConfirm'+searchTab.url+'"><i class="fa fa-times-circle"></i></span></a></li>');
					searchTab.contentTab.append('<div class="tab-pane" id="'+searchTab.url+'"><section class="content-header"><h1>'+searchTab.title+'<small>'+searchTab.info+'</small></h1><ol class="breadcrumb"><li><a><i class="'+searchTab.rooticon+'"></i>'+searchTab.root+'</a></li><li class="active">'+searchTab.info+'</li></ol></section><div id="c'+searchTab.url+'"></div></div>');
					searchContent(searchTab.search,searchTab.url,"#c"+searchTab.url);
					showTab(searchTab.url);
					$(".nav-tabs-custom > ul").animate( { scrollLeft: searchTab.leftPos + 10000 }, 500);
				  }
				  else
				  {
						searchTab.header.replaceWith('<div class="tab-pane active" id="'+searchTab.url+'"><section class="content-header"><h1>'+searchTab.title+'<small>'+searchTab.info+'</small></h1><ol class="breadcrumb"><li><a><i class="'+searchTab.rooticon+'"></i>'+searchTab.root+'</a></li><li class="active">'+searchTab.info+'</li></ol></section><div id="c'+searchTab.url+'"></div></div>');
						searchContent(searchTab.search,searchTab.url,"#c"+searchTab.url);
						showTab(searchTab.url);
				  }
				  //console.log(searchTab);
				  $(this).find("input").val("");
			}else{
				$(this).find("input").focus();
			}
	});
}

function scramble(x){
    var s = "";
    while(s.length<x&&x>0){var r = Math.random();s+= (r<0.1?Math.floor(r*100):String.fromCharCode(Math.floor(r*26) + (r>0.5?97:65)));}
    return s;
}

function replace(s){
	//clean Base64
	x = scramble(3)+""+s.replace(/[+/=]/gi, ""); 
	return x;
}

function showTabEvent(){
  $(".showTab").click(function(e){
	  $(".showTab").removeClass("active");
	  $(this).addClass("active");
	  var dyTab = {
		  title : $(this).find("span").html(),
		  url: $(this).attr('taburl'),
		  rooturl:$(this).parents("li.treeview").find("a").attr("taburl"),
		  info: $(this).attr('tabinfo'),
		  icon :$(this).find("i").attr("class"),
		  root:$(".treeview.active > a > span").html(),
		  rooticon:$(".treeview.active > a > i").attr("class"),
		  containerTab :  $('#tabtitle'),
		  contentTab : $('#tabcontent'),
		  findTab: $('#tabtitle').find("#l"+$(this).attr('taburl')),
		  leftPos: $(".nav-tabs-custom > ul").scrollLeft()
	  }
	  //console.log(dyTab);
	  //cek tab 
	  if(dyTab.icon == undefined){dyTab.icon = "";};
	  if(dyTab.root == undefined){dyTab.root = '<i class="fa fa-home"></i> Menu Utama';}
	  if(dyTab.rooturl == undefined){var furl = dyTab.url;}else{var furl = dyTab.rooturl+"/"+dyTab.url;};
	  var xurl = replace(btoa(furl));
	  
	  if(dyTab.findTab.length==0){
			dyTab.containerTab.append('<li id="l'+dyTab.url+'"><a href="#'+dyTab.url+'" data-toggle="tab"><i class="'+dyTab.icon+'"></i>&nbsp;'+dyTab.title+'<span class="close closeTab" onclick="showNotif(\''+dyTab.url+'\',\'modal-md\',\''+dyTab.title+'\',\''+dyTab.icon+'\',\'closeTab\',\'alertConfirm\');" data-toggle="modal" data-target="#alertConfirm'+dyTab.url+'"><i class="fa fa-times-circle"></i></span></a></li>');
			dyTab.contentTab.append('<div class="tab-pane" id="'+dyTab.url+'"><section class="content-header"><h1>'+dyTab.title+'<small>'+dyTab.info+'</small></h1><ol class="breadcrumb"><li><a><i class="'+dyTab.rooticon+'"></i>'+dyTab.root+'</a></li><li class="active">'+dyTab.title+'</li></ol></section><div id="c'+dyTab.url+'"></div></div>');
			//loadUrl("","./SecureAccess-"+dyTab.url+".php","#c"+dyTab.url);
			//console.log(dyTab.rooturl);
			loadUrl("","./SecureAccess.php?access="+xurl,"#c"+dyTab.url);
			//loadUrl("","./module/SecureAccess.php?access="+dyTab.rooturl+"/"+dyTab.url,"#c"+dyTab.url);
			showTab(dyTab.url);
			$(".nav-tabs-custom > ul").animate( { scrollLeft: dyTab.leftPos + 10000 }, 500);
	  }else{
			//loadUrl("","./SecureAccess-"+dyTab.url+".php","#c"+dyTab.url);
			loadUrl("","./SecureAccess.php?access="+xurl,"#c"+dyTab.url);
			//console.log(dyTab.rooturl);
			showTab(dyTab.url);
	  }
  });
}

function showTab(tabId) {
  $('.nav-tabs > li > a[href="#' + tabId + '"]').tab('show');
}

//need change
function loadUrl(param, url, loadDivSelector) {
  $(loadDivSelector).hide().load(url, function (response, status, xhr) {
    if (response == "error") {
        var msg = '<div class="error-page"><h2 class="headline text-yellow" style="margin-top: -25px; margin-bottom: 0px;"> 404</h2><div class="error-content"><h3><i class="fa fa-warning text-yellow"></i> Oops! Terjadi Kesalahan...</h3><p>Halaman tidak dapat ditemukan, silahkan menghubungi <a href="mailto:administrator@dycms.com">administrator</a>.</p></div></div>';
		$("" + loadDivSelector).html(msg);
      }
  }).fadeIn(500); 
}

function searchContent(value,url,div){
	$.post("SecureAccess.php?access="+url, value ,function (response, status, xhr) {
    if (response == "error") {
        var msg = '<div class="error-page"><h2 class="headline text-yellow" style="margin-top: -25px; margin-bottom: 0px;"> 404</h2><div class="error-content"><h3><i class="fa fa-warning text-yellow"></i> Oops! Terjadi Kesalahan...</h3><p>Halaman tidak dapat ditemukan, silahkan menghubungi <a href="mailto:administrator@dycms.com">administrator</a>.</p></div></div>';
		$(div).html(msg);
      }
	  $(div).html(response);
  }); 
}

function showFullscreen(element) {
  if(element.showFullscreen) {
    element.showFullscreen();
  } else if(element.mozRequestFullScreen) {
    element.mozRequestFullScreen();
  } else if(element.webkitRequestFullscreen) {
    element.webkitRequestFullscreen();
  } else if(element.msRequestFullscreen) {
    element.msRequestFullscreen();
  }
}

function exitFullscreen() {
  if(document.exitFullscreen) {
    document.exitFullscreen();
  } else if(document.mozCancelFullScreen) {
    document.mozCancelFullScreen();
  } else if(document.webkitExitFullscreen) {
    document.webkitExitFullscreen();
  }
}

function showFilemanager(field) {
	var div = $('#filemanager');
	if (div.css("display") == "block") {
				div.hide();
				div.html();
				return;
	}
	window.KCFinder = {
			callBack: function(url) {
					window.KCFinder = null;
					field.value = url;
					div.hide();
					div.html();
			}
	};
	div.html('<iframe name="filemanager_iframe" src="../plugins/filemanager/browse.php?type=files&dir=files/" frameborder="0" width="100%" height="100%" marginwidth="0" marginheight="0" scrolling="no" style="border:1px;"/>');
	div.show();
}

function showNotif(id,size,title,icon,content,method){
	switch(method){
		case "alertDefault":
			if(content=="")
			{
					$('#modalbox').html('<div id="alertDefault'+id+'" class="modal fade" tabindex="-1" data-backdrop="static" data-keyboard="false" style="display: none; "><div class="modal-dialog '+size+'"><div class="modal-content" style="border-radius: 6px;"><div class="modal-header" style="padding: 5px 7px 5px 10px;"><button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button><h4 class="modal-title"><i class="'+icon+'"></i>&nbsp;'+title+'</h4></div><div class="modal-body" id="modal-body"></div></div></div></div>');
					$("#modal-body").hide().load(id+".txt").fadeIn("500");
			}
			else{
					$('#modalbox').html('<div id="alertDefault'+id+'" class="modal fade" tabindex="-1" data-backdrop="static" data-keyboard="false" style="display: none; "><div class="modal-dialog '+size+'"><div class="modal-content" style="border-radius: 6px;"><div class="modal-header" style="padding: 7px;"><button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button><h4 class="modal-title"><i class="'+icon+'"></i>&nbsp;'+title+'</h4></div><div class="modal-body">'+content+'</div><div class="modal-footer" style="padding: 7px;"><button class="btn btn-primary" data-dismiss="modal" aria-hidden="true" >Tutup <i class=" fa fa-times-circle"></i></a></div></div></div></div>');
			}
		break;
		case "alertConfirm":
			if(content=="closeTab")
			{
					$('#modalbox').html('<div id="alertConfirm'+id+'" class="modal fade" tabindex="-1" data-backdrop="static" data-keyboard="false" style="display: none; "><div class="modal-dialog '+size+'"><div class="modal-content" style="border-radius: 6px;"><div class="modal-header" style="padding: 7px;"><button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button><h4 class="modal-title"><i class="'+icon+'"></i>&nbsp;'+title+'</h4></div><div class="modal-body"> Apakah anda yakin menutup halaman "'+title+'"?</div><div class="modal-footer" style="padding: 7px;"><button data-dismiss="modal" aria-hidden="true" class="btn btn-default"><i class="fa fa-ban"></i> Batal </button><button class="btn btn-primary" data-dismiss="modal" aria-hidden="true" id="closeTabButton">Tutup <i class=" fa fa-times-circle"></i></a></div></div></div></div>');
					$("#closeTabButton").click(function(){
						$("#l"+id).remove(); //remove li of tab
						$("#"+id).remove(); //remove respective tab content
						$('.nav-tabs > #lhome').find('a').trigger('click');
						$("#close"+id).modal("hide");
					});
			}
			else{
				$('#modalbox').html('<div id="alertConfirm'+id+'" class="modal fade" tabindex="-1" data-backdrop="static" data-keyboard="false" style="display: none; "><div class="modal-dialog '+size+'"><div class="modal-content" style="border-radius: 6px;"><div class="modal-header" style="padding: 7px;"><button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button><h4 class="modal-title"><i class="'+icon+'"></i>&nbsp;'+title+'</h4></div><div class="modal-body"> Apakah anda yakin menutup halaman "'+title+'"?</div><div class="modal-footer" style="padding: 7px;"><button data-dismiss="modal" aria-hidden="true" class="btn btn-default"><i class="fa fa-ban"></i> Batal </button><button class="btn btn-primary" data-dismiss="modal" aria-hidden="true" id="closeTabButton">Tutup <i class=" fa fa-times-circle"></i></a></div></div></div></div>');
			}
		break;
		
		default:
			console.log(id);
		break;
	}
	
}

function getVersion(v,c){
	$(".main-footer > .version").html('<b>Version </b>'+v+'&nbsp;<a style="cursor:pointer;" data-toggle="modal" href="#alertDefaultlog" onclick="showNotif(\'log\',\'modal-sm\',\'History 1.48\',\'fa fa-history\',\'\',\'alertDefault\');"><i class="fa fa-history"></i> Log</a>');
	$(".main-footer > strong").html("<b>Copyright &copy;</b>"+c);
}
