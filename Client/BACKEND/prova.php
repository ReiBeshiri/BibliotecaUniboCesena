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
        $response_array['status'] = "Connessione con il DB non riuscita";
        print json_encode($response_array);
        die();
    }

    switch ($_GET["request"]) {

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
          $output[] = $row;
      }
      $stmt->close();

      print json_encode($output);
      die();
      break;

    case 'lancia_script':
      break;
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
  }
?>
