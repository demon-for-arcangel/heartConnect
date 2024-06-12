const models = require('../../models');

const getPeopleInterest = async (userId) => {
  return await models.UserPeopleInterest.findAll({ where: { userId } });
};

const addPeopleInterest = async (userId, personId) => {
  console.log(userId, personId)
  const initialInterest = await models.UserPeopleInterest.create({ userId, personId });
console.log(initialInterest)
  const reverseInterest = await models.UserPeopleInterest.findOne({
    where: { userId: personId, personId: userId }
  });

  console.log(reverseInterest)

  if (reverseInterest) {
    await models.UserFriendShip.create({ id_user: personId, id_friendship: userId });
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
