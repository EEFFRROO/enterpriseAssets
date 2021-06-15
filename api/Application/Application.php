<?php

require_once("DB/DB.php");

class Application {
    function __construct() {
        $this->db = new DB();
    }

    public function getAssets() {
        $result = array(
            $this->db->getMonetaryAssets(),
            $this->db->getNonMonetaryAssets()
        );
        return $result;
        return false;
    }

    // public function deleteAsset($params) {
    //     if ($params["amount"] && $params["bankName"] && $params["accountNumber"] && $params["denomination"]) {
    //         return $this->db->deleteMonetaryAsset($params["amount"], $params["bankName"], $params["accountNumber"], $params["denomination"]);
    //     }
    //     if ($params["name"] && $params["balanceValue"] && $params["residualValue"] && $params["assessedValue"] && 
    //         $params["creationDate"] && $params["measure"] && $params["denomination"] && $params["additionalInformation"]) {
    //             return $this->db->deleteNonMonetaryAsset($params["name"], $params["balanceValue"], $params["residualValue"], $params["assessedValue"], 
    //                 $params["creationDate"], $params["measure"], $params["denomination"], $params["additionalInformation"]);
    //     }
    //     return false;
    // }

    public function deleteAsset($params) {
        if ($params["id"] && $params["typeAsset"]) {
            if ($params["typeAsset"] == "monetary")
                return $this->db->deleteMonetaryAsset($params["id"]);
            else if ($params["typeAsset"] == "nonMonetary")
                return $this->db->deleteNonMonetaryAsset($params["id"]);
            return false;
        }
        return false;
    }

    public function addAsset($params) {
        if ($params["typeAsset"] == "monetary")
            return $this->db->addMonetaryAsset($params["amount"], $params["bankName"], $params["accountNumber"], $params["denomination"]);
        else if ($params["typeAsset"] == "nonMonetary")
            return $this->db->addNonMonetaryAsset($params["name"], $params["balanceValue"], $params["residualValue"], $params["assessedValue"], 
                $params["creationDate"], $params["measure"], $params["denomination"], $params["additionalInformation"]);
        return false;
    }

    public function updateAsset($params) {
        if ($params["typeAsset"] == "monetary")
            return $this->db->updateMonetaryAsset($params["id"], $params["amount"], $params["bankName"], $params["accountNumber"], $params["denomination"]);
        else if ($params["typeAsset"] == "nonMonetary")
            return $this->db->updateNonMonetaryAsset($params["id"], $params["name"], $params["balanceValue"], $params["residualValue"], $params["assessedValue"], 
                $params["creationDate"], $params["measure"], $params["denomination"], $params["additionalInformation"]);
        return false;
    }

    public function getAssetById($params) {
        if ($params["typeAsset"] == "monetary")
            return $this->db->getMonetaryAssetById($params["id"]);
        else if ($params["typeAsset"] == "nonMonetary")
            return $this->db->getNonMonetaryAssetById($params["id"]);
        return false;
    }


}