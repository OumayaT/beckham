//appel de la fonction Compteur du panier de la navbar
CompteurPanierNavBar()
//Connection à la base de données
fetch("https://ab-p5-api.herokuapp.com/api/teddies")
    //Formatage reponse au format JSON
    .then(teddiesList => teddiesList.json())
    // Recuperation du JSON tableau des oursons //
    .then(teddiesList => {
        tableauTeddies(teddiesList)
    })
    //Gestion d'erreur
    .catch (function(error){
        gestionErreurMessage(error)
    })
////////////////////////////////////////////////////// FUNCTIONS //////////////////////////////////////////////////////
// Fonction de création du tableau des teddies
function tableauTeddies(teddiesList){
    const mainTeddy = document.getElementById("teddies_list")
    teddiesList.forEach(teddyList => {
        const divTeddy = document.createElement("div")
        divTeddy.classList.add("col-12", "col-md-6", "col-lg-4", "mb-3")
        divTeddy.innerHTML = `            
          <div class="card mb-4 mb-lg-0 h-100 border-warning  bg-light shadow">
              <img src="${teddyList.imageUrl}" alt="${teddyList.name}" class="card-img-top h-80">
              <div class="card-body p-4 text-center">
              <h3 class="card-title h5">${teddyList.name}</h3>
              <p class="card-text">Prix : ${teddyList.price / 100}.00 €</p>
              <a href="produit.html?id=${teddyList._id}" class="btn btn-success btn-block stretched-link">Afficher ${teddyList.name} </a>
              </div>
          </div>`
        mainTeddy.appendChild(divTeddy)
    })
}
