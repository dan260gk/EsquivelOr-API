const validation=(schema)=>{
    let joiVa1idation=(req,res,next)=>{
        let {error} =schema.validate(req.body);
        console.log(error);
        if(error){
            let{details}=error;
            res.status(422).json({error:details});
        }
        else{
            next();
        }
    }    
    return joiVa1idation;
}
module. exports= validation;