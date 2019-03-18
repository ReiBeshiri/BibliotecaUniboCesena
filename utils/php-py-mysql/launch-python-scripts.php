<?php
//DA USARE PER LANCIARE GLI SCRIPT PYTHON DA PHP(BACKEND)
exec("python ./script-insert-mysql.py parametri", $output, $return);
// Return will return non-zero upon an error
if (!$return) {
    echo "script runned Successfully"; //
} else {
    //in case the return is zero
    echo "script not  runned Successfully";
    //should return the error
    var_dump($output);
    var_dump($return);
}
?>
