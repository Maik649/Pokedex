let limit = 20;
let offset = 0;
let BASE_URL = `https://pokeapi.co/api/v2/pokemon?limit=${limit}&offsets=${offset}`;
let pocedexCard = [];
let allPokemmons = [];

let inputValue = document.getElementById("search");
let dialogCard = document.getElementById("card-1");

async function init() {
  await pokemonCard();
}

async function loadPocedex() {
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
    await loadPocedex(pocedexCard);
    for (let i = 0; i < pocedexCard.length; i++) {
      let response = await fetch(pocedexCard[i].url);
      let singledata = await response.json();
      allPokemmons.push(singledata);
      let poceId = singledata.id;
      let poceName = singledata.name;
      poceName = poceName.charAt(0).toUpperCase() + poceName.slice(1);
      let poceImg = singledata.sprites.front_default;
      let types = singledata.types;
      let typeName = types[0].type.name;
      typeName = poceName.charAt(0).toUpperCase() + typeName.slice(1);
      let typeName_1;
      types.length == 1 ? typeName : (typeName_1 = types[1].type.name);
      let typeName_2 = typeName_1 == undefined ? "" : typeName_1;
      typeName_2 = typeName_2.charAt(0).toUpperCase() + typeName_2.slice(1);
      document.getElementById("pocemons").innerHTML += getPocemonCard(
        poceId,
        poceImg,
        poceName,
        typeName,
        typeName_2
      );
    }
  } finally {
    hideLoader();
  }
}

async function aboutCardPocemon(poceId) {
  for (let index = 0; index < allPokemmons.length; index++) {
    let speciesUrl = await fetch(`https://pokeapi.co/api/v2/nature/${poceId}/`);
    let speciesResult = await speciesUrl.json();
    poceId = allPokemmons[poceId].id - 1;
    let currentSpecie = speciesResult.pokeathlon_stat_changes[0].pokeathlon_stat.name;
    currentSpecie = currentSpecie.charAt(0).toUpperCase() + currentSpecie.slice(1);
    let currentHeight = allPokemmons[poceId].height;
    let currentWeight = allPokemmons[poceId].weight;
    let currentAbilities = allPokemmons[poceId].abilities;
    let currentAbilitiesName1 = currentAbilities[0].ability.name;
    let currentAbilitiesName2 = currentAbilities[1].ability.name;
    currentAbilitiesName1 = currentAbilitiesName1.charAt(0).toUpperCase() + currentAbilitiesName1.slice(1);
    currentAbilitiesName2 = currentAbilitiesName1.charAt(0).toUpperCase() + currentAbilitiesName2.slice(1);
    if (poceId) {
      document.getElementById("card-body-content").innerHTML = getPocemonDetailsCardDialog(currentSpecie, currentHeight, currentWeight, currentAbilitiesName1, currentAbilitiesName2);
    }
  }
}

async function searchPocemon(event) {
  await loadPocedex(pocedexCard);
  event.stopPropagation();
  for (let index = 0; index < pocedexCard.length; index++) {
    let response = await fetch(pocedexCard[index].url);
    let singledata = await response.json();
    poceId = singledata.id;
    poceImg = singledata.sprites.front_default;
    poceName = singledata.name;
    if (
      inputValue.value == singledata.id ||
      inputValue.value == singledata.name
    ) {
      document.getElementById("card-1").innerHTML = getPocemonCardDialog(
        poceId,
        poceImg,
        poceName
      );
      cardDialog(poceId, poceImg, poceName);
    }
  }
}

async function morePocemon() {
  offset = offset += 20;
  BASE_URL = `https://pokeapi.co/api/v2/pokemon?limit=${limit}&offset=${offset}`;
  await pokemonCard(BASE_URL);
}

async function cardDialog(poceId, poceImg, poceName) {
  document.getElementById("card-1").innerHTML = getPocemonCardDialog(poceId,poceImg,poceName);
  dialogCard.showModal(poceId, poceImg, poceName);
  await aboutCardPocemon(poceId);
}

async function showLeft(singledata) {
  let currentIndex = singledata;
  currentIndex = (currentIndex - 1 + allPokemmons.length) % allPokemmons.length;
  allPokemmons[currentIndex];
document.querySelector("#card-1").innerHTML = getPocemonCardDialog(currentIndex);
}

function showlRight(singledata) {
  let currentIndex = singledata;
  currentIndex = (currentIndex + 1 + allPokemmons.length) % allPokemmons.length;
  document.querySelector("#card-1").innerHTML = getPocemonCardDialog(currentIndex);
}
