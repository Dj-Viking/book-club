//add button query selectors
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
  /* get values of the elements relating to which form the button is contained in */
  //get img URL
  console.log("container was clicked");
  let imgUrl;
  console.log("\x1b[33m", "image url", "\x1b[00m");
  console.log(event.target.parentElement.parentElement.children[0].children[0].children[0].className);
  event.target.parentElement.parentElement.children[0].children[0].children[0].className === "no-picture-text"
  ? imgUrl = null
  : imgUrl = event.target.parentElement.parentElement.children[0].children[0].children[0].currentSrc;
  console.log(imgUrl);
  
  //get book title
  console.log("\x1b[33m", "book title", "\x1b[00m");
  console.log(event.target.parentElement.children[0].children[0].innerText.split('Title: ').join('').trim());
  const book_title = event.target.parentElement.children[0].children[0].innerText.split('Title: ').join('').trim();

  //get authors
  console.log("\x1b[33m", "authors", "\x1b[00m");
  console.log(event.target.parentElement.children[1].children[0].innerText.split('Authors: ').join('').trim());
  const authors = event.target.parentElement.children[1].children[0].innerText.split('Authors: ').join('').trim();
  //post request to the post route to process the text data into the database
  try {
    const response = await fetch('/book-search/add-book', {
      method: 'POST',
      body: JSON.stringify(
        {
          book_title,
          author: authors,
          picture: imgUrl
        }
      ),
      headers: {'Content-Type': 'application/json'}
    });
    if (response.ok) {
      console.log(response);
      //show the add msg and hide it after some time
      Promise.resolve()
      .then(
        //show msg
        () => {
          //find out which button was pressed by the event target bubbling method to get the id attribute of the element clicked
          console.log(event.target.attributes.id.nodeValue);
          switch(event.target.attributes.id.nodeValue){
            //show the add book message
            case "add-btn-1":
              document.querySelector('#add-msg-1').classList.remove('hide-before-add');
              document.querySelector('#add-msg-1').classList.add('show-after-add');
            break;
            case "add-btn-2":
              document.querySelector('#add-msg-2').classList.remove('hide-before-add');
              document.querySelector('#add-msg-2').classList.add('show-after-add');
            break;
            case "add-btn-3":
              document.querySelector('#add-msg-3').classList.remove('hide-before-add');
              document.querySelector('#add-msg-3').classList.add('show-after-add');
            break;
            case "add-btn-4":
              document.querySelector('#add-msg-4').classList.remove('hide-before-add');
              document.querySelector('#add-msg-4').classList.add('show-after-add');
            break;
            case "add-btn-5":
              document.querySelector('#add-msg-5').classList.remove('hide-before-add');
              document.querySelector('#add-msg-5').classList.add('show-after-add');
            break;
            case "add-btn-6":
              document.querySelector('#add-msg-6').classList.remove('hide-before-add');
              document.querySelector('#add-msg-6').classList.add('show-after-add');
            break;
            case "add-btn-7":
              document.querySelector('#add-msg-7').classList.remove('hide-before-add');
              document.querySelector('#add-msg-7').classList.add('show-after-add');
            break;
            case "add-btn-8":
              document.querySelector('#add-msg-8').classList.remove('hide-before-add');
              document.querySelector('#add-msg-8').classList.add('show-after-add');
            break;
            case "add-btn-9":
              document.querySelector('#add-msg-9').classList.remove('hide-before-add');
              document.querySelector('#add-msg-9').classList.add('show-after-add');
            break;
            case "add-btn-10":
              document.querySelector('#add-msg-10').classList.remove('hide-before-add');
              document.querySelector('#add-msg-10').classList.add('show-after-add');
            break;
          }
        }
      ).then(
        //hide msg
        () => {
          setTimeout(
          () => {
            switch(event.target.attributes.id.nodeValue){
              //if event target parent element was clicked hide the add book message after some time
              case "add-btn-1":
                document.querySelector('#add-msg-1').classList.remove('show-after-add');
                document.querySelector('#add-msg-1').classList.add('hide-before-add');
              break;
              case "add-btn-2":
                document.querySelector('#add-msg-2').classList.remove('show-after-add');
                document.querySelector('#add-msg-2').classList.add('hide-before-add');
              break;
              case "add-btn-3":
                document.querySelector('#add-msg-3').classList.remove('show-after-add');
                document.querySelector('#add-msg-3').classList.add('hide-before-add');
              break;
              case "add-btn-4":
                document.querySelector('#add-msg-4').classList.remove('show-after-add');
                document.querySelector('#add-msg-4').classList.add('hide-before-add');
              break;
              case "add-btn-5":
                document.querySelector('#add-msg-5').classList.remove('show-after-add');
                document.querySelector('#add-msg-5').classList.add('hide-before-add');
              break;
              case "add-btn-6":
                document.querySelector('#add-msg-6').classList.remove('show-after-add');
                document.querySelector('#add-msg-6').classList.add('hide-before-add');
              break;
              case "add-btn-7":
                document.querySelector('#add-msg-7').classList.remove('show-after-add');
                document.querySelector('#add-msg-7').classList.add('hide-before-add');
              break;
              case "add-btn-8":
                document.querySelector('#add-msg-8').classList.remove('show-after-add');
                document.querySelector('#add-msg-8').classList.add('hide-before-add');
              break;
              case "add-btn-9":
                document.querySelector('#add-msg-9').classList.remove('show-after-add');
                document.querySelector('#add-msg-9').classList.add('hide-before-add');
              break;
              case "add-btn-10":
                document.querySelector('#add-msg-10').classList.remove('show-after-add');
                document.querySelector('#add-msg-10').classList.add('hide-before-add');
              break;
            }
          }, 3000);
        }
      )
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