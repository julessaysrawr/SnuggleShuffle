
/************************* APP LOCAL SCOPE *************************/
// IIFE that accepts jQuery and window objects for my local scope
(function($, window){


  /************************* ON PAGE LOAD *************************/
  // Once window has completed loading then run
  $(function() {

    /************************* BUILD OBJECT *************************/
    // Create my app object
    var MyApp = {};

    MyApp.key = config.apiKey;
    //call airtable API and store results
    MyApp.getAllStuffiesCallback = function (response) {
      var allStuffies = response.records;

      console.log(allStuffies);

      // addAllStuffiesToPage(allStuffies);

    }

    MyApp.randomize = function (rangeHigh) {
      var random = Math.floor((Math.random() * rangeHigh) + 1);
      // console.log("rangeHigh: " + rangeHigh);
      // console.log("random: " + random);
      return random;
    }


    return {
      MyApp.getAllStuffies = function () {
        $.ajax({
          url: 'https://api.airtable.com/v0/appszQifXur9SvmMJ/Master%20list?api_key=' + apiKey,
          success: getAllStuffiesCallback
        })
      },
    }




  })();

}($, window));
