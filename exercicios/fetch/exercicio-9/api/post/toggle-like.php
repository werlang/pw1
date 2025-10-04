<?php
include "../connection.php";

$post_id = isset($_POST['post_id']) ? (int)$_POST['post_id'] : 0;
$action = isset($_POST['action']) ? $_POST['action'] : '';

if (!$post_id || !in_array($action, ['like', 'unlike'])) {
    echo json_encode(["error" => true, "message" => "Dados inválidos"]);
    exit;
}

$stmt = $conn->prepare("SELECT likes, liked FROM posts WHERE id = :id");
$stmt->execute(["id" => $post_id]);
$post = $stmt->fetch();

if (!$post) {
    echo json_encode(["error" => true, "message" => "Post não encontrado"]);
    exit;
}

$newLikes = $post['likes'];
$newLiked = $post['liked'];

if ($action == 'like' && !$newLiked) {
    $newLikes++;
    $newLiked = 1;
} elseif ($action == 'unlike' && $newLiked) {
    $newLikes--;
    $newLiked = 0;
}

$stmt = $conn->prepare("UPDATE posts SET likes = :likes, liked = :liked WHERE id = :id");
$stmt->execute(["likes" => $newLikes, "liked" => $newLiked, "id" => $post_id]);

echo json_encode(["liked" => (bool)$newLiked, "likes" => $newLikes]);
