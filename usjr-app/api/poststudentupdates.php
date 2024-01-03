<?php

header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Methods: POST, GET, PUT, DELETE");
header("Access-Control-Max-Age: 3600");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");

require_once '../db.php';

$requestBody = file_get_contents('php://input');
$studentUpdateData = json_decode($requestBody, true);

$message = [];

function validDataInputs($values)
{
    $idPattern = "/^[1-9][\d]*$/";
    $yearPattern = "/^[1-5]+$/";
    $namePattern = "/^[A-z\s\'\-]+$/";

    $validBag = [];

    $valueBag = count($values);

    foreach ($values as $key => $value) {
        if ($key === 'studid') {
            (preg_match($idPattern, $value)) ? $validBag[] = true : $validBag[] = false;
            $message['errors'][$key] = 'Only numbers not starting with a zero are accepted.';
        } elseif ($key === 'studyear') {
            (preg_match($yearPattern, $value)) ? $validBag[] = true : $validBag[] = false;
            $message['errors'][$key] = 'Only numbers from 1 to 5 are accepted.';
        } elseif ($key === 'studprogid' || $key === 'studcollid') {
            (preg_match('/^[\d]+$/', $value)) ? $validBag[] = true : $validBag[] = false;
        } else {
            (preg_match($namePattern, $value)) ? $validBag[] = true : $validBag[] = false;
            $message['errors'][$key] = 'Only characters, spaces, apostrophies, and hyphens are accepted.';
        }
    }

    $counter = 0;

    foreach ($validBag as $validItem) {
        if ($validItem) {
            $counter++;
        }
    }

    return ($counter === $valueBag) ? true : false;
}

try {
    if (validDataInputs($studentUpdateData)) {
        $sql = 'UPDATE students SET studfirstname = ?,
                                     studlastname = ?,
                                     studmidname = ?,
                                     studprogid = ?,
                                     studcollid = ?,
                                     studyear = ?
                                     WHERE studid = ?;';

        $dbStatment = $dbconnection->prepare($sql);

        $dbStatment->bindParam(1, $studentUpdateData['studfirstname'], PDO::PARAM_STR);
        $dbStatment->bindParam(2, $studentUpdateData['studlastname'], PDO::PARAM_STR);
        $dbStatment->bindParam(3, $studentUpdateData['studmidname'], PDO::PARAM_STR);
        $dbStatment->bindParam(4, $studentUpdateData['studprogid'], PDO::PARAM_INT);
        $dbStatment->bindParam(5, $studentUpdateData['studcollid'], PDO::PARAM_INT);
        $dbStatment->bindParam(6, $studentUpdateData['studyear'], PDO::PARAM_INT);
        $dbStatment->bindParam(7, $studentUpdateData['studid'], PDO::PARAM_INT);

        $dbStatment->execute();

        $rowsInserted = $dbStatment->rowCount();

        if ($rowsInserted > 0) {
            $message['status'] = 'Student information is successfully updated.';
            $message['code'] = 200;
        } else {
            $message['status'] = 'Student information was not updated.';
            $message['code'] = 400;
        }
    }
} catch (PDOException $e) {
    $message['status'] = 'Error updating student information.';
    $message['code'] = 500;
    $message['error'] = $e->getMessage();
    $message['sql'] = $sql;
    $message['parameters'] = $studentUpdateData;
}

echo json_encode($message);
