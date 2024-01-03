<?php
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Methods: POST, GET, PUT, DELETE");
header("Access-Control-Max-Age: 3600");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");

require_once '../db.php';

if(isset($_GET['progid'])) {

    $progid = $_GET['progid'];

    try {
        $query = 'SELECT * FROM programs WHERE progid=?;';
    
        $queryStatement = $dbconnection->prepare($query);
    
        $queryStatement->bindParam(1,$progid,PDO::PARAM_INT);
    
        $queryStatement->execute();
    
        echo json_encode($queryStatement->fetch(PDO::FETCH_ASSOC));
    } catch (PDOException $error){
         echo $error->getMessage();
    }
} else {
    echo json_encode(array("error" => "progid parameter is missing"));
}

