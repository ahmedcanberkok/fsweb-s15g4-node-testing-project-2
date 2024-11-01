/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */
exports.seed = async function(knex) {
  // Deletes ALL existing entries
  // Deletes ALL existing entries
  await knex('Users').truncate()   //del sadece datayı siler, truncate data + metadata'yı siler.
  await knex('Users').insert([
    {id: 1, Name: 'Canberk', Surname: 'OK', RoleName: 'Admin', Email: 'canbo@wit.com.tr'},
    {id: 2, Name: 'Cancan', Surname: 'Avsa', RoleName: 'Admin', Email: 'ali@wit.com.tr'},
    {id: 3, Name: 'Hakan', Surname: 'Aksu', RoleName: 'User', Email: 'hakan@wit.com.tr'},
    {id: 4, Name: 'Ali', Surname: 'Alioglu', RoleName: 'User', Email: 'alis@wit.com.tr'},
  ]);
};