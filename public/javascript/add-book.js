const addButtonEl1 = document.querySelector('#add-btn-1');
const addButtonEl2 = document.querySelector('#add-btn-2');
const addButtonEl3 = document.querySelector('#add-btn-3');
const addButtonEl4 = document.querySelector('#add-btn-4');
const addButtonEl5 = document.querySelector('#add-btn-5');
const addButtonEl6 = document.querySelector('#add-btn-6');
const addButtonEl7 = document.querySelector('#add-btn-7');
const addButtonEl8 = document.querySelector('#add-btn-8');
const addButtonEl9 = document.querySelector('#add-btn-9');
const addButtonEl10 = document.querySelector('#add-btn-10');
const addBookSubmitHandler = async (event) => {
  let imgUrl;
  //console.log(event.target.parentElement.parentElement);
  /* get values of the elements relating to which form the button is contained in */
  //get img URL
  event.target.parentElement.parentElement.children[0].children[0].children[0] === undefined
  ? imgUrl = null
  : imgUrl = event.target.parentElement.parentElement.children[0].children[0].children[0].attributes[0].nodeValue;
  console.log(imgUrl);
  
  //get book title
  console.log(event.target.parentElement.parentElement.children[1].children[0].firstChild.nodeValue.split('Title: ').join('').split('\n').join('').trim());
  const book_title = event.target.parentElement.parentElement.children[1].children[0].firstChild.nodeValue.split('Title: ').join('').split('\n').join('').trim();

  //get authors
  console.log(event.target.parentElement.parentElement.children[2].children[0].firstChild.data.split('Authors: ').join('').split('\n').join('').trim());
  const authors = event.target.parentElement.parentElement.children[2].children[0].firstChild.data.split('Authors: ').join('').split('\n').join('').trim();
  //post request to the post route to process the text data into the database
  try {
    const response = await fetch('/search/add-book', {
      method: 'POST',
      body: JSON.stringify(
        {
          username: username,
          password: password
        }
      ),
      headers: {'Content-Type': 'application/json'}
    });
    if (response.ok) {
      console.log(response);
    }
  } catch (error) {
    console.log(error);
  }
};
addButtonEl1.addEventListener('click', addBookSubmitHandler);
addButtonEl2.addEventListener('click', addBookSubmitHandler);
addButtonEl3.addEventListener('click', addBookSubmitHandler);
addButtonEl4.addEventListener('click', addBookSubmitHandler);
addButtonEl5.addEventListener('click', addBookSubmitHandler);
addButtonEl6.addEventListener('click', addBookSubmitHandler);
addButtonEl7.addEventListener('click', addBookSubmitHandler);
addButtonEl8.addEventListener('click', addBookSubmitHandler);
addButtonEl9.addEventListener('click', addBookSubmitHandler);
addButtonEl10.addEventListener('click', addBookSubmitHandler);


// maybe has to be a form, on serverside need to include req.session.id of the user in that session to add
// the book into the library with the assigned user...and for the book we are posting from the front end
// we have to Book.create({}) with the properties of the front end object and then
// update the library with the signed in user's id and the book_id of the new book that just got created