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
    console.error(error);
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
    console.log(error);
  } finally {
    hideLoader();
  }
}

async function pokemonCard() {
  await pokomeonData(allPokemmons);
  for (let i = 0; i < allPokemmons.length; i++) {
    let pokemon = allPokemmons[i];
    let button2 = `<button id="btn-icon-button" class="type-btn"><img id="cardImgHeder" class="type-img" src="./image/icons/${pokemon.types.length == 1 ? "" : pokemon.types[1].type.name}.png" alt="${pokemon.name}"></button>`;
    if (pokemon.types.length == 1) {
      pokemon.types[0].type.name.charAt(0).toUpperCase() + pokemon.types[0].type.name.slice(1);
    } else {
      pokemon.types[0].type.name.charAt(0).toUpperCase() + pokemon.types[0].type.name.slice(1);
      button2;
      }
      document.getElementById("pocemons").innerHTML += getPokemonCard(pokemon, i, button2);
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
  try {
    let speciURL = await fetch(pokemon.species.url);
    let pokemon2 = await speciURL.json();
    //console.log(pokemon2.evolution_chain.url);
    document.getElementById("card-body-content").innerHTML = getShinyCardDialog(pokemon, pokemon2);
  } catch (error) {
    console.log(error);
  }
}

async function evoCardPocemon(i) {
  let pokemon = allPokemmons[i];
  try {
    let currentURL = await fetch(pokemon.species.url);
    let pokemon3 = await currentURL.json();
    let evolutionURL = await fetch(pokemon3.evolution_chain.url);
    let pokemon4 = await evolutionURL.json();
      document.getElementById("card-body-content").innerHTML = getEvoCardDialog(pokemon4)
  } catch (error) {
    console.log(error);
  }
}

async function inputSearchPocemon() {
  // let ergebnis = allPokemmons.find(search => search.name);
  for (let i = 0; i < allPokemmons.length; i++) {
    let pokemon = allPokemmons[i];
    let button2 = `<button id="btn-icon-button" class="type-btn"><img id="cardImgHeder" class="type-img" src="./image/icons/${pokemon.types.length == 1 ? "" : pokemon.types[1].type.name}.png" alt="${pokemon.name}"></button>`;
    let search = inputValue.value.trim();
    
    if (search == "") {
      document.getElementById("pocemons").innerHTML = getNotPokemon(pokemon, i);
    }
   
    if (inputValue.value == pokemon.id || inputValue.value == pokemon.name) {
      document.getElementById("pocemons").innerHTML = getPokemonCard(pokemon,i,button2);
       }
  }
}

async function showLeft(i) {
  let currentIndex = (i - 1 + allPokemmons.length) % allPokemmons.length;
  let pokemon = allPokemmons[currentIndex];
  document.querySelector("#card").innerHTML = getPokemonCardDialog(pokemon, currentIndex);
  await aboutCardPocemon(i);
}

async function showlRight(i) {
  let currentIndex = i;
  currentIndex = (i + 1) % allPokemmons.length;
  let pokemon = allPokemmons[currentIndex];
  document.querySelector("#card").innerHTML = getPokemonCardDialog(pokemon, currentIndex);
  await aboutCardPocemon(i);
}

async function morePocemon() {
  document.getElementById("pocemons").innerHTML = "";
  offset = offset += 20;
  BASE_URL = `https://pokeapi.co/api/v2/pokemon?limit=${limit}&offset=${offset}`;
  await pokemonCard();
};