const jwtProvider = require('../config/jwtProvider')
const authMiddleware = (req, resp, next) => {
    const userToken = req.headers?.authrization
    if (!userToken) {
        resp.send({error: "Unauthrizes user!"})
    }
    const id = jwtProvider.authenticateToken(userToken)
}