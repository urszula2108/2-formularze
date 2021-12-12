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

const renderTable = (books) => {
  console.log('renderowanie tabelki');
}

const saveBooksToLocalStorage = (arrBooks) => {
  console.log('zapis do local storage');
}

const submitForm = (event) => {
  console.log('Działa');

  event.preventDefault();

  const ulErrors = document.querySelector('#errors')
  ulErrors.innerHTML = ''

  let arrErrors = []

  const inputTitle = document.querySelector('#title')
  const inputAuthor = document.querySelector('#author')
  const inputPriority = document.querySelector('#priority')


  if (inputTitle.value.length < 1) {
    arrErrors.push('Tytuł powinien mieć conajmniej 1 znak')
  }

  if (inputAuthor.value.length < 3) {
    arrErrors.push('Autor powinien mieć conajmniej 3 znaki')
  }




  if (arrErrors.length > 0) {


    for (const error of arrErrors) {
      const liError = createElement(
        'li',
        {},
        { innerText: error }
      )

      ulErrors.appendChild(liError)
    }
    return false
  }

  renderTable()

}


let form = document.querySelector('#form');
console.log(form);

form.addEventListener(`submit`, submitForm);


