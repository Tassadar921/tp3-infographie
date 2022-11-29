function boor(pointsControle, ordre, noeuds, t,i,j, dim) {//algorithme récursif de decasteljau
    if (j == 0) {//condition de sortie : si k vaut 0 (on se trouve à la base de la pyramide)
        switch (dim) {//permet juste de retourner la valeur de x ou y
            case "x":
                return (pointsControle[i].x);
                break
            case "y":
                return (pointsControle[i].y);
                break
        }
    }
    else {
        let alpha = (t - noeuds[i])/(noeuds[i+ordre-j] - noeuds[i]);
        return ( (1-alpha)*boor(pointsControle, ordre, noeuds, t, i-1, j-1, dim) + alpha*boor(pointsControle, ordre, noeuds, t, i, j-1, dim));//calcul des deux points précédant en appelant la fonction dans laquelle on se trouve
    }
}

function createBoor(pointsControle, degre, noeuds) {
    let x = 0;                         
    let y = 0;
    let taille = pointsControle.length;
    //mise en place des variables utiles par la suite

    if(taille>=3){//si la courbe ne comporte pas 3 points ignore la suite
        let courbe = [];
        //création du tableau lié à la courbe
        for(let t = 0; t<1;t=t+0.005){//le t variant de 0 à 1 dans l'équation de bernstein pour pouvoir créer chaque point
            for(let r = 0; r < noeuds.length; r++){
                if(t<noeuds[r+1] && t>noeuds[r]){
                    console.log(r);
                    x = boor(pointsControle, degre+1, noeuds, t, r, taille-1, "x");//appel de l'agorythme récursif de decasteljau sur x et y
                    y = boor(pointsControle, degre+1, noeuds, t, r, taille-1, "y");
                    courbe.push(new THREE.Vector3(x,y,0));//ajout des points à la courbe
                    r = noeuds.length;
                    
                }
            }
        }    
        console.log(courbe);    
        return courbe;//on retourne tous les points de la courbe
    }
    else {
        return "error";//retourne une erreur (utilisé pour du déboguage)
    }
}