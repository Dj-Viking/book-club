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