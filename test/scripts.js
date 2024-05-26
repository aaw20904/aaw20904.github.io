let stream = null;
const constraints = {
    audio: true,
    video: false
}

const getMicAndCamera = async()=>{
    try {
         stream = await navigator.mediaDevices.getUserMedia(constraints);
         alert("Stream created!")
         console.log(stream);
    } catch(e) {

        alert("acces denied")
       console.log(e)
    }
    
}

//RogStrix G531GT-BQ132

document.querySelector('#share').addEventListener('click',e=>getMicAndCamera(e));