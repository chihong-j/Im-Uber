const Wallet = require('../db/models/Wallet'); 

const getAllWallets = async () => {
    return Wallet.findAll();
};

const getWalletById = async (id) => {
    return Wallet.findByPk(id);
};

const createWallet = async (walletData) => {
    return Wallet.create(walletData);
};

const updateWallet = async (id, walletData) => {
    return Wallet.update(walletData, {
        where: { id: id }
    });
};

const deleteWallet = async (id) => {
    return Wallet.destroy({
        where: { id: id }
    });
};

module.exports = {
    getAllWallets,
    getWalletById,
    createWallet,
    updateWallet,
    deleteWallet
};
