<?php
header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');
$host = "localhost"; // E' il server a cui ti vuoi connettere.
$user = "root"; // E' l'utente con cui ti collegherai al DB.
$password = ""; // Password di accesso al DB.
$db = "biblioteca"; // Nome del database.

/*exec("type NUL > 1.txt");
// Return will return non-zero upon an error
if (!$return) {
    echo "PDF Created Successfully";
} else {
    echo "PDF not created";
}*/
  if(isset($_GET["request"])) {

    $mysqli = new mysqli($host, $user, $password, $db);
    // Check connection
    if ($mysqli->connect_error) {
        $response_array['status'] = "error";
        print json_encode($response_array);
        die();
    }

    switch ($_GET["request"]) {

    case 'apri_biblioteca':

      exec("python ./BotTelegramBiblioteca.py", $output, $return);
      // Return will return non-zero upon an error
      if (!$return) {
          $response_array = "script launched Successfully"; //
      } else {
          //in case the return is zero
          $response_array = "error";
          //should return the error
          //var_dump($output);
          //var_dump($return);
      }
      print json_encode($response_array);
      break;

    case 'kill_py':
      echo exec("tasklist", $output, $return);
      // Return will return non-zero upon an error
      if (!$return) {
          $response_array = "script launched Successfully"; //
      } else {
          //in case the return is zero
          $response_array = "error";
          //should return the error
          var_dump($output);
          var_dump($return);
      }
      break;

    case 'ottieni_dati':

      $stmt = $mysqli->prepare("SELECT ora,giorno,data,entrate,uscite FROM library");
      if($stmt === false){
        $response_array['status'] = "error";
        print json_encode($response_array);
        die();
      }

      $stmt->execute();

      $result = $stmt->get_result();

      $output = array();
      while($row = $result->fetch_assoc()){
          if($row["ora"] != "18:00" || $row["ora"] != "7:00"){
              $output[] = $row;
          }
      }
      $stmt->close();
      print json_encode($output);
      die();
      break;

    case 'lancia_script':

      exec("python ./script-liber8portal.py", $output, $return);
      // Return will return non-zero upon an error
      if (!$return) {
          $response_array = "script launched Successfully"; //
      } else {
          //in case the return is zero
          $response_array = "error";
          //should return the error
          //var_dump($output);
          //var_dump($return);
      }
      print json_encode($response_array);
      break;

    case 'ottieni_segnalazioni':
      $stmt = $mysqli->prepare("SELECT ora,data,segnalazione FROM segnalazione");
      if($stmt === false){
        $response_array['status'] = "error";
        print json_encode($response_array);
        die();
      }

      $stmt->execute();

      $result = $stmt->get_result();

      $output = array();
      while($row = $result->fetch_assoc()){
          if($row["data"] == date("Y-m-d")){
              $output[] = $row;
          }
      }
      $stmt->close();
      print json_encode($output);
      die();
      break;

    case 'ottieni_statistiche':

      $stmt = $mysqli->prepare("SELECT ora,giorno,data,entrate,uscite FROM library");
      if($stmt === false){
        $response_array['status'] = "error";
        print json_encode($response_array);
        die();
      }

      $stmt->execute();

      $result = $stmt->get_result();

      $output = array();
      while($row = $result->fetch_assoc()){
          $output[] = $row;
      }
      $stmt->close();
      $lun=0;$mar=0;$mer=0;$gio=0;$ven=0;
      $people=0;
      /*$a_7=array();*/$a_8=array();$a_9=array();$a_10=array();$a_11=array();$a_12=array();
      $a_13=array();$a_14=array();$a_15=array();$a_16=array();$a_17=array();
      //array_push($a_7, $people, "7:00");
      array_push($a_8, $people, "8:00");
      array_push($a_9, $people, "9:00");
      array_push($a_10, $people, "10:00");
      array_push($a_11, $people, "11:00");
      array_push($a_12, $people, "12:00");
      array_push($a_13, $people, "13:00");
      array_push($a_14, $people, "14:00");
      array_push($a_15, $people, "15:00");
      array_push($a_16, $people, "16:00");
      array_push($a_17, $people, "17:00");
      //echo '<pre>'; print_r($output); echo '</pre>';
      for ($i=0; $i < count($output) ; $i++) {
        //calcolo persone in ogni giorno della settimana
        if($output[$i]["ora"] != "7:00" && $output[$i]["ora"] != "18:00"){
          if($output[$i]["giorno"] == "lun")
            $lun+=$output[$i]["entrate"] - $output[$i]["uscite"];
          elseif ($output[$i]["giorno"] == "mar")
            $mar+=$output[$i]["entrate"] - $output[$i]["uscite"];
          elseif ($output[$i]["giorno"] == "mer")
            $mer+=$output[$i]["entrate"] - $output[$i]["uscite"];
          elseif ($output[$i]["giorno"] == "gio")
            $gio+=$output[$i]["entrate"] - $output[$i]["uscite"];
          elseif ($output[$i]["giorno"] == "ven" && $output[$i]["ora"] != "15:00" && $output[$i]["ora"] != "16:00" && $output[$i]["ora"] != "17:00")
            $ven+=$output[$i]["entrate"] - $output[$i]["uscite"];
        }
        //calcolo persone in ogni ora del giorno
        /*if($output[$i]["ora"] == "7:00")
          $a_7[0]+=$output[$i]["entrate"];
        else*/if ($output[$i]["ora"] == "8:00")
          $a_8[0]+=$output[$i]["entrate"];
        elseif ($output[$i]["ora"] == "9:00")
          $a_9[0]+=$output[$i]["entrate"];
        elseif ($output[$i]["ora"] == "10:00")
          $a_10[0]+=$output[$i]["entrate"];
        elseif ($output[$i]["ora"] == "11:00")
          $a_11[0]+=$output[$i]["entrate"];
        elseif ($output[$i]["ora"] == "12:00")
          $a_12[0]+=$output[$i]["entrate"];
        elseif ($output[$i]["ora"] == "13:00")
          $a_13[0]+=$output[$i]["entrate"];
        elseif ($output[$i]["ora"] == "14:00")
          $a_14[0]+=$output[$i]["entrate"];
        elseif ($output[$i]["ora"] == "15:00")
          $a_15[0]+=$output[$i]["entrate"];
        elseif ($output[$i]["ora"] == "16:00")
          $a_16[0]+=$output[$i]["entrate"];
        elseif ($output[$i]["ora"] == "17:00")
          $a_17[0]+=$output[$i]["entrate"];
      }
      $rush_hour=array();
      array_push($rush_hour, /*$a_7,*/ $a_8, $a_9, $a_10, $a_11, $a_12, $a_13, $a_14, $a_15, $a_16, $a_17);
      $i_max=0;
      for ($i=0; $i < 10 ; $i++) { //calcolo il max (8,9,10,11,12,13,14,15,16,17)
        if($rush_hour[$i_max][0] < $rush_hour[$i][0]){
          $i_max=$i;
        }
      }
      $a_lun=array();$a_mar=array();$a_mer=array();$a_gio=array();$a_ven=array();
      array_push($a_lun, $lun, "lunedì");
      array_push($a_mar, $mar, "martedì");
      array_push($a_mer, $mer, "mercoledì");
      array_push($a_gio, $gio, "giovedì");
      array_push($a_ven, $ven, "venerdì");
      $result=array();
      array_push($result, $a_lun, $a_mar, $a_mer, $a_gio, $a_ven, $rush_hour[$i_max]);
      print json_encode($result);
      die();
      break;
    }
  }

  /**********LANCIARE SCRIPT PYTHON*************/
  /*
  //DA USARE PER LANCIARE GLI SCRIPT PYTHON DA PHP(BACKEND)
  exec("python ./script-liber8portal.py", $output, $return);
  // Return will return non-zero upon an error
  if (!$return) {
      echo "script launched Successfully"; //
  } else {
      //in case the return is zero
      echo "script not  launched Successfully";
      //should return the error
      //var_dump($output);
      //var_dump($return);
  }
  */

  /*case 'aggiorna_giorno':
    if(isset($_POST["dt"])){
      $stmt = $mysqli->prepare("SELECT ora,giorno,data,entrate,uscite FROM library WHERE data=$_POST['dt']");
      if($stmt === false){
        $response_array['status'] = "error";
        print json_encode($response_array);
        die();
      }

      $stmt->execute();

      $result = $stmt->get_result();

      $output = array();
      while($row = $result->fetch_assoc()){
          $output[] = $row;
      }
      $stmt->close();

      print json_encode($output);
      die();
    }
    print json_encode($output);
    break;*/
?>
