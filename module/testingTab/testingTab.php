<style type="text/css">
#tabTesting{
    min-height: 100%;
	}
#tabTesting > ul {
    overflow-x:scroll;
    overflow-y:hidden;
    white-space:nowrap;
	 height: 46px; 
} 

#tabTesting > ul > li {
	   float:none;
		display:inline-block;
}

.nicescroll-cursors{
	display:none;
}
.navigation{
	width:22px;
	padding-left:2px;
}
</style>
<script type="text/javascript">
var pageNum = 1;

$(function(){
	$("#tabTesting > ul").niceScroll({
		    touchbehavior:true,
            cursoropacitymax:0.9,
            usetransition:true,
            hwacceleration:true,
            autohidemode:"hidden"
	});

	$(".left").click(function(){
		var $posisi = $("#tabTesting > ul > li.active");
		if($posisi.prev("li").length > 0)
		{
			$posisi = $posisi.prev();
			toLeft = $posisi.width();
			$posisi.find("a").tab('show');
			$("#tabTesting > ul").animate( { scrollLeft: '-='+(toLeft) }, 500);
		}else{
			$("#tabTesting > ul").animate( { scrollLeft: '-='+($posisi.width()) }, 500);
		}
	});
	
	
	$(".right").click(function(){
		var $posisi = $("#tabTesting > ul > li.active");
		if($posisi.next("li").length > 0)
		{
			$posisi = $posisi.next();
			toRight = $posisi.width();
			$posisi.find("a").tab('show');
			$("#tabTesting > ul").animate( { scrollLeft: '+='+(toRight)}, 500);
		}else{
			$("#tabTesting > ul").animate( { scrollLeft: '+='+($posisi.width()) }, 500);
		}
	});
	
	
	$(".first").click(function(){$("#tabTesting > ul").animate( { scrollLeft: '0' }, 500);});
	
	$(".add").click(function(){
		pageNum++;
		$('#tabTesting > ul').append(
			$('<li><a href="#page' + pageNum + '" data-toggle="tab" >' +
			'Page ' + pageNum +'</a></li>'));
		$('#content').append(
			$('<div class="tab-pane" id="page' + pageNum +
			'">Content page' + pageNum + '</div>'));
			$('.nav-tabs > li > a[href="#page' + pageNum + '"]').tab('show');
			var max = $("#tabTesting > ul").width();
			var leftPos = $("#tabTesting > ul").scrollLeft();
			$("#tabTesting > ul").animate( { scrollLeft: leftPos+ 10000 }, 500);
	});
});

</script>
<br/><br/>
<button class="btn btn-default add">Tambah Tab</button>
<button class="btn btn-default first">Go To First</button>
<div id="tabTesting" class="nav-tabs-custom">
<div class="navigation pull-right">
<button  class="btn btn-default btn-xs btn-flat left"><i class="fa fa-chevron-left"></i></button>
<button  class="btn btn-default btn-xs btn-flat right"><i class="fa fa-chevron-right"></i></button>
</div>
<ul class="nav nav-tabs">
	<li >
		<a href="#test1" data-toggle="tab">Testing1</a>
	</li>
	<li >
		<a href="#test2" data-toggle="tab">Testing2</a>
	</li>
	<li class="active">
		<a href="#test3" data-toggle="tab">Testing3</a>
	</li>
</ul>
<div id="content" class="tab-content">
	<div id="test1" class="tab-pane">
		Testing1 ini bro Lorem ipsum dolor sit amet, libero turpis non cras ligula, id commodo, aenean est in volutpat amet sodales, porttitor bibendum facilisi suspendisse, aliquam ipsum ante morbi sed ipsum mollis. Sollicitudin viverra, vel varius eget sit mollis. Commodo enim aliquam suspendisse tortor cum diam, commodo facilisis, rutrum et duis nisl porttitor, vel eleifend odio ultricies ut, orci in adipiscing felis velit nibh. Consectetuer porttitor feugiat vestibulum sit feugiat, voluptates dui eros libero. Etiam vestibulum at lectus.
		Donec vivamus. Vel donec et scelerisque vestibulum. Condimentum aliquam, mollit magna velit nec, tempor cursus vitae sit aliquet neque purus. Ultrices lacus proin conubia dictum tempus, tempor pede vitae faucibus, sem auctor, molestie diam dictum aliquam. Dolor leo, ridiculus est ut cubilia nec, fermentum arcu praesent, pede etiam. Tempor vestibulum turpis id ligula mi mattis. Eget arcu vitae mauris amet odio. Diam nibh diam, quam elit, libero nostra ut. Pellentesque vehicula. Eget sed, dapibus magna nulla nonummy commodo accumsan morbi, praesent volutpat vel id maecenas, morbi habitant sem in adipiscing mi erat, malesuada pretium tortor rutrum eu eros vel. Donec molestie, faucibus a amet commodo scelerisque libero massa. Sapien quam in eu vel nulla.
		Iaculis et dui ullamcorper, non egestas condimentum dui phasellus. Sit non mattis a, leo in imperdiet erat nec pulvinar. Ornare massa justo cursus, convallis mauris interdum felis. Felis posuere metus, ornare pede montes, morbi urna sed temporibus non, nibh inceptos enim turpis natoque ac praesent. Litora vivamus veritatis vel nonummy, ut qui est pellentesque at alias, sed condimentum dapibus.
		Rhoncus lacinia. Imperdiet nulla sem fringilla, purus enim amet, nascetur faucibus, adipiscing neque ut bibendum, at felis nec in. Mauris ultricies, et pede id potenti in nec, mi elit rhoncus ligula, mollis lacus congue scelerisque magna. Ultrices risus elit lectus nunc blandit quis, magna enim ipsum, nostra leo vestibulum quis nibh arcu sed. Amet a sagittis fringilla, massa vitae rhoncus, a magna curabitur in.
	</div>
	<div id="test2" class="tab-pane">
		Testing2 ini bro Lorem ipsum dolor sit amet, libero turpis non cras ligula, id commodo, aenean est in volutpat amet sodales, porttitor bibendum facilisi suspendisse, aliquam ipsum ante morbi sed ipsum mollis. Sollicitudin viverra, vel varius eget sit mollis. Commodo enim aliquam suspendisse tortor cum diam, commodo facilisis, rutrum et duis nisl porttitor, vel eleifend odio ultricies ut, orci in adipiscing felis velit nibh. Consectetuer porttitor feugiat vestibulum sit feugiat, voluptates dui eros libero. Etiam vestibulum at lectus.
		Donec vivamus. Vel donec et scelerisque vestibulum. Condimentum aliquam, mollit magna velit nec, tempor cursus vitae sit aliquet neque purus. Ultrices lacus proin conubia dictum tempus, tempor pede vitae faucibus, sem auctor, molestie diam dictum aliquam. Dolor leo, ridiculus est ut cubilia nec, fermentum arcu praesent, pede etiam. Tempor vestibulum turpis id ligula mi mattis. Eget arcu vitae mauris amet odio. Diam nibh diam, quam elit, libero nostra ut. Pellentesque vehicula. Eget sed, dapibus magna nulla nonummy commodo accumsan morbi, praesent volutpat vel id maecenas, morbi habitant sem in adipiscing mi erat, malesuada pretium tortor rutrum eu eros vel. Donec molestie, faucibus a amet commodo scelerisque libero massa. Sapien quam in eu vel nulla.
		Iaculis et dui ullamcorper, non egestas condimentum dui phasellus. Sit non mattis a, leo in imperdiet erat nec pulvinar. Ornare massa justo cursus, convallis mauris interdum felis. Felis posuere metus, ornare pede montes, morbi urna sed temporibus non, nibh inceptos enim turpis natoque ac praesent. Litora vivamus veritatis vel nonummy, ut qui est pellentesque at alias, sed condimentum dapibus.
		Rhoncus lacinia. Imperdiet nulla sem fringilla, purus enim amet, nascetur faucibus, adipiscing neque ut bibendum, at felis nec in. Mauris ultricies, et pede id potenti in nec, mi elit rhoncus ligula, mollis lacus congue scelerisque magna. Ultrices risus elit lectus nunc blandit quis, magna enim ipsum, nostra leo vestibulum quis nibh arcu sed. Amet a sagittis fringilla, massa vitae rhoncus, a magna curabitur in.
	</div>
	<div id="test3" class="tab-pane active">
		Testing3 ini bro Lorem ipsum dolor sit amet, libero turpis non cras ligula, id commodo, aenean est in volutpat amet sodales, porttitor bibendum facilisi suspendisse, aliquam ipsum ante morbi sed ipsum mollis. Sollicitudin viverra, vel varius eget sit mollis. Commodo enim aliquam suspendisse tortor cum diam, commodo facilisis, rutrum et duis nisl porttitor, vel eleifend odio ultricies ut, orci in adipiscing felis velit nibh. Consectetuer porttitor feugiat vestibulum sit feugiat, voluptates dui eros libero. Etiam vestibulum at lectus.
		Donec vivamus. Vel donec et scelerisque vestibulum. Condimentum aliquam, mollit magna velit nec, tempor cursus vitae sit aliquet neque purus. Ultrices lacus proin conubia dictum tempus, tempor pede vitae faucibus, sem auctor, molestie diam dictum aliquam. Dolor leo, ridiculus est ut cubilia nec, fermentum arcu praesent, pede etiam. Tempor vestibulum turpis id ligula mi mattis. Eget arcu vitae mauris amet odio. Diam nibh diam, quam elit, libero nostra ut. Pellentesque vehicula. Eget sed, dapibus magna nulla nonummy commodo accumsan morbi, praesent volutpat vel id maecenas, morbi habitant sem in adipiscing mi erat, malesuada pretium tortor rutrum eu eros vel. Donec molestie, faucibus a amet commodo scelerisque libero massa. Sapien quam in eu vel nulla.
		Iaculis et dui ullamcorper, non egestas condimentum dui phasellus. Sit non mattis a, leo in imperdiet erat nec pulvinar. Ornare massa justo cursus, convallis mauris interdum felis. Felis posuere metus, ornare pede montes, morbi urna sed temporibus non, nibh inceptos enim turpis natoque ac praesent. Litora vivamus veritatis vel nonummy, ut qui est pellentesque at alias, sed condimentum dapibus.
		Rhoncus lacinia. Imperdiet nulla sem fringilla, purus enim amet, nascetur faucibus, adipiscing neque ut bibendum, at felis nec in. Mauris ultricies, et pede id potenti in nec, mi elit rhoncus ligula, mollis lacus congue scelerisque magna. Ultrices risus elit lectus nunc blandit quis, magna enim ipsum, nostra leo vestibulum quis nibh arcu sed. Amet a sagittis fringilla, massa vitae rhoncus, a magna curabitur in.
	</div>
</div>
</div>