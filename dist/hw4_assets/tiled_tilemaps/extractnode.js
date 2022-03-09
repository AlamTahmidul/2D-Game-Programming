const fs = require('fs');

fs.readFile('./hw4_tilemaps_custom.json', 'utf8', (err, jsonString) => {
    if (err) {
        console.log("Fail!");
        return;
    }
    // console.log(jsonString);
    let jsonData = JSON.parse(jsonString);
    let ob = jsonData["layers"][1].objects;
    // console.log(ob);
    for (let o in ob) {
        let x = ob[o].x;
        let y = ob[o].y;
        console.log("" + x + ", " + y);
    }

});