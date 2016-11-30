<?php if ( !defined('DYCMSPATH')) exit('No direct script access allowed');
#Author			: Abu Dzakiyyah
#Created			: 26 November 2016, 20:29:16
#File Name		: config.php
#Description		: File Konfigurasi

require("function.php");


#CONNECTION & DATABASE
define("dyBase","dycms_dzakiyyah");
define("dyHost","localhost");
define("dyUser","root");
define("dyPass","");

#MODUL DIRECTORY
define("dyModule","module/");

#Jika Punya dua Koneksi database
#define("dyBase2","dycms2");
#define("dyHost2","localhost");
#define("dyUser2","root");
#define("dyPass2","admin");

#OPEN DATABASE
$dyOpen = openGate(dyBase,dyHost,dyUser,dyPass);

?>