/**
 * Created by Ricky on 9/17/2016.
 */

var setup = {

    makeNote: function (x, y, i) {
        var note = new createjs.Shape();
        note.graphics.beginFill(colorArray[i]).drawRect(10, 500, 80, 80);
        note.x = x * 90;
        note.y = y;
        note.alpha = .9;
        return note;
    },

    makeKeyButtons: function () {
        var keyArray = [];
        for (var i = 0; i < 8; i++) {
            var note = this.makeNote(i, 0, i);
            stage.addChild(note);
            keyArray.push(note);
        }
        return keyArray;
    },

    makeKeyLines: function () {
        for (var i = 0; i < 8; i++) {
            var key = new createjs.Shape();
            key.graphics.beginFill("Black").drawRect(47.5, 10, 5, 600);
            key.x = i * 90;
            key.y = 0;
            stage.addChild(key);
        }
    }
};
