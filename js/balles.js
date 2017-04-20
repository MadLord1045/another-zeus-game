class Balle extends ObjetGraphique {
  constructor(x, y, rayon, couleur, vx, vy) {
    // appel du constructeur hérité
    super(x, y, couleur, vx, vy);
    this.rayon = rayon;
    this.etats=["white","yellow","red"];
    this.etatCourant=0;
  }
  
  draw(ctx) {
    // Pour dessiner un cercle, faire comme ceci
    // j'explique après...
    ctx.save(); // bonne pratique
    ctx.translate(this.x, this.y);
    
    // On dessine en 0,0
    ctx.beginPath();
    ctx.arc(0, 0, this.rayon,
           0, 2*Math.PI);
    ctx.fillStyle = this.etats[this.etatCourant];
    ctx.fill();
    
    ctx.restore();
    
    // Appel de la méthode héritée
    
  }

  etatSuivant(){
    this.etatCourant++;
    if(this.etatCourant>2){
      return false;
    }
    return true;
  }

}