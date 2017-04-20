class Spark extends ObjetGraphique {
    constructor(x, y, couleur, rayon) {
        // appel du constructeur hérité
        let vy = Math.random() * 10 + 10;
        super(x, y, couleur, 0, 0);
        this.rayon = (rayon) ? rayon : 50;
        this.light = [];
        this.light[0] = [];
        this.light[1] = [];
        this.light[2] = [];

    }

    draw(ctx) {
        ctx.save();
        ctx.fillStyle = this.couleur;
        ctx.strokeStyle = this.couleur;
        ctx.translate(this.x - this.rayon, this.y);
        ctx.beginPath();
        ctx.arc(0, 0, 10, 0, 2 * Math.PI);
        ctx.fill();
        ctx.translate(this.rayon * 2, 0);
        ctx.beginPath();
        ctx.arc(0, 0, 10, 0, 2 * Math.PI);
        ctx.fill();
        let sparkChk = 3;
        for (let i = 0; i < sparkChk; i++) {
            this.light[0][i] = Math.random() * 26 - 13;
            this.light[1][i] = Math.random() * 26 - 13;
            this.light[2][i] = Math.random() * 26 - 13;
        }

        this.light.forEach((element, index, any) => {
            ctx.beginPath();
            ctx.lineWidth = Math.random()*3+1;
            //ctx.moveTo(this.x, this.y);
            ctx.moveTo(0, 0);
            element.forEach((val, index, any) => {
                ctx.lineTo(-(index + 1) * 2 * this.rayon / (element.length + 1), val);
            })
            ctx.lineTo(-2 * this.rayon, 0);
            ctx.stroke();
            //ctx.moveTo(this.x, this.y);
        });
        ctx.restore();
    }
}