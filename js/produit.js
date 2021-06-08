// Appel de la fonction Compteur du panier de la navbar
CompteurPanierNavBar()
// Récupération de l'ID de l'ourson de la page
const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);
const id = urlParams.get('id');
// Si aucun ID dans l'URL alors on redirige vers l'accueil
if (id === null) {window.location.href ="index.html"}
// Connection à la base de données et ajout au panier
fetch("https://ab-p5-api.herokuapp.com/api/teddies/" + id)
    .then(handleErrors)
    .then(teddySelected => teddySelected.json())
    .then(teddySelected => {
    
        ficheProduitTeddy(teddySelected)
        zoomTeddyPhoto(teddySelected)
        colorTeddyOptions(teddySelected)
        addTeddyToBasketAndRedirect(teddySelected)
    })
    .catch (function(error){
        gestionErreurMessage(error)
    })
////////////////////////////////////////////////////// FUNCTIONS //////////////////////////////////////////////////////


// Construction DIV fiche produit teddy
function ficheProduitTeddy(teddySelected){
    const teddyCard = document.getElementById("teddyCard")
    const divCard = document.createElement("div")
    divCard.classList.add("col-10", "col-sm-8","col-md-8", "col-lg-6", "p-2", "mb-5","shadow", "bg-warning")
    divCard.innerHTML = `
        <div class="card mb-4 mb-lg-0 border-warning shadow-">
            <img src="${teddySelected.imageUrl}" alt="${teddySelected.name}" class="card-img-top h-50" data-toggle="modal" data-target="#teddyZoomModal">
            <h3 class="card-header text-center h3">${teddySelected.name}</h3>
            <div class="card-body">
                <h4 class="card-title h5">${teddySelected.description}</h4>
                <hr>
                <form id="AddToBasket">
                    <div class="form-group row text-center input-group is-invalid m-0 py-0 pb-3">
                        <select class="form-control-sm col-5 p-0" id="teddyColor" required>
                        </select>
                        <p class="card-text col-7 text-right font-weight-bold pr-0 pl-1 h5">Prix : ${teddySelected.price / 100}.00 €</p>  
                    </div>
                    <button type="submit" name="add" id="submit" class="btn btn-sm btn-success btn-block ">Commander ${teddySelected.name}</button>
                </form>
            </div>
        </div>`
    teddyCard.appendChild(divCard)
}
// Construction Zoom Modal
function zoomTeddyPhoto(teddySelected){
    const teddyZoom = document.getElementById("teddyZoomModal")
    const divZoom = document.createElement("div")
    divZoom.classList.add("modal-dialog", "modal-xl")
    divZoom.innerHTML = `
        <div class="modal-content">
            <div class="modal-body">
                <img src="${teddySelected.imageUrl}" class="w-100">
            </div>
        </div>`
    teddyZoom.appendChild(divZoom)
}
// Construction du choix des couleurs
function colorTeddyOptions(teddySelected){
    const teddyColors = teddySelected.colors
    const teddyColor = document.getElementById("teddyColor")
    teddyColors.forEach(color => {
        const colorOption = document.createElement("option")
        colorOption.setAttribute("value", color)
        colorOption.innerHTML = color
        teddyColor.appendChild(colorOption)
    })
}
// Ajout du teddy choisi dans le panier
function addTeddyToBasketAndRedirect(teddySelected){
    const addTeddyToLocalStorage = document.getElementById("submit")
    addTeddyToLocalStorage.addEventListener("click", function (event) {
        event.preventDefault()
        $('#teddyAlertMessage').modal('show')
        // Créer l'ajout dans localstorage
        teddyAdopter = {teddyName: teddySelected.name, 
                        teddyColor: teddyColor.value, 
                        teddyId: teddySelected._id, 
                        teddyQuantity: 1, 
                        teddyPrice: teddySelected.price / 100,
                        teddyImageUrl: teddySelected.imageUrl
        }
        modalAddTeddyToBasket(teddySelected)
        addToBasketGoToIndex()
        addToBasketGoToBasket()
    })
}
// Afichage du modal pour confirmer l'adoption du teddy choisi
function modalAddTeddyToBasket(teddySelected){
    const teddyAlertMessage = document.getElementById("teddyAlertMessage")
    const teddyAlertMessageP = document.createElement("div")
    teddyAlertMessageP.classList.add("modal-dialog")
    teddyAlertMessageP.innerHTML = `
        <div class="modal-content ">
            <div class="modal-header">
                <h3 class="modal-title h5" id="teddyAlertMessageModalTitle">Ajout au panier</h3>
            </div>
            <div class="modal-body">
                <img src="${teddySelected.imageUrl}"  alt="${teddySelected.name}" class="w-100 h-100">
                <hr>
                Vous venez d'ajouter à votre panier l'ours <strong>${teddySelected.name}</strong>
                de couleur <strong>${teddyColor.value}</strong> <br>
                Prix : <strong>${teddySelected.price / 100}.00 €</strong>
            </div>
            <div class="modal-footer">
                <div class="row w-100 justify-content-spacebetween">
                    <div class="col-6"><a href="index.html" class="btn btn-success btn-block" id="continuerAdoption">Continuer mes achats</a></div>
                    <div class="col-6"><a href="panier.html" class="btn btn-success btn-block" id="finaliserAdoption">Consulter mon panier</a></div>
                </div>
            </div>
        </div>`
    teddyAlertMessage.appendChild(teddyAlertMessageP)
}
// Ajouter au panier et aller à l'index
function addToBasketGoToIndex(){
    addTeddyGoIndex = document.getElementById("continuerAdoption")
    addTeddyGoIndex.addEventListener("click", function (event) {
        firstAdd()
    })
}
// Ajouter au panier et aller au panier
function addToBasketGoToBasket(){
    const addTeddyGoBasket = document.getElementById("finaliserAdoption")
    addTeddyGoBasket.addEventListener("click", function (event) {
        firstAdd()
    })
}
// Ajouter au panier...
function firstAdd(){
    teddyAuPanier = JSON.parse(localStorage.getItem('adoptionTeddies'))
    if (teddyAuPanier) {
        thenRedirect()
    } else {
        teddyAuPanier = []
        thenRedirect()
    }    
}
// ...puis rediriger
function thenRedirect(){
    teddyAuPanier.push(teddyAdopter)
    localStorage.setItem('adoptionTeddies', JSON.stringify(teddyAuPanier))
}