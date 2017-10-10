// advanced api constructor
function ApiCard(id, name, distribution, slug, public, regions, created_at, min_disk_size, type, size_gigabytes ) {
  if (!(this instanceof ApiCard)) {
    return new ApiCard(id, name, distribution, slug, public, regions, created_at, min_disk_size, type, size_gigabytes);
  }
  // this.fullText = fullText;
  // this.partial = clozeText;
  this.id = id;
  this.name = name;
  this.distribution = distribution; 
  this.slug = slug; 
  this.public = public;
  this.regions = regions;
  this.created_at = created_at;
  this.min_disk_size = min_disk_size;
  this.type = type;
  this.size_gigabytes = size_gigabytes;          
  // this.cloze = fullText.replace(clozeText, "...");
}

module.exports = ApiCard;
