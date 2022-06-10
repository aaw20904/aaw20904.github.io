function printState(state) {
    document.getElementById('state').innerHTML = state;
 }

 window.onload = function () {
        if ('serviceWorker' in navigator) {
        navigator.serviceWorker.register( 'service-worker.js', { scope: './' })
        .then( function(registration) {
                var serviceWorker;
                document.getElementById('status').innerHTML = 'successful';
           
        })
        .catch(function(error) {
        document.getElementById('status').innerHTML = error;
        });
    } else {
    document.getElementById('status').innerHTML =
    'unavailable';
    }

 }