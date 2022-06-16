function userToString(user) {
  if(typeof user == 'string') {
    return user;
  }
  return user.name + ", " + user.balance;
}

function showSalary(users, age) {
  return users.filter( (user) => user.age <= age).reduce( (prevUser, currentUser)=>{
    return userToString(prevUser) + "\n" + userToString(currentUser);
  } );
}
