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
	
	//Sentencia de Inserción
	$sql = "INSERT INTO `Datos`(`Nombre`, `Codigo`, `Tarea`, `Imagen`) VALUES ('$Nombre', '$Codigo', '$Tarea', '$ImagenURL')";
	if(mysqli_query($conn, $sql))
	{
		echo "1";
	} else {
		echo"0";
	}
	mysqli_close($conn);
?>