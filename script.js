let limit = 20;
let offset = 0;
let BASE_URL = `https://pokeapi.co/api/v2/pokemon?limit=${limit}&offsets=${offset}`;
let pocedexCard = [];
let allPokemons = [];
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
      allPokemons.push(singledata);
      let poceId = singledata.id;
      let poceName = singledata.name;
      let poceImg = singledata.sprites.front_default;
      let types = singledata.types;
      let typeName = types[0].type.name;
      let typeName_1;
      types.length == 1 ? typeName : (typeName_1 = types[1].type.name);
      let typeName_2 = typeName_1 == undefined ? "" : typeName_1;
      document.getElementById("pocemons").innerHTML += getPocemonCard(poceId,poceImg,poceName,typeName,typeName_2);
    }
  } finally {
    hideLoader();
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
   if (inputValue.value == singledata.id || inputValue.value == singledata.name) {
     document.getElementById("card-1").innerHTML = getPocemonCardDialog(
       poceId,
       poceImg,
       poceName
     );
     cardDialog(poceId, poceImg, poceName);
   }
 }
 
}
// todo normales nachladen???
async function morePocemon() {
  offset = offset += 20;
  BASE_URL = `https://pokeapi.co/api/v2/pokemon?limit=${limit}&offset=${offset}`;
  window.scrollTo(
    0,
    document.body.scrollHeight || document.documentElement.scrollHeight
  );
  await pokemonCard(BASE_URL);
}
// todo passende variablen reinrendern
async function cardDialog(poceId, poceImg, poceName) {
  document.getElementById("card-1").innerHTML = getPocemonCardDialog(
    poceId,
    poceImg,
    poceName
  );
  dialogCard.showModal(poceId, poceImg, poceName);
}

function showLoader() {
  const overlay = document.getElementById("loader-overlay");
  overlay?.removeAttribute("hidden");
  overlay?.setAttribute("aria-busy", "true");
  document.getElementById("pocemons")?.setAttribute("aria-hidden", "true");
}

function hideLoader() {
  setTimeout(() => {
    const overlay = document.getElementById("loader-overlay");
    overlay?.setAttribute("hidden", "");
    overlay?.setAttribute("aria-busy", "false");
    document.getElementById("pocemons")?.removeAttribute("aria-hidden");
  }, 800);
}
