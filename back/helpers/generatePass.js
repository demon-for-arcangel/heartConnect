const generateRandPass = () => {
    return Math.random().toString(36).slice(-8);
}

module.exports = {
    generateRandPass
}