const authService = require('../services/authService');

// Controller function to handle user registration
async function signup(req, res) {
    const userData = req.body;

    try {
        // Call the signup service function to register the user
        const message = await authService.signup(userData, req);

        res.status(201).json( {message} );
    } catch (error) {
        res.status(401).json({ error: error.message });
    }
}

// Controller function to handle user login
async function signin(req, res) {
    const credentials = req.body;

    try {
        // Call the signin service function to log in the user
        const message = await authService.signin(credentials, req);

        // Respond with a success message (e.g., "Login successful")
        res.status(200).json({ message });
    } catch (error) {
        console.error(error);
        res.status(401).json({ error: error.message });
    }
}


async function signout(req, res) {
    req.session.userId = null;
    res.status(200).json({ message: "Logout successfully" });
}
module.exports = {
    signup,
    signin,
    signout
};
