<?php 
date_default_timezone_set("Asia/Makassar");
#Author			: Dedy Miswar, S.Kom
#Created			: 27 April 2015, 20:40:35
#File Name		: dyFunction.php
#Modul Name	: Function Container	
#Description		: Modul berisi semua fungsi-fungsi yang akan digunakan dalam cms
error_reporting(0);
#List Function
/*
	cekdir($string);
	encode($string);
	decode($string);
	angkaArab($string);
	tanggalMasehi($tgl);
	bulanIndo($string);
	bulanArab($string);
	bulanArab2($string); huruf arab
	hariIndo($string);
	hariArab($string);
	hariArab2($string); huruf arab
	tanggalHijriah($tgl,$lg)
	hariIni($string);
	tanggal2hari($tgl);
	tanggalSekarang($tgl);
	getData($connect,$field,$table,$klausa);
	getDataX($connect,$field,$table,$klausa);
	pushData($connect,$table,$variabel);
	editData($connect,$table,$variabel,$klausa);
	delData($connect,$table,$klausa);
	openGate($dbname,$host,$user,$pass);
	closeGate($host,$user,$pass);
	filterText($string);
	potongText($string);
	timer();
	cek_login();
*/
if(count(get_included_files())==1){include("dyNotFound.php");}else{
	#Fungsi CekDirectory
	function cekdir($string)
	{
		$cek = file_exists($string);
		return $cek;
	}

	#Fungsi Encode Base 64
	function encode($string)
	{
		$cek = str_replace(array('=','+','/'),'',base64_encode($string));
		return $cek;
	}

	#Fungsi Decode Base 64
	function decode($string)
	{
		$cek = base64_decode($string);
		return $cek;
	}

	#Fungsi Angka Arab
	function angkaArab($string)
	{
		$number = "";
		$no = array(0=>"٠",1=>"١",2=>"٢",3=>"٣",4=>"٤",5=>"٥",6=>"٦",7=>"٧",8=>"٨",9=>"٩");
		$angka = str_split($string, 1);
		$panjang = strlen($string);
		for($i=0;$i<$panjang;$i++)
		{
			$number .= $no[$angka[$i]];
			
		}
		return $number;
	}
	
	#Fungsi Tanggal Masehi
	function tanggalMasehi($tgl)
	{
		$d = intval(substr($tgl,8,2));
		$m = intval(substr($tgl,5,2));
		$y = intval(substr($tgl,0,4));
		
		return $d." ".bulanIndo($m)." ".$y;		 
	}

	#Fungsi Tanggal Masehi Dengan Jam
	function tanggalMasehiWithJam($tgl)
	{
		$d = intval(substr($tgl,8,2));
		$m = intval(substr($tgl,5,2));
		$y = intval(substr($tgl,0,4));
		
		$j = intval(substr($tgl,11,2));
		$me = intval(substr($tgl,14,2));
		
		if($j>=12 AND $me>=0 ){$x="PM";}else{$x="AM";}
		
		return $d." ".bulanIndo($m)." ".$y.", $j:$me $x";
	}

	#Fungsi Bulan dalam bahasa Indonesia
	function bulanIndo($string)
	{
		$bln = array(1=>"Januari",2=>"Februari",3=>"Maret",4=>"April",5=>"Mei",6=>"Juni",7=>"Juli",8=>"Agustus",9=>"September",10=>"Oktober",11=>"November",12=>"Desember");
		return $bln[$string];
	} 
	
	#Fungsi Bulan dalam Bahasa Arab
	function bulanArab($string)
	{				 
		$bln = array(1=>"Muharram",2=>"Safar",3=>"Rabiul Awwal",4=>"Rabiul Akhir",5=>"Jumadil Awwal",6=>"Jumadil Akhir",7=>"Rajab",8=>"Sya'ban",9=>"Ramadhan",10=>"Syawwal",11=>"Zulqa'dah",12=>"Zulhijjah");
		return $bln[$string];
	} 
	
	#Fungsi Bulan Arab dalam Huruf Arab
	function bulanArab2($string)
	{				 
		$bln = array(1=>"محرّم",2=>"صفر",3=>"ربيع الأوّل",4=>"ربيع الثّاني",5=>"جمادى الأولى",6=>"جمادى الثّانيّة",7=>"رجب",8=>"شعبان",9=>"رمضان",10=>"شوّال",11=>"ذو القعدة",12=>"ذو الحجّة");
		return $bln[$string];
	} 

	#Fungsi Hari dalam Indonesia
	function hariIndo($string)
	{
		$harinya = array("Mon"=>"Senin","Tue"=>"Selasa","Wed"=>"Rabu","Thu"=>"Kamis","Fri"=>"Jum'at","Sat"=>"Sabtu","Sun"=>"Minggu");
		return $harinya[$string];
	}
	
	#Fungsi Hari dalam Arab 
	function hariArab($string)
	{
		$harinya = array("Mon"=>"Itsnaini","Tue"=>"Tsalatsai","Wed"=>"Arba'aai","Thu"=>"Khomisi","Fri"=>"Jum'ati","Sat"=>"Sabti","Sun"=>"Ahadi");
		return $harinya[$string];
	}
	
	#Fungsi Hari dalam Huruf Arab
	function hariArab2($string)
	{
		$harinya = array("Mon"=>"يوم الاِثنين","Tue"=>"يوم الثّلاثاء","Wed"=>"يوم الأربعاء","Thu"=>"يوم الخميس","Fri"=>"يوم الجمعة","Sat"=>"يوم السّبت","Sun"=>"يوم الأحد");
		return $harinya[$string];
	}
	
	#Fungsi Tanggal Hijriyah
	function tanggalHijriah($tgl,$lg)
    {
		$d = intval(substr($tgl,8,2));
		$m = intval(substr($tgl,5,2));
		$y = intval(substr($tgl,0,4));
	
		$jd = GregoriantoJD($m, $d, $y);
		$l = $jd - 1948440 + 10632;
		$n = (int) (( $l - 1 ) / 10631);
		$l = $l - 10631 * $n + 354;
		$j = ( (int) (( 10985 - $l ) / 5316)) * ( (int) (( 50 * $l) / 17719)) + ((int) ( $l / 5670 )) * ( (int) (( 43 * $l ) / 15238 ));
		$l = $l - ( (int) (( 30 - $j ) / 15 )) * ( (int) (( 17719 * $j ) / 50)) - ((int) ( $j / 16 )) * ( (int) (( 15238 * $j ) / 43 )) + 29;
		$m = (int) (( 24 * $l ) / 709 );
		$d = $l - (int) (( 709 * $m ) / 24);
		$y = 30 * $n + $j - 30;
		 
		switch($lg)
		{
			case "ar":
				$tanggal = angkaArab($d);
				$bulan = bulanArab2($m);
				$tahun = angkaArab($y);
				
				$Hijriah = " $tanggal $bulan $tahun هجرية";
			break;
			
			case "ar-d":
				$hari = hariArab2(date("D", strtotime($tgl)));
				$tanggal = angkaArab($d);
				$bulan = bulanArab2($m);
				$tahun = angkaArab($y);
				
				$Hijriah = "$hari"."،"." $tanggal $bulan $tahun هجرية";
			break;
			
			default:
				$Hijriah = "$d ".bulanArab($m)." $y H";
			break;
		}

		return $Hijriah;
    } 
	
	#Fungsi Hari ini
	function hariIni(){
			$today = date("D");
			return $today;
	}
	
	#FungsiWaktu
	function timeConvert($time,$method){
		/*
		// 24-hour time to 12-hour time 
		$time_in_12_hour_format  = date("g:i a", strtotime("13:30"));

		// 12-hour time to 24-hour time 
		$time_in_24_hour_format  = date("H:i", strtotime("1:30 PM"));
		*/
		if($time!="")
		{
				if($method=="to24")
				{
					$hasil = date("H:i:s", strtotime($time));
				}elseif($method=="to12")
				{
					$hasil = date("g:i:s A", strtotime($time));
				}else{
					$hasil = "";
				}
				return $hasil;
		}else{
			return false;
		}
	}
	
	function selisihWaktu($awal,$akhir){
		$one = new DateTime($awal);
		$two = new DateTime($akhir);
		$resultTemp = $two->diff($one)->format('%a hari %h jam %i menit %s detik');
		$result = str_replace(array('0 hari','0 jam','0 menit', '0 detik'), "", $resultTemp);
		return $result;
	}
	
	#Fungsi Konversi tanggal ke hari 
	function tanggal2hari($string){
		 $unix = strtotime($string);
		 $hari = date("D", $unix); // hasilnya 3 huruf nama hari bahasa inggris
		 return $hari;
	}
	
	#Fungsi tanggal Sekarang
	function tanggalSekarang()
	{
		$today = date("Y-m-d H:i:s");
		return $today;
	}
	
	function tanggalSekarangTanpaJam()
	{
		$today = date("Y-m-d");
		return $today;
	}
	
	#Fungsi show data Single
	function getData($connect,$field,$table,$klausa)
	{
		$query = "SELECT $field from $table where $klausa";
		if(mysqli_query($connect,$query))
		{
			$result = mysqli_query($connect,$query);
		}
		else die(mysqli_error($connect));
		
		if(mysqli_num_rows($result)>0)
		{
			while($row = mysqli_fetch_assoc($result))
			{
				 $listData = $row;
			}
			return $listData;
		}
		#mysqli_close($connect);  
	}
	
	#Fungsi Show data (Banyak)
	function getDataX($connect,$field,$table,$klausa)
	{
		$query = "SELECT $field from $table where $klausa";
		if(mysqli_query($connect,$query))
		{
			$result = mysqli_query($connect,$query);
		}
		else die(mysqli_error($connect));
		
		if(mysqli_num_rows($result)>0)
		{
			while($row = mysqli_fetch_assoc($result))
			{
				 $listData[] = $row;
			}
			return $listData;
		}
		#mysqli_close($connect);  
	}

	#Fungsi insert data kedalam tabel
	function pushData($connect,$table,$variabel)
	{
		mysqli_query($connect,"INSERT $table SET $variabel");
	}

	#Fungsi edit/update data
	function editData($connect,$table,$variabel,$klausa)
	{
		mysqli_query($connect,"UPDATE $table SET $variabel WHERE $klausa");
	}

	#fungsi delete data
	function delData($connect,$table,$klausa)
	{
		mysqli_query($connect,"DELETE FROM $table WHERE $klausa");
	}

	#Fungsi membuka koneksi database
	function openGate($dbname,$host,$user,$pass)
	{
		$html = "<html>
			<head><title>Error 405 - Koneksi Gagal</title></head>
			<link rel=\"stylesheet\" href=\"dyRequire/dyAdditional/error.css\">
			<body>
				<div id=\"da-wrapper\">
					<div id=\"da-content\">
						<div class=\"da-container clearfix\">
						
							<div id=\"da-error-wrapper\" style=\"width:auto;\">
								<div id=\"da-error-pin\"></div>
								<div id=\"da-error-code\" style=\"margin-top: 0px; margin-bottom: 0px;\">
									<span style=\"\"><div style=\"font-size:32px;\"> Error</div> 405</span>
								</div>
								<h1 class=\"da-error-heading\">Sepertinya koneksi database anda bermasalah!</h1>
								<p>Silahkan periksa konfigurasi database anda atau hubungi <a href=\"mailto:admin@".$_SERVER['HTTP_HOST']."\" target=\"_blank\">Administrator</a></p>
							</div>
						</div>
					</div>
				</div>
			</body>
			</html>";
		$conn = mysqli_connect($host,$user,$pass,$dbname) or die($html);
		return $conn;
	}
	
	#Fungsi menutup koneksi database
	function closeGate($host,$user,$pass)
	{
		$conn = mysqli_close(mysqli_connect($host,$user,$pass));
		return $conn;
	}
	#IF MANY DBASE
	/*
	function openGate2($dbname,$host,$user,$pass)
	{
		mysqli_select_db($dbname,mysqli_connect($host,$user,$pass));
	}
	
	function closeGate2($dbname,$host,$user,$pass)
	{
		mysqli_close(mysqli_connect($host,$user,$pass));
	}
	*/

	#Fungsi menyaring Text
	function filterText($conn,$string)
	{
		$filter = mysqli_real_escape_string($conn, stripslashes(strip_tags(htmlspecialchars($string,ENT_QUOTES))));
		return $filter;
	}
	
	#Hilangkan Tag HTML pada string
	function removeTag($string)
	{
		$filter = strip_tags($string);
		return $filter;
	}
	
	function htmlcharsdecode($string)
	{
		$filter = htmlspecialchars_decode($string,ENT_QUOTES);
		return $filter;
	}

	#Fungsi memotong text
	function potongText($string,$char)
	{
		$isi = substr($string,0,$char); // ambil sebanyak n karakter
		$isi = substr($string,0,strrpos($isi," ")); // potong per spasi kalimat
		return $isi."...";
	}
	
	/*
	#Fungsi Timer
	function timer()
	{
		$time = 3000;
		$_SESSION['timeout']=time()+$time;
	}
	
	#Fungsi Timeout
	function cekTimeout()
	{
		$timeout=$_SESSION['timeout'];
		if(time()<$timeout)
		{
			time();
			return true;
		}
		else
		{
			unset($_SESSION['timeout']);
			unset($_SESSION['dyLogin']);
			unset($_SESSION['dyFile']);
			return false;
		}
	}
	
	*/
	
	function timer()
	{
		$_SESSION['timeout'] = time();
	}
	
	function cekTimeout($detik)
	{
		if( $_SESSION['timeout'] < time()-$detik) {
			unset($_SESSION['timeout']);
			unset($_SESSION['dyLogin']);
			unset($_SESSION['dyFile']);
			header("location:SecureAccess-lockscreen.dy");
		}
		else
		{
			$_SESSION['timeout'] = time();
		}
	}
	
	
	#Fungsi Proteksi Gambar/Image 
	function _mime_content_type($filename) {
		$realpath = realpath( $filename );
        if ( $realpath
                && function_exists( 'finfo_file' )
                && function_exists( 'finfo_open' )
                && defined( 'FILEINFO_MIME_TYPE' )
        ) {
                // Use the Fileinfo PECL extension (PHP 5.3+)
                return finfo_file( finfo_open( FILEINFO_MIME_TYPE ), $realpath );
        }
        if ( function_exists( 'mime_content_type' ) ) {
                // Deprecated in PHP 5.3
                return mime_content_type( $realpath );
        }
        return false;
	}
	
	function getMime($file,$type){
		if($type=="Image")
		{
				$mime = _mime_content_type($file);
				$types = array('image/jpeg',  'image/png',  'image/gif', 'image/bmp');
		}
		else if($type=="File")
		{	
			
				$ext = pathinfo($file);
				$allow = array("js"=>"text/javascript","css"=>"text/css","otf"=>"application/vnd.ms-opentype","eot"=>"application/vnd.ms-fontobject","svg"=>"image/svg+xml","ttf"=>"application/x-font-ttf","woff"=>"application/octet-stream","woff2"=>"application/octet-stream");
				
				if(isset($ext['extension'],$allow) ){
						$mime = $allow[$ext['extension']];
						$types = $allow;
				}
		}
		
		if(isset($mime,$types)){
			return $mime;
		}
		else{
				return "Unknown";
		}
	}
	
	function getTiming() {
		$n = time();
		session_start();
		if ($n - $_SESSION['lastcheck'] > 2 )
			return false;
		return true;
	}
	
	//Fungsi Cek Icon (Fontawesome, Gliphicon, clip icon, ionicon, fontmfizz del el el)
	function cekIcon($icon){
		$iconTemp = explode("-",$icon);
		if($iconTemp[0]=="fa"){$prefix=$iconTemp[0];}elseif($iconTemp[0]=="glyphicon"){$prefix=$iconTemp[0];}else{$prefix="fa ";}
		return "$prefix $icon";
	}
	
	function cekRupiah($angka){
		  $rupiah=number_format($angka,2,',','.');
		  return $rupiah;
	}
	
	function cekSEO($s) {
    $c = array (' ');
    $d = array ('-', '/','\\',',','.','#',':',';','\'','"','[',']','{','}',')','(','|','`','~','!','@','%','$','^','&','*','=','?','+');
    $s = str_replace($d, ' ', $s); // Hilangkan karakter yang telah disebutkan di array $d
	$s = trim(preg_replace('/\s+/', ' ', $s)); //Hilangkan Spasi yang berlebih
    $s = strtolower(str_replace($c, '-', $s)); // Ganti spasi dengan tanda - dan ubah hurufnya menjadi kecil semua
    return $s;
	}
	
	function cekKoneksi($url)
	{
		$connected = @fsockopen($url, 80); //website, port  (try 80 or 443)
		if ($connected){
			$is_conn = true; //action when connected
			fclose($connected);
		}else{
			$is_conn = false; //action in connection failure
		}
		return $is_conn;
	}
	
	function cekDesimal($int)
	{
			$a  = explode(".", $int);
			if($a[1]=="0")
			{
				return $a[0];
			}
			else
			{
				return $int;
			}
	}
	
	function cekDiskon($o, $d){
		$proc = $o - ($o * ($d/100));
		return $proc;
	}

	function setExpired($date, $string){
		$tanggal = date_create("$date");
		date_add($tanggal, date_interval_create_from_date_string($string));
		return date_format($tanggal, 'Y-m-d H:i:s');
		//contoh
		//setExpired($date, "2 days") penambahan 2 hari
	}
	
	function getExpired($start, $end){
		/*
		$diff   = date_create($end)->diff(date_create($start));
		$years      = $diff->y * 12 * $diff->days * 24 * 60 * 60;
		$months     = $diff->m * $diff->days * 24 * 60 * 60;
		$days       = $diff->d * 24 * 60 * 60;
		$hours      = $diff->h * 60 * 60;
		$minutes    = $diff->i * 60;
		$seconds    = $diff->s;
		return $years + $months + $days + $hours + $minutes + $seconds;
		#Nilai akan dikembalikan kedalam bentuk second/detik 
		*/
		#lebih Simple
		return strtotime($end)-strtotime($start);
	}
	
	function secondConvert($seconds) {
		/*
		$dtF = new DateTime("@0");
		$dtT = new DateTime("@$seconds");
		$resultTemp = $dtF->diff($dtT)->format('%a hari %h jam %i menit %s detik');
		$result = str_replace(array('0 hari','0 jam','0 menit', '0 detik'), "", $resultTemp);
		return $result;
		*/
		$s = $seconds%60;
		$m = floor(($seconds%3600)/60);
		$h = floor(($seconds%86400)/3600);
		$d = floor(($seconds%2592000)/86400);
		$M = floor($seconds/2592000);
		
		$bulan = $M? $M."<b style='font-size:xx-small;'> bulan</b>":false;
		$hari = $d? $d."<b style='font-size:xx-small;'> hari</b>":false;
		$jam = $h? $h."<b style='font-size:xx-small;'> jam</b>":false;
		$menit = $m? $m."<b style='font-size:xx-small;'> menit</b>":false;
		$detik = $s? $s."<b style='font-size:xx-small;'> detik</b>":false;
		
		$result = "$bulan $hari $jam $menit $detik";
		return $result;
	}
	
	function getInvoice($string)
	{
		$pref = substr(date("Y"),2,2).date("md");
		if($string=="Offline")
		{
			return "MKLT".$pref;
		}
		else{
			return "DZN".$pref;
		}
	}
	
	function toKata($x) {
		$x = abs($x);
		$angka = array("", "satu", "dua", "tiga", "empat", "lima",
		"enam", "tujuh", "delapan", "sembilan", "sepuluh", "sebelas");
		$temp = "";
		if ($x <12) {
			$temp = " ". $angka[$x];
		} else if ($x <20) {
			$temp = toKata($x - 10). " belas";
		} else if ($x <100) {
			$temp = toKata($x/10)." puluh". toKata($x % 10);
		} else if ($x <200) {
			$temp = " seratus" . toKata($x - 100);
		} else if ($x <1000) {
			$temp = toKata($x/100) . " ratus" . toKata($x % 100);
		} else if ($x <2000) {
			$temp = " seribu" . toKata($x - 1000);
		} else if ($x <1000000) {
			$temp = toKata($x/1000) . " ribu" . toKata($x % 1000);
		} else if ($x <1000000000) {
			$temp = toKata($x/1000000) . " juta" . toKata($x % 1000000);
		} else if ($x <1000000000000) {
			$temp = toKata($x/1000000000) . " milyar" . toKata(fmod($x,1000000000));
		} else if ($x <1000000000000000) {
			$temp = toKata($x/1000000000000) . " trilyun" . toKata(fmod($x,1000000000000));
		}     
			return $temp;
	}
	
	function terbilang($x, $style=4) {
		if($x<0) {
			$hasil = "minus ". trim(toKata($x));
		} else {
			$hasil = trim(toKata($x));
		}     
		switch ($style) {
			case 1:
				$hasil = strtoupper($hasil);
				break;
			case 2:
				$hasil = strtolower($hasil);
				break;
			case 3:
				$hasil = ucwords($hasil);
				break;
			default:
				$hasil = ucfirst($hasil);
				break;
		}     
		return $hasil;
	}
	
}
?>
