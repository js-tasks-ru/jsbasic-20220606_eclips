function makeFriendsList(friends) {
  let newElement = document.createElement('ul');
  let list = "";
  friends
          .map( (f)=> f.firstName + " " + f.lastName )
          .forEach( (curr)=> list += `<li>${curr}</li>` );
  newElement.innerHTML = "<ul>" + list + "</ul>";
  return newElement;
}
