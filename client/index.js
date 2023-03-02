const app = document.querySelector('#app')
const openButton = document.querySelector('.open')
const serverUrl = 'http://localhost:4200/cities'
const popupContainerTemplate = `<div class="popup__container"></div>`

let citiesList = []

$.ajax({
  url: serverUrl,
  method: 'get',
  dataType: 'json',
  success: (data) => {
    citiesList = data
  },
})

const getPopup = () => {
  return `<div class="popup">
          <label for="cities" class="cities">
            Введите город
            <input type="text" />
          </label>        
        <ul class="cities__list"> 
        ${citiesList.map((item) => `<li>${item.name}</li>`).join('')}
        </ul>  
        <button class="close">Закрыть</button>        
        </div>`
}

openButton.addEventListener('click', (event) => {
  event.preventDefault()
  app.insertAdjacentHTML('afterbegin', popupContainerTemplate)
  const popupContainer = app.querySelector('.popup__container')
  popupContainer.insertAdjacentHTML('afterbegin', getPopup())
})

app.addEventListener('click', (event) => {
  event.preventDefault()
  const popupContainer = app.querySelector('.popup__container')
  const closeBtn = app.querySelector('.close')
  const element = event.target

  closeBtn.addEventListener('click', (e) => {
    e.preventDefault()
    app.removeChild(popupContainer)
  })

  if (element.tagName === 'INPUT') {
    const list = app.querySelector('.cities__list')

    element.addEventListener('input', (e) => {
      const value = e.target.value
      const cities = Array.from(list.getElementsByTagName('li'))
      cities.forEach((element) => {
        if (element.innerText.toLowerCase().indexOf(value.toLowerCase()) > -1) {
          element.style.display = ''
        } else {
          element.style.display = 'none'
        }
      })
    })
  }
})
