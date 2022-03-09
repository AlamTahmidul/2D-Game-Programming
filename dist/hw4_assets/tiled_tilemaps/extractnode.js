const { EOF } = require('dns');
const { stdin } = require('process');

const testing = true;

if (!testing)
{
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
            // let id = ob[o].id;
            // console.log("ID: " + id + " / " + x + ", " + y);
            console.log(x + ", " + y);
            fs.appendFile('navmesh_custom.json', "[" + o + ", " + (++o) + "], ", err => {
                if (err) {
                    console.log("Error!");
                    return;
                }
            });
        }
    });
} else {
    // Testing Code
    // const arr = [    [1216, 1088],
    // [1024, 176],
    // [1344, 184],
    // [1936, 704],
    // [576, 128],
    // [896, 1088],
    // [1120, 800],
    // [1408, 1088],
    // [368, 960],
    // [176, 960],
    // [640, 176]
    // ];
    const fs = require('fs');
    fs.readFile('../data/navmesh_custom.json', 'utf8', (err, jsonString) => {
        if (err) return;
        let jsonData = JSON.parse(jsonString);
        let ob = jsonData["nodes"];
        // Get index of X and Y
        for (let xy in ob) {
        // console.log(val);
        if (ob[xy][0] == process.argv[2] && ob[xy][1] == process.argv[3]) {
            console.log(xy);
        }
    }
    });
}