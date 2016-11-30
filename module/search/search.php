<?php 
$query = $_POST['q'];

$cariData = getDataX($dyOpen,"*","subMenu","subMenuNama LIKE '%$query%'");
if(count($cariData)>0){
		foreach($cariData as $cariData)
		{
			echo "<b>".$cariData['subMenuNama']."</b><br/>";	
		}
}else{
	echo "<br/><br/> <h4>Hasil Pencarian dengan kata <b>\"$query\"</b> tidak ditemukan dalam database, hehehe... just testing....anda bisa mengembangkannya lagi bro..</h4>";
}

?>