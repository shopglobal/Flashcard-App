// flashcard constructor
function FlashCard(front, back) {
  if (!(this instanceof FlashCard)) {
    return new FlashCard(front, back);
  }
  this.front = front;
  this.back = back;
}

module.exports = FlashCard;
