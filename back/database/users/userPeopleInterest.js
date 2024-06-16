const models = require('../../models');

const getPeopleInterest = async (userId) => {
  return await models.UserPeopleInterest.findAll({ where: { userId } });
};

const addPeopleInterest = async (userId, personId) => {
  const initialInterest = await models.UserPeopleInterest.create({ userId, personId });
  const reverseInterest = await models.UserPeopleInterest.findOne({
    where: { userId: personId, personId: userId }
  });

  if (reverseInterest) {
    await models.UserFriendShip.create({ id_user: personId, id_friendship: userId });
    await models.UserFriendShip.create({ id_user: userId, id_friendship: personId})
  }

  return initialInterest;
};

const deletePeopleInterest = async (id) => {
  const deleted = await models.UserPeopleInterest.destroy({ where: { id } });
  return deleted > 0; 
}

const getListFriends = async (id_user) => {
  return await models.UserFriendShip.findAll({ where: { id_user } });
};

const deleteFriendship = async (id) => {
  const deleted = await models.UserFriendShip.destroy({ where: { id } });
  return deleted > 0; 
}

module.exports = {
  getPeopleInterest,
  addPeopleInterest,
  deletePeopleInterest,
  getListFriends, 
  deleteFriendship
};
