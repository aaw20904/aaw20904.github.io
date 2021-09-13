
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

    // Add animation bindings to elements
    lax.addElements(
  '.secondary',  // Element selector rule
  {             // Animation data
    scrollY: {  
      
      translateX: [
        [0, 300],
        [200,0]
      ],
    
    }
  },
  {             
    style: {}   // Element options
  })

  

  lax.addElements(
    '.anim1',  // Element selector rule
    {             // Animation data
      scrollY: {  
        
        scale: [
          [0,'elCenterY','elOutY'],
          [0.6, 1.0, 0.3]
        ],
      
      }
    },
    {             
      style: {}   // Element options
    })

    lax.addElements(
      '.anim2',  // Element selector rule
      {             // Animation data
        scrollY: {  
          
          scale: [
            [0,((clientH.scrollHeight*0.7) | 0)],
            [0.5, 1.0]
          ],
        
        }
      },
      {             
        style: {}   // Element options
      })

      lax.addElements(
        '.line',  // Element selector rule
        {             // Animation data
          scrollY: {  
            
            opacity: [
              [0,(window.innerHeight*0.5)|0],
              [ 1.0, 0.0]
            ],
    
            translateY: [
              [0,(window.innerHeight*0.4)|0],
              [ 0, window.innerHeight]
    
            ],
    
            
          
          }
        },
        {             
          style: {}   // Element options
        })
  

  }