

export const addProudcts  = (req,res,next) => {
    try{
        console.log("Reached to backend")
        console.log(req.body)

    }catch(err){
        console.log(err)
        return next(err)
    }
}