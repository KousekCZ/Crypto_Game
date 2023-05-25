<?php

$servername = "localhost";
$username = "root";
$password = "";

$conn = new mysqli($servername, $username, $password);

if ($conn->connect_error) {
    die("Chyba při připojení k databázi: " . $conn->connect_error);
}

$sql = "CREATE DATABASE IF NOT EXISTS mydatabase";

$conn->select_db("mydatabase");

$sql = "CREATE TABLE IF NOT EXISTS users (
    id INT(6) UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(255) NOT NULL,
    password VARCHAR(255) NOT NULL
)";

$conn->close();

$servername = "localhost";
$username = "root";
$password = "";
$dbname = "mydatabase";

$conn = new mysqli($servername, $username, $password, $dbname);

if ($conn->connect_error) {
    die("Chyba při připojení k databázi: " . $conn->connect_error);
}

if (isset($_POST['submit'])) {
    $username = $_POST['username'];
    $password = $_POST['password'];

    $sql = "SELECT * FROM users WHERE username = '$username'";
    $result = $conn->query($sql);

    if ($result->num_rows > 0) {
        $row = $result->fetch_assoc();
        if ($password == $row['password']) {
            // Přihlášení úspěšné
            echo "Přihlášení úspěšné";
            header("Location: uvod.php");
            exit;
        } else {
            echo "Chybné heslo";
        }
    } else {
        $sql = "INSERT INTO users (username, password) VALUES ('$username', '$password')";
        if ($conn->query($sql) === TRUE) {
            echo "Registrace úspěšná, přihlášení provedeno";
        } else {
            echo "Chyba při registraci: " . $conn->error;
        }
    }
}

// Uzavření spojení s databází
$conn->close();
?>

<!DOCTYPE html>
<html>
<head>
    <title>Přihlášení</title>
    <link rel="stylesheet" href="Style/first.css">
</head>
<body>
<h1>Přihlášení/registrace - pokud nebude jméno v databázi</h1>
<form method="post" action="">
    <label for="username">Jméno:</label>
    <input type="text" id="username" name="username" required><br>

    <label for="password">Heslo:</label>
    <input type="password" id="password" name="password" required><br>

    <input type="submit" name="submit" value="Přihlásit se">
</form>
</body>
</html>
