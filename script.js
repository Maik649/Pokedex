let limit = 20;
let offset = 0;
let BASE_URL = `https://pokeapi.co/api/v2/pokemon?limit=${limit}&offsets=${offset}`;
let pocedexCard = [];
let allPokemmons = [];
let inputValue = document.getElementById("search");
let dialogCard = document.getElementById("card-1");

async function init() {
  await pokemonData();
}

async function loadPokedex() {
  try {
    const response = await fetch(BASE_URL);
    let poceCard = await response.json();
    pocedexCard = poceCard.results;
  } catch (error) {
    console.error(`Es ist ein Fehler Aufgetreten`);
  }
}

async function pokemonCard() {
  showLoader();
  try {
    await loadPokedex(pocedexCard);
    for (let i = 0; i < pocedexCard.length; i++) {
      let response = await fetch(pocedexCard[i].url);
      let singledata = await response.json();
      allPokemmons.push(singledata);
    }
  } finally {
    hideLoader();
  }
}

async function pokemonData() {
  await pokemonCard(allPokemmons);
  for (const key in allPokemmons) {
  if (!Object.hasOwn(allPokemmons, key)) continue;
    let element = allPokemmons[key];
   document.getElementById("pocemons").innerHTML += getPocemonCard(element);
  }
}

async function cardDialog(i) {
   await pokemonCard(allPokemmons);
   let pokemon = allPokemmons[i];
   let currentIndex = i;
   document.querySelector("#card-1").innerHTML = getPocemonCardDialog(pokemon, currentIndex);
  dialogCard.showModal();
}



// async function aboutCardPocemon() {
//       document.getElementById("card-body-content").innerHTML = getPocemonDetailsCardDialog();
//     }

// async function searchPocemon(event) {
//   event.stopPropagation();
// }

async function morePocemon() {
  document.getElementById("pocemons").innerHTML="";
  offset = offset += 20;
  BASE_URL = `https://pokeapi.co/api/v2/pokemon?limit=${limit}&offset=${offset}`;
  await pokemonData();
}

  

async function showLeft(currentIndex) {
  currentIndex = (currentIndex - 1 + allPokemmons.length) % allPokemmons.length;
  let pokedexsolo = allPokemmons[currentIndex];

  document.querySelector("#card-1").innerHTML = getPocemonCardDialog(pokedexsolo);
}

function showlRight(currentIndex) {
  currentIndex = (currentIndex + 1 + allPokemmons.length) % allPokemmons.length;
  pokedexsolo = allPokemmons[currentIndex];

  document.querySelector("#card-1").innerHTML = getPocemonCardDialog(pokedexsolo);
}
