<?php
session_start();
if(ISSET($_SESSION['dyFile']))
{
	require "browse.php";
}
else{
	require("dyNotFound.php");
}


?>