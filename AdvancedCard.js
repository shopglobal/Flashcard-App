// flashcard constructor
function AdvancedCard(front, back) {
  if (!(this instanceof AdvancedCard)) {
    return new AdvancedCard(front, back);
  }
  this.front = front;
  this.back = back;
}

module.exports = AdvancedCard;
