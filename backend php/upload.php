<?php
    // Datos de Conexión
    $servername = "localhost";
    $username = "id19657464_markuztron";
    $password = ">jD-MbY~@Bug2_D(";
    $dbname = "id19657464_datos";
    
    $title = $_GET["title"];
    $front = $_GET["front"];
    $pdf = $_GET["pdf"];
    $artist = $_GET["artist"];
    
    $query = "INSERT INTO `mangaLibray` (`title`, `front`, `pdf`, `artist`) VALUES ('$title', '$front', '$pdf', '$artist')";
    
    if(false !== strpos($front, "https://") && false !== strpos($front, ".")) {
        
        if(false !== strpos($pdf, "https://") && false !== strpos($pdf, ".")) {
            
            if ($title == "" || $front == "" || $pdf == "" || $artist == "") {
                
                echo "Some input is void, pleace fill it.";
        	} else {
        	    
        	    // Crear Conexión
                $conn = new mysqli($servername, $username, $password, $dbname);
                
                // Verificación de Conexión
                if (!$conn) {
                    die("Error de Conexión: " . mysqli_connect_error());
                }
                
                 if ($conn->query($query))
                {
                    
                	echo "Title Shared Successfully!";
                } else {
                    
                	echo "Error, try again later.";
                }
                
                mysqli_close($conn);
        	}
        } else {
            echo "Error, PDF URL is not valid.";
        }
    } else {
        echo "Error, Front image URL is not valid.";
    }
?>
