 // create Advanced API flashcards------------------------------------------------
        "Create Advanced": function() {
          inquirer
            .prompt([
              {
                type: "input",
                message: "Enter id",
                name: "id",
              },
              {
                type: "input",
                message: "Enter name",
                name: "name"
              },
              {
                type: "input",
                message: "Enter distribution",
                name: "distribution"
              },
              {
                type: "input",
                message: "Enter slug",
                name: "slug"
              },
              {
                type: "input",
                message: "Enter public",
                name: "public"
              },
              {
                type: "input",
                message: "Enter regions",
                name: "regions"
              },
              {
                type: "checkbox",
                message: "Enter created_at",
                name: "created_at",
                choices: [
                new inquirer.Separator(' = The Time Created = '),
                {
                  name: timeStamp
                }]
              },
              {
                type: "input",
                message: "Enter min_disk_size",
                name: "min_disk_size"
              },
              {
                type: "input",
                message: "Enter type",
                name: "type"
              },
              {
                type: "input",
                message: "Enter size_gigabytes",
                name: "size_gigabytes"
              },
            ])
            .then(function(answers) {
              // if (answers.fullText.includes(answers.clozeText)) {
                fs.readFile("./apis.json", "utf-8", function(err, data) {
                  if (err) throw err;
                  console.log(answers.id);
                  var jsonId = JSON.parse(answers.id);
                  console.log(jsonId); // testing the above parse, it worked!
                  var jsPublic = JSON.parse(answers.public);
                  console.log(jsPublic); // testing the above parse, it worked!
                  // var jsMinDisk = JSON.parse(answers.min_disk_size); 
                  var jsMinDisk = parseFloat(answers.min_disk_size);
                  console.log(jsMinDisk); // testing the above parse, it may or may not require parseFloat, so I enabled it.
                  var jsSizeGb = parseFloat(answers.size_gigabytes);
                  console.log(jsSizeGb); // testing the above parse, it requires parseFloat.
                  var string = answers.regions;
                  var regionsArr = string.split(" ");
                  var regionsStr = String(regionsArr).toUpperCase().split(",");
                  console.log(regionsStr);
                  console.log(regionsArr);
                  answers.regions = regionsStr;
                  answers.public = jsPublic;
                  answers.id = jsonId;
                  answers.created_at = timeStamp;
                  answers.min_disk_size = jsMinDisk;
                  answers.size_gigabytes = jsSizeGb;
                  var arrayOfObjects = JSON.parse(data);
                  arrayOfObjects.apiDeck.push(
                    new ApiCard(
                      answers.id,
                      answers.name.toUpperCase(),
                      answers.distribution.toUpperCase(),
                      answers.slug.toUpperCase(),
                      answers.public,
                      answers.regions,
                      answers.created_at.toUpperCase(),
                      answers.min_disk_size,
                      answers.type.toUpperCase(),
                      answers.size_gigabytes
                    )
                  );
                  fs.writeFile(
                    "./apis.json",
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
                                "Would you like to test this api?",
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
              // } else lookup.logError();
            });
        },