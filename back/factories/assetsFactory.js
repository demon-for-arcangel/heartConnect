const assetsFactory = async (arr) => {

    let i = 0;
    let arrAssets = []
    while (i < arr.length) {
        console.log(arr[i].toString())
        let newAsset = {
            ruta:String(arr[i]),
            createdAt: new Date(),
            updatedAt: new Date()
        }
        arrAssets.push(newAsset);
        i++;
    }
    console.log(arrAssets)
    return Promise.all(arrAssets);
}

module.exports = { 
    assetsFactory
}