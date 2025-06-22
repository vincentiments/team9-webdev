<?php
$host = "localhost";
$user = "root";
$pass = "";
$db = "project";

$conn = new mysqli($host, $user, $pass, $db);

if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

$email = $_POST['email'];
$password = $_POST['password'];

$sql = "SELECT * FROM user WHERE email = ? AND password = ?";
$stmt = $conn->prepare($sql);
$stmt->bind_param("ss", $email, $password);
$stmt->execute();
$result = $stmt->get_result();

if ($result->num_rows === 1) {
    $user = $result->fetch_assoc();

    if ($user['role'] === "brgy-official") {
        header("Location: admin-dashboard.html");
    } else {
        header("Location: homepage.html");
    }
} else {
    echo "<script>alert('Invalid login. Please try again.'); window.location.href = 'login.html';</script>";
}

$stmt->close();
$conn->close();
?>
