//not using this code at all, this was my original idea to delete a book
// but it is severely bugged an actually prevents users from performing any other action by clicking anything besides the delete button
// the book deleting is happening inside the HTML form itself
// this idea arose from needing to attach event listeners to dynamically generated elements...im sure theres a better way to do this jquery
const numRgx = /\d/;
const deleteButtonEl = document;
//click button handler to send request to update user library
const deleteBookHandler = async (event) => {
  event.preventDefault();
  if (numRgx.test(event.target.attributes[0].nodeValue[5])) {
    console.log(event.target.attributes[0].nodeValue.split('-')[1]);
    //console.log("thats the button!");
    //get book id which is consequently the button id number
    //console.log(event.target.attributes[0]);
    const book_id = event.target.attributes[0].nodeValue.split('-')[1];
    try {
      //get request with the button being in the form?
      const response = await fetch(`/my-library/delete-book/${book_id}`, {method: 'GET'});
      console.log(response);
      if (response.ok) {
        document.location.reload();
      }
    } catch (error) {
      console.log(error);
    }
  } else {
    //console.log("thats not the button!")
    return;
  }
}
deleteButtonEl.addEventListener('click', deleteBookHandler);