class rain extends ObjetGraphique {
    constructor(x, y,maxHeight) {
        // appel du constructeur hérité
        let vy = Math.random() * 10 + 10;
        super(x, y, "white", 0, vy);
        this.maxHeight=maxHeight;
    }

    draw(ctx) {
        ctx.save();
        ctx.strokeStyle = "white";
        ctx.beginPath();
        ctx.moveTo(this.x, this.y);
        ctx.lineTo(this.x, this.y+20);
        ctx.stroke();
        ctx.restore();
    }

    move() {
        super.move();
        if (this.y > this.maxHeight)
            this.y = 0;
    }
}