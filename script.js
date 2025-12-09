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
  } catch (error) {
    console.error(`Es ist ein Fehler Aufgetreten`);
  }
}

async function pokemonCard() {
  await loadPocedex(pocedexCard);
  for (let i = 0; i < pocedexCard.length; i++) {
    let response = await fetch(pocedexCard[i].url);
    let singledata = await response.json();
    allPokemons.push(singledata);
    let poceId = allPokemons[i].id
    let poceName =  allPokemons[i].name;
    let poceImg = allPokemons[i].sprites.front_default;
    let types = allPokemons[i].types;
    let typeName = types[0].type.name;
  let typeName_1;
    types.length == 1 ? typeName :  typeName_1 = types[1].type.name;
    let typeName_2 = typeName_1 == undefined ? "": typeName_1;
    document.getElementById("pocemons").innerHTML += await getPocemonCard(poceName, poceImg, poceId, typeName, typeName_2);}}