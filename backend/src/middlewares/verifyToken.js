const jwt = require('jsonwebtoken');

const verifyToken = (req, res, next)=>{
    try {
        const token = req.signedCookies.twt;
        if(!token){
            return res.status(400).json({
                success:false,
                message:'token not provided.'
            })
        }

        jwt.verify(token, process.env.JWT_SECRET,(err, decode)=>{
            if(err){
                return res.status(403).json({
                    success:false,
                    message:'Invalid or expire.'
                })
            }
            req.user = decode;
            next();
        });
    } catch (error) {
        console.error('token varificaton error', error);
        res.status(500).json({
          success: false,
          message: "Server error while verifying token.",
        });
    }
}


module.exports = verifyToken;