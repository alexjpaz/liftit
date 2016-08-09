var Form = {};
Form.formatDateView = function(val) {
      return new Date(val).toISOString().slice(0,10);
};
module.exports = Form;
