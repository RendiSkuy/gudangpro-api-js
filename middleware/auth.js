import jwt from 'jsonwebtoken';

const protectRoute = async (req, res, next) => {
    try {
        const authHeader = req.headers.authorization;
        if (!authHeader || !authHeader.startsWith('Bearer ')) {
            return res.status(401).json({ error: "Akses ditolak. Token tidak disediakan." });
        }

        const token = authHeader.split(' ')[1];
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        if (!decoded) {
            return res.status(401).json({ error: "Token tidak valid." });
        }

        req.user = { userId: decoded.userId };
        next();

    } catch (error) {
        console.error("Error di middleware protectRoute: ", error.message);
        res.status(401).json({ error: "Token tidak valid atau sesi berakhir." });
    }
};

export default protectRoute;