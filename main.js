var ClozeCard = require("./ClozeCard.js");
var BasicCard = require("./BasicCard");
var AdvancedCard = require("./AdvancedCard.js");
var inquirer = require("inquirer");
var fs = require("fs");
var moment = require("moment");
var timeStamp = moment().format();

var askQuestion = function() {
  inquirer
    .prompt([
      {
        type: "list",
        name: "doWhat",
        message: "What would you like to do ?",
        choices: ["Practice with a flashcard deck", "Create New Flashcards"]
      },
      {
        type: "list",
        message: "Which type of card(s) do you want to create?",
        name: "cardType",
        when: function(answers) {
          return answers.doWhat === "Create New Flashcards";
        },
        choices: ["Create Basic", "Create Advanced", "Create Cloze"]
      },
      {
        type: "list",
        message: "Practice with which flashcard deck?",
        name: "cardType",
        when: function(answers) {
          return answers.doWhat === "Practice with a flashcard deck";
        },
        choices: ["Basic Deck", "Advanced Deck", "Cloze Deck"]
      }
    ])
    .then(function(answers) {
      var action = answers.cardType;
      // used to include date/time information when writing to log file
      var currentdate = new Date();
      //-------------------------------------- main object ------------------------------------------------
      var lookup = {
        // text to be written as log entry header---------------------------------
        logTime:
          "Log entry created on " +
          currentdate.getDate() +
          "/" +
          (currentdate.getMonth() + 1) +
          "/" +
          currentdate.getFullYear() +
          " @ " +
          currentdate.getHours() +
          ":" +
          currentdate.getMinutes() +
          ":" +
          currentdate.getSeconds(),
        // if cloze statement is not contained in full text, throw/log error------
        logError: function() {
          console.log("cloze not contained in text, please try again: \n");
          fs.appendFile(
            "log.txt",
            lookup.logTime + "\ncloze not contained in text\n",
            function(error) {
              if (error) console.log("error");
              else lookup[action]();
            }
          );
        },
        //    "front": "+question+", "back": "+answer+
        // create basic flashcards------------------------------------------------
        "Create Basic": function() {
          inquirer
            .prompt([
              {
                type: "input",
                message: "Enter the question text",
                name: "questionText"
              },
              {
                type: "input",
                message: "Enter the answer text",
                name: "answerText"
              }
            ])
            .then(function(answers) {
              fs.readFile("./basic.json", "utf-8", function(err, data) {
                if (err) throw err;
                var arrayOfObjects = JSON.parse(data);
                arrayOfObjects.basicDeck.push(
                  new BasicCard(
                    answers.questionText.toUpperCase(),
                    answers.answerText.toUpperCase()
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
              });
              setTimeout(function() {
                inquirer
                  .prompt([
                    {
                      type: "list",
                      message: "Add another card?",
                      choices: ["Yes", "No"],
                      name: "addAnother"
                    }
                  ])
                  .then(function(answers) {
                    if (answers.addAnother === "Yes") {
                      lookup["Create Basic"]();
                    } else if (answers.addAnother === "No") {
                      inquirer
                        .prompt([
                          {
                            type: "list",
                            message:
                              "Would you like to practice with this deck?",
                            choices: ["Yes", "No"],
                            name: "practiceNow"
                          }
                        ])
                        .then(function(answers) {
                          if (answers.practiceNow === "Yes") {
                            lookup["Basic Deck"]();
                          } else if (answers.practiceNow === "No") {
                            process.exit(0);
                          }
                        });
                    }
                  });
              }, 500);
            });
        },
        // create cloze flashcards------------------------------------------------
        "Create Cloze": function() {
          inquirer
            .prompt([
              {
                type: "input",
                message: "Enter full text of statement",
                name: "fullText"
              },
              {
                type: "input",
                message: "Enter portion of text to be cloze deleted",
                name: "clozeText"
              }
            ])
            .then(function(answers) {
              if (answers.fullText.includes(answers.clozeText)) {
                fs.readFile("./cloze.json", "utf-8", function(err, data) {
                  if (err) throw err;
                  var arrayOfObjects = JSON.parse(data);
                  arrayOfObjects.clozeDeck.push(
                    new ClozeCard(
                      answers.fullText.toUpperCase(),
                      answers.clozeText.toUpperCase()
                    )
                  );
                  fs.writeFile(
                    "./cloze.json",
                    JSON.stringify(arrayOfObjects),
                    "utf-8",
                    function(err) {
                      if (err) throw err;
                    }
                  );
                });
                setTimeout(function() {
                  inquirer
                    .prompt([
                      {
                        type: "list",
                        message: "Add another card?",
                        choices: ["Yes", "No"],
                        name: "addAnother"
                      }
                    ])
                    .then(function(answers) {
                      if (answers.addAnother === "Yes") {
                        lookup["Create Cloze"]();
                      } else if (answers.addAnother === "No") {
                        inquirer
                          .prompt([
                            {
                              type: "list",
                              message:
                                "Would you like to practice with this deck?",
                              choices: ["Yes", "No"],
                              name: "practiceNow"
                            }
                          ])
                          .then(function(answers) {
                            if (answers.practiceNow === "Yes") {
                              lookup["Cloze Deck"]();
                            } else if (answers.practiceNow === "No") {
                              process.exit(0);
                            }
                          });
                      }
                    });
                }, 500);
              } else lookup.logError();
            });
        },
       // create advanced flashcards------------------------------------------------
        "Create Advanced": function() {
          inquirer
            .prompt([
              {
                type: "input",
                message: "Enter the question text",
                name: "questionText"
              },
              {
                type: "input",
                message: "Enter the answer text",
                name: "answerText"
              }
            ])
            .then(function(answers) {
              fs.readFile("./advanced.json", "utf-8", function(err, data) {
                if (err) throw err;
                var arrayOfObjects = JSON.parse(data);
                arrayOfObjects.advancedDeck.push(
                  new AdvancedCard(
                    answers.questionText,
                    answers.answerText
                  )
                );
                fs.writeFile(
                  "./advanced.json",
                  JSON.stringify(arrayOfObjects),
                  "utf-8",
                  function(err) {
                    if (err) throw err;
                  }
                );
              });
              setTimeout(function() {
                inquirer
                  .prompt([
                    {
                      type: "list",
                      message: "Add another card?",
                      choices: ["Yes", "No"],
                      name: "addAnother"
                    }
                  ])
                  .then(function(answers) {
                    if (answers.addAnother === "Yes") {
                      lookup["Create Advanced"]();
                    } else if (answers.addAnother === "No") {
                      inquirer
                        .prompt([
                          {
                            type: "list",
                            message:
                              "Would you like to practice with this deck?",
                            choices: ["Yes", "No"],
                            name: "practiceNow"
                          }
                        ])
                        .then(function(answers) {
                          if (answers.practiceNow === "Yes") {
                            lookup["Advanced Deck"]();
                          } else if (answers.practiceNow === "No") {
                            process.exit(0);
                          }
                        });
                    }
                  });
              }, 500);
            });
        },
        // practice: read from basic deck-----------------------------------------
        "Basic Deck": function() {
          console.log("Basic Deck Practice");
          fs.readFile("./basic.json", "utf-8", function(err, data) {
            if (err) throw err;
            var arrayOfObjects = JSON.parse(data);
            var count = 0;
            var tries = 0;
            play();

            function play() {
              if (count < arrayOfObjects.basicDeck.length) {
                inquirer
                  .prompt([
                    {
                      type: "input",
                      message: arrayOfObjects.basicDeck[count].front,
                      name: "question"
                    }
                  ])
                  .then(function(answers) {
                    if (
                      answers.question.toUpperCase() ===
                      arrayOfObjects.basicDeck[count].back.toUpperCase()
                    ) {
                      console.log("Correct!");
                      count++;
                      play();
                    } else {
                      if (tries < 1) {
                        console.log("Incorrect, please try again");
                        tries++;
                        play();
                      } else {
                        console.log(
                          "Incorrect! \nThe correct answer is: " +
                            arrayOfObjects.basicDeck[count].back
                        );
                        count++;
                        play();
                      }
                    }
                  });
              } else console.log("End of deck");
            }
          });
        },
        // practice: read from advanced deck-----------------------------------------
        "Advanced Deck": function() {
          console.log("Advanced API Practice");
          fs.readFile("./advanced.json", "utf-8", function(err, data) {
            if (err) throw err;
            var arrayOfObjects = JSON.parse(data);
            var count = 0;
            var tries = 0;
            play();

                      answers.id,
                      answers.name,
                      answers.distribution,
                      answers.slug,
                      answers.public,
                      answers.regions,
                      answers.created_at,
                      answers.min_disk_size,
                      answers.type,
                      answers.size_gigabytes


            function play() {
              if (count < arrayOfObjects.advancedDeck.length) {
                inquirer
                  .prompt([
                    {
                      type: "input",
                      message: arrayOfObjects.advancedDeck[count].front,
                      name: "question"
                    }
                  ])
                  .then(function(answers) {
                    if (
                      answers.question.toUpperCase() ===
                      arrayOfObjects.advancedDeck[count].back.toUpperCase()
                    ) {
                      console.log("Correct!");
                      count++;
                      play();
                    } else {
                      if (tries < 1) {
                        console.log("Incorrect, please try again");
                        tries++;
                        play();
                      } else {
                        console.log(
                          "Incorrect! \nThe correct answer is: " +
                            arrayOfObjects.advancedDeck[count].back
                        );
                        count++;
                        play();
                      }
                    }
                  });
              } else console.log("End of deck");
            }
          });
        },
        // practice: read from cloze deck-----------------------------------------
        "Cloze Deck": function() {
          console.log("Cloze Deck Practice");
          fs.readFile("./cloze.json", "utf-8", function(err, data) {
            if (err) throw err;
            var arrayOfObjects = JSON.parse(data);
            var count = 0;
            var tries = 0;
            play();

            function play() {
              if (count < arrayOfObjects.clozeDeck.length) {
                inquirer
                  .prompt([
                    {
                      type: "input",
                      message: arrayOfObjects.clozeDeck[count].cloze,
                      name: "question"
                    }
                  ])
                  .then(function(answers) {
                    if (
                      answers.question.toUpperCase() ===
                      arrayOfObjects.clozeDeck[count].partial.toUpperCase()
                    ) {
                      console.log("Correct!");
                      count++;
                      play();
                    } else {
                      if (tries < 1) {
                        console.log("Incorrect, please try again");
                        tries++;
                        play();
                      } else {
                        console.log(
                          "Incorrect! \nThe correct answer is: " +
                            arrayOfObjects.clozeDeck[count].partial
                        );
                        count++;
                        play();
                      }
                    }
                  });
              } else console.log("End of deck");
            }
          });
        }
      };
      // uses the answers from the INQUIRER section to call a function from the LOOKUP object
      lookup[action]();
    });
};
// initializes the app - INQUIRER prompt
askQuestion();
