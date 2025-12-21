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
  } catch (error) {
    console.log("Es ist ein Fehler Aufgetreten", error);
  } finally {
    hideLoader();
  }
}

async function pokemonCard() {
  await pokomeonData(allPokemmons);
  for (let i = 0; i < allPokemmons.length; i++) {
    let pokemon = allPokemmons[i];
  //console.log(pokemon.sprites);
      document.getElementById("pocemons").innerHTML += getPokemonCard(pokemon,i);
  }
}

async function cardDialog(i) {
  let pokemon = allPokemmons[i];
  document.querySelector("#card").innerHTML = getPokemonCardDialog(pokemon, i, pokemon);
  await aboutCardPocemon(i);
  dialogCard.showModal();
}

async function aboutCardPocemon(i) {
  let pokemon = allPokemmons[i]; 
    document.getElementById("card-body-content").innerHTML = getAboutCardDialog(pokemon, pokemon);
}

async function baseStatCardPocemon(i) {
  let pokemon = allPokemmons[i];
  document.getElementById("card-body-content").innerHTML = getBaseStatCardDialog(pokemon, i);
}

async function shinyCardPocemon(i) {
  let pokemon = allPokemmons[i];
  console.log(pokemon);
  
  document.getElementById("card-body-content").innerHTML = getShinyCardDialog(pokemon, i);
}

async function searchPocemon() {
  for (let i = 0; i < allPokemmons.length; i++) {
    let pokemon = allPokemmons[i];
      if (inputValue.value == pokemon.id || inputValue.value == pokemon.name) {
        document.getElementById("card").innerHTML = getPokemonCardDialog(pokemon,i);
        await cardDialog(i);
        await aboutCardPocemon(i);
    }
  }
}

async function showLeft(i) {
  let currentIndex = (i - 1 + allPokemmons.length) % allPokemmons.length;
  let pokemon = allPokemmons[currentIndex];
  document.querySelector("#card").innerHTML = getPokemonCardDialog(pokemon,currentIndex);
  await aboutCardPocemon(i);

}

async function showlRight(i) {
  let currentIndex = i;
  currentIndex = (i + 1) % allPokemmons.length;
  let pokemon = allPokemmons[currentIndex];
  document.querySelector("#card").innerHTML = getPokemonCardDialog(pokemon,currentIndex);
  await aboutCardPocemon(i);
}

async function morePocemon() {
  document.getElementById("pocemons").innerHTML = "";
  offset = offset += 20;
  BASE_URL = `https://pokeapi.co/api/v2/pokemon?limit=${limit}&offset=${offset}`;
  await pokemonCard();
}
