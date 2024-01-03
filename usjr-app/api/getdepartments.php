<?php

header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Methods: POST, GET, PUT, DELETE");
header("Access-Control-Max-Age: 3600");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");

require_once '../db.php';

try {
    $query = 'SELECT * FROM departments;';

    $queryStatement = $dbconnection->prepare($query);

    $queryStatement->execute();

    echo json_encode($queryStatement->fetchAll(PDO::FETCH_ASSOC));
} catch (PDOException $error){
     echo $error->getMessage();
}