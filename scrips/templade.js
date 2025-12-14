function getPocemonCard(poceId, poceImg, poceName, typeName, typeName_2) {
  return `<div onclick="cardDialog(${poceId},'${poceImg}', '${poceName}')" class="card border-primary mb-3" style="max-width: max-content;">
                      <p class="card-id">#${poceId}</p>
                    <div class="card-header">
                    <img id="cardImgHeder" src="${poceImg}" alt="${poceName}"></div>
                    <div class="card-body text-primary">
                        <h5 class="card-title">${poceName}</h5>
                        <div class="types-content">
                        <p class="card-text">${typeName}</p><p class="card-text">${typeName_2}</p>
                        </div>
                    </div>
                </div>`;
}

function getPocemonCardDialog(poceId, poceImg, poceName) {
  return `<div class="card border-primary mb-3">
                     
                      <div class="card-header">
                      <h5 class="card-title">${poceName}</h5>
                    <img id="cardImgHeder" src="${poceImg}" alt="${poceName}">
                    <p class="card-id">#${poceId}</p>
                    </div>
                    <div class="card-body text-primary">
                      <div class="link-content">
                        <a onclick="aboutCardPocemon()" href="#" class="card-link">About</a>
                        <a onclick="" href="#" class="card-link">Base Stats</a>
                        <a onclick="" href="#" class="card-link">Gender</a>
                        <a onclick="" href="#" class="card-link">Shiny</a>
                     </div>
                     <div id="card-body-content" class="card-body-content"></div>
                     <div class="card-footer">
                     <button><</button> <button>></button>
                     </div>
                    </div>
                </div>`;
}

function getPocemonDetailsCardDialog(currentHeight, currentWeight, currentAbilitiesName1, currentAbilitiesName2) {
  return `<div class="card border-primary mb-1">
                      <p class="">Height: ${currentHeight}</p>
                      <p class="">Weight: ${currentWeight}</p>
                      <p class="">Abilities: ${currentAbilitiesName1} , ${currentAbilitiesName2}</p>
                     
                </div>`;
}