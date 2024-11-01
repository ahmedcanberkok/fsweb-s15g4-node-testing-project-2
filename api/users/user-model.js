const db = require('../../data/db-config');

function getAll() {

  return db('Users');
}

function getByName(name) {
  return db('Users').where('Name',name).first();
}
function getByEmail(email) {
  return db('Users').where('Email',email).first();
}

function getById(id) {
  return db('Users').where('id', id).first();
}

async function insert(user){ 
  const [id] = await db("Users").insert(user)
  return getById(id);
}
// const update = (author, id) => {
//   return db('authors').where({ author_id: id }).update(author).then(ids => {
//     return getById(id)
//   })
// }
async function updateById (user,id){
  await db("Users").where('id',id).update(user);
  return getById(id);
}

async function remove (id){
  const user = await db('Users').where({ id : id }).first();
  await db("Users").where("id",id).del();
  return user;
}


module.exports={
  getAll,
  getById,
  insert,
  updateById,
  remove,
  getByName,
  getByEmail
}