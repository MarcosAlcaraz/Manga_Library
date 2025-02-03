<?php
// Credenciales de conexión
	$servername = "localhost";
	$username = "id19657464_markuztron";
	$password = ">jD-MbY~@Bug2_D(";
	$dbname = "id19657464_datos";
	
	$email = $_GET["email"];
	$dc = $_GET["dc"];
	
	if($dc == "DELETE $email") {
	    
	    // Crear Conexión
    	$conn = new mysqli($servername, $username, $password, $dbname);
    	
    	// Verificación de Conexión
    	if (!$conn) {
    	    
    	    die("Error de Conexión: " . mysqli_connect_error());
    	}
    
        if($conn->query ("DELETE FROM `users` WHERE `users`.`email` = '$email'")) {
            
            echo "$email Deleted Successfully!";
        } else {
            
            echo "Error, try again later.";
        }
        
        mysqli_close($conn);
	} else {
	    echo "Pleace Write 'DELETE $email' to confirm.";
	}
?>