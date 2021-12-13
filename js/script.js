const createElement = (elType, elAttrs, elProps) => {
  const newEl = document.createElement(elType)

  for (const key in elAttrs) {
    if (Object.hasOwnProperty.call(elAttrs, key)) {
      newEl.setAttribute(key, elAttrs[key])
    }
  }

  for (const key in elProps) {
    if (Object.hasOwnProperty.call(elProps, key)) {
      newEl[key] = elProps[key]
    }
  }
  return newEl
}

const renderTable = (book) => {
  console.log('renderowanie tabelki');
}

const saveBooksToLocalStorage = (arrBooks) => {
  console.log('zapis do local storage');
}


let sectionAddedBooks = createElement(
  'section',
  { class: 'added-books-section', id: Date.now() },
  { innerHTML: '<span class="books">Add your books!</span>' }
)

document.querySelector('#submit').after(sectionAddedBooks)


const submitForm = (event) => {
  console.log('Działa');

  event.preventDefault();

  const ulErrors = document.querySelector('#errors')
  ulErrors.innerHTML = ''

  let arrErrors = []

  const inputTitle = document.querySelector('#title')
  const inputAuthor = document.querySelector('#author')
  const inputPriority = document.querySelector('#priority')
  // console.log(inputPriority);


  if (inputTitle.value.length < 1) {
    arrErrors.push('Tytuł powinien mieć conajmniej 1 znak')
  }

  if (inputAuthor.value.length < 3) {
    arrErrors.push('Autor powinien mieć conajmniej 3 znaki')

  }
  if (inputPriority.value < 1) {
    arrErrors.push('Priorytet powinien wynosić od 1 do 5')
  }


  const select = document.querySelector('#mySelect')
  console.log(select.value)

  select.addEventListener('change', () => {
    console.log(select.value)
  })


  if (arrErrors.length > 0) {

    let spanBooks = document.querySelector('.books')
    if (spanBooks) {
      spanBooks.remove()
    }

    for (const error of arrErrors) {
      const liError = createElement(
        'li',
        { class: 'error' },
        { innerText: error }
      )

      ulErrors.appendChild(liError)
    }
    return false
  }

  // renderTable()



  let spanBooks = document.querySelector('.books')
  if (!spanBooks) {
    sectionAddedBooks.innerHTML = '<span class="books">Add your books!</span>'
  }

  const bookRow = createElement(
    'tr',
    { class: 'book'},
    {}
  )

  const bookTitleCell = createElement(
    'td',
    { class: 'title' },
    { innerText: inputTitle.value }
  )

  const bookAuthorCell = createElement(
    'td',
    { class: 'author' },
    { innerText:  inputAuthor.value}
  )

  const bookPriorityCell = createElement(
    'td',
    { class: 'priority' },
    { innerText: inputPriority.value}
  )

  const bookCategoryCell = createElement(
    'td',
    { class: 'category' },
    { innerText: select.value }
  )

  bookRow.appendChild(bookTitleCell)
  bookRow.appendChild(bookAuthorCell)
  bookRow.appendChild(bookPriorityCell)
  bookRow.appendChild(bookCategoryCell)

  document.querySelector('table#books-table tbody').appendChild(bookRow)
}


let form = document.querySelector('#form');
console.log(form);

form.addEventListener(`submit`, submitForm);


