var BasicCard = require("./BasicCard");
var fs = require("fs");
var moment = require("moment");
var timeStamp = moment().format();

var answersquestionText = "Yo dawg is it working?";
var answersanswerText = "Hey dawg I heard you already...";
                    
fs.readFile("./basic.json", "utf-8", function(err, data) {
                if (err) throw err;
                var arrayOfObjects = JSON.parse(data);
                console.log(arrayOfObjects);
                arrayOfObjects.basicDeck.push(
                  new BasicCard(
                    answersquestionText.toUpperCase(),
                    answersanswerText.toUpperCase()
                  )
                );
                fs.writeFile(
                  "./basic.json",
                  JSON.stringify(arrayOfObjects),
                  "utf-8",
                  function(err) {
                    if (err) throw err;
                  }
                );
             }); // end fs
