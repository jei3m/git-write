import { Request, Response, NextFunction } from 'express';

export const secretKeyMiddleware = (req: Request, res: Response, next: NextFunction) => {
    const secretKey = req.headers['x-secret-key'];
    if (!secretKey || secretKey !== process.env.SECRET_KEY) {
        res.status(403).json({success: false, message: "Forbidden"});
        return;
    }
    next();
}