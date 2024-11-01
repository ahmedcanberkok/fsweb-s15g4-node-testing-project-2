const request = require('supertest');
const server = require('../api/server');
const db = require('../data/db-config');

beforeAll(async () => {
  await db.migrate.rollback();
  await db.migrate.latest();
  await db.seed.run();
})

test('sanity check', () => {
  expect(process.env.NODE_ENV).toBe('testing')
})

describe('USERS',()=>{
  test('[1] get users',async()=>{
    //ACT
    const res = await request(server).get('/api/users');
    expect(res.body).toHaveLength(4);
  })
  test('[2] get usersById',async()=>{
    //ACT
    const res = await request(server).get('/api/users/1');
    //ASSERT
    expect(res.body).toHaveProperty('Name','Canberk');
  })
  //ID'si olmayan user
  test('[3] get usersById',async()=>{
    //ACT
    const res = await request(server).get('/api/users/5');
    //ASSERT
    expect(res.body).toHaveLength(0);
  })
  test('[4] post user',async()=>{
    //ARRANGE
    const newUser = { 
      Name: "canbo",
      Surname: "OK",
      RoleName: "Admin",
      Email: "canbo@wit.com.tr"
  }
    
    //ACT
    const res = await request(server).post('/api/users').send(newUser);
    //ASSERT
    expect(res.body).toHaveProperty('Name','canbo');
    //ACT
    const res2 = await request(server).get('/api/users');
    //ASSERT
    expect(res2.body).toHaveLength(5);
    
  })
  test('[5] cannot post user if name exists',async()=>{
    //ARRANGE
    const newUser = { 
      Name: "Canberk",
      Surname: "OK",
      RoleName: "Admin",
      Email: "canbo@wit.com.tr"
  }  
    //ACT
    const res = await request(server).post('/api/users').send(newUser);
    //ASSERT
    expect(res.body).toHaveProperty('message','User Exists');
    
  })
  test('[6] cannot post user if email exists',async()=>{
    //ARRANGE
    const newUser = { 
      Name: "canbo",
      Surname: "OK",
      RoleName: "Admin",
      Email: "Canberk@wit.com.tr"
  }  
    //ACT
    const res = await request(server).post('/api/users').send(newUser);
    //ASSERT
    expect(res.body).toHaveProperty('message','User Exists');
    
  })
  test('[7] put user',async()=>{
    //ARRANGE
    const newUser = { 
      Name: "shane",
      Surname: "larkin",
      RoleName: "User",
      Email: "shane@wit.com.tr"
  }  
    //ACT
    const res = await request(server).put('/api/users/4').send(newUser);
    //ASSERT
    expect(res.body).toHaveProperty('Name','shane');
    //ACT
    const res2 = await request(server).get('/api/users');
    console.log('message',res2)
    //ASSERT
    expect(res2.body[3]).toHaveProperty('Name','shane');
    
  })
  test('[8] delete author', async () => {
    //ACT
    const res = await request(server).delete('/api/users/4');
    //ASSERT
    expect(res.body).toHaveProperty('Name','shane');
     //ACT
     const res2 = await request(server).get('/api/users');
     //ASSERT
     expect(res2.body).toHaveLength(4);  
  })
})