class Server {

    constructor() {

    }

    async send(method, data) {
        const arr = [];
        for (let key in data) {
            arr.push(`${key}=${data[key]}`);
        }
        if (this.token) {
            arr.push(`&token=${this.token}`);
        }
        const response = await fetch(`api/?method=${method}&${arr.join('&')}`);
        const answer = await response.json();
        if (answer && answer.result === 'ok') {
            return answer.data;
        } else if(answer && answer.result === 'error') {
            return false;
        }
    }

    async getAssets() {
        return await this.send("getAssets");
    }

    // deleteAsset(name, balanceValue, residualValue, assessedValue, creationDate, measure, denomination, additionalInformation) {
    //     return this.send("deleteAsset", { name, balanceValue, residualValue, assessedValue, creationDate, measure, denomination, additionalInformation });
    // }

    deleteAsset(id, typeAsset) {
        return this.send("deleteAsset", { id, typeAsset });
    }

    addAsset(typeAsset, data) {
        data["typeAsset"] = typeAsset;
        // console.log(data);
        return this.send("addAsset", data);
        // console.log(this.send("addAsset", data));
    }

    updateAsset(typeAsset, data, id) {
        data["typeAsset"] = typeAsset;
        data["id"] = id;
        // console.log(data);
        return this.send("updateAsset", data);
    }

    getAssetById(typeAsset, id) {
        return this.send("getAssetById", { typeAsset, id });
        // console.log(this.send("getAssetById", { typeAsset, id }));
    }

}