const userModel = require('./user-model');

async function payloadCheck(req,res,next){
  try {
    const {Name,Email} = req.body;
    const isNameExist = await userModel.getByName(Name);
    const isEmailExist= await userModel.getByEmail(Email);
    if(isNameExist||isEmailExist){
      res.status(422).json({ message: 'User Exists' })
    }else{
      next();
    }
  } catch (error) {
    next();
  }
}


module.exports={
  payloadCheck
}