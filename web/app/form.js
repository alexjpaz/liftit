var Form = {};
Form.formatDateView = function(val) {
      return new Date(val).toISOString().slice(0,10);
};

Form.parseValue = function(e) {
  var value = e.target.value;

  if(e.target.type === "date") {
    var d = new Date(value);
    value = d.toISOString();
  }

  if(e.target.type === "number") {
    value = +value;
  }

  return value;
};
module.exports = Form;
