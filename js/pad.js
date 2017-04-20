class Pad extends ObjetGraphique {
    constructor(x, y, couleur, vx, vy,width,height) {
        // appel du constructeur hérité
        super(x, y, couleur, vx, vy);
        this.width= width;
        this.height= height;
    }
    move() {
        this.x += this.vx;
    }
    draw(ctx,width) {

        ctx.save();
        ctx.fillStyle = "white";
        ctx.fillRect(0, this.y, this.x, this.height);
        ctx.fillRect(this.x+this.width, this.y, width-this.x-this.width, this.height);
        ctx.restore();
        /*
        // Pour dessiner un cercle, faire comme ceci
        // j'explique après...
        ctx.save(); // bonne pratique
        ctx.translate(this.x, this.y);

        // On dessine en 0,0
        ctx.fillStyle = this.couleur;
        ctx.fillRect(0, 0, this.width, this.height);
        */
        ctx.restore();

    }
}