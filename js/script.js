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

  const books = JSON.parse(localStorage.getItem('books'))

  const booksTableContainer = document.querySelector('#table-container')
  booksTableContainer.innerHTML = ''

  const booksTable = createElement('table', { id: 'books-table' }, {})
  booksTableContainer.appendChild(booksTable)

  const tHead = createElement('thead', {}, {})
  booksTable.appendChild(tHead)


  // rendering table <thead> - START
  const trHead = createElement('tr', { class: 'trHead' }, {})

  tHead.appendChild(trHead)

  const thTitle = createElement(
    'th',
    { class: 'thTitle' },
    { innerText: 'Tytuł' }
  )

  trHead.appendChild(thTitle)

  const thAuthor = createElement(
    'th',
    { class: 'thAuthor' },
    { innerText: 'Autor' }
  )

  trHead.appendChild(thAuthor)

  const thPriority = createElement(
    'th',
    { class: 'thPriority' },
    { innerText: 'Priorytet' }
  )

  trHead.appendChild(thPriority)

  const thCategory = createElement(
    'th',
    { class: 'thCategory' },
    { innerText: 'Kategoria' }
  )

  trHead.appendChild(thCategory)
  // rendering table </thead> - END


  //rendering table <tbody> - START
  const tBody = createElement('tbody', {}, {})
  booksTable.appendChild(tBody)


  if (books) {

    for (const book of books) {
      const bookRow = createElement(
        'tr',
        { class: 'book' },
        {}
      )

      const bookTdTitle = createElement(
        'td',
        { class: 'title book-cell' },
        { innerText: book.title }
      )


      bookRow.appendChild(bookTdTitle)


      const bookTdAuthor = createElement(
        'td',
        { class: 'author book-cell' },
        { innerText: book.author }
      )

      bookRow.appendChild(bookTdAuthor)


      const bookTdPriority = createElement(
        'td',
        { class: 'priority book-cell' },
        { innerText: book.priority }
      )

      bookRow.appendChild(bookTdPriority)

    
      const bookTdCategory = createElement(
        'td',
        { class: book.category.value + 'book-cell' },
        { innerText: book.category.description }
      )

      bookRow.appendChild(bookTdCategory)
      tBody.appendChild(bookRow)
    }
  }

  else {

    const bookRow = createElement('tr', { class: 'book' }, {})
    tBody.appendChild(bookRow)

    const bookTrNoBooks = createElement(
      'td',
      { colspan: '4', class: 'bookNoTrBooks' },
      { innerText: 'Nie ma jeszcze książek...' }
    )
    bookRow.appendChild(bookTrNoBooks)
  }
  // rendering table </tbody> - END

}


const saveBooksToLocalStorage = (book) => {
  console.log('zapis do local storage');

  let books = JSON.parse(localStorage.getItem('books'))

  if (!books) {
    books = []
  }

  books.push(book)


  localStorage.setItem('books', JSON.stringify(books))
}

const clearForm = () => {
  console.log('czyszczenie')
  document.querySelector('#title').value = ''
  document.querySelector('#author').value = ''
  document.querySelector('#priority').value = ''
  document.querySelector('#category').selectedIndex = 0
}


const submitForm = (event) => {
  console.log('Działa');

  event.preventDefault();


  // checking for errors when filling in the form
  const ulErrors = document.querySelector('#errors')
  ulErrors.innerHTML = ''

  let arrErrors = []

  const inputTitle = document.querySelector('#title')
  const inputAuthor = document.querySelector('#author')
  const inputPriority = document.querySelector('#priority')
  const selectCategory = document.querySelector('#category')
  // console.log(inputPriority);


  if (inputTitle.value.length < 1) {
    arrErrors.push('Tytuł powinien mieć conajmniej 1 znak')
  }

  if (inputAuthor.value.length < 3) {
    arrErrors.push('Autor powinien mieć conajmniej 3 znaki')

  }
  if (inputPriority.value < 1 || inputPriority.value > 5) {
    arrErrors.push('Priorytet powinien wynosić od 1 do 5')
  }

  if (arrErrors.length > 0) {

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

  const newBook = {
    title: inputTitle.value,
    author: inputAuthor.value,
    priority: inputPriority.value,
    category: {
      val: selectCategory.value,
      desc: selectCategory.options[selectCategory.selectedIndex].text,
    }
  }


  saveBooksToLocalStorage(newBook)

  clearForm()

  renderTable()
}


let form = document.querySelector('#form');
console.log(form);

form.addEventListener(`submit`, submitForm);


renderTable()