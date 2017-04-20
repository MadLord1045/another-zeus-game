window.onload = init;
let game;
let canvas, divcanvas;

function init() {
    //console.log("Init OK!");

    canvas = document.querySelector("#myCanvas");
    divcanvas = document.querySelector("#parentDiv");

    game = new Game();
    game.start();

    // Add an event listener for the window resize event
    window.addEventListener('resize', resizeCanvasAccordingToParentSize, false);
}

function resizeCanvasAccordingToParentSize() {
    // adjust canvas size, take parent's size, this erases content
    canvas.width = divcanvas.clientWidth;
    canvas.height = divcanvas.clientHeight;
}

function Game() {
    let canvas;
    let ctx;
    let width;
    let height;

    let tableauxDesBalles = [];
    let tableauDesRains = [];
    let level = 1;
    let status = "standby";
    let score = 0;
    let combo = 1;
    let pad;
    let special=true;

    let w_bloc = 55;
    let h_bloc = 20;
    let nbRow = 7;
    let nbCol = 8;
    let tableauxDeBlocs = [];
    let colors = ['darkred', 'purple', 'darkslateblue', 'darkblue', 'teal', 'seagreen', 'forestgreen'];
    let spark;

    let thunder;

    let sound = [];

    let creerLesBlocs = () => {
        //console.log("creerLesBlocs OK!");
        let x = 5, y = 5;
        let space = 5;
        for (var i = 0; i < colors.length; i++) {
            tableauxDeBlocs.push([]);
            for (var c = 0; c < nbCol; c++) {
                let b = new Bloc(x, y, colors[i], w_bloc, h_bloc);
                tableauxDeBlocs[i].push(b);
                x += space + w_bloc;
            }
            x = 5;
            y += space + h_bloc;
        }
        //console.log(tableauxDeBlocs);
    }

    let dessinerLesBlocs = (ctx) => {
        // console.log("dessinerLesBlocs OK!");
        tableauxDeBlocs.forEach(function (b, index, tab) {
            b.forEach(function (item, i, tb) {
                // console.log("block: " +tb);
                // item.vx = (canvas.width - 40)/8;
                item.draw(ctx);
            });
        });
    }

    let testerCollisionBlocAvecBalles = (b, index) => {
        //console.log("Method: testerCollisionBlocAvecBalles");

        tableauxDeBlocs.forEach(function (ligne, l, tab) {
            ligne.forEach(function (bloc, i, any) {
                // console.log('Etat : ' + bloc.etat);
                if (bloc.etat) {
                    if (circRectsOverlap(bloc.x, bloc.y, bloc.vx, bloc.vy,
                        b.x, b.y, b.rayon)) {
                            playSound("ball_touch_bloc");
                        // console.log("collision Bloc");
                        if (b.x > bloc.x && b.x < bloc.x + bloc.vx)
                            b.vy = -b.vy;
                        if (b.y > bloc.y && b.y < bloc.y + bloc.vy)
                            b.vx = -b.vx;
                        if (b.etatCourant == 2) {
                            tableauxDesBalles.splice(index, 1);
                        }
                        bloc.etat = false;
                    }
                }
            });
        });
    }

    let creerDesBalles = (nbBalles) => {

        for (let i = 0; i < nbBalles; i++) {
            let rayon = 2 + Math.random() * 10; // rayon entre 2 et 12
            let bool = (Math.trunc(rayon) % 2 == 0) ? 0 + rayon : canvas.width - rayon;
            let x = bool; // Math.random() renvoie un nombre entre 0 et 1
            let y = 200; // Math.random() * height;


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
                //console.log('BALLE NON CREE CAR SUR JOUEUR')
            }
        }
    }//*/

    let standby = (ctx) => {
        // displayMessage(ctx, "Niveau " + level + " appuyer sur 'espace' pour commencer");
        displayMessage(ctx, "Appuyer sur 'espace' pour commencer");
        dessinerEtDeplacerLesBalles();
    }

    let update = (ctx) => {
        //console.log('Method: update');

        dessinerEtDeplacerLesBalles();
        if (score > 0) {
            message = "Score : " + score;
            displayScore(ctx, message);
        }

        if (combo > 1) {
            message = "Combo : " + (combo-1);
            displayScore(ctx, message,20+width/3);
        }
        if (special) {
            message = "'Espace' pour appeler la foudre !!!";
            displayMessage(ctx, message,0,pad.y+40+pad.height);
        }
        
            message = "Niveau : " + level;
            displayScore(ctx, message,width*3/4);
        
        /*
        if (score % 10 == 0 && score != 0) {
            level++;
        }//*/

        if(score>level*200){
            special=true;
            level++;
        }
        testerCollisionJoueurAvecBalles();
    }

    let stopGame = (ctx) => {
        displayMessage(ctx, "Game Over, 'R' pour recommencer");
        dessinerEtDeplacerLesBalles();
    }

    let initLevel = () => {
        pad.x = width / 2;
        pad.y = height - 100;
        tableauxDesBalles = [];
        tableauxDeBlocs = [];
        level=1;
        combo=1;
        special=true;
        //creerDesBalles(10);
        creerLesBlocs();
        score = 0;
        //console.log("initLevel called");
    }

    let testerCollisionJoueurAvecBalles = () => {
        // console.log("Method: testerCollisionJoueurAvecBalles");

        tableauxDesBalles.forEach(function (b, index, tab) {

            if (circRectsOverlap(0, pad.y, pad.x, 1, b.x, b.y, b.rayon)
                || circRectsOverlap(pad.x + pad.width, pad.y, width - (pad.x + pad.width), 1, b.x, b.y, b.rayon)
            ) {
                combo=1;
                //console.log("collision Joueur");
                playSound("pad_touch_ball");
                b.vy = -b.vy;
                if (!b.etatSuivant())
                    tableauxDesBalles.splice(index, 1);
            }
        });
    }

    let dessinerEtDeplacerLesBalles = () => {
        // console.log('Method: dessinerEtDeplacerLesBalles');

        tableauxDesBalles.forEach(function (b, index, tab) {
            b.draw(ctx);
            if (status == "inGame") b.move();
            testeCollisionBalleAvecMurs(b, index);
            testerCollisionBlocAvecBalles(b, index);
        });
    }

    let testeCollisionBalleAvecMurs = (b, index) => {
        // console.log('Method: testeCollisionBalleAvecMurs');

        if (((b.x + b.rayon) > width) || ((b.x - b.rayon) < 0)) {
            b.vx = -b.vx;
        }
        // Haut
        if (((b.y - b.rayon) < 0)) {
            status = 'dead';
        }
        // Bas
        if ((b.y + b.rayon) > pad.y+pad.height) {
            score+=10*combo;
            combo++;
            tableauxDesBalles.splice(index, 1);
        }
    }

    let displayMessage = (ctx, message,posx,posy) => {
        if (message != null) {
            let fontSize = 20;
            ctx.save();
            ctx.font = fontSize + 'px Courier';
            ctx.fillStyle = 'white';
            ctx.fillText(message, (posx)?posx:20, (posy)?posy:height / 2);
            ctx.restore();
        }
    }

    let displayScore = (ctx, message,pos) => {
        if (message != null) {
            let fontSize = 20;
            ctx.save();
            ctx.font = fontSize + 'px Courier';
            ctx.fillStyle = 'white';
            ctx.fillText(message, (pos)?pos:20, height - 20);
            ctx.restore();
        }
    }

    let playSound = (toPlay) => {

        sound[toPlay].play(toPlay);
    }

    let timeOutFunction = () => {
        creerDesBalles(1);
        if (status == "inGame") {
            setTimeout(timeOutFunction, Math.trunc(3000/level));
        }
    }

    let setStatus = (newStatus) => {
        status = newStatus;
        if (newStatus == "inGame") {
            setTimeout(timeOutFunction, 3000);
        }
    }

    let getStatus = () => {
        return status;
    }

    let getCanvas = () => {
        return canvas;
    }

    let setPadPosition = (mx) => {
        pad.x = mx;
    }

    // ICI BOUCLE D'animation à 60 images/s
    let mainLoop = (time) => {
        measureFPS(time);

        // 1 - on efface le contenu du canvas
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.save();
        ctx.fillStyle = "black";
        ctx.fillRect(0, 0, width, height);
        ctx.restore();
        tableauDesRains.forEach((item, index, any) => {
            item.move();
            item.draw(ctx);
        });

        pad.draw(ctx, width);

        dessinerLesBlocs(ctx);

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
        thunder.draw(ctx);

        requestAnimationFrame(mainLoop);//
    }

    // PROGRAMME PRINCIPAL
    let start = () => {
        //console.log("start enter!");
        initFPS();

        canvas = document.querySelector("#myCanvas");
        this.canvas = canvas;

        width = canvas.width;
        height = canvas.height; // pratique de les avoir globaux
        ctx = canvas.getContext('2d');

        pad = new Pad(width / 2, height - 100, "black", 0, 0, 100, 10)
        thunder = new Thunder(0.7,width,height);
        creerLesEcouteurs();

        initLevel();
        creerRain(200);
        initSound();

        requestAnimationFrame(mainLoop);
    }

    let creerRain = (n) => {
        for (let i = 0; i < n; i++) {
            let x = Math.random() * width;
            let y = Math.random() * height;
            tableauDesRains[i] = new rain(x, y, height);
        }
    }

    let initSound = () => {
        sound["call1"] = new Howl({
            src: ['sounds/call1.mp3'],
            sprite: {
                call1: [0, 5000]
            },
            onload: function () { console.log("call1 loaded"); }
        });
        sound["call2"] = new Howl({
            src: ['sounds/call2.mp3'],
            sprite: {
                call2: [0, 6000]
            },
            onload: function () { console.log("call2 loaded"); }
        });
        sound["pad_touch_ball"] = new Howl({
            src: ['sounds/pad_touch_ball.mp3'],
            sprite: {
                pad_touch_ball: [0, 1000]
            },
            onload: function () { console.log("pad_touch_ball loaded"); }
        });
        sound["ball_touch_bloc"] = new Howl({
            src: ['sounds/ball_touch_bloc.mp3'],
            sprite: {
                ball_touch_bloc: [0, 3000]
            },
            onload: function () { console.log("ball_touch_bloc loaded"); }
        });
    }

    let thunderGod= ()=>{
        if(!special)
            return;
        let rand=Math.trunc(Math.random()*2)%2;
        if(rand==0){
            playSound("call1");
        }
        else
            playSound("call2");
        thunder.opacity=0.7;
        let revive=2*level;
        for(let i=0;i<tableauxDeBlocs.length && revive>0;i++){
            for(let j=0;j<tableauxDeBlocs[i].length && revive>0;j++){
            console.log("je passe");
                
                if(!tableauxDeBlocs[i][j].etat){
                    console.log("je passe");
                    tableauxDeBlocs[i][j].etat=true;
                    revive--;
                }

            }
        }
        special=!special;
        tableauxDesBalles=[];


    }


    // API du moteur de game
    return {
        start: start,
        getStatus: getStatus,
        setStatus: setStatus,
        initLevel: initLevel,
        getCanvas: getCanvas,
        setPadPosition: setPadPosition,
        callThunder: thunderGod
    }
}