status= "";
word= "";
objects= [];
function setup(){
canvas = createCanvas(480, 380);
canvas.center();
video= createCapture(VIDEO);
video.size(480, 380);
video.hide();
}
function start(){
objectDetector= ml5.objectDetector("cocossd", modelLoaded);
document.getElementById("status").innerHTML= "status: Detecting Objects";
word= document.getElementById("word").value;
}
function modelLoaded(){
console.log("modelLoaded");
status=true;
}
function draw(){
    image(video, 0, 0, 480, 380);
    if(status != ""){
    objectDetector.detect(video, gotResults);
    for(i=0;i<objects.length;i++){
    document.getElementById("status").innerHTML= "Status: Objects Detected";
    fill("#ff0000");
    percent=floor(objects[i].confidence*100);
    text(objects[i].label+" " + percent + "%", objects[i].x+15, objects[i].y+15);
    noFill();
    stroke("#ff0000");
    rect(objects[i].x, objects[i].y, objects[i].width, objects[i].height);
    if(objects[i].label==word){
        document.getElementById("number_of_objects").innerHTML= "Object Found: " + word;
    }
    else{
    document.getElementById("number_of_objects").innerHTML= "Object Not Found: " + word;
    }
    }
    }
    }
    function gotResults(error, results){
    if(error){
    console.log(error);
    }
    console.log(results);
    objects= results;
    }