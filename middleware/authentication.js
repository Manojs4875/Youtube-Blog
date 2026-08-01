const { verifyToken } = require("../service/authenication.js");

async function checkforAuthentication(req, res, next) {

    const token = req.cookies.token;

    if (!token) {
        res.locals.user = null;
        return res.render("login", {
            message: "Please login to continue",
        });
    }
    try {
        const payload = await verifyToken(token);

        req.user = payload;
        res.locals.user = payload;

        next();
    } catch (err) {
        res.locals.user = null;
        return res.render("login", {
            message: "Please login to continue",
        });
    }
}

module.exports = { checkforAuthentication };