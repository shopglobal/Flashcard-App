# Flashcard-Generator

### This application is a Node.js CLI application that allows a user to generate two different types of flashcard decks for the purposing of studying. Each new card added to a deck is created using a Javascript Constructor. The user can then practice with either deck.

#### The two types of flashcard decks:
  1. Basic Deck 
    * has a question on the front and answer on the back
    * Example - Front: "Who was the first president of the United States?"
    * Example - Back: "George Washington"
  2. Cloze Deck
    * has an partial statement on the front and the full statement on the back
    * Example - Front: "... was the first president of the United States."
    * Example - Back: "George Washington was the first president of the United States."

* The application runs in the Node.js command line interface.
* The application interacts with the user through the *Inquirer.js* NPM Library.
* Each user interaction is time-stamped and committed to a Log file via the Node FS Module.



