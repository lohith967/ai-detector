video = "";
status="";
object = [];

function preload(){
video=createVideo('video.mp4');
video.hide();
}


function setup(){
    canvas = createCanvas(500,380);
    canvas.center();
}



function draw(){
    image(video,0,0,500,380);
    if ( status != ""){
   objectDetector.detect(video,gotresults);
    }
    for ( var i = 0; i <object.length;i++){
        document.getElementById("status").innerHTML = "Status : detecting objects";
        document.getElementById("number_of_objects").innerHTML = "number of objects detected:"+object.length;

        fill("red");
        percent = floor(object[i].confidence * 100)
        text(object[i].label+" "+percent+ "%",object[i].x+15 ,object[i].y);
        noFill();
        stroke("red");
        rect(object[i].x,object[i].y,object[i].width,object[i].height);
    }
}

function start(){
    objectDetector = ml5.objectDetector('cocossd',modelloaded);
    document.getElementById("status").innerHTML = "Status : detecting objects";
}

function modelloaded(){
    console.log("ModelLoaded");
    status=true;
    video.loop();
    video.speed(1);
    video.volume(0);
}

function gotresults(error,results){
    if(error){
        console.log(error);
    }
    
        console.log(results);
        object = results;
    
}