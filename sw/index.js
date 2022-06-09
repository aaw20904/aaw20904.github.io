function printState(state) {
    document.getElementById('state').innerHTML = state;
 }

 window.onload = function () {
        if ('serviceWorker' in navigator) {
        navigator.serviceWorker.register( 'service-worker.js', { scope: './' })
        .then( function(registration) {
                var serviceWorker;
                document.getElementById('status').innerHTML = 'successful';
            if (registration.installing) {
                serviceWorker = registration.installing;
                printState('installing');
            } else if (registration.waiting) {
                serviceWorker = registration.waiting;
                printState('waiting');
            } else if (registration.active) {
                serviceWorker = registration.active;
                printState('active');
            }
            if (serviceWorker) {
                printState(serviceWorker.state);
                serviceWorker.addEventListener('statechange',
                    function(e) {
                    printState(e.target.state);
                    });
            }
        })
        .catch(function(error) {
        document.getElementById('status').innerHTML = error;
        });
    } else {
    document.getElementById('status').innerHTML =
    'unavailable';
    }

 }