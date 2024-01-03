<?php

header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Methods: POST, GET, PUT, DELETE");
header("Access-Control-Max-Age: 3600");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");


require_once '../db.php';

$requestBody = file_get_contents('php://input');
$departmentInsertData = json_decode($requestBody,true);

$message = [];

function validDataInputs($values){

    $idPattern = "/^[1-9][\d]*$/";
    $namePattern = "/^[A-z\s\'\-]+$/";
 
    $validBag = [];
 
    $valueBag = count($values);
 
    foreach($values as $key=>$value){
             if($key === 'deptid' || $key === 'deptcollid'){
                 (preg_match($idPattern, $value)) ? $validBag[] = true : $validBag[] = false;
                 $message['errors'][$key] = 'Only numbers not starting with a zero are accepted.';
             } else {
                 (preg_match($namePattern,$value)) ? $validBag[] = true : $validBag[] = false;
                 $message['errors'][$key] = 'Only characters, spaces, apostrophies and hyphens are accepted.';
             }
    }
 
    $counter = 0;
 
    foreach($validBag as $validItem){
        if($validItem){
          $counter++;
        }
    }
 
    return ($counter === $valueBag) ? true : false;
 }
 
 function find($id, $connection){
    $search = 'SELECT deptid FROM departments WHERE deptid = ?;';
 
    $searchStatement = $connection->prepare($search);
    $searchStatement->bindParam(1,$id,PDO::PARAM_INT);
    $searchStatement->execute();
 
    return $searchStatement->rowCount();
 }
 
 if(validDataInputs($departmentInsertData)){
 
     // echo 'All inputs are valid.';
     if(find($departmentInsertData['deptid'], $dbconnection) > 0){
         $message['status'] = 'Department ID already exists in the system.';
         $message['code'] = 300;
     } else {
         $sql = 'INSERT INTO departments VALUES(?,?,?,?);';
 
         $dbStatment = $dbconnection->prepare($sql);
 
         $dbStatment->bindParam(1,$departmentInsertData['deptid'],PDO::PARAM_INT);
         $dbStatment->bindParam(2,$departmentInsertData['deptfullname'],PDO::PARAM_STR);
         $dbStatment->bindParam(3,$departmentInsertData['deptshortname'],PDO::PARAM_STR);
         $dbStatment->bindParam(4,$departmentInsertData['deptcollid'],PDO::PARAM_INT);
 
         $dbStatment->execute();
 
         $rowsInserted = $dbStatment->rowCount();
 
         if($rowsInserted > 0){
             $message['status'] = 'College Entry has been added.';
             $message['code'] = 200;
         }
     }
 } else {
     $message['status'] = 'There are some invalid input values.';
     $message['code'] = 400;
 }
 
 echo json_encode($message);