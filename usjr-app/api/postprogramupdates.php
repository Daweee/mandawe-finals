<?php
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Methods: POST, GET, PUT, DELETE");
header("Access-Control-Max-Age: 3600");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");


require_once '../db.php';

$requestBody = file_get_contents('php://input');
$programUpdateData = json_decode($requestBody,true);

$message = [];

function validDataInputs($values){

    $stringPattern = "/^[A-z\d\s\'\-]+$/";
    $idPattern = "/^[1-9][\d]*$/";
 
    $validBag = [];
 
    $valueBag = count($values);
 
    foreach($values as $key=>$value){
        if($key !== 'progid' || $key !== 'progcollid' || $key !== 'progcolldeptid' ){
            (preg_match($stringPattern,$value)) ? $validBag[] = true : $validBag[] = false;
            $message['errors'][$key] = 'Only characters, spaces, apostrophies and hyphens are accepted.';
        } else {
            (preg_match($idPattern, $value)) ? $validBag[] = true : $validBag[] = false;
            $message['errors'][$key] = 'Only numbers not starting with a zero are accepted.';
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
  
 if(validDataInputs($programUpdateData)){ 
     // echo 'All inputs are valid.';
         $sql = 'UPDATE programs SET progfullname = ?,
                                     progshortname = ?,
                                     progcollid = ?,
                                     progcolldeptid = ?
                                     WHERE progid = ?;';
 
         $dbStatment = $dbconnection->prepare($sql);

         $dbStatment->bindParam(1,$programUpdateData['progfullname'],PDO::PARAM_STR);
         $dbStatment->bindParam(2,$programUpdateData['progshortname'],PDO::PARAM_STR);
         $dbStatment->bindParam(3,$programUpdateData['progcollid'],PDO::PARAM_INT);
         $dbStatment->bindParam(4,$programUpdateData['progcolldeptid'],PDO::PARAM_INT);
         $dbStatment->bindParam(5,$programUpdateData['progid'],PDO::PARAM_INT);
 
         $dbStatment->execute();
 
         $rowsInserted = $dbStatment->rowCount();
 
         if($rowsInserted > 0){
             $message['status'] = 'Student information is successfully updated.';
             $message['code'] = 200;
         } else {
             $message['status'] = 'Student information was not updated.';
             $message['code'] = 400;
         }
     }
 
 echo json_encode($message);