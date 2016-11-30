<?php define("DYCMSPATH", dirname(__FILE__));require("lib/koneksi.php");?>
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <title>DyCMS - v1.48</title>
  <!-- Tell the browser to be responsive to screen width -->
  <meta content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no" name="viewport">
  <!-- Bootstrap 3.3.5 -->
  <link rel="stylesheet" href="plugins/bootstrap/css/bootstrap.min.css">
   <link rel="stylesheet" href="plugins/bootstrap/css/bootstrap.vertical-tabs.css">
  <!-- Font Awesome -->
  <link rel="stylesheet" href="plugins/font-awesome/css/font-awesome.min.css">
  <!-- Ionicons -->
  <link rel="stylesheet" href="plugins/ionicons/css/ionicons.min.css">
  <!-- Theme style -->
  <link rel="stylesheet" href="plugins/dist/css/AdminLTE.min.css">
  <!-- AdminLTE Skins. Choose a skin from the css/skins
       folder instead of downloading all of them to reduce the load. -->
  <link rel="stylesheet" href="plugins/dist/css/skins/_all-skins.min.css">
  <!-- demo style -->
    <!-- Pace style -->
  <link rel="stylesheet" href="plugins/pace/paceCenterSimple.css">
  <!--Noty Core-->
  <link rel="stylesheet" type="text/css" href="plugins/noty/animate.css"/>
  
  <!-- DataTables -->
  <link rel="stylesheet" href="plugins/datatables/dataTables.bootstrap.css">
  
  <!-- Switch -->
  <link rel="stylesheet" href="plugins/switch/switch.css">
  
  <!-- Bootstrap Select -->
	<link rel="stylesheet" href="plugins/bootstrap-select/css/bootstrap-select.min.css" type="text/css"/>
<!--
<link  rel="stylesheet" href="plugins/ScrollTabs/css/scrolltabs.css">


<link  rel="stylesheet" href="plugins/tabdrop/css/tabdrop.css">
 -->
 
</head>
<body class="hold-transition skin-blue fixed sidebar-mini">
<div class="wrapper">
<div class="paceDiv"></div>
  <header class="main-header">
    <!-- Logo -->
    <a href="index.php" class="logo">
      <!-- mini logo for sidebar mini 50x50 pixels -->
      <span class="logo-mini"><b>D</b>y</span>
      <!-- logo for regular state and mobile devices -->
      <span class="logo-lg"><b>Dy</b>CMS</span>
    </a>
    <!-- Header Navbar: style can be found in header.less -->
    <nav class="navbar navbar-static-top" role="navigation">
      <!-- Sidebar toggle button-->
      <a href="#" class="sidebar-toggle" data-toggle="offcanvas" role="button">
        <span class="sr-only">Toggle navigation</span>
        <span class="icon-bar"></span>
        <span class="icon-bar"></span>
        <span class="icon-bar"></span>
      </a>

      <div class="navbar-custom-menu">
        <ul class="nav navbar-nav">
		<li class="fullscreen">
			<a><i class="fa fa-expand" data-toggle="tooltip" title="Fullscreen"  data-placement="bottom"></i></a>
		</li>
          <!-- fa-compress Messages: style can be found in dropdown.less-->

        
        </ul>
      </div>
    </nav>
  </header>
  <!-- Left side column. contains the logo and sidebar -->
  <aside class="main-sidebar">
    <!-- sidebar: style can be found in sidebar.less -->
    <section class="sidebar">
      <!-- Sidebar user panel -->
      <div class="user-panel">
        <div class="pull-left image">
          <img src="plugins/dist/img/user2-160x160.jpg" class="img-circle" alt="User Image">
        </div>
        <div class="pull-left info">
          <p>Admin</p>
          <a href="#"><i class="fa fa-circle text-success"></i> Online</a>
        </div>
      </div>
      <!-- search form -->
      <form class="sidebar-form">
        <div class="input-group">
          <input type="text" name="q" class="form-control" placeholder="Search...">
              <span class="input-group-btn">
                <button type="submit" id="search-btn" class="btn btn-flat"><i class="fa fa-search"></i></button>
              </span>
        </div>
      </form>
      <!-- /.search form -->
      <!-- sidebar menu: : style can be found in sidebar.less -->
      <ul class="sidebar-menu">
        <li class="header">MENU UTAMA</li>
		  <li>
				<a  id="bhome" class="showTab" taburl="home" tabicon="fa fa-home">
					<i class="fa fa-home"></i> <span>Beranda</span>
					</a>
		  </li>
		  
		  <!--START Bagian Menu-->
		  <?php 
			$mainMenu  = getDataX($dyOpen,"*","mainMenu","mainMenuAktif='Yes' ORDER By mainMenuId ASC");
							
							if(count($mainMenu)>0)
							{
								foreach($mainMenu as $mainMenu)
								{
									$subMenu = getDataX($dyOpen,"*","subMenu","subMenuMainMenuId = '".$mainMenu['mainMenuId']."'  AND subMenuAktif='Yes' ORDER BY submenuId ASC");
									
									if(count($subMenu)>0)
									{
										echo "<li class='treeview'>
											<a taburl=\"$mainMenu[mainMenuUrl]\" tabinfo=\"$mainMenu[mainMenuInfo]\"><i class=\"".$mainMenu['mainMenuIcon']."\"></i>
											<span class=\"title\">$mainMenu[mainMenuNama]</span><i class='fa fa-angle-left pull-right'></i>
											</a>";
										echo "<ul class=\"treeview-menu\">";
										foreach($subMenu as $subnya)
										{
											echo "<li>
													<a class=\"showTab\" style=\"padding-left: 25px;\" taburl=\"$subnya[subMenuUrl]\" tabinfo=\"$subnya[subMenuInfo]\"><i class=\"".$subnya['subMenuIcon']."\"></i>
													<span class=\"title\">$subnya[subMenuNama]</span>
													</a>
												</li>";
										}
										echo "</ul>";
									}
									else
									{
										echo"<li><a class=\"showTab\" taburl=\"$mainMenu[mainMenuUrl]\" tabinfo=\"$mainMenu[mainMenuInfo]\"><i class=\"".$mainMenu['mainMenuIcon']."\"></i>
											<span class=\"title\">$mainMenu[mainMenuNama]</span>
											</a>";
									}
									echo "</li>";
								}
							}
		  
		  ?>
		  <!--END Bagian Menu-->
      </ul>
    </section>
    <!-- /.sidebar -->
  </aside>
  <!-- Content Wrapper. Contains page content -->
  <div class="content-wrapper">
    <!-- Main content -->
    <section class="content">
      <div class="row">
        <div class="col-xs-12">
          <div class="nav-tabs-custom">
				<div class="navigasi pull-right">
					<button  class="btn btn-xs right" data-toggle="tooltip" data-placement="left" title="Tab Selanjutnya"><i class="fa fa-chevron-right"></i></button>
					<button  class="btn btn-xs  left" data-toggle="tooltip" data-placement="left" title="Tab Sebelumnya"><i class="fa fa-chevron-left"></i></button>
				</div>
				<ul class="nav nav-tabs" id="tabtitle">
              <li class="" id="lhome">
						<a href="#home" data-toggle="tab" ><i class="fa fa-home"></i>&nbsp;Beranda</a>
					</li>
				</ul>
            <div class="tab-content" id="tabcontent">
              <!-- Font Awesome Icons -->
              <div class="tab-pane " id="home">
              	<section class="content-header"><h1>Beranda<small>Ini adalah halaman beranda</small></h1>
						<ol class="breadcrumb"><li><a><i class="fa fa-home"></i> Menu Utama</a></li><li class="">Beranda</li></ol>
					</section>
					<div id="chome">
					</div>
              </div>
            </div>
            <!-- /.tab-content -->
		  		</div>
				
          <!-- /.nav-tabs-custom -->
        </div>
        <!-- /.col -->
      </div>
      <!-- /.row -->
    </section>
    <!-- /.content -->
  </div>
  <div id="modalbox"></div>
  <!-- /.content-wrapper -->
  <footer class="main-footer  hidden-xs">
    <div class="version"></div>
    <strong></strong><a href="http://dedymiswar.com"> DyCMS</a>
  </footer>
  <!-- /.control-sidebar -->
  <!-- Add the sidebar's background. This div must be placed
       immediately after the control sidebar -->
  <div class="control-sidebar-bg"></div>
</div>
<!-- ./wrapper -->

<!-- jQuery 2.1.4 -->
<script src="plugins/jQuery/jQuery-2.1.4.min.js"></script>
<!-- Bootstrap 3.3.5 -->
<script src="plugins/bootstrap/js/bootstrap.min.js"></script>
<!-- FastClick -->
<script src="plugins/fastclick/fastclick.js"></script>
<!-- AdminLTE App -->
<script src="plugins/dist/js/app.min.js"></script>

<!-- Validation Engine-->
    <script src="plugins/validation/jquery.validate.js"></script>
	 <script src="plugins/validation/messages_id.js"></script>

<!-- PACE -->
<script src="plugins/pace/pace.min.js"></script>
<!-- SlimScroll -->
<script src="plugins/slimScroll/jquery.slimscroll.min.js"></script>
<!--DyCMS Core-->
<script src="plugins/dyCore/js/bootstrap-dycore.js"></script>
<link  rel="stylesheet" href="plugins/dyCore/css/bootstrap-dycore.css">

<!--Echarts-->
<script src="plugins/c3/js/d3.v3.min.js" charset="utf-8"></script>
<link href="plugins/c3/css/c3.custom5.css" rel="stylesheet" type="text/css">
 <script src="plugins/c3/js/c3.js"></script>
 
 <!--NiceScroll-->
 <script type="text/javascript" src="plugins/niceScroll/jquery.nicescroll.js"></script>
 
 <!--Noty-->
 <script type="text/javascript" src="plugins/noty/jquery.noty.packaged.min.js"></script>
 
 <!-- DataTables -->
<script src="plugins/datatables/jquery.dataTables.min.js"></script>
<script src="plugins/datatables/dataTables.bootstrap.min.js"></script>

<!-- Bootstrap Select -->
	<script type="text/javascript" src="plugins/bootstrap-select/js/bootstrap-select.min.js"></script>
<!--
<script src="plugins/responsive/responsive-tabs.js"></script>
<link  rel="stylesheet" href="plugins/responsive/bootstrap-responsive.min.css">
<script src="plugins/ScrollTabs/js/jquery.scrolltabs.js"></script>
<script src="plugins/ScrollTabs/js/jquery.mousewheel.js"></script>

<script src="plugins/taboverflow/jquery.taboverflow.js"></script>

<script src="plugins/tabdrop/js/bootstrap-tabdrop.js"></script>
-->

<!-- page script -->
<script type="text/javascript">
	// To make Pace works on Ajax calls	

	
</script>
</body>
</html>
