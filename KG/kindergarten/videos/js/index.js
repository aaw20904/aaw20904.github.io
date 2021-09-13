
function calcOffsetBlur(fullHeight,objWin){
  /*calc aspect ratio of screen*/
  let rate = objWin.innerHeight / objWin.innerWidth;
  /* */
}

window.onload = function () {
    lax.init()
    let clientH = document.querySelector('body');
    console.log(clientH.scrollHeight);
  
    // Add a driver that we use to control our animations
    lax.addDriver('scrollY', function () {
        return window.scrollY
      }, { inertiaEnabled: true })

 

  lax.addElements(
    '.line',  // Element selector rule
    {             // Animation data
      scrollY: {  
        
        opacity: [
          [0,(window.innerHeight*0.5)|0],
          [ 1.0, 0.0]
        ],

        translateY: [
          [0,(window.innerHeight*0.9)|0],
          [ 0, window.innerHeight]

        ],

        
      
      }
    },
    {             
      style: {}   // Element options
    })
      

   
  

  }