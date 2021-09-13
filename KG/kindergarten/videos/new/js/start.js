 

window.onload = function () {
    lax.init()
    let clientH = document.querySelector('body');
    console.log(clientH.scrollHeight);
  
    // Add a driver that we use to control our animations
    lax.addDriver('scrollY', function () {
        return window.scrollY
      }, { inertiaEnabled: true })

    // Add animation bindings to elements
     
    
    lax.addElements(
      '.anim1',  // Element selector rule
      {             // Animation data
        scrollY: {  
          
          scale: [
            [0,'elCenterY','elOutY'],
            [0.7, 1.0, 0.3]
          ],
        
        }
      },
      {             
        style: {}   // Element options
      })


  }