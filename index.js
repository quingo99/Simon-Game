var gamePattern = []
var playerPattern;
var buttonColor = ["red", "blue", "green", "yellow"];
var soundBlue = new Audio('sounds/blue.mp3');
var soundGreen = new Audio('sounds/green.mp3');
var soundRed = new Audio('sounds/red.mp3');
var soundYellow = new Audio('sounds/yellow.mp3');
var soundWrong = new Audio('sounds/wrong.mp3');
var count;
var playerPlaying = true;
var restart = false;


$(document).on("keypress", function(){
    if(playerPlaying == true){
        $("h1").text("Level: " + (gamePattern.length + 1))
        count = 0;
        nextSequence();
    }
    else{
        if(restart){
            soundWrong.play();
            $("body").addClass("game-over");
            setTimeout(function(){
                $("body").removeClass("game-over");
            }, 200);
            $("h1").text("You lose at level " + (gamePattern.length + 1) + " press any key to reset");
            playerPlaying = false;
            restart = false;
        }
        
        gamePattern = []
        playerPlaying = true;
        $("h1").text("Press a key to start");
        
        
    }
        
        
});

$("div.btn").on("click", function(){
    playerPattern = this.id;
    console.log(playerPattern);
    console.log(gamePattern[count]);
    playerEffect();
    count++;
    if(count == gamePattern.length && count != 0){
        playerPlaying = true;
        $("h1").text("Press a key to move the next level");

    }
    
    

});

function nextSequence(){
    var slot = Math.floor(Math.random() * 3) + 1;
   
    gamePattern.push(buttonColor[slot]);
    
    var i = 0;
    
    musicEffect(i);
    playerPlaying = false;
    restart = true;
}

function playingSound(sound){
    switch(sound){
        case 'blue':  return soundBlue; 
        case 'green': return soundGreen; 
        case 'red': return soundRed;
        case 'yellow': return soundYellow; 
    }
}

function musicEffect(i){
      
        if(i == gamePattern.length)
            return;
        var sound = playingSound(gamePattern[i])
        setTimeout(function(){
            sound.play();
        }, 300);
        $("#"+gamePattern[i])
        $("#"+gamePattern[i]).fadeOut(300).fadeIn(300);
        $("#"+gamePattern[i]).promise().done(function(){
            i++;
            musicEffect(i);
        })
       
};

function playerEffect(){
    if (playerPattern == gamePattern[count]){
        var sound;
        //$("#"+playerPattern).fadeOut(200).fadeIn(200);
        $("#"+playerPattern).addClass("pressed");
        setTimeout(function(){
            $("#"+playerPattern).removeClass("pressed");
        }, 150)
        sound = playingSound(playerPattern);
        sound.play();
    }
    else{
        soundWrong.play();
        $("body").addClass("game-over");
        setTimeout(function(){
            $("body").removeClass("game-over");
        }, 200);
        $("h1").text("You lose at level " + (gamePattern.length + 1) + " press any key to reset");
        playerPlaying = false;
        restart = false;
        count--;
    }

}