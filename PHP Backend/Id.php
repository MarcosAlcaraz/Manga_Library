<?php
	//DATOS PARA INGRESAR
	$Nombre = $_GET['nombre'];
	$Codigo = $_GET['codigo'];
	$Tarea = $_GET['tarea'];
	$ImagenURL = $_GET['imagenurl'];
	
	//Conexión al servidor
	// Credenciales
	$servername = "localhost";
	$username = "id19657464_markuztron";
	$password = ">jD-MbY~@Bug2_D(";
	$dbname = "id19657464_datos";
	// Crear Conexión
	$conn = mysqli_connect($servername, $username, $password, $dbname);
	// Verificación de Conexión
	if (!$conn) {
	die("Error de Conexión: " . mysqli_connect_error());
	}
	//Fin de la conexión al servidor
	
	//Sentencia de Lectura
	$sql = "SELECT `id`, `Nombre`, `Codigo`, `Tarea`, `Imagen` FROM `Datos` WHERE 1 VALUES ('$Nombre', '$Codigo', '$Tarea', '$ImagenURL')";
	echo "$Nombre";
	echo "$Codigo";
	echo "$Tarea";
	imagejpg($ImagenURL);
	mysqli_close($conn);
?>