prediction_1=""
prediction_2=""

Webcam.set({
    width:350,
height:300,
image_format:'png',
png_quality:90
})

camera=document.getElementById("camera")
Webcam.attach("#camera")

function take_snapshot(){
    Webcam.snap(
        function(data_uri){
            document.getElementById("result").innerHTML='<img id="snap" src="'+data_uri+'">'
        }
    )
}
console.log("ml5 version" , ml5.version)
classifier=ml5.imageClassifier("https://teachablemachine.withgoogle.com/models/K2h6G3HJN/model.json",modalLoaded)

function modalLoaded(){
    console.log("modalLoaded")
}
function speak(){
    var synth=window.speechSynthesis
    speak_data1="The first Prediction is " + prediction_1
    speak_data2="The second Prediction is " + prediction_2
    var utterthis= new SpeechSynthesisUtterance(speak_data1+speak_data2)
    synth.speak(utterthis)
}

function check(){
    img= document.getElementById("snap")
    classifier.classify(img, gotResults)
}
function gotResults(error,results){
if (error) {
    console.error(error)
} else {
    console.log(results)

    document.getElementById("result_emotion_name").innerHTML=results[0].label
    document.getElementById("result_emotion_name2").innerHTML=results[1].label

    prediction_1=results[0].label
    prediction_2=results[1].label
    speak()

    if(prediction_1=="Happy"){
        document.getElementById("update_emoji").innerHTML="&#128522;";
    }
    if(prediction_1=="Sad"){
        document.getElementById("update_emoji").innerHTML="&#128532;";
    }
    if(prediction_1=="Angry"){
        document.getElementById("update_emoji").innerHTML="&#128545;";
    }


}
}