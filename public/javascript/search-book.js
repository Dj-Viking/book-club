const postErrEl = document.querySelector('#search-err');
const searchFormHandler = async (event) => {
  try {
    event.preventDefault();
    //using HTML get form in the book-search.handlebars!
    const book_title = document.querySelector('input[name="book_title"]').value.trim();
    const author = document.querySelector('input[name="author"]').value.trim();
    console.log(book_title, author);
    if (!book_title || !author) {
      postErrEl.classList.remove('hide-before-error');
      postErrEl.classList.add('show-after-error');
      setTimeout(() => {
        postErrEl.classList.remove('show-after-error');
        postErrEl.classList.add('hide-before-error');
      }, 3000);
      throw new Error("Search field can't be empty.")
    }
  } catch (error) {
    console.log(error);
  }
};
document.querySelector('.book-search-form').addEventListener('submit', searchFormHandler);