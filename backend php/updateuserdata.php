<?php
	// Credenciales de conexión
    $servername = "localhost";
	$username = "id19657464_markuztron";
	$passworddb = ">jD-MbY~@Bug2_D(";
	$dbname = "id19657464_datos";
	
	$query = $_GET['query'];
    
	// Crear Conexión
	$conn = new mysqli($servername, $username, $passworddb, $dbname);
	
	// Verificación de Conexión
	if (!$conn) {
	    die("Error de Conexión: " . mysqli_connect_error());
	}
	
	//Sentencia de Inserción
    	if ($conn->query($query)) {
    	    echo "1";
    	} else {
    	    echo "0";
    	}

	mysqli_close($conn);
?>