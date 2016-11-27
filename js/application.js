var apiKey = config.apiKey;

function getAllStuffies() {
  $.ajax({
    url: 'https://api.airtable.com/v0/appszQifXur9SvmMJ/Master%20list?api_key=' + apiKey,
    success: getAllStuffiesCallback
  })
}

function getAllStuffiesCallback(response) {
  // console.log("getAllStuffiesCallback");
  // console.log(response);

  var allStuffies = response.records;

  console.log(allStuffies);

  addAllStuffiesToPage(allStuffies);


}

function getCount(allStuffies){
    // console.log("Count of all Stuffies: " + allStuffies.length);
}

function getSnuggleCount(allStuffies){

}

function getMoralSupportCount(allStuffies) {

}

function getSnuggles(){
  $.ajax({
    url: 'https://api.airtable.com/v0/appszQifXur9SvmMJ/Master%20list?api_key=' + apiKey,
    success: getSnugglesCallback
  })
}

function getSnugglesCallback(response) {
  // console.log("getSnugglesCallback");
  // console.log(response);

  var allStuffies = response.records;
  var allSnuggles = [];
  var url = '';

  allStuffies.forEach(function(animal){
    if (animal.fields.Type[0] === "Snuggle"){
      // console.log("Moral support: " + animal.fields.Name);
      allSnuggles.push(animal);
    } else {
      // console.log("Snuggles: " + animal.fields.Name);
    }
  })

  // console.log("allSnuggles array contents");
  // console.log(allSnuggles);
  // console.log(allSnuggles.length);

  var selection = randomize(allSnuggles.length);
  var result = allSnuggles[(selection - 1)];

  if(result.fields.Attachments){
    url = result.fields.Attachments[0].url;
    console.log("Selection is: " + result.fields.Name);
    console.log("url: " + url);
    console.log(result);
  } else {
    console.log("****************** No photo available ******************");
  }

  addStuffyToPage(result.fields.Name, url);
}

function getMoralSupport(){
  $.ajax({
    url: 'https://api.airtable.com/v0/appszQifXur9SvmMJ/Master%20list?api_key=' + apiKey,
    success: getMoralSupportCallback
  })
}

function getMoralSupportCallback(response) {
  // console.log("getSnugglesCallback");
  // console.log(response);

  var allStuffies = response.records;
  var allMoralSupport = [];
  var url = '';

  allStuffies.forEach(function(animal){
    if (animal.fields.Type[0] === "Itty Bitty Moral Support Committee"){
      // console.log("Moral support: " + animal.fields.Name);
      allMoralSupport.push(animal);
    } else {
      // console.log("Snuggles: " + animal.fields.Name);
    }
  })

  // console.log("allSnuggles array contents");
  // console.log(allSnuggles);
  // console.log(allSnuggles.length);

  var selection = randomize(allMoralSupport.length);
  var result = allMoralSupport[(selection - 1)];

  if(result.fields.Attachments){
    url = result.fields.Attachments[0].url;
    console.log("Selection is: " + result.fields.Name);
    console.log("url: " + url);
    console.log(result);
  } else {
    console.log("****************** No photo available ******************");
  }

  addStuffyToPage(result.fields.Name, url);
}


function addStuffyToPage(name, url) {

  var $name = $('<h1 class="winner-name"></h1>');
  var $result = $('<div></div>');
  //clear previous winner
  // $('#winner').remove($name);
  // $('#winner').append($pic);

  //print new winner
  if(url === ''){
    //insert empty profile photo
    var $pic = $('<img class="winner-pic" src="images/cat_profile-512.png" alt="' + name + '"/>');
  } else {
    var $pic = $('<img class="winner-pic" src="' + url + '" alt="' + name + '"/>');
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
        console.log(name);
        var $pic = $('<img class="winner-pic" src="' + url + '" alt="' + name + '"/>');
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
  // console.log("rangeHigh: " + rangeHigh);
  // console.log("random: " + random);
  return random;
}
