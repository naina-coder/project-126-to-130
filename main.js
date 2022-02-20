song = "";

scoreRightWrist = 0;
scoreLeftWrist = 0;

left_wristX = 0;
left_wristY = 0;

right_wristX = 0;
right_wristY = 0;


function preload()
{
    song = loadSound("music.mp3");

}

function setup()
{
    canvas = createCanvas(600,500);
    canvas.center();
    video = createCapture(VIDEO);
    video.hide();

poseNet = ml5.poseNet(video, modelLoaded);
poseNet.on('pose', gotPoses);



}


function modelLoaded()
{
    console.log("PoseNet is Intialized.");
}

function gotPoses(results)
{
    if(results.length > 0)
    {
        console.log(results);

        right_wristX = results[0].pose.rightWrist.x;
        right_wristY = results[0].pose.rightWrist.y;
        left_wristX = results[0].pose.leftWrist.x;
        left_wristY = results[0].pose.leftWrist.y;

        scoreLeftWrist = results[0].pose.keypoints[9].score;
        scoreRightWrist = results[0].pose.keypoints[10].score;

      console.log("Left Wrist Score  = "+scoreLeftWrist);
      console.log("Right Wrist Score = "+ scoreRightWrist);


        
        console.log("RightWristX = " + right_wristX + "RightWristY = " + right_wristY + "leftWristX = " + left_wristX + "LeftWristY  = " + left_wristY);

    }
}

function draw()
{
    image(video,0,0,600,500);
    
    fill('#8a1b0a');
    stroke('#8a1b0a');

    if(scoreLeftWrist > 0.2)
    {
        circle(left_wristX, left_wristY, 24);
        InNumberLeftWristY = Number(left_wristY);
        remove_decimals = floor(InNumberLeftWristY);
        volume = remove_decimals/500;
        document.getElementById("volume").innerHTML = "volume = " +volume;
        setVoume(volume);
    }


    if(scoreRightWrist > 0.2)
    {
        circle(right_wristX, right_wristY, 24);
        
    

    if(scoreRightWrist > 0 && scoreRightWrist <= 100)
    {
        document.getElementById("speed").innerHTML = "speed = 0.5x ";
        song.rate(0.5);
    }

    else if(scoreRightWrist > 100 && scoreRightWrist <= 200)
    {
        document.getElementById("speed").innerHTML = "speed = 1x ";
        song.rate(1);
    }

    else if(scoreRightWrist > 200 && scoreRightWrist <= 300)
    {
        document.getElementById("speed").innerHTML = "speed =1.5x ";
        song.rate(1.5);
    }

    else if(scoreRightWrist > 300 && scoreRightWrist <= 400)
    {
        document.getElementById("speed").innerHTML = "speed = 2x ";
        song.rate(2);
    }

    else if(scoreRightWrist >= 400)
    {
        document.getElementById("speed").innerHTML = "speed = 2.5x ";
        song.rate(2.5);
    }
}

}


function play()
{
    song.play();
    song.setVolume(1);
    song.rate(1);
}