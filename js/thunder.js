
class Thunder {
    constructor(opacity,width,height) {
        this.opacity = opacity;
        this.width = width;
        this.height = height;

    }


    draw(ctx) {
        if (this.opacity <= 0)
            return;
        ctx.save();
        ctx.fillStyle = 'white';
        ctx.globalAlpha = this.opacity;
        ctx.fillRect(0, 0, this.width, this.height);
        ctx.restore;
        ctx.globalAlpha = 1.0;
        //console.log(this.opacity);
        this.opacity-=0.01;
    }
}
