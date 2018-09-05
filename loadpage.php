<?php
/**
 * Created by PhpStorm.
 * User: Abu Dzakiyyah
 * Date: 4/3/2018
 * Time: 9:16 PM
 */

$request = $_POST['request'];

$views = file_get_contents("pages/".$request.".html");

$content = array(
    'nama'=>$_POST['nama'],
    'alamat'=>$_POST['alamat'],
    'email'=>$_POST['email']
);


$response = array(
    'views' => $views,
    'content' => $content
);

echo json_encode($response);