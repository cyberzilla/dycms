<?php 
define("DYCMSPATH", dirname(__FILE__));
#Author			: Abu Dzakiyyah
#Created			: 26 November 2016, 20:54:12
#File Name		: SecureAccess.php
#Description		: Akses Semua File Modul

require("lib/koneksi.php");
$access = base64_decode(substr($_GET['access'],3));
$file = explode("/", $access);

if(!isset($file[1])){
	$pathfile = dyModule.$file[0]."/".$file[0].".php";
}else{
	$pathfile = dyModule.$access."/".$file[1].".php";
}

if(file_exists($pathfile))
{
	include($pathfile);
}
else
{
	echo "error";
}
?>