// cloze constructor
function ClozeCard(fullText, clozeText) {
  if (!(this instanceof ClozeCard)) {
    return new ClozeCard(fullText, clozeText);
  }
  this.fullText = fullText;
  this.partial = clozeText;
  this.cloze = fullText.replace(clozeText, "...");
}

module.exports = ClozeCard;
