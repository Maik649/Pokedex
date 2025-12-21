function getPokemonCard(pokemon, i, color) {
  return `<article onclick="cardDialog(${i})" class="card border-primary mb-3" style="width: 18rem; background:linear-gradient(in oklab, blue, ${color});">
  <div class="card-header">
    <h5 class="card-title">${
      pokemon.name.charAt(0).toUpperCase() + pokemon.name.slice(1)
    }</h5>
    <img id="cardImgHeder" src="${pokemon.sprites.front_default}" alt="${
    pokemon.name.charAt(0).toUpperCase() + pokemon.name.slice(1)
  }">
    <span class="card-id">#${pokemon.id}</span>
  </div>
  <div class="">
    <span class="types-text" style="background:${color}">${
    pokemon.types[i] != undefined
      ? pokemon.types[i].type.name.charAt(0).toUpperCase() +
        pokemon.types[i].type.name.slice(1)
      : pokemon.types[0].type.name.charAt(0).toUpperCase() +
        pokemon.types[0].type.name.slice(1)
  }</span>
  </article>`;
}

function getPokemonCardDialog(pokemon, currentIndex) {
  return `<article class="card border-primary mb-3" style="background:linear-gradient(in oklab, blue, ${'color'});">
            <div class="card-header">
              <h5 class="card-title">${pokemon.name}</h5>
              <img id="cardImgHeder" src="${pokemon.sprites.front_default}" alt="${pokemon.name.charAt(0).toUpperCase() + pokemon.name.slice(1)}" style="width:140px; height:140px">
              <p class="card-id">#${pokemon.id}</p>
            </div>
            <div class="link-content">
              <a onclick="aboutCardPocemon(${currentIndex})" href="#" class="card-link">About</a>
              <a onclick="" href="#" class="card-link">Base Stats</a>
              <a onclick="" href="#" class="card-link">Gender</a>
              <a onclick="" href="#" class="card-link">Shiny</a>
            </div>
            <div class="card-body text-primary">
              <div id="card-body-content" class="card-body-content"></div>
            <div class="card-footer">
              <button onclick="showLeft(${currentIndex})" class="card-footer-btn"><</button> <button onclick="showlRight(${currentIndex})" class="card-footer-btn">></button>
                </div>
</article>`;}

function getAboutCardDialog(specie, pokemon) {
  return `<div class="card-about-content ">
  <div class="card-details-container">
    <p class="detail-p-headlin">Species</p><p>${
      pokemon.stats[5].stat.name.charAt(0).toUpperCase() +
      pokemon.stats[5].stat.name.slice(1)
    }</p>
  </div>
 <div class="card-details-container">
    <p class="detail-p-headlin">Height</p><p>${specie.height / 10} cm</p>
  </div>
  <div class="card-details-container">
    <p class="detail-p-headlin">Weight</p><p>${specie.weight / 10} kg</p>
  </div>
  <div class="card-details-container">
  <p class="detail-p-headlin">Abilities</p>
      <p>${
        specie.abilities[0].ability.name.charAt(0).toUpperCase() +
        specie.abilities[0].ability.name.slice(1)
      } , ${
    specie.abilities[1] == undefined
      ? ""
      : specie.abilities[1].ability.name.charAt(0).toUpperCase() +
        specie.abilities[1].ability.name.slice(1)
  }</p>
  </div>
  
</div>`;
}