let offset = 0;
let limit = 20;
const BASE_URL = `https://pokeapi.co/api/v2/pokemon?limit=${limit}&offsets=${offset}`;
let pocedexCard = [];
let allPokemons= [];


async function init() {
    await pokemonCard();
}

async function loadPocedex() {
  try {
    const response = await fetch(BASE_URL + ".json");
    let poceCard = await response.json();
    pocedexCard = poceCard.results;
    // console.log(`poceCard`, pocedexCard);
  } catch (error) {
    console.error(`Es ist ein Fehler Aufgetreten`);
  }
}

async function pokemonCard() {
  await loadPocedex(pocedexCard);

  for (let i = 0; i < pocedexCard.length; i++) {
    //-------------------------------------------------------------------------------------------------------------
    let response = await fetch(pocedexCard[i].url);
    let singledata = await response.json();
    allPokemons.push(singledata);
    console.log(`allPokemons`, allPokemons);
  }
}