const { faker } = require('@faker-js/faker');
const bcrypt = require("bcrypt");

const userFactory = async (num_gen) => {
    let i = 0;
    let arrUsers = []
    while (i < num_gen){
        let newUser = {
            firstName: faker.person.firstName(),
            lastName: faker.person.lastName(),
            email: faker.internet.email(),
            password: await bcrypt.hash("1234", 10),
            photo_profile: i+7,
            born_date: faker.date.birthdate(),
            domicile: faker.location.streetAddress(),
            phone_number: faker.phone.number(),
            active: faker.datatype.boolean(),
            createdAt: new Date(),
            updatedAt: new Date()
        }
        arrUsers.push(newUser);
        i++;
    }
    return Promise.all(arrUsers);
}

module.exports = { 
    userFactory
}