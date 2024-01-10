const Wallet = require('../db/models/Wallet'); 

const getWalletByUserID = async (userID) => {
    return Wallet.findByPk(userID);
};

const createWallet = async (walletData) => {
    return Wallet.create(walletData);
};

const topUp = async (userID, cash) => {
    const wallet = await Wallet.findByPk(userID);
    await wallet.increment('balance', { by: cash});
    await wallet.reload();
    return wallet;
}

const deleteWallet = async (id) => {
    return Wallet.destroy({
        where: { id: id }
    });
};

module.exports = {
    createWallet,
    topUp,
    deleteWallet,
    getWalletByUserID
};
