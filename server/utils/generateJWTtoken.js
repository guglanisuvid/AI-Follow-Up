import jwt from 'jsonwebtoken';

const generateJWTtoken = (user_id) => {
    return jwt.sign(
        { id: user_id },
        process.env.JWT_SECRET,
        { expiresIn: process.env.JWT_EXPIRATION }
    );
}

export default generateJWTtoken;