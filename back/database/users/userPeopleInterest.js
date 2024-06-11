const { UserPeopleInterest } = require('../../models');

const getPeopleInterest = async (userId) => {
  return await UserPeopleInterest.findAll({ where: { userId } });
};

async function addPeopleInterest(userId, personId) {
  const interest = await UserPeopleInterest.create({ userId, personId });
  return interest;
}

async function deletePeopleInterest(id) {
  const deleted = await UserPeopleInterest.destroy({ where: { id } });
  return deleted > 0; 
}

module.exports = {
  getPeopleInterest,
  addPeopleInterest,
  deletePeopleInterest,
};
