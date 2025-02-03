<?php
    // Datos de Conexión
    $servername = "localhost";
    $username = "id19657464_markuztron";
    $password = ">jD-MbY~@Bug2_D(";
    $dbname = "id19657464_datos";
    
    $front = $_GET["front"];
    $pdf = $_GET["pdf"];
    
    $pass = true;
    
    
    if($front != "nodata" || $pdf != "nodata") {
        
        if(!(false !== strpos($front, "https://") && false !== strpos($front, ".")) || !(false !== strpos($pdf, "https://") && false !== strpos($pdf, "."))) {
            
            $pass = false;
            echo "Error, URL is not valid.";
        }
    }
    
    if($pass == true) {
        echo "1";
    }
?>