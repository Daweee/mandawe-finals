<?php
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Methods: POST, GET, PUT, DELETE");
header("Access-Control-Max-Age: 3600");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");

require_once '../db.php';

if (isset($_GET['collid'])) {
    $collid = $_GET['collid'];

    try {
        $query = 'SELECT * FROM colleges WHERE collid=?;';

        $queryStatement = $dbconnection->prepare($query);

        $queryStatement->bindParam(1, $collid, PDO::PARAM_INT);

        $queryStatement->execute();

        echo json_encode($queryStatement->fetch(PDO::FETCH_ASSOC));
    } catch (PDOException $error) {
        echo json_encode(array("error" => $error->getMessage()));
    }
} else {
    echo json_encode(array("error" => "collid parameter is missing"));
}
?>
