
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
      opacity: [
        [0, 300],
        [0.1, 0.9], 
        
      ],
      translateX: [
        [0, 300],
        [200,0]
      ],
    
    }
  },
  {             
    style: {}   // Element options
  })

/*a hero wrapper*/ 
  lax.addElements(
    '.cnt1',  // Element selector rule
    {             // Animation data
      scrollY: {  
        translateY: [
          [0, clientH.scrollHeight],
          [0, -((clientH.scrollHeight*1.1) | 0)]
        ]
      }
    },
    {             
      style: {}   // Element options
    })
   
    /*mid-background*/ 
   lax.addElements(
    '.nearBackground',  // Element selector rule
    {             // Animation data
      scrollY: {  
        translateY: [
          [0, clientH.scrollHeight],
          [0, -((clientH.scrollHeight*0.7) | 0)]
        ]
      }
    },
    {             
      style: {}   // Element options
    }) 

    /*far bck*/
     
  lax.addElements(
    '.farBackground',  // Element selector rule
    {             // Animation data
      scrollY: {  
        translateY: [
          [0, clientH.scrollHeight],
          [0, -((clientH.scrollHeight*0.1) | 0)]
        ]
      }
    },
    {             
      style: {}   // Element options
    })

    /*an arrow*/
    lax.addElements(
      '.line',  // Element selector rule
      {             // Animation data
        scrollY: {  
          opacity: [
            [0, ((window.innerHeight*0.5)|0)],
            [1.0, 0], 
            
          ],
          
        }
      },
      {             
        style: {}   // Element options
      })
 
       lax.addElements(
        '.kindergarden',  // Element selector rule
        {             // Animation data
          scrollY: {  
            blur: [
              [0,'elCenterY'],  // Driver value map
              [20, 0],   // Animation value map
            ],
            opacity: [
              [0,'elCenterY'],
              [0.0, 1.0], 
            ],

            translateX: [
              [0,'elCenterY'],
              [-70,0],
             ],   
            
          }
        },
        {             
          style: {}   // Element options
        }) 


         lax.addElements(
          '.services',  // Element selector rule
          {             // Animation data
            scrollY: {  
              blur: [
                [0,((clientH.scrollHeight*0.15) | 0)],  // Driver value map
                [4, 0,],   // Animation value map
              ],
              opacity: [
                [0,((clientH.scrollHeight*0.20) | 0)],
                [0.0, 1.0], 
              ],
             /* translateX: [
                [0,'elCenterY'],
                [50,0],
               ],   */
            
              
            }
          },
          {             
            style: {}   // Element options
          })
          
          

  }