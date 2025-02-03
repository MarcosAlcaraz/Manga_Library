<?php
	// Credenciales de conexión
    $servername = "localhost";
	$username = "id19657464_markuztron";
	$passworddb = ">jD-MbY~@Bug2_D(";
	$dbname = "id19657464_datos";
	$email = $_GET["email"];
	$pass = $_GET["pass"];
    
	// Crear Conexión
	$conn = new mysqli($servername, $username, $passworddb, $dbname);
	
	// Verificación de Conexión
	if (!$conn) {
	    die("Error de Conexión: " . mysqli_connect_error());
	}
	
	//Sentencia de Modificación
    	if ($conn->query("UPDATE `users` SET `password` = '$pass' WHERE `users`.`email` = '$email'")) {
    	    echo "1";
    	} else {
    	    echo "0";
    	}

	mysqli_close($conn);
?>