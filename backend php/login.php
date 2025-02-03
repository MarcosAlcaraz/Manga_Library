<?php
	// DATOS PARA INGRESAR
	$Email = $_GET['Email'];
	$Password = $_GET['Password'];
	// Credenciales de conexión
	$servername = "localhost";
	$username = "id19657464_markuztron";
	$password = ">jD-MbY~@Bug2_D(";
	$dbname = "id19657464_datos";
    
	$answer = "";
	$res = "noconection";
	
	// Crear Conexión
	$conn = new mysqli($servername, $username, $password, $dbname);
	
	// Verificación de Conexión
	if (!$conn) {
	die("Error de Conexión: " . mysqli_connect_error());
	}
	//Fin de la conexión al servidor
	
	//Sentencia de Selección
	$answer = $conn->query("SELECT * FROM users");

	if ($answer) {
	   while ($row = $answer->fetch_assoc()) {
    		if ($Email == $row["email"] && $Password == $row["password"]) {
    			if ($row["member"] != "0") {
    				$res = "1";
    			} else {
    				$res = "0";
    			}
    		} 
	    }
	}
	
	echo $res;

	mysqli_close($conn);
?>