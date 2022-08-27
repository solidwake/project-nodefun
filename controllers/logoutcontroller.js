const User = require('../model/User');

const handleLogout = async (req, res) => {
    //! Be sure to delete the access token on the client side
    const cookies = req.cookies
    if (!cookies?.jwt) return res.sendStatus(204); // HTTP 204 means there is no content to send back
    const refreshToken = cookies.jwt;

    // Is the refresh token in the DB?
    const foundUser = await User.findOne({ refreshToken }).exec();
    if (!foundUser) {
        res.clearCookie('jwt', { httpOnly: true, sameSite: 'None', secure: true }); // { maxAge } is not necessary when deleting a cookie 
        return res.sendStatus(204);
    }

    // Delete refesh token in DB
    foundUser.refreshToken = '';
    const result = await foundUser.save();
    console.log(result);

    res.clearCookie('jwt', { httpOnly: true, sameSite: 'None', secure: true }); //! In production, use  { secure: true }
    res.sendStatus(204);
}

module.exports = { handleLogout }