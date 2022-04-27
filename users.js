const loggedUsers = [];

function addUser(id, user, room) {
  loggedUsers.push({ id, user, room });
  console.log("loggedUsers: ", loggedUsers);
  return { id, user, room };
}

function getUser(id) {
  return loggedUsers.find((user) => user.id === id);
}

function deleteUser(id) {
  const index = loggedUsers.findIndex((user) => user.id === id);
  if (index !== -1) {
    return loggedUsers.splice(index, 1)[0];
  }
  console.log("loggedUsers: ", loggedUsers);
}

module.exports = {
  addUser,
  getUser,
  deleteUser,
};
