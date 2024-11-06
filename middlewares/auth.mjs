import jwt from 'jsonwebtoken';

export const authenticateJWT = (req, res, next) => {
    const token = req.header('Authorization')?.split(" ")[1]; // token should be a bearer <token>
    if (!token) {
        return res.sendStatus(403); // Forbiden
    }

    jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
        if (err) {
            return res.sendStatus(403);
        }
        req.user = user;
        next();
    })
}