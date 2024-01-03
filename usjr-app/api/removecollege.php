<?php
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Methods: POST, GET, PUT, DELETE");
header("Access-Control-Max-Age: 3600");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");

require_once '../db.php';


$requestBody = file_get_contents('php://input');
$deleteData = json_decode($requestBody, true);

$message = [];

        $deleteSQL = 'DELETE FROM colleges WHERE collid = ?;';

        $removeStatement = $dbconnection->prepare($deleteSQL);

        $removeStatement->bindParam(1, $deleteData['collid'],PDO::PARAM_INT);

        $removeStatement->execute();

        if($removeStatement->rowCount() > 0){
            $message['status'] = "Successfully removed student information from file.";
            $message['code'] = 200;
        } else {
            $message['status'] = 'Unsuccessfull removal was experienced.';
            $message['code'] = 400;
        }

echo json_encode($message);