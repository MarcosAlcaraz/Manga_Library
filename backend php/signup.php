<?php
	// Credenciales de conexión
    $servername = "localhost";
	$username = "id19657464_markuztron";
	$passworddb = ">jD-MbY~@Bug2_D(";
	$dbname = "id19657464_datos";
	
	$email = $_GET['email'];
	$name = $_GET['name'];
	$age = $_GET['age'];
	$member = $_GET['member'];
	$password = $_GET['password'];
	$profileImage = $_GET['profileImage'];
	$query = "INSERT INTO `users` (`email`, `password`, `member`, `name`, `age`, `profileImage`) VALUES ('$email', '$password', '$member', '$name', '$age', '$profileImage')";
	
	if(!(false !== filter_var($email, FILTER_VALIDATE_EMAIL))) {
	    
	    echo "Email is no Valid, pleace fill it with a valid email.";
	} else {
	    
	    if ($email == "" || $name == "" || $age == "" || $member == -1 || $password == "") {
	        
	        echo "Some input is void, pleace fill it.";
    	} else {
    	    
    	    // Crear Conexión
        	$conn = new mysqli($servername, $username, $passworddb, $dbname);
        	
        	// Verificación de Conexión
        	if (!$conn) {
        	    die("Error de Conexión: " . mysqli_connect_error());
        	}
        	
        	$answer = $conn->query("SELECT `email` FROM `users` WHERE `users`.`email` = '$email'");
        	$row = $answer->fetch_assoc();
        	
        	if ($row["email"] == $email) {
                echo "Email alredy used, try with another email.";
            } else {
                //Sentencia de Inserción
            	if ($conn->query($query)) {
            	    echo "User successfully registered!";
            	} else {
            	    echo "Error, try again later.";
        	    }
            }
        
        	mysqli_close($conn);
    	}
	}
?>