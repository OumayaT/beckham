//appel de la fonction Compteur du panier de la navbar
CompteurPanierNavBar()
// récupération de l'id de la commande
const numeroCommande = localStorage.getItem('numeroCommande');
// récupération du prix total de la commande
const montantCommande = localStorage.getItem('montantCommande');
//Si aucunes données dans le localstorage alors on redirige vers l'accueil
if (!numeroCommande && !montantCommande){window.location.href= "index.html"}
//Construction DIV récapitulatif de commande
const recapitulatifCommande = document.getElementById("recapitulatifCommande")
const recapDiv = document.createElement("div")
recapDiv.classList.add("col-12", "col-md-8", "col-lg-6", "mb-3")
recapDiv.innerHTML = `
    <div class="card mb-4 mb-lg-0 border-warning shadow">
        <img src="img/happyTeddy.jpg" class="card-img-top h-50 ">
        <h3 class="card-header text-center h5">Merci de votre confiance !</h3>
        <div class="card-body">
            <!--<img src="img/sadTeddy.jpg" class="img-fluid">-->
            <h4 class="h6">Nous vous confirmons votre commande.</h4>
            <p>L'équipe d'Ori-Bears vous remercie  pour votre achat.</p>
            <p>Votre commande arrivera très prochainement chez vous.</p>
            <h4 class="h6">En espérant vous revoir bientôt <h4>
        </div>
        <div class="alert alert-success rounded-0">
            <h4 class="h6" class="alert-heading">Récapitulatif de votre commande :</h4>
            <hr>
            <div class="row">
                <div class="col-sm-4 col-md-3 h5">Numéro :</div>
                <div class="col user-select-all h5">${numeroCommande}</div>
            </div>
            <div class="row">
                <div class="col-sm-4 col-md-3 h5">Montant :</div>
                <div class="col h5">${montantCommande}.00 €</div> 
            </div>
        </div>
        <div class="card-footer">
            <a href="index.html" class="btn btn-sm btn-success btn-block h4">revenir à l'accueil</a>
        </div>
    </div>`
recapitulatifCommande.appendChild(recapDiv)
//on vide le localstorage
localStorage.clear()