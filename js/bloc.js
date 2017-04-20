class Bloc extends ObjetGraphique {
  constructor(x, y, couleur, vx, vy) {
    super(x, y, couleur, vx, vy);
    /*let vy = Math.random()*10+10;*/
    this.rayon = this.vx / 2;
    this.r_circ = this.vy / 2;
    this.light = [];
    this.light[0] = [];
    this.light[1] = [];
    this.light[2] = [];
    this.etat = true;
  }

  draw(ctx) {
    if (this.etat) {
      ctx.save(); // bonne pratique
      ctx.translate(this.x, this.y);
      /* Draw bloc */
      ctx.strokeStyle = 'white';
      //ctx.strokeRect(0, 0, this.vx, this.vy);

      /* Draw eclair */
      ctx.strokeStyle = this.couleur;
      //ctx.translate(0, this.vy/2);
      /*ctx.beginPath();
      ctx.arc(0, this.r_circ, this.r_circ, 0, 2 * Math.PI);
      ctx.fill();*/

      ctx.translate(this.vx, this.vy / 2);
      /*ctx.beginPath();
      ctx.arc(0, this.r_circ, this.r_circ, 0, 2 * Math.PI);
      ctx.fill();
      */
      let sparkChk = 3;
      let spark_origin = this.vy / 2;
      for (let i = 0; i < sparkChk; i++) {
        this.light[0][i] = Math.random() * this.vy - spark_origin;
        this.light[1][i] = Math.random() * this.vy - spark_origin;
        this.light[2][i] = Math.random() * this.vy - spark_origin;
      }

      this.light.forEach((element, index, any) => {
        ctx.beginPath();
        ctx.lineWidth = Math.random() * 3 + 1;
        //ctx.moveTo(this.x, this.y);
        ctx.moveTo(0, 0);
        element.forEach((val, index, any) => {
          ctx.lineTo(-(index + 1) * 2 * this.rayon / (element.length + 1), val);
        })
        ctx.lineTo(-2 * this.rayon, 0);
        ctx.stroke();
        //ctx.moveTo(this.x, this.y);
      });
      /**/
      ctx.restore();
    }
  }
}