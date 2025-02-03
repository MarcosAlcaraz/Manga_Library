<?php
    // Datos de Conexión
    $servername = "localhost";
    $username = "id19657464_markuztron";
    $password = ">jD-MbY~@Bug2_D(";
    $dbname = "id19657464_datos";
    
    $url = $_GET["url"];
    $email = $_GET["email"];
    
    $pass = true;
    
    
    if($url != "nodata") {
        
        if(!(false !== strpos($url, "https://") && false !== strpos($url, "."))) {
            
            $pass = false;
            echo "Error, URL is not valid.";
        }
        
        if($email != "nodata") {
        
        if(!(false !== strpos($email, "@") && false !== strpos($email, "."))) {
            
            $pass = false;
            echo "Error, Email is not valid.";
        }
    }
    }
    
    if($pass == true) {
        echo "1";
    }
?>