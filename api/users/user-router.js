const router = require('express').Router();
const { payloadCheck } = require('./user-middleware');
const userModel = require('./user-model');


router.get('/', async (req,res,next)=>{
try {
  const allUsers = await userModel.getAll();
  res.json(allUsers)
  
} catch (error) {
  next();
}
})

router.get('/:id', async (req,res,next)=>{
  try {
    const uniqueUsers = await userModel.getById(req.params.id);
    res.json(uniqueUsers)
    
  } catch (error) {
    next();
  }
  })

//  
//     "id": 1,
//     "Name": "Serkan",
//     "Surname": "Toraman",
//     "RoleName": "Admin",
//     "Email": "serkan@wit.com.tr"
// }

  router.post('/',payloadCheck, async (req,res,next)=>{
    try {
      const newUser = {
        Name: req.body.Name,
        Surname: req.body.Surname,
        RoleName: req.body.RoleName,
        Email:req.body.Email
      }
      const insertedUser = await userModel.insert(newUser);
      res.status(201).json(insertedUser)
      
    } catch (error) {
      next();
    }
    })

    router.put('/:id',payloadCheck, async (req,res,next)=>{
      try {
        const newUser = {
          Name: req.body.Name,
          Surname: req.body.Surname,
          RoleName: req.body.RoleName,
          Email:req.body.Email
        }
        const updatedUser = await userModel.updateById(newUser,req.params.id);
        res.status(201).json(updatedUser)  
      } catch (error) {
        next();
      }
      })

      router.delete('/:id', async (req,res,next)=>{
        try {
          const deletedUser = await userModel.remove(req.params.id);
          res.status(201).json(deletedUser)  
        } catch (error) {
          next();
        }
        })











module.exports=router;