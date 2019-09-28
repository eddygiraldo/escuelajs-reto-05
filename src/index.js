const $app = document.getElementById('app');
const $observe = document.getElementById('observe');
const API = 'https://rickandmortyapi.com/api/character/';
 //'https://rickandmortyapi.com/api/character/';
let localStorage = window.localStorage;
localStorage.setItem('next-request', API);

const getData = api => {
  return fetch(api)
    .then(response => response.json());
}

const loadData = async () => {
  const API_NEXT = localStorage.getItem('next-request');
  if (API_NEXT) {
    try {
      const response = await getData(API_NEXT);
      const characters = response.results;
      localStorage.setItem('next-request', response.info.next)
      let output = characters.map(character => {
        return `
        <article class="Card">
          <img src="${character.image}" />
          <h2>${character.name}<span>${character.species}</span></h2>
        </article>
      `
      }).join('');
      let newItem = document.createElement('section');
      newItem.classList.add('Items');
      newItem.innerHTML = output;
      $app.appendChild(newItem);
    }
    catch (error) {
      console.log(error.message)
    }
  } else {
    intersectionObserver.disconnect();
    let paragraph = document.createElement('h1');
    paragraph.textContent = 'No hay más personajes';
    $app.appendChild(paragraph);
  }
}

const intersectionObserver = new IntersectionObserver(entries => {
  if (entries[0].isIntersecting) {
    loadData();
  }
}, {
  rootMargin: '0px 0px 100% 0px',
});

intersectionObserver.observe($observe);

window.addEventListener('unload', function(event) {
  localStorage.clear();
});
