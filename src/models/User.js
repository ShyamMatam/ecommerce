const users = [];

export function createUser(email, password) {
  const newUser = { id: users.length + 1, email, password };
  users.push(newUser);
  return newUser;
}

export function findUserByEmail(email) {
  return users.find(user => user.email === email);
}

export function findUserById(id) {
  return users.find(user => user.id === id);
}
