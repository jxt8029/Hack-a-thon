/**
 * Created by Ricky on 9/17/2016.
 */

function makeKeyButtons() {
    var keyArray = [];
    for (i = 0; i < 8; i++) {
        var key = new createjs.Shape();
        key.graphics.beginFill(colorArray[i]).drawRect(10, 500, 80, 80);
        key.x = i * 90;
        key.y = 0;
        key.alpha = .9
        stage.addChild(key);
        keyArray.push(key);
    }
    return keyArray
}

function makeKeyLines() {
    for (i = 0; i < 8; i++) {
        var key = new createjs.Shape();
        key.graphics.beginFill("Black").drawRect(47.5, 10, 5, 600);
        key.x = i * 90;
        key.y = 0;
        stage.addChild(key);
    }
}
