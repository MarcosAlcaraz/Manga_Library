<?php
// Credenciales de conexión
	$servername = "localhost";
	$username = "id19657464_markuztron";
	$password = ">jD-MbY~@Bug2_D(";
	$dbname = "id19657464_datos";
	
	$title = $_GET["title"];
	$dc = $_GET["dc"];
	
	if($dc == "DELETE") {
	    
	    // Crear Conexión
    	$conn = new mysqli($servername, $username, $password, $dbname);
    	
    	// Verificación de Conexión
    	if (!$conn) {
    	    
    	    die("Error de Conexión: " . mysqli_connect_error());
    	}
    
        if($conn->query ("DELETE FROM `mangaLibray` WHERE `mangaLibray`.`title` = '$title'")) {
            
            echo "1";
        } else {
            
            echo "0";
        }
        
        mysqli_close($conn);
	} else {
	    echo "Pleace Write DELETE to confirm.";
	}
?>