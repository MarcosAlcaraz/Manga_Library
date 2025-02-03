<?php
// Credenciales de conexión
	$servername = "localhost";
	$username = "id19657464_markuztron";
	$password = ">jD-MbY~@Bug2_D(";
	$dbname = "id19657464_datos";
	$email = $_GET["email"];

	
	// Crear Conexión
	$conn = new mysqli($servername, $username, $password, $dbname);
	
	// Verificación de Conexión
	if (!$conn) {
	die("Error de Conexión: " . mysqli_connect_error());
	}
	
	if(($conn->query ("SELECT `artist` FROM `mangaLibray` WHERE `artist`='$email'")) == $email) {
	    
	    // Seleccionar todas las columnas de la Tabla
        $answer = $conn->query ("SELECT * FROM `mangaLibray` WHERE `artist`='$email'");
        
        // Verifica si se ha extraido información
        if($answer) {
            
            //Extrae cada fila de la tabla. 
            while ($row = $answer->fetch_assoc()) {
                $array[] = $row;
            }
            
            // Imprime el JSON
            echo json_encode($array);
        } else {
            
          echo "0";
        }
	} else {
	    echo "0";
	}
    
    mysqli_close($conn);
?>