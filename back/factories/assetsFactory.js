const assetsFactory = async (arr) => {

    let i = 0;
    let arrAssets = []
    while (i < arr.length) {
        let newAsset = {
            path:String(arr[i]),
            createdAt: new Date(),
            updatedAt: new Date()
        }
        arrAssets.push(newAsset);
        i++;
    }
    return Promise.all(arrAssets);
}

module.exports = { 
    assetsFactory
}