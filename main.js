var peterpansong="";
var harrypottersong="";
var scorerightwrist=0;
var scoreleftwrist=0;
var rightwristx=0;
var rightwristy=0;
var leftwristx=0;
var leftwristy=0;
var peterpansongstatus="";
var harrypottersongstatus="";

function preload() {
    peterpansong=loadSound("peterpan.mp3");
    harrypottersong=loadSound("harrypotter.mp3");
}

function setup() {
    var canvas=createCanvas(600,500);
    canvas.center();
    video=createCapture(VIDEO);
    video.hide();  
    posenet=ml5.poseNet(video,modelLoaded) ; 
    posenet.on("pose",gotposes);
}

function modelLoaded() {
    console.log("model is loaded you can continue this is the modelLoaded police congrats no ticket for you.");

}

function gotposes(results) {
    if (results.length>0) {
        console.log(results);
        scorerightwrist=results[0].pose.keypoints[10].score;
        scoreleftwrist=results[0].pose.keypoints[9].score;
        leftwristx=results[0].pose.leftWrist.x;
        leftwristy=results[0].pose.leftWrist.y;
        rightwristx=results[0].pose.rightWrist.x;
        rightwristy=results[0].pose.rightWrist.y;
    }
}

function draw() {
    image(video,0,0,600,500);
    fill("peach");
    stroke("peach");
    peterpansongstatus=peterpansong.isPlaying();
    harrypottersongstatus=harrypottersong.isPlaying();

    if (scoreleftwrist>0.2) {
        circle(leftwristx,leftwristy,20);
        harrypottersong.stop();
        if (peterpansongstatus==false){
            peterpansong.play();
            document.getElementById("songstatus").innerHTML="Peter Pan Song is playing right now."
        }
    }
    if (scorerightwrist>0.2) {
        circle(rightwristx,rightwristy,20);
        peterpansong.stop();
        if (harrypottersongstatus==false){
            harrypottersong.play();
            document.getElementById("songstatus").innerHTML="Harry Potter Song is playing right now."
        }
    }
}
function play() {
    song.play();
    song.setVolume(1);
    song.rate(1);
}