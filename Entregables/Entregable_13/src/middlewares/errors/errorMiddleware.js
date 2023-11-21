import enumErrors from '../../service/errors/enumError.js';

export default (err,req,res,next) =>{
    console.log(err.cause);
    console.log('-------------------------------------------------');
    switch (err.code) {
        case enumErrors.ERROR_BASE_DATOS:
            res.status(500).send({status:'error',error:err.message});
            break;
        case enumErrors.ERROR_TYPE:
            res.status(400).send({status:'error',error:err.message});
            break;
        case enumErrors.ERROR_DATA_NO_EXIST:
            res.status(400).send({status:'error',error:err.message});
            break;
        default:
            res.status(523).send({status:'error',error:'Error no manejado'});
            break;
    }
}