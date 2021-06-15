<?php

class DB {
    function __construct() {
        $host = "localhost";
        $user = "root";
        $password = "";
        $db = "enterprise";
        $this->conn = new mysqli($host, $user, $password, $db);
        if ($this->conn->connect_errno) {
            printf("Не удалось подключиться: %s\n", $conn->connect_error);
            exit();
        }
    }

    function __destruct() {
        $this->conn->close();
    }

    public function getMonetaryAssets() {
        $query = "SELECT * FROM monetary_assets";
        $result = $this->conn->query($query);
        return $result->fetch_all();
    }

    public function getNonMonetaryAssets() {
        $query = "SELECT * FROM non_monetary_assets";
        $result = $this->conn->query($query);
        return $result->fetch_all();
    }

    // public function deleteMonetaryAsset($amount, $bankName, $accountNumber, $denomination) {
    //     $query = "DELETE FROM monetary_assets 
    //         WHERE amount = " . $amount . " AND bank_name = '" . $bankName . "' AND account_number = " . $accountNumber . " AND denomination = '" . $denomination . "'";
    //     $result = $this->conn->query($query);
    //     return $result;
    // }

    // public function deleteNonMonetaryAsset($name, $balanceValue, $residualValue, $assessedValue, $creationDate, $measure, $denomination, $additionalInformation) {
    //     $query = "DELETE FROM non_monetary_assets 
    //         WHERE name = '" . $name . "' AND balance_value = " . $balanceValue . " AND residual_value = " . $residualValue . " AND assessed_value = " . 
    //             $assessedValue . " AND creation_date = '" . $creationDate . "' AND measure = '" . $measure . "' AND denomination = '" . $denomination . 
    //             "' AND additional_information = '" . $additionalInformation . "'";
    //     $result = $this->conn->query($query);
    //     return $result;
    // }

    public function deleteMonetaryAsset($id) {
        $query = "DELETE FROM monetary_assets WHERE id = " . $id;
        $result = $this->conn->query($query);
        return $result;
    }

    public function deleteNonMonetaryAsset($id) {
        $query = "DELETE FROM non_monetary_assets WHERE id = " . $id;
        $result = $this->conn->query($query);
        return $result;
    }

    public function addMonetaryAsset($amount, $bankName, $accountNumber, $denomination) {
        if ($accountNumber == "")
            $accountNumber = "NULL";
        $query = "INSERT INTO monetary_assets(amount, bank_name, account_number, denomination) 
            VALUES(" . $amount . ", '" . $bankName . "', " . $accountNumber . ", '" . $denomination . "')";
        $result = $this->conn->query($query);
        return $result;
        // return $query;
    }

    public function addNonMonetaryAsset($name, $balanceValue, $residualValue, $assessedValue, $creationDate, $measure, $denomination, $additionalInformation) {
        if ($creationDate == "")
            $creationDate = "NULL"; 
        $query = "INSERT INTO non_monetary_assets(name, balance_value, residual_value, assessed_value, creation_date, measure, denomination, additional_information) 
            VALUES('" . $name . "', " . $balanceValue . ", " . $residualValue . ", " . $assessedValue . ", " . $creationDate . ", '" . $measure . "', '" . $denomination . "', '" . $additionalInformation . "')";
        $result = $this->conn->query($query);
        return $result;
    }

    public function updateMonetaryAsset($id, $amount, $bankName, $accountNumber, $denomination) {
        $this->deleteMonetaryAsset($id);
        return $this->addMonetaryAsset($amount, $bankName, $accountNumber, $denomination);
    }

    public function updateNonMonetaryAsset($id, $name, $balanceValue, $residualValue, $assessedValue, $creationDate, $measure, $denomination, $additionalInformation) {
        $this->deleteNonMonetaryAsset($id);
        return $this->addNonMonetaryAsset($name, $balanceValue, $residualValue, $assessedValue, $creationDate, $measure, $denomination, $additionalInformation);
    }
    
    public function getMonetaryAssetById($id) {
        $query = "SELECT * FROM monetary_assets WHERE id = " . $id;
        $result = $this->conn->query($query);
        return $result->fetch_assoc();
    }

    public function getNonMonetaryAssetById($id) {
        $query = "SELECT * FROM non_monetary_assets WHERE id = " . $id;
        $result = $this->conn->query($query);
        return $result->fetch_assoc();
    }


}