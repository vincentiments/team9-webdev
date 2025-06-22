<?php
$host = "localhost";
$user = "root";
$pass = "";
$db = "project";

$conn = new mysqli($host, $user, $pass, $db);

if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

$lastname = $_POST['lastname'];
$firstname = $_POST['firstname'];
$middlename = $_POST['middlename'];
$age = $_POST['age'];
$birthday = $_POST['birthday'];
$address = $_POST['address'];
$email = $_POST['email'];
$password = $_POST['password'];
$role = $_POST['role'];

$sql = "INSERT INTO user (lastname, firstname, middlename, age, birthday, address, email, password, role)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)";

$stmt = $conn->prepare($sql);
$stmt->bind_param("sssisssss", $lastname, $firstname, $middlename, $age, $birthday, $address, $email, $password, $role);

if ($stmt->execute()) {
    header("Location: login.html?registered=true");
} else {
    echo "Error: " . $stmt->error;
}

$stmt->close();
$conn->close();
?>
