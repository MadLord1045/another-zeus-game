// Syntaxe 1 : objet "singleton"
let monstre = {
  // propriétés
  x:100,
  y:100,
  width:100,
  height:100,
  v: 0,
  vx:0, // vitesse en x
  vy: 0, // vitesse en y
  couleurYeux: 'blue',
  couleurNez : 'red',
  couleurCorps: 'brown',
  
  // methodes
  move: function(x, y) {
      this.x = x;
      this.y = y;
  }, // ici une virgule !
  
  draw: function(ctx) {
      ctx.save();
  
      ctx.translate(this.x, this.y);
  
      // Le corps du monstre
      ctx.fillStyle = this.couleurCorps;
      ctx.fillRect(0, 0, this.width, this.height);

      // Les yeux
      ctx.fillStyle = this.couleurYeux;
      ctx.fillRect(20, 15, 10, 10);
      ctx.fillRect(68, 15, 10, 10);
  
      // Le nez
      ctx.fillStyle = this.couleurNez;
      ctx.fillRect(45, 30, 10, 30);
   
      ctx.restore();    
  } // ici pas de virgule !!!
}
