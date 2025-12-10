let limit = 20;
let offset = 0;
let BASE_URL = `https://pokeapi.co/api/v2/pokemon?limit=${limit}&offsets=${offset}`;
let pocedexCard = [];
let allPokemons= [];
let inputValue = document.getElementById("search");
let dialogCard = document.getElementById("card-1");

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
    document.getElementById("pocemons").innerHTML += getPocemonCard(poceId, poceImg, poceName, typeName, typeName_2);
  }}

  async function searchPocemon(event) {
  await loadPocedex(pocedexCard);
     event.stopPropagation();
    for (let index = 0; index < allPokemons.length; index++) {
      if (inputValue.value == allPokemons[index].name) {
        console.log(allPokemons[index].id);  
     }
    }
  } 
  
  async function morePoc() {
    limit = limit += 20;
    offset = offset += 20;
    BASE_URL = `https://pokeapi.co/api/v2/pokemon?limit=${limit}&offset=${offset}`;
    document.getElementById("pocemons").innerHTML='';
    await pokemonCard();
  }

  async function cardDialog(poceId, poceImg, poceName, typeName, typeName_2){
    document.getElementById("card-1").innerHTML = getPocemonCardDialog(poceId, poceImg, poceName, typeName, typeName_2);
    dialogCard.showModal();
  }