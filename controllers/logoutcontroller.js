const usersDB = {
    users: require('../model/users.json'),
    setUsers: function (data) { this.users = data }
}
const fsPromises = require('fs').promises;
const path = require('path');

const handleLogout = async (req, res) => {
    //! Be sure to delete the access token on the client side
    const cookies = req.cookies
    if (!cookies?.jwt) return res.sendStatus(204); // HTTP 204 means there is no content to send back
    const refreshToken = cookies.jwt;

    // Is the refresh token in the DB?
    const foundUser = usersDB.users.find(person => person.refreshToken === refreshToken);
    if (!foundUser) {
        res.clearCookie('jwt', { httpOnly: true, sameSite: 'None', secure: true }); // { maxAge } is not necessary when deleting a cookie 
        return res.sendStatus(204);
    }
    
    // Delete refesh token in DB
    const otherUsers = usersDB.users.filter(person => person.refreshToken !== foundUser.refreshToken);
    const currentUser = { ...foundUser, refreshToken: '' };
    usersDB.setUsers([...otherUsers, currentUser]);
    await fsPromises.writeFile(
        path.join(__dirname, '..', 'model', 'users.json'),
        JSON.stringify(usersDB.users)
    );

    res.clearCookie('jwt', { httpOnly: true, sameSite: 'None', secure: true }); //! In production, use  { secure: true }
    res.sendStatus(204);
}

module.exports = { handleLogout }