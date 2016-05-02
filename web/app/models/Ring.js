function Ring(array) {

  this.previous = function() {
  };

  this.next = function(value) {
    var idx = array.indexOf(value);
    return array[(idx + 1) % array.length];
  };
}

module.exports= Ring;
