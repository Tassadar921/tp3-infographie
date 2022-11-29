function fctBSpline(m, i, t, noeuds) {
    //fonction pour appeler l'équation de bernstein 
    if (m == 0) {//condition de sortie : si k vaut 0 (on se trouve à la base de la pyramide)
        if(noeuds[i] <= t && noeuds[i+1] > t) {
            return 1;
        }
        else {
            return 0;
        }
    }
    else {
        return ((t-noeuds[i])/(noeuds[i+m]-noeuds[i])*fctBSpline(m-1, i, t, noeuds) + (noeuds[i+m+1]-t)/(noeuds[i+m+1]-noeuds[i+1])*fctBSpline(m-1, i+1, t, noeuds));//calcul des deux points précédant en appelant la fonction dans laquelle on se trouve
    }
}

function createBase(pointsControle, degre, noeuds) {
    let x = 0;                   
    let y = 0;
    let taille = pointsControle.length;

    //mise en place des variables utiles par la suite

    if(taille>=3){//si la courbe ne comporte pas 3 points ignore la suite
        let courbe = [];
        //création du tableau lié à la courbe
        for(let t = 0; t<1;t=t+0.005){//le t variant de 0 à 1 dans l'équation de bernstein pour pouvoir créer chaque point
            x = 0;
            y = 0;
            for(let i = 0; i<taille;i++){
                let bSpline = fctBSpline(degre, i, t, noeuds); //appel du polynome de bernstein soit la fonction de base
                x = x + pointsControle[i].x * bSpline;//courbe de bezier sur x
                y = y + pointsControle[i].y * bSpline;//courbe de bezier sur y
            }
            courbe.push(new THREE.Vector3(x,y,0));//ajout des points à la courbe
        }
       
        return courbe;//on retourne tous les points de la courbe
    }
    else {
        return "error";//retourne une erreur (utilisé pour du déboguage)
    }
}

function fact(x){//fonction permettant le calcul de factoriels
	let result = 1;
	while (x>0){
		result = result*x;
		x--;
	}
	return result;
}