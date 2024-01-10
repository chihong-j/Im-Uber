const walletService = require('../services/walletService');

async function topUp(req, res) {
    try {
        const userID = req.session.userId;
        if(!userID){
            throw new Error("Please sign in first");
        }
        const mywallet = await walletService.topUp(userID, req.body.cash);
        let returnWallet = mywallet.toJSON();
        delete returnWallet.userID;
        res.status(200).json(returnWallet);

    } catch (error) {
        if(error.message == "Please sign in first"){
            res.status(401).json({ error: error.message});
        }
        else{
            res.status(400).json({ error: "Wallet not found" });
        }
    }
}


module.exports = {
    topUp
};
