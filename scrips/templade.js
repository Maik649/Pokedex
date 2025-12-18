function getPocemonCard(element) {
  return `<div onclick="cardDialog(${element.id},)" class="card border-primary mb-3" style="max-width: max-content;">
                      <p class="card-id">#${element.id}</p>
                    <div class="card-header">
                    <img id="cardImgHeder" src="${element.sprites.front_default}" alt="${element.name}"></div>
                    <div class="card-body text-primary">
                        <h5 class="card-title">${element.name}</h5>
                        <div class="types-content">
                        <p class="card-text">${''}</p><p class="card-text">${''}</p>
                        </div>
                    </div>
                </div>`;
}

function getPocemonCardDialog(pokemon, currentIndex) {
  return `<div class="card border-primary mb-3">
                     
                      <div class="card-header">
                      <h5 class="card-title">${pokemon.name}</h5>
                    <img id="cardImgHeder" src="${pokemon.sprites.front_default}" alt="${""}">
                    <p class="card-id">#${pokemon.id}</p>
                   </div>
                   <div class="link-content">
                        <a onclick="aboutCardPocemon()" href="#" class="card-link">About</a>
                        <a onclick="" href="#" class="card-link">Base Stats</a>
                        <a onclick="" href="#" class="card-link">Gender</a>
                        <a onclick="" href="#" class="card-link">Shiny</a>
                     </div>
                    <div class="card-body text-primary">
                     <div id="card-body-content" class="card-body-content"></div>
                     <div class="card-footer">
                     <button onclick="showLeft(${currentIndex})" class="card-footer-btn"><</button> <button onclick="showlRight(${""})" class="card-footer-btn">></button>
                    </div>
                </div>`;
}

// function getPocemonDetailsCardDialog(pokemon) {
//   return `<div class="card-about-content ">
//   <div class="card-details-container">
//     <p class="detail-p-headlin">Species:</p><p>${}</p>
//   </div>
//  <div class="card-details-container">
//     <p class="detail-p-headlin">Height:</p><p>${}</p>
//   </div>
//   <div class="card-details-container">
//     <p class="detail-p-headlin">Weight:</p><p>${}</p>
//   </div>
//   <div class="card-details-container">
//   <p class="detail-p-headlin">Abilities:</p>
//       <p>${} , ${}</p>
//   </div>
// </div>`;
// }