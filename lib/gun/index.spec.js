const Server = require('./server');

const levelup = require('levelup')


describe('gun', () => {
  //it('should', (done) => {
    //var db = levelup('/tmp/liftit___'+new Date().getTime());

    //const server = new Server({
      //file: "/tmp/data.js",
      //level: db
    //});

    //server.get('test').put({
      //"foo": "bar",
    //});

    //server.get('test').on(function(data, key){
      //expect(key).toEqual("test");
      //expect(data.foo).toEqual("bar");

      //db.get('test', function(err, value) {
        //if(err) done(err);
        ////expect(value.foo).toEqual("bar");
        //done();
      //});
      ////don\e();
    //});
  //});

  it('should load levelup db', () => {
    return new Promise((resolve, reject) => {
      var db = levelup('/tmp/liftit___'+new Date().getTime());

      db.put("test2", JSON.stringify({"foo":"test2"}), function(err) {
        db.get("test2", function(err, value) {
          if(err) reject(err);
          expect(value).toEqual(JSON.stringify({"foo":"test2"}));

          const server = new Server({
            file: "/tmp/data",
            level: db
          });

          server.get("test2").put({
            "foo": "test2"
          });

          server.get("test2").val(function(data, key) {
            if(err) reject(err);
            try {
              expect(key).toEqual("test2");
              expect(data.foo).toEqual("test2");
              resolve();
            } catch(e) {
              reject(e);
            }
          }, {wait: 2000});
        });
      });
    });
  });

});
