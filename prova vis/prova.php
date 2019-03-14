<?php
exec("type NUL > 1.txt");

// Return will return non-zero upon an error
if (!$return) {
    echo "PDF Created Successfully";
} else {
    echo "PDF not created";
}
?>
