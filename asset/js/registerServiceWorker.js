//register service worker
if("serviceWorker" in navigator){
    window.addEventListener("load", function(){
        navigator.serviceWorker
            .register("./service-worker.js")
            .then(function(){
                console.log("success register service worker");
            })
            .catch(function(){
                console.log("failed register service worker");
            });
    });
}else{
    console.log("service worker not support in this browser");
}