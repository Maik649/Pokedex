function getPocemonCard(poceId,poceImg,poceName,typeName,typeName_2) {
  return `<div onclick="cardDialog(${poceId},'${poceImg}', '${poceName}')" class="card border-primary mb-3" style="max-width: 18rem;">
                      <p class="card-id">#${poceId}</p>
                    <div class="card-header">
                    <img id="cardImgHeder" src="${poceImg}" alt=""></div>
                    <div class="card-body text-primary">
                        <h5 class="card-title">${poceName}</h5>
                        <div class="types-content">
                        <p class="card-text">${typeName}</p><p class="card-text">${typeName_2}</p>
                        </div>
                    </div>
                </div>`;
}

function getPocemonCardDialog(poceId,poceImg,poceName) {
  return `<div class="card border-primary mb-3">
                      <p class="card-id">#${poceId}</p>
                    <div class="card-header">
                    <img id="cardImgHeder" src="${poceImg}" alt=""></div>
                    <div class="card-body text-primary">
                        <h5 class="card-title">${poceName}</h5>
                        <div class="types-content">
                     </div>
                    </div>
                </div>`;
}