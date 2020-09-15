const searchErrEl = document.querySelector('#search-err');
//not fetching in this function pretty much just for the error message
const searchFormHandler = (event) => {
  try {
    //using HTML get form in the book-search.handlebars for the actual fetch!
    const book_title = document.querySelector('input[name="book_title"]').value.trim();
    const author = document.querySelector('input[name="author"]').value.trim();
    console.log(book_title, author);
    if (!book_title || !author) {
      //search form was empty abort the form GET fetch event!
      event.preventDefault();
      searchErrEl.classList.remove('hide-before-error');
      searchErrEl.classList.add('show-after-error');
      setTimeout(() => {
        searchErrEl.classList.remove('show-after-error');
        searchErrEl.classList.add('hide-before-error');
      }, 3000);
      throw new Error("Search field can't be empty.")
    } else {
      console.log("test");
    }
  } catch (error) {
    console.log(error);
  }
};
document.querySelector('#search-submit-btn').addEventListener('click', searchFormHandler);