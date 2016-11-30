<?php 
$filename=$_GET['f'];
$type = mime_content_type($filename);
$imgencoded = "data:".$type.";base64,".base64_encode(file_get_contents($filename));
echo "$imgencoded";
?>