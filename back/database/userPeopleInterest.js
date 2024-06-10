const { UserPeopleInterest } = require('../models');

const getPeopleInterest = async (userId) => {
  return await UserPeopleInterest.findAll({ where: { userId } });
};

const addPeopleInterest = async (userId, personId) => {
  const id = uuidv4();
  return await UserPeopleInterest.create({ id, userId, personId });
};

const deletePeopleInterest = async (id) => {
  const deletedInterest = await UserPeopleInterest.destroy({ where: { id } });
  return !!deletedInterest;
};

module.exports = {
  getPeopleInterest,
  addPeopleInterest,
  deletePeopleInterest,
};
