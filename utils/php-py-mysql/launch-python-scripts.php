<?php
//DA USARE PER LANCIARE GLI SCRIPT PYTHON DA PHP(BACKEND)
exec("python ./script-liber8portal.py", $output, $return);
// Return will return non-zero upon an error
if (!$return) {
    echo "script launched Successfully"; //
} else {
    //in case the return is zero
    echo "script not  launched Successfully";
    //should return the error
    var_dump($output);
    var_dump($return);
}
?>
