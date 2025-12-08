const User = require("../models/User");
const bcrypt = require("bcryptjs");

module.exports = async function (req, res, next) {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Basic ")) {
        res.setHeader("WWW-Authenticate", 'Basic realm="Restricted Area"');
        return res.status(401).json({ msg: "Authentication required" });
    }

    const token = authHeader.split(" ")[1];
    const decoded = Buffer.from(token, "base64").toString("utf-8");
    const [email, password] = decoded.split(":");

    try {
        const user = await User.findOne({ email });
        if (!user) {
            res.setHeader("WWW-Authenticate", 'Basic realm="Restricted Area"');
            return res.status(401).json({ msg: "Invalid credentials" });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            res.setHeader("WWW-Authenticate", 'Basic realm="Restricted Area"');
            return res.status(401).json({ msg: "Invalid credentials" });
        }

        req.user = user;
        next();
    } catch (err) {
        console.error(err);
        res.status(500).send("Server Error");
    }
};
