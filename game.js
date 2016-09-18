/**
 * Created by Ricky on 9/17/2016.
 */
var colorArray = ["#e60000", "#ffa500", "#ffff00", "#00e600",
    "#0cf", "#51b8e1", "#4d4dff", "#7300e6"];
var stage = new createjs.Stage("demoCanvas");
var currentNodes = [];
var score = 0;
var press = true;

function fadeInKey(key) {
    createjs.Tween.get(key, {loop: false})
        .to({alpha: .9}, 50, createjs.Ease.getPowInOut(2))
}
function showNote(line) {
    var notes = [];
    for (var i = 0; i < line.length; i++) {
        if (line[i] == 1) {
            var note = setup.makeNote(i, -400, i);
            stage.addChild(note);
            notes.push(note);
            currentNodes.push(note);
        }
    }

    return notes;
}
function moveNote(notes) {
    for (var i = 0; i < notes.length; i++) {
        createjs.Tween.get(notes[i], {loop: false})
            .to({y: 50}, 1000)
            .to({alpha: 0}, 100, createjs.Ease.getPowInOut(2)).call(function () {
            currentNodes.splice(currentNodes.indexOf(notes[i]), 1);
        });
    }
}

function sendNote(i) {
    var notes = showNote(song1[i]);
    moveNote(notes);
}

function keyUp(event) {
    switch (event.keyCode) {
        //65 = a
        case 65:
            fadeInKey(keyArray[0]);
            break;
        //83 = s
        case 83:
            fadeInKey(keyArray[1]);
            break;
        //68 = d
        case 68:
            fadeInKey(keyArray[2]);
            break;
        //70 = f
        case 70:
            fadeInKey(keyArray[3]);
            break;
        //74 = j
        case 74:
            fadeInKey(keyArray[4]);
            break;
        //75 = k
        case 75:
            fadeInKey(keyArray[5]);
            break;
        //76 = l
        case 76:
            fadeInKey(keyArray[6]);
            break;
        //186 = ;
        case 186:
            fadeInKey(keyArray[7]);
            break;
    }
    createjs.Ticker.setFPS(60);
    createjs.Ticker.addEventListener("tick", stage);
}

function fadeoutKey(key) {
    createjs.Tween.get(key, {loop: false})
        .to({alpha: .7}, 50, createjs.Ease.getPowInOut(2));
    for (var i = 0; i < currentNodes.length; i++) {
        if (currentNodes[i].x == key.x && currentNodes[i].y == key.y) {
            console.log("Exact");
            score += 2;
        }
        else if (currentNodes[i].x == key.x && currentNodes[i].y <= (key.y + 40) && currentNodes[i].y >= (key.y - 40)) {
            console.log("Close");
            score += 1;
        }
        else if (currentNodes[i].x == key.x) {
            //console.log("Same Col");
        }
    }
    document.getElementById("score").innerHTML = score;
}

function keyDown(event) {
    switch (event.keyCode) {
        //65 = a
        case 65:
            fadeoutKey(keyArray[0]);
            break;
        //83 = s
        case 83:
            fadeoutKey(keyArray[1]);
            break;
        //68 = d
        case 68:
            fadeoutKey(keyArray[2]);
            break;
        //70 = f
        case 70:
            fadeoutKey(keyArray[3]);
            break;
        //74 = j
        case 74:
            fadeoutKey(keyArray[4]);
            break;
        //75 = k
        case 75:
            fadeoutKey(keyArray[5]);
            break;
        //76 = l
        case 76:
            fadeoutKey(keyArray[6]);
            break;
        //186 = ;
        case 186:
            fadeoutKey(keyArray[7]);
            break;
        case 13:
            if (press) {
                var index = 0;
                var refreshIntervalId = window.setInterval(function () {
                    if (index >= song1.length) {
                        clearInterval(refreshIntervalId);
                        createjs.Sound.stop();
                        index = 0;
                    }
                    else {
                        sendNote(index);
                        index++;
                    }
                }, 200);

                playSound();
                press = false;
            }
            break;
        //13 = enter
    }
    createjs.Ticker.setFPS(60);
    createjs.Ticker.addEventListener("tick", stage);
}

var soundID = "tmp";
function playSound() {
    createjs.Sound.registerSound("Scott_Holmes_Paint_By_Numbers.mp3", soundID);
    createjs.Sound.addEventListener("fileload", handleFileLoad);
    function handleFileLoad() {
        createjs.Sound.play(soundID);
    }
}

function init() {
    setup.makeKeyLines();
    keyArray = setup.makeKeyButtons();
    stage.update();
    this.document.onkeydown = keyDown;
    this.document.onkeyup = keyUp;
}