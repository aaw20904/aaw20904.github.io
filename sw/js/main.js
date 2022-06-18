

  window.onload = function(){

    if ('serviceWorker' in navigator) {
      navigator.serviceWorker.register('/sw/js/sw.js')
      .then((reg) => {
        // регистрация сработала
        console.log('Registration succeeded. Scope is ' + reg.scope);
      })
      .catch((error) => {
        // регистрация прошла неудачно
        console.log('Registration failed with ' + error);
      });
  
    }



    let btn = document.querySelector('.myButton');
    btn.addEventListener('click',async (evt)=>{
      const currentUrl = new URL(document.location.href)
    // current base URL
    const baseUrl = `${currentUrl.protocol}//${currentUrl.hostname}:${currentUrl.port}`;
    //timeout of fetch
    const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), 2000);
      let options ={
        headers: {"Content-type":"application/json; charset=UTF-8"},
        method: "POST",
        body: JSON.stringify({command:'time'}),
        signal: controller.signal
      }

      let resp;
      let textString = document.querySelector('.information');
      try{
        resp = await fetch(`${baseUrl}/w`, options)
        if (resp.ok) {
          let jsData = await resp.json();
          //assign a data to the string in a DOM
          textString.classList.remove('text-danger');
          textString.innerText = jsData.information; 
        }
      }
      catch(e){
        textString.classList.add('text-danger');
        textString.innerText = 'Internet is not connected!';
      }

    })
     
  
  }

 

window.addEventListener('online',(evt)=>{
    console.log('online')
  })

  window.addEventListener('offline',(evt)=>{
    let indicator = document.querySelector('.connectionStatus');
    indicator.innerText = 'offline';
  })

 
  
