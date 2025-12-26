let limit = 20;
let offset = 0;
let BASE_URL = `https://pokeapi.co/api/v2/pokemon?limit=${limit}&offsets=${offset}`;
let pocedexCard = [];
let allPokemmons = [];
let inputValue = document.getElementById("search");
let dialogCard = document.getElementById("dialog-content");

function debounce(func, wait) {
  let timeout;
  return function(...args) {
    clearTimeout(timeout);
    timeout = setTimeout(() => func.apply(this, args), wait);
  };
}

if (inputValue) {
  inputValue.addEventListener('input', debounce(inputSearchPokemon, 300));
}

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
      pokemon.types[0].type.name.charAt(0).toUpperCase() +pokemon.types[0].type.name.slice(1);
    } else {
      pokemon.types[0].type.name.charAt(0).toUpperCase() +pokemon.types[0].type.name.slice(1);
      button2;
    }
    document.getElementById("pokemons").innerHTML += getPokemonCard(pokemon,i,button2);
  }
}

async function cardDialog(i) {
  let pokemon = allPokemmons[i];
  document.querySelector("#card").innerHTML = getPokemonCardDialog(pokemon, i, pokemon);
  await aboutCardPokemon(i);
  dialogCard.showModal();
}

async function aboutCardPokemon(i) {
  let pokemon = allPokemmons[i];
  document.getElementById("card-body-content").innerHTML = getAboutCardDialog(pokemon,pokemon);
}

async function baseStatCardPokemon(i) {
  let pokemon = allPokemmons[i];
  document.getElementById("card-body-content").innerHTML =getBaseStatCardDialog(pokemon, i);
}

async function shinyCardPokemon(i) {
  let pokemon = allPokemmons[i];
  try {
    let speciURL = await fetch(pokemon.species.url);
    let pokemon2 = await speciURL.json();
    document.getElementById("card-body-content").innerHTML = getShinyCardDialog(pokemon,pokemon2);
  } catch (error) {
    console.log(error);
  }
}

async function evoCardPokemon(i) {
  let pokemon = allPokemmons[i];
  try {
    let currentURL = await fetch(pokemon.species.url);
    let pokemon3 = await currentURL.json();
    let evolutionURL = await fetch(pokemon3.evolution_chain.url);
    let pokemon4 = await evolutionURL.json();
    if (pokemon4.chain.evolves_to[0].evolves_to[0] === undefined) {
      pokemon4.chain.species.name;
      pokemon4.chain.evolves_to[0].species.name;
      document.getElementById("card-body-content").innerHTML = getEvoCardDialog(pokemon4);
    } else {
      pokemon4.chain.species.name;
      pokemon4.chain.evolves_to[0].species.name;
      pokemon4.chain.evolves_to[0].evolves_to[0].species.name;
      document.getElementById("card-body-content").innerHTML = getEvoCardDialog(pokemon4);
    }
  } catch (error) {
    console.log(error);
  }
}

async function inputSearchPokemon() {
  const pokemonsEl = document.getElementById("pokemons");
  const searchRaw = inputValue.value.trim();

  if (searchRaw === "") {
    let html = '';
    for (let i = 0; i < allPokemmons.length; i++) {
      const pokemon = allPokemmons[i];
      const button2 = `<button id="btn-icon-button" class="type-btn"><img id="cardImgHeder" class="type-img" src="./image/icons/${pokemon.types.length == 1 ? "" : pokemon.types[1].type.name}.png" alt="${pokemon.name}"></button>`;
      html += getPokemonCard(pokemon, i, button2);
    }
    pokemonsEl.innerHTML = html;
    return;
  }

  const search = searchRaw.toLowerCase();
  const isNumeric = /^\d+$/.test(search);
  const matches = [];

  for (let i = 0; i < allPokemmons.length; i++) {
    const pokemon = allPokemmons[i];
    const nameLower = pokemon.name.toLowerCase();
    const idStr = String(pokemon.id);
    let matched = false;

    if (isNumeric) {
      if (idStr.startsWith(search)) matched = true;
    } else {
      if (search.length >= 3 && nameLower.startsWith(search)) matched = true;
    }

    if (matched) {
      const button2 = `<button id="btn-icon-button" class="type-btn"><img id="cardImgHeder" class="type-img" src="./image/icons/${pokemon.types.length == 1 ? "" : pokemon.types[1].type.name}.png" alt="${pokemon.name}"></button>`;
      matches.push(getPokemonCard(pokemon, i, button2));
    }
  }

  if (matches.length > 0) {
    pokemonsEl.innerHTML = matches.join('');
  } else {
    pokemonsEl.innerHTML = '<p>Kein Pokémon gefunden</p>';
  }
}

async function showLeft(i) {
  let currentIndex = (i - 1 + allPokemmons.length) % allPokemmons.length;
  let pokemon = allPokemmons[currentIndex];
  document.querySelector("#card").innerHTML = getPokemonCardDialog(pokemon,currentIndex);
  await aboutCardPokemon(i);
}

async function showlRight(i) {
  let currentIndex = i;
  currentIndex = (i + 1) % allPokemmons.length;
  let pokemon = allPokemmons[currentIndex];
  document.querySelector("#card").innerHTML = getPokemonCardDialog(pokemon,currentIndex);
  await aboutCardPokemon(i);
}

async function morePocemon() {
  document.getElementById("pokemons").innerHTML = "";
  offset = offset += 20;
  BASE_URL = `https://pokeapi.co/api/v2/pokemon?limit=${limit}&offset=${offset}`;
  await pokemonCard();
}
