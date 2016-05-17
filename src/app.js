var App = (function () {

  var router = new Router();


  return {
    run: run
  };

  //////////////////////////////////
  function run() {
     router.activate();
  }
});

var app = new App();
app.run();