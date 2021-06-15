window.onload = () => {
    

    const server = new Server();

    const btnShowAssets = document.getElementsByClassName("btnShowAssets").item(0);
    const backgroundOfAddForm = document.getElementsByClassName("backgroundOfAddForm").item(0);
    const addMonetaryAssetForm = document.getElementsByClassName("addMonetaryAssetForm").item(0);
    const addNonMonetaryAssetForm = document.getElementsByClassName("addNonMonetaryAssetForm").item(0);
    const titlesForms = document.getElementsByClassName("titleForm");
    const confirmBtns = document.getElementsByClassName("confirmBtn");
    
    

    btnShowAssets.onclick = async () => {
        let data = await server.getAssets().then(res => {return res}).then(res => {return res}); // Получаем массивы активов
        // Денежные активы
        let monetaryAssets = document.createElement("div"); 
        monetaryAssets.className = "monetaryAssets";
        let title = document.createElement("h2"); // Заголовок блока
        title.innerText = "Денежные активы";
        let namesOfCollumns = ["Количество", "Имя Банка", "Номер Аккаунта", "Номинал"];
        let table = createTable(namesOfCollumns, data[0], "monetary"); // Таблица в блоке
        
        let addBtn = document.createElement("button"); // Кнопка добавления в блоке
        addBtn.innerText = "Добавить новый денежный актив";
        addBtn.className = "addAssetBtn";
        addBtn.onclick = () => {
            confirmBtns.item(0).onclick = addMonetaryClick; // При нажатии кнопки "принять" будет "добавление"
            titlesForms.item(0).innerText = "Добавление денежного актива";
            backgroundOfAddForm.style.display = "block";
            addMonetaryAssetForm.style.display = "block";
        }
        monetaryAssets.append(title);
        monetaryAssets.append(table);
        monetaryAssets.append(addBtn);
        document.body.append(monetaryAssets);


        // Неденежные активы
        let nonMonetaryAssets = document.createElement("div");
        nonMonetaryAssets.className = "nonMonetaryAssets";
        title = document.createElement("h2");
        title.innerText = "Неденежные активы";
        namesOfCollumns = ["Название", "Начальная Стоимость", "Остаточная Стоимость", "Оценочная Стоимость", "Год создания", "Мера", "Номинал", "Дополнительная Информация"];
        table = createTable(namesOfCollumns, data[1], "nonMonetary");

        addBtn = document.createElement("button"); // Кнопка добавления в блоке
        addBtn.innerText = "Добавить новый неденежный актив";
        addBtn.className = "addAssetBtn";
        addBtn.onclick = () => {
            confirmBtns.item(1).onclick = addNonMonetaryClick; // При нажатии кнопки "принять" будет "добавление"
            titlesForms.item(1).innerText = "Добавление неденежного актива";
            backgroundOfAddForm.style.display = "block";
            addNonMonetaryAssetForm.style.display = "block";
        }
        nonMonetaryAssets.append(title);
        nonMonetaryAssets.append(table);
        nonMonetaryAssets.append(addBtn);
        document.body.append(nonMonetaryAssets);

        btnShowAssets.remove();
    }


    // Создание таблицы
    function createTable(namesOfCollumns, data, typeAsset) {
        let table = document.createElement("table");
        let tr = document.createElement("tr"); // Заголовки столбцов
        namesOfCollumns.forEach(cell => {
            let th = document.createElement("th");
            th.innerText = cell;
            tr.append(th);
        });
        table.append(tr);
        // Добавление самой информации
        data.forEach(line => {
            let id;
            tr = document.createElement("tr");
            let i = 0;
            line.forEach(cell => {
                if (i == 0) { // Поле id
                    id = cell;
                } else {
                    let td = document.createElement("td");
                    td.innerText = cell;
                    tr.append(td); 
                }
                i++;
            });
            let updateBtn = document.createElement("button");
            // Редактирование
            updateBtn.innerText = "Редактировать";
            updateBtn.className = "updateAssetBtn";
            updateBtn.onclick = () => {
                updateAsset(typeAsset, id);
            }

            let deleteBtn = document.createElement("button");
            // Удаление
            deleteBtn.innerText = "Удалить";
            deleteBtn.className = "deleteAssetBtn";
            deleteBtn.onclick = async () => {
                if (confirm("Удалить выбранный актив ?")) {
                    await server.deleteAsset(id, typeAsset);
                    refreshInfo();
                }
            }
            tr.append(updateBtn);
            tr.append(deleteBtn);
            table.append(tr);
        });
        return table;
    }

    // Обновить данные
    function refreshInfo() {
        document.getElementsByClassName("monetaryAssets").item(0).remove();
        document.getElementsByClassName("nonMonetaryAssets").item(0).remove();
        btnShowAssets.click();
    }

    // Закончить добавление
    function cancelAdd() {
        backgroundOfAddForm.style.display = "none";
        addMonetaryAssetForm.style.display = "none";
        addNonMonetaryAssetForm.style.display = "none";
        clearInputs();
        refreshInfo();
    }

    async function updateAsset(typeAsset, id) {
        let assetInfo = await server.getAssetById(typeAsset, id);
        // console.log(assetInfo);
        backgroundOfAddForm.style.display = "block";
        if (typeAsset == "monetary") {
            confirmBtns.item(0).onclick = () => {updateMonetaryClick(id);} // При нажатии кнопки "принять" будет "изменение"
            titlesForms.item(0).innerText = "Редактирование денежного актива";
            amountInput.value = assetInfo["amount"];
            bankNameInput.value = assetInfo["bank_name"];
            accountNumberInput.value = assetInfo["account_number"];
            monetaryDenominationInput.value = assetInfo["denomination"];
            addMonetaryAssetForm.style.display = "block";
        } else {
            confirmBtns.item(0).onclick = () => {updateNonMonetaryClick(id);} // При нажатии кнопки "принять" будет "изменение"
            titlesForms.item(1).innerText = "Редактирование неденежного актива";
            nameInput.value = assetInfo["name"];
            balanceValueInput.value = assetInfo["balance_value"];
            residualValueInput.value = assetInfo["residual_value"];
            assessedValueInput.value = assetInfo["assessed_value"];
            creationDateInput.value = assetInfo["creation_date"];
            measureInput.value = assetInfo["measure"];
            nonMonetaryDenominationInput.value = assetInfo["denomination"];
            additionalInfoInput.value = assetInfo["additional_information"];
            addNonMonetaryAssetForm.style.display = "block";
        }
    }

    function clearInputs() {
        amountInput.value = "";
        bankNameInput.value = "";
        accountNumberInput.value = "";
        monetaryDenominationInput.value = "";

        nameInput.value = "";
        balanceValueInput.value = "";
        residualValueInput.value = "";
        assessedValueInput.value = "";
        creationDateInput.value = "";
        measureInput.value = "";
        nonMonetaryDenominationInput.value = "";
        additionalInfoInput.value = "";
    }

    async function addMonetaryClick() { // При нажатии кнопки Принять в режиме добавления
        let data = {
            "amount": amountInput.value, 
            "bankName": bankNameInput.value, 
            "accountNumber": accountNumberInput.value, 
            "denomination": monetaryDenominationInput.value
        };
        await server.addAsset("monetary", data);
        cancelAdd();
        clearInputs();
    }

    async function addNonMonetaryClick() { // При нажатии кнопки Принять в режиме добавления
        let data = {
            "name": nameInput.value, 
            "balanceValue": balanceValueInput.value, 
            "residualValue": residualValueInput.value, 
            "assessedValue": assessedValueInput.value, 
            "creationDate": creationDateInput.value, 
            "measure": measureInput.value, 
            "denomination": nonMonetaryDenominationInput.value, 
            "additionalInformation": additionalInfoInput.value
        };
        await server.addAsset("nonMonetary", data);
        cancelAdd();
        clearInputs();
    }

    async function updateMonetaryClick(id) { // При нажатии кнопки Принять в режиме Редактирования
        let data = {
            "amount": amountInput.value, 
            "bankName": bankNameInput.value, 
            "accountNumber": accountNumberInput.value, 
            "denomination": monetaryDenominationInput.value
        };
        await server.updateAsset("monetary", data, id);
        cancelAdd();
        clearInputs();
    }

    async function updateNonMonetaryClick(id) { // При нажатии кнопки Принять в режиме Редактирования
        let data = {
            "name": nameInput.value, 
            "balanceValue": balanceValueInput.value, 
            "residualValue": residualValueInput.value, 
            "assessedValue": assessedValueInput.value, 
            "creationDate": creationDateInput.value, 
            "measure": measureInput.value, 
            "denomination": nonMonetaryDenominationInput.value, 
            "additionalInformation": additionalInfoInput.value
        };
        await server.updateAsset("monetary", data, id);
        cancelAdd();
        clearInputs();
    }

    // Денежные поля
    let amountInput = document.getElementsByClassName("amountInput").item(0);
    let bankNameInput = document.getElementsByClassName("bankNameInput").item(0);
    let accountNumberInput = document.getElementsByClassName("accountNumberInput").item(0);
    let monetaryDenominationInput = document.getElementsByClassName("monetaryDenominationInput").item(0);
    // Неденежные поля
    let nameInput = document.getElementsByClassName("nameInput").item(0);
    let balanceValueInput = document.getElementsByClassName("balanceValueInput").item(0);
    let residualValueInput = document.getElementsByClassName("residualValueInput").item(0);
    let assessedValueInput = document.getElementsByClassName("assessedValueInput").item(0);
    let creationDateInput = document.getElementsByClassName("creationDateInput").item(0);
    let measureInput = document.getElementsByClassName("measureInput").item(0);
    let nonMonetaryDenominationInput = document.getElementsByClassName("nonMonetaryDenominationInput").item(0);
    let additionalInfoInput = document.getElementsByClassName("additionalInfoInput").item(0);

    


    // Кнопки отмены
    let cancelBtns = document.getElementsByClassName("cancelBtn");
    cancelBtns.item(0).onclick = cancelAdd;
    cancelBtns.item(1).onclick = cancelAdd;

}