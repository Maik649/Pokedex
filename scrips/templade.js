function getPokemonCard(element, i, color) {
  return `<article onclick="cardDialog(${i})" class="card border-primary mb-3" style="width: 18rem; background:${color};">
  <div class="card-header">
    <h5 class="card-title">${element.name.charAt(0).toUpperCase() + element.name.slice(1)}</h5>
    <img id="cardImgHeder" src="${element.sprites.front_default}" alt="${element.name.charAt(0).toUpperCase() + element.name.slice(1)}">
    <span class="card-id">#${element.id}</span>
  </div>
  <div class="">
    <span class="types-text" style="background:${color}">${element.types[i] != undefined? element.types[i].type.name.charAt(0).toUpperCase() + element.types[i].type.name.slice(1) : element.types[0].type.name.charAt(0).toUpperCase() + element.types[0].type.name.slice(1)}</span>
  </article>`;
}

function getPokemonCardDialog(element, currentIndex) {
  return `<article class="card border-primary mb-3">
            <div class="card-header">
              <h5 class="card-title">${element.name}</h5>
              <img id="cardImgHeder" src="${element.sprites.front_default}" alt="${element.name.charAt(0).toUpperCase() + element.name.slice(1)}">
              <p class="card-id">#${element.id}</p>
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

function getAboutCardDialog(specie, specieale) {
  return `<div class="card-about-content ">
  <div class="card-details-container">
    <p class="detail-p-headlin">Species</p><p>${specieale.charAt(0).toUpperCase() + specieale.slice(1)}</p>
  </div>
 <div class="card-details-container">
    <p class="detail-p-headlin">Height</p><p>${specie.height / 10} cm</p>
  </div>
  <div class="card-details-container">
    <p class="detail-p-headlin">Weight</p><p>${specie.weight / 10} kg</p>
  </div>
  <div class="card-details-container">
  <p class="detail-p-headlin">Abilities</p>
      <p>${specie.abilities[0].ability.name.charAt(0).toUpperCase() + specie.abilities[1].ability.name.slice(1)} , ${specie.abilities[1].ability.name.charAt(0).toUpperCase() + specie.abilities[1].ability.name.slice(1)}</p>
  </div>
  
</div>`;
}