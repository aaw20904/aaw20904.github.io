self.addEventListener('install',async function(e) {
    let options= {
        headers:{"Content-type":"application/json;charset=utf-8"},
        body: JSON.stringify({inst_evt:e}),
        method:"post"
    }
    //await fetch('https://localhost:3000/w',options)
    console.log(options)
    
    });
    self.addEventListener('activate', async function(e) {
        let options= {
            headers:{"Content-type":"application/json;charset=utf-8"},
            body: JSON.stringify({activ_evt:e}),
            method:"post"
        }
        //await fetch('https://localhost:3000/w',options)
        console.log(options);
        });