(function($, window){

	var SnuggleShuffle =  (function(){

      var allStuffies = [];
      var apiKey = config.apiKey;
      config.apiKey = '';

      function getAllStuffiesCallback(response) {
        allStuffies = response.records;
        addAllStuffiesToPage(allStuffies);
      }

      function getSnugglesCallback(response) {
        var allStuffies = response.records;
        var allSnuggles = [];
        var url = '';

        allStuffies.forEach(function(animal){
          if (animal.fields.Type[0] === "Snuggle"){
            allSnuggles.push(animal);
          }
        })


        var selection = randomize(allSnuggles.length);
        var result = allSnuggles[(selection - 1)];

        if(result.fields.Attachments){
          url = result.fields.Attachments[0].url;
        }

        addStuffyToPage(result.fields.Name, url);
      }

      function getMoralSupportCallback(response) {
        var allStuffies = response.records;
        var allMoralSupport = [];
        var url = '';

        allStuffies.forEach(function(animal){
          if (animal.fields.Type[0] === "Itty Bitty Moral Support Committee"){
            allMoralSupport.push(animal);
          }
        });

        var selection = randomize(allMoralSupport.length);
        var result = allMoralSupport[(selection - 1)];

        if(result.fields.Attachments){
          url = result.fields.Attachments[0].url;
        }

        addStuffyToPage(result.fields.Name, url);
      }

      function addStuffyToPage(name, url) {

        var $name = $('<h3></h3>');
        var $result = $('<div></div>');
        //clear previous winner
        // $('#winner').remove($name);
        // $('#winner').append($pic);

        //print new winner
        if(url === ''){
          //insert empty profile photo
          var $pic = $('<img class="winner-pic" src="images/cat_profile-512.png" alt="' + name + '"/>');
        } else {
          var $pic = $('<img class="winner-pic img-rounded" src="' + url + '" alt="' + name + '"/>');
        }

        $name.append(name);
        $result.prepend($pic);
        $result.prepend($name);

        $('#results').html($result);


      }

      function addAllStuffiesToPage(allStuffies) {

        var $result = $('<div></div>');
        var $allStuffies = $('<ul class="all-stuffies"></ul>');


        allStuffies.forEach(function(animal){
          var name = animal.fields.Name;
          // $list.append('<li class="each-stuffy"><h1 class="each-stuffy-name">' + animal.fields.Name + '</h1></li>');


          // console.log("Name: " + name);
          // console.log("URL: " + url);
          // console.log("url" + animal.fields.Attachments.url);
            if(animal.fields.Attachments){
              //insert empty profile photo
              var url = animal.fields.Attachments[0].url;
              var $eachStuffy = $('<li class="each-stuffy"></li>');
              // console.log("Real URL: " + url);
              // var $pic = $('<img class="winner-pic" src="images/cat_profile-512.png" alt="' + animal.fields.Name + '"/>');
              // console.log(name);
              var $pic = $('<img class="winner-pic img-rounded" src="' + url + '" alt="' + name + '"/>');
              $eachStuffy.append($pic);
              $allStuffies.append($eachStuffy);
              // $list.append($stuffy);

            } else {
              // console.log("Empty URL: ");
              var $eachStuffy = $('<li class="each-stuffy"></li>');
              var $pic = $('<img class="winner-pic" src="images/cat_profile-512.png" alt="' + animal.fields.Name + '"/>');
              // $list.append('<li class="each-stuffy">' + $pic + '</li>');
              $eachStuffy.append($pic);
              $allStuffies.append($eachStuffy);
              // $list.append($stuffy);

            }
          // $list.append($pic);
          // $allStuffies.append($eachStuffy);

        });

        $result.append($allStuffies);
        $('#results').html($result);

      }

      function randomize(rangeHigh) {
        var random = Math.floor((Math.random() * rangeHigh) + 1);
        return random;
      }



		return {
      getAllStuffies: function(){
        $.ajax({
          url: 'https://api.airtable.com/v0/appszQifXur9SvmMJ/Master%20list?api_key=' + apiKey,
          success: getAllStuffiesCallback
        })
      },
      getSnuggles: function(){
        $.ajax({
          url: 'https://api.airtable.com/v0/appszQifXur9SvmMJ/Master%20list?api_key=' + apiKey,
          success: getSnugglesCallback
        })
      },
      getMoralSupport: function(){
        $.ajax({
          url: 'https://api.airtable.com/v0/appszQifXur9SvmMJ/Master%20list?api_key=' + apiKey,
          success: getMoralSupportCallback
        })
      }
		} // end return
	})();

  /********************* EVENTS **********************/
  $('#all-stuffies').click(function(){
    SnuggleShuffle.getAllStuffies();
  });

  $('#snuggles').click(function(){
    SnuggleShuffle.getSnuggles();
  });

  $('#moral-support').click(function(){
    SnuggleShuffle.getMoralSupport();
  });

  // $('#snuggle-shuffle').click(function(){
  //   $('#main-content').show( "shake", 700);
  //   // $('#main-content').slideToggle();
  // });



  // $('#all-stuffies').click(function(){
  //   $('#results').slideToggle();
  // });
  $(document).ready(function() {
    $('#snuggle-shuffle').show( "shake", 900);
    // $('#main-content').show( "scale", 900);
    // $('#snuggle-shuffle').slideToggle();
    // console.log("ready!");
  });


})($, window);


var SnuggleShuffle = {};
