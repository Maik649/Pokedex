let limit = 20;
let offset = 0;
let BASE_URL = `https://pokeapi.co/api/v2/pokemon?limit=${limit}&offsets=${offset}`;
let pocedexCard = [];
let allPokemmons = [];
let inputValue = document.getElementById("search");
let dialogCard = document.getElementById("dialog-content");

async function init() {
  await pokemonCard();
}

async function loadPocedex() {
  try {
    const response = await fetch(BASE_URL);
    let poceCard = await response.json();
    pocedexCard = poceCard.results;
  } catch (error) {
    console.error(`Es ist ein Fehler Aufgetreten`, error);
  }
}

async function pokomeonData() {
  showLoader();
  try {
    await loadPocedex(pocedexCard);
    for (let i = 0; i < pocedexCard.length; i++) {
      let response = await fetch(pocedexCard[i].url);
      let singledata = await response.json();
      allPokemmons.push(singledata);
    }
  } finally {
    hideLoader();
  }
}

async function pokemonCard() {
  await pokomeonData(allPokemmons);
  for (let i = 0; i < allPokemmons.length; i++) {
    let element = allPokemmons[i];
    let speciesUrl = await fetch(element.species.url);
    let specie = await speciesUrl.json();
    let color = specie.color.name;
    document.getElementById("pocemons").innerHTML += getPokemonCard(element,i,color);
  }
}

async function cardDialog(i) {
  let element = allPokemmons[i];
  document.querySelector("#card").innerHTML = getPokemonCardDialog(element, i, element);
  await aboutCardPocemon(i);
  dialogCard.showModal();
}

async function aboutCardPocemon(i) {
  let element = allPokemmons[i]; 
    document.getElementById("card-body-content").innerHTML = getAboutCardDialog(element, element);
}

async function searchPocemon() {
  for (let i = 0; i < allPokemmons.length; i++) {
    let element = allPokemmons[i];
   if (inputValue.value == element.id || inputValue.value == element.name) {
     document.getElementById("card").innerHTML = getPokemonCardDialog(element,i);
     await cardDialog(i);
     await aboutCardPocemon(i);
   }
  }
}

async function showLeft(i) {
  let currentIndex = (i - 1 + allPokemmons.length) % allPokemmons.length;
  let element = allPokemmons[currentIndex];
  document.querySelector("#card").innerHTML = getPokemonCardDialog(element,currentIndex);
}

async function showlRight(i) {
  let currentIndex = i;
  currentIndex = (i + 1) % allPokemmons.length;
  let element = allPokemmons[currentIndex];
  document.querySelector("#card").innerHTML = getPokemonCardDialog(element,currentIndex);
}

async function morePocemon() {
  document.getElementById("pocemons").innerHTML = "";
  offset = offset += 20;
  BASE_URL = `https://pokeapi.co/api/v2/pokemon?limit=${limit}&offset=${offset}`;
  await pokemonCard();
}
