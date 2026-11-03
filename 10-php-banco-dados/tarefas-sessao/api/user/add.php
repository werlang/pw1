<?php
// Incluído por index.php quando o método é POST.
header("Content-Type: application/json");

require __DIR__ . "/../connection.php";

// Valida antes de usar: campo vazio não pode virar usuário no banco.
if (empty($_POST["name"]) || empty($_POST["email"]) || empty($_POST["password"])) {
    http_response_code(400);
    echo json_encode([
        "error" => true,
        "message" => "Nome, e-mail e senha são obrigatórios",
    ]);
    exit;
}

$name = $_POST["name"];
$email = $_POST["email"];

// O campo type="email" do HTML ajuda, mas a API também precisa conferir.
if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
    http_response_code(400);
    echo json_encode([
        "error" => true,
        "message" => "O e-mail informado não é válido",
    ]);
    exit;
}

$password = password_hash($_POST["password"], PASSWORD_DEFAULT);

try {
    // O e-mail precisa ser único: antes de inserir, verificamos se já existe.
    $sql = "SELECT id FROM users WHERE email = ?";
    $stmt = $conn->prepare($sql);
    $stmt->execute([ $email ]);
    $user = $stmt->fetch();

    if ($user) {
        http_response_code(409);
        echo json_encode([
            "error" => true,
            "message" => "Usuário já existe",
        ]);
        exit;
    }

    $sql = "INSERT INTO users (name, email, password) VALUES
        (:name, :email, :password)";

    $stmt = $conn->prepare($sql);
    $stmt->execute([
        "name" => $name,
        "email" => $email,
        "password" => $password,
    ]);

    http_response_code(201);
    echo json_encode([
        "message" => "Usuário inserido",
        "user" => [
            "name" => $name,
            "email" => $email,
        ],
    ]);
}
catch (PDOException $error) {
    http_response_code(500);
    echo json_encode([
        "error" => true,
        "message" => "Erro ao executar a consulta",
    ]);
}
