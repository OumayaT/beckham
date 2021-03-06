//Construction lien panier avec compteur et tooltip
function CompteurPanierNavBar(){
    const teddyBasket = JSON.parse(localStorage.getItem('adoptionTeddies'))
    const teddyBasketCount = document.getElementById("teddyBasketCount")
    const teddyBasketLink = document.createElement("a")
    teddyBasketLink.classList.add("nav-link", "text-white", "h5")
    teddyBasketLink.setAttribute("href", "panier.html")
    if (teddyBasket){
        teddyBasketLink.innerHTML = `Panier <span class="badge badge-pill badge-white text-white ">${teddyBasket.length}</span>`
    } else{
        teddyBasketLink.innerHTML = `Panier <span class="badge badge-pill badge-dark text-white border border-white mx-2 h5">0</span>`
    }
    teddyBasketCount.appendChild(teddyBasketLink)
}

//Gestion erreur et affichage du message
function gestionErreurMessage(error){
    const erreurMessage = document.getElementById("erreurServeur")
    const erreurMessagePre = document.createElement("div")
    erreurMessagePre.classList.add("modal-dialog", "modal-dialog-centered")
    erreurMessagePre.innerHTML = `
        <div class="modal-content border-danger">
            <div class="modal-header">
                <h3 class="modal-title text-danger h5">Erreur !</h3>
            </div>
            <div class="modal-body" id="typeErreur">
                Le serveur a rencontré une erreur !<br>
                <code>${error}</code><br>
                Essayer de recharger la page ou revenir plus tard.<br>
                Nous faisons tout notre possible pour remédier à ce problème dans les meilleurs délais.
            </div>
            <div class="modal-footer">
                <a href="${window.location}" class="btn btn-block btn-danger">Recharger la page</a>
            </div>
        </div>`
    erreurMessage.appendChild(erreurMessagePre)
    $('#erreurServeur').modal('show')
}
// Gestion des erreurs 404 et 500
function handleErrors(response) {
    if (!response.ok) {
        window.location.href ="index.html"
    }
    return response;
}