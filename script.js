let limit = 20;
let offsset = 0;
let BASE_URL = `https://pokeapi.co/api/v2/pokemon?limit=${limit}&offsets=${offsset}`;
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

}async function pokemonCard() {
  showLoader();
  try {
    await loadPocedex();
  for (let i = 0; i < pocedexCard.length; i++) {
    let response = await fetch(pocedexCard[i].url);
    let singledata = await response.json();
    allPokemons.push(singledata); allPokemons;
    let poceId = allPokemons[i].id
    let poceName =  allPokemons[i].name;
    let poceImg = allPokemons[i].sprites.front_default;
    let types = allPokemons[i].types;
    let typeName = types[0].type.name; let typeName_1;
    types.length == 1 ? typeName :  typeName_1 = types[1].type.name;
    let typeName_2 = typeName_1 == undefined ? "": typeName_1;
    document.getElementById("pocemons").innerHTML += getPocemonCard(poceId, poceImg, poceName, typeName, typeName_2, i);
  } }finally {
    hideLoader();
  }
}

  async function searchPocemon(event) {
  await loadPocedex(allPokemons);
     event.stopPropagation();
    for (let i = 0; i < allPokemons.length; i++) {
      let poceId = allPokemons[i].id;
       let poceName = allPokemons[i].name;
       let poceImg = allPokemons[i].sprites.front_default;
      if (inputValue.value == allPokemons[i].name || inputValue.value == allPokemons[i].id) {
        document.getElementById("card-1").innerHTML = getPocemonCardDialog(poceId, poceImg, poceName);
      cardDialog(poceId, poceImg, poceName);
    }
  } 
}
   // todo normales nachladen ohne alles neu zu rendern???
  async function morePocemon() {
   document.getElementById("pocemons").innerHTML="";
    limit = limit += 20;
    offsset = offsset += 20;
    BASE_URL = `https://pokeapi.co/api/v2/pokemon?limit=${limit}&offset=${offsset}`;
    await pokemonCard();
    window.scrollTo(0, document.body.scrollHeight || document.documentElement.scrollHeight);
  }
// todo passende variablen reinrendern
  async function cardDialog(poceId,poceImg, poceName) {
    document.getElementById("card-1").innerHTML = getPocemonCardDialog(poceId,poceImg, poceName);
    dialogCard.showModal(poceId,poceImg, poceName);
  }

  function showLoader() {
    const overlay = document.getElementById("loader-overlay");
    overlay?.removeAttribute("hidden");
    overlay?.setAttribute("aria-busy", "true");
    document.getElementById("pocemons")?.setAttribute("aria-hidden", "true");
  }

  function hideLoader() {
    setTimeout(() => {
    const overlay = document.getElementById("loader-overlay")
    overlay?.setAttribute("hidden", "")
    overlay?.setAttribute("aria-busy", "false")
    document.getElementById("pocemons")?.removeAttribute("aria-hidden")
    }, 800)
  }