<?php
// Datos de Conexión
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

// Seleccionar todas las columnas de la Tabla
$sql = "SELECT * FROM Datos";
$result = mysqli_query($conn, $sql);

// Se declara un array para almacenar los datos de la consulta
$emparray = array();

// Verifica si hay datros extraidos
if (mysqli_num_rows($result) > 0) {
  // Extrae los datos de cada columna
  while($row = mysqli_fetch_assoc($result)) {
    $emparray[] = $row;
  }
} else {
  echo "0 Resultados";
}

// Imprime el JSON
echo json_encode($emparray);

mysqli_close($conn);
?>