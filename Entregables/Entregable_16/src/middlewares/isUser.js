const isUser = (req,res,next) => {
    
    if (req.session.role ==  'user') {
        next();
    }
    res.status(401).send();
}

export default isUser;