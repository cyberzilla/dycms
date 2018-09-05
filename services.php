<?php
/**
 * Created by PhpStorm.
 * User: Abu Dzakiyyah
 * Date: 3/27/2018
 * Time: 9:23 PM
 */

$username = $_POST['username'];
$password = $_POST['password'];

if($username === 'cyberzilla'){
    if($password===""){
        $response = array(
            "namaLengkap"=>"Dedy Miswar",
            "profilPicture"=>"assets/images/img/aby.bmp"
        );
    }else if($password==='admin'){
        $response = array("status"=>"login_sukses");
    }else{
        $response = array("status"=>"error_login");
    }
}else{
    $response = array("status"=>"error_login");
}
echo json_encode($response);