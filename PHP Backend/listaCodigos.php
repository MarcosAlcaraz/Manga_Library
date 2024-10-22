<?php
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
	
    //sentencia 
    $codigos = [];
    $sql = "SELECT * from Datos";
    
    //ejecucion de la sentencia
    $result = mysqli_query($conn, $sql);
    
    if(mysqli_num_rows($result) > 0) {
        while($row = mysqli_fetch_assoc($result)) {
            $codigos[] = $row['Codigo'];
        }
    } else {
    echo "0";
    }
    echo json_encode($codigos);
    
    mysqli_close($conn);
?>