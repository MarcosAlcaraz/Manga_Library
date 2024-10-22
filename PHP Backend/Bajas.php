<?php
	//Conexión al servidor
	$servername = "localhost";
	$username = "id19657464_markuztron";
	$password = ">jD-MbY~@Bug2_D(";
	$dbname = "id19657464_datos";
	$codigo = $_GET['codigo'];
	
	// Crear Conexión
	$conn = mysqli_connect($servername, $username, $password, $dbname);
	
	// Verificación de Conexión
	if (!$conn) {
	    die("Error de Conexión: " . mysqli_connect_error());
	}
	
	//Sentencia de Baja
	$sql = "DELETE FROM `Datos` WHERE `Datos`.`Codigo` = $codigo";
	if(mysqli_query($conn, $sql))
	{
		echo "1";
	} else {
		echo"0";
	}
	mysqli_close($conn);
?>