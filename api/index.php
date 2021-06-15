<?php

require_once("Application/Application.php");

function router($params) {
    $method = $params["method"];
    if ($method) {
        $app = new Application();
        switch ($method) {
            case "getAssets": return $app->getAssets();
            case "deleteAsset": return $app->deleteAsset($params);
            case "addAsset": return $app->addAsset($params);
            case "updateAsset": return $app->updateAsset($params);
            case "getAssetById": return $app->getAssetById($params);
            default: return false;
        }
    }

    return false;
}



function answer($data) {
    if ($data) {
        return array(
            "result" => "ok",
            "data" => $data
        );
    } 
    return array(
        "result" => "error", 
        "error" => array(
            "code" => 9000, 
            "text" => "unknown error"
        )
    );
}

echo json_encode(answer(router($_GET)));