const { verifyToken } = require("../service/authenication.js");

async function checkforAuthentication(req, res, next) {
    const token = req.cookies.token;

    if (!token) {
        res.locals.user = null;
        return res.status(401).render('login', {
            message: 'Please login to continue',
            messageType: 'warning',
        });
    }

    try {
        const payload = await verifyToken(token);
        req.user = payload;
        res.locals.user = payload;
        next();
    } catch (err) {
        res.clearCookie('token');
        res.locals.user = null;
        return res.status(401).render('login', {
            message: 'Please login to continue',
            messageType: 'warning',
        });
    }
}

module.exports = { checkforAuthentication };