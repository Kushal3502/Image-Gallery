const requestUrl = 'https://api.unsplash.com/search/photos?page=1&query='
const accesKey = 'fnkqXuS_D_JdUn8tk8-m_MNOaDLeIUhZEZNDj2qV33o'

const keyWord = document.querySelector('#user-input')
const searchBtn = document.querySelector('.search')
const loader = document.querySelector('.loader')
const resultContainer = document.querySelector('.result-container')
const loadMore = document.querySelector('.load-more')

let query = 'random'
let page = 1
async function fetchImages(query, page) {
    showLoader()
    const response = await fetch(`https://api.unsplash.com/search/photos?page=${page}&query=${query}&client_id=${accesKey}`)
    const resultData = await response.json()
    // console.log(resultData.results);
    if (resultData) displayCards(resultData.results)
    if (page == resultData.total_pages) loadMore.setAttribute('disabled', 'true')
    hideLoader()
}

function displayCards(data) {
    data.forEach(item => {
        const card = document.createElement('div')
        const image = document.createElement('img')
        const a = document.createElement('a')
        const download = document.createElement('i')
        card.classList.add('card')
        image.src = item.urls.regular
        a.href = item.urls.regular
        a.setAttribute('target', '_blank')
        download.classList.add('fa-solid', 'fa-download')
        a.appendChild(download)
        card.appendChild(image)
        card.appendChild(a)
        resultContainer.appendChild(card)
    });
}

function showLoader() {
    loader.classList.add('show')
    resultContainer.classList.add('hide')
}

function hideLoader() {
    loader.classList.remove('show')
    resultContainer.classList.remove('hide')
}

fetchImages(query)

searchBtn.addEventListener('click', () => {
    query = keyWord.value
    resultContainer.innerHTML = ''
    fetchImages(query, page)
    keyWord.value = ''
})

loadMore.addEventListener('click', () => {
    fetchImages(query, ++page)
})
