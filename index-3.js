// declarations //
var nameinputenb = true;
var buttonpressenabled = false;
var shadowenabled = true;
var levelcounter = 1;
var currentrand = 0;
var butt = "";
var buttonlist = ["red","green","blue","yellow"];
var currentbutt = "";
var generatedlist = [];
var userpresslist = [];
var userpressslen = 0;
var generatedlen = 0;
var comparecounter = 0;
var mycheckbox = $("#mycheck");
///


///players
var playername = "";
var time = 0;
var score = 0;
var userplaying = false;
var startTime, endTime;
var playerlist = [];
var list = [];
///players

// event listener for the inputbox


$("form").click(function() {
  nameinputenb = false;
  userplaying = true;
})

$("form").keydown(function() {
  if ( $("#level-title").text()==="Game over. Press A Key to Start Over.") {
      $(".col4").css("background-color","grey");
  } else {
      $(".col4").css("background-color","#011F3F");
  }
  if (event.which === 13) {
    playername = $(".nameinputclass").val();
    if (playername!=="" && playername.includes(" ")==false) {
    if (playerlist.includes(playername) == false) {
      $(".col4").text("");
      $("table").append('<tr class="' +playername+ '"><td class="col1">' +playername+ '</td><td class="col2">' +time+ '</td><td class="col3">' +score+ '</td><td class="col4">' +'.'+ '</td></tr>');
      playerlist.push(playername);
      if ( $("#level-title").text()==="Game over. Press A Key to Start Over.") {
          $(".col4").css("background-color","grey");
      } else {
          $(".col4").css("background-color","#011F3F");
      }
    } else {
          $(".col4").text("");
          $("."+playername+" .col4").text(".");
    }
   }}})


// event listener for the checkbox
                                    //not sure if needed in the current version
mycheckbox.click(function() {
  if ($("#level-title").text()==="Press A Key to Start" || $("#level-title").text()==="Game over. Press A Key to Start Over."){
    $("#mycheck").attr("disabled",false);
  }else {
    $("#mycheck").attr("disabled",true);
  }
})


//functionality for the document keydown listener only when it's the first start or restart
$(document).click(function() {
  if ($(event.target).attr('class') === "nameinputclass") {
  nameinputenb=false;}
  else {
    nameinputenb=true;
  }
})
$(document).keydown(function(){
  if (nameinputenb===true) {
    start();
  if ($("#level-title").text()==="Press A Key to Start" || $("#level-title").text()==="Game over. Press A Key to Start Over."){
    if ($("#level-title").text()==="Game over. Press A Key to Start Over."){
        $("body").removeClass("game-over");

        generatedlist = [];
        userpresslist = [];
        comparecounter = 0;
        levelcounter = 1;
    }
    if ($("#mycheck").prop("checked")==true) {
        $(".checkboxinput").text("Shadow enabled");
        $(".checkbox-custom").css({"width": "0px","height": "0px","border": "0px"});
        $("#mycheck").attr("disabled",true);
        $("#mycheck").prop("checked",true);
        shadowenabled = true;
    } else {
    $("#mycheck").attr("disabled",true);
      shadowenabled = false;
      $(".checkboxinput").text("Shadow disabled");
      //$(".checkbox-label input").css("cursor","default");
    $(".checkbox-custom").css({"width": "0px","height": "0px","border": "0px"});}
    $("#level-title").text("Level 1");

    $("table").hide();
    $(".ranking-h3").hide();
    $("footer").hide();

    currentrand = Math.floor(Math.random()*4);
    generatedlist.push(currentrand);
    next_sequence(generatedlist);
    buttonpressenabled = true;
  }
}})

//functionality for the button click listeners when it's NOT the first start and restart

$("div.btn").click(function() {
  if (buttonpressenabled==true || shadowenabled == false) {
  var maintitle = $("#level-title").text()
  maintitle = maintitle.slice(0,5)
  if (maintitle==="Level"){
    userpresslist.push((event.target.id));
    userpresslen = userpresslist.length;
    generatedlen = generatedlist.length;
    if (userpresslist[userpresslen-1]===buttonlist[generatedlist[comparecounter]]){

      comparecounter ++;
      buttonpress(event.target.id);

      if (userpresslen === generatedlen){
        buttonpressenabled=false;
        score++;
        levelcounter++;
        comparecounter = 0;
        $("#level-title").text("Level " + levelcounter);
        currentrand = Math.floor(Math.random()*4);
        generatedlist.push(currentrand);
        generatedlen = generatedlist.length;
        if (shadowenabled===true) {
        setTimeout(function() {
          next_sequence(generatedlist);
        },600);}
          else {
              setTimeout(function() {
              next_sequence(generatedlist,generatedlist.length-1,1);
            },10);
          }
        userpresslen = 0;
        userpresslist = [];
        waittime = 900 + (generatedlist.length-1)*700;
        setTimeout(function() {
          buttonpressenabled=true;
        },waittime);
      }
    }
    else {
      buttonpress(event.target.id,true);
      $("body").addClass("game-over")
      $("#level-title").text("Game over. Press A Key to Start Over.");
      if (userplaying===true){

          $(".col4").css("background-color","grey");
          $(".col4").text("");
          var prevscore = $("."+playername+" .col2").text();
          if (score > prevscore) {
            $("."+playername+" .col2").text(score);
            $("."+playername+" .col3").text(end()+'s');
            prevscore = 0;
          }


          $("."+playername+" .col4").text(".");

          $("table").show()
          $("ranking-h3").show();
      }
      $("table").show();
      $("footer").show();
      score=0;
      $(".checkboxinput").text("Enable shadow");
      $(".checkbox-custom").css({"width": "24px","height": "24px","border": "2px solid white"});
      if ($("#mycheck").prop("checked")==true) {

          $("#mycheck").attr("disabled",false);
          $("#mycheck").prop("checked",true);

      } else {
      $("#mycheck").attr("disabled",false);}

    }

  }
}})

//creating the pattern

function next_sequence(generatedlist,key=0,timer=700) {
  if (timer===1) {
    for (let i=key; i<generatedlist.length; i++) {
        setTimeout( function timer(){
            buttonpress(buttonlist[generatedlist[i]]);
        }, 600 );
    };
  } else {
    for (let i=key; i<generatedlist.length; i++) {
        setTimeout( function timer(){
            buttonpress(buttonlist[generatedlist[i]]);
        }, i*timer );
    }
  }
}

//buttonpresses

function buttonpress(button,wrong=false) {
  console.log(button);
  $("."+button).addClass("pressed");
  if (wrong===true){
    var audio = new Audio("sounds/wrong.mp3" );
    audio.play();
  } else {
    var audio = new Audio("sounds/" + button + ".mp3" );
    audio.play();
  }
    setTimeout(function() {
      $("."+button).removeClass("pressed");
    }, 300);}



function start() {
  startTime = new Date();
};

function end() {
  endTime = new Date();
  var timeDiff = endTime - startTime; //in ms
  // strip the ms
  timeDiff /= 1000;

  // get seconds
  var seconds = Math.round(timeDiff);
  return seconds
}
