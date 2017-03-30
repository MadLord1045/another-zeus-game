window.onload = init;
let game;
//let canvas;

function init() {
    //canvas = document.querySelector("#myCanvas");
    game = new Game();
    game.start();
}

function Game() {

    let canvas;
    let ctx;
    let width;
    let height;

    let tableauxDesBalles = [];
    let level = 1;
    let status = "standby";
    let score = 0;
    let pad;



    let creerDesBalles = (nbBalles) => {
        for (let i = 0; i < nbBalles; i++) {
            let x = Math.random() * width; // Math.random() renvoie un nombre entre 0 et 1
            let y = Math.random() * height;
            let rayon = 2 + Math.random() * 10; // rayon entre 2 et 12            

            /*if (B % 2 == 0)
              couleur = "rgb(" + 255 + "," + 0 + "," + 0 + ")";//*/
            let vx = 1 + Math.random() * 5; // entre 1 et 5
            let vy = 1 + Math.random() * 5;

            let b = new Balle(x, y, rayon, "couleur", vx, vy);
            if (b.y < pad.y - 100) {
                // pas de collision
                // // on la rajoute au tableau des balles
                tableauxDesBalles.push(b);
            } else {
                // on décrémente i pour "annuler" ce tour
                // de boucle
                i--;
                console.log('BALLE NON CREE CAR SUR JOUEUR')
            }
        }
    }//*/


    let mainLoop = (time) => {
        measureFPS(time);
        //console.log(this);
        ctx.clearRect(0, 0, width, height);
        ctx.save();
        ctx.fillStyle="white";
        ctx.fillRect(0,height-100,width,20);
        ctx.restore();
        pad.draw(ctx);
        switch (status) {
            case "standby":
                standby(ctx);
                break;

            case "inGame":
                update(ctx);
                break;

            case "dead":
                stopGame(ctx);
                break;

            default:
                break;
        }//*/

        //testeCollisionMonstreAvecMurs();
        
        requestAnimationFrame(mainLoop);//
    }

    let standby = (ctx) => {
        displayMessage(ctx, "Niveau " + level + " appuyer sur 'espace' pour commencer");
        dessinerEtDeplacerLesBalles();

    }

    let update = (ctx) => {
        dessinerEtDeplacerLesBalles();
        if (score > 0) {
            message = "Score : " + score;
            displayMessage(ctx, message);
        }
        testerCollisionJoueurAvecBalles();

    }

    let stopGame = (ctx) => {
        displayMessage(ctx, "Vous êtes mort appuyer sur 'espace' pour recommencer");
        dessinerEtDeplacerLesBalles();
    }

    let initLevel = () => {
        pad.x = width / 2;
        pad.y = height - 100;
        tableauxDesBalles = [];
        //creerDesBalles(10);
        score = 0;
        console.log("called");
    }

    let testerCollisionJoueurAvecBalles = () => {
        tableauxDesBalles.forEach(function (b, index, tab) {

            if (circRectsOverlap(0, pad.y,
                pad.x, 1,
                b.x, b.y, b.rayon)
                ||
                circRectsOverlap(pad.x + pad.width, pad.y,
                    width - (pad.x + pad.width), 1,
                    b.x, b.y, b.rayon)
            ) {
                console.log("collision");
                b.vy = -b.vy;
                if (!b.etatSuivant()) {
                    tableauxDesBalles.splice(index, 1);
                }
            }
        });

    }

    let dessinerEtDeplacerLesBalles = () => {

        tableauxDesBalles.forEach(function (b, index, tab) {
            b.draw(ctx);
            if (status == "inGame")
                b.move();
            testeCollisionBalleAvecMurs(b,index);
        });
    }

    let testeCollisionBalleAvecMurs = (b,index) => {
        if (((b.x + b.rayon) > width) || ((b.x - b.rayon) < 0)) {
            b.vx = -b.vx;

        }
        if (((b.y - b.rayon) < 0)) {
            b.vy = -b.vy;
        }

        if ((b.y + b.rayon) > height) {
            score++;
            tableauxDesBalles.splice(index, 1);
        }
    }
    let testeCollisionMonstreAvecMurs = () => {
        if ((monstre.x + monstre.width) > canvas.width) {
            monstre.x = canvas.width - monstre.width;
            monstre.v = -monstre.v;
        } else if (monstre.x < 0) {
            monstre.x = 0;
            monstre.v = -monstre.v;
        }
    }

    let displayMessage = (ctx, message) => {
        if (message != null) {
            let fontSize = 20;
            ctx.save();
            ctx.font = fontSize + 'px Courier';

            ctx.fillText(message, 150, 40);
            ctx.restore();
        }
    }

    let timeOutFunction=()=>{
        creerDesBalles(1);
        if(status=="inGame"){
            setTimeout(timeOutFunction, 3000/level);
        }
    }

    let setStatus = (newStatus) => {
        status = newStatus;
        if(newStatus=="inGame"){
            setTimeout(timeOutFunction, 3000/level);
        }
    }

    let getStatus = () => {
        return status;
    }

    let start = () => {
        console.log("la page est chargée");
        initFPS();
        canvas = document.querySelector("#myCanvas");
        this.canvas = canvas;
        console.log(canvas);
        // console.log(canvas);
        width = canvas.width;
        height = canvas.height; // pratique de les avoir globaux
        ctx = canvas.getContext('2d'); // autre possibilité 'webgl' pour la 3D
        // creerDesBalles(10);
        pad = new Pad(width / 2, height - 100, "grey", 0, 0, 100, 20)

        creerLesEcouteurs();

        initLevel();
        requestAnimationFrame(mainLoop);
    }

    let getCanvas = () => {
        return canvas;
    }

    let setPadPosition = (mx) => {
        pad.x = mx;
    }

    return {
        start: start,
        getStatus: getStatus,
        setStatus: setStatus,
        initLevel: initLevel,
        getCanvas: getCanvas,
        setPadPosition: setPadPosition
    }


}