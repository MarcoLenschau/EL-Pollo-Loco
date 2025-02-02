/**
 * Displays the start overlay.
 */
function showStartOverlay() {
    let startOverlay = document.getElementById("start-overlay");
    startOverlay.classList.remove("hidden");
    startOverlay.style = "";
}

/**
 * Show the game in the landscape format.
 */
function showLandscape() {
    document.getElementsByClassName("end-overlay")[0].classList.add("d_none");
    document.getElementById("end-overlay-image").classList.add("d_none");
    document.getElementById("canvas").style.width = "1080px";
    document.getElementsByClassName("play-button")[0].classList.remove("d_none")
    document.getElementsByClassName("mobile-gameplay")[0].classList.remove("d_none")
    showStartOverlay();
    clearInterval(rotateInterval);
    intervaleNumber = 0;
}

/**
 * Show the turn mobile devices overlay.
 */
function showDevicesOverlay() {
    let canvas = document.getElementById("canvas");
    hiddenOverlays();
    createDevicesOverlay();
    canvas.style = " width: 0 !important; position: absolute; top: 230px;";  
    document.getElementsByClassName("play-button-end")[0].classList.add("d_none")
    removeItem("mobile-gameplay");
    removeItem("play-button");
    removeItem("overlay-buttons");
    removeItem("mobile-hide");
    intervaleNumber = 1;
}

/**
 * Creates an overlay prompting users to rotate their devices.
 */
function createDevicesOverlay() {
    let endOverlay = document.getElementsByClassName("end-overlay")[0];
    disableEndOverlay();
    endOverlay.style = "width: 100vw; margin: 24vh;";
    endOverlay.innerHTML += "<h1 style='position: absolute; bottom: 0px;'>Turn your Devices</h1>"       
    rotateInterval = setInterval(rotateSmartphone, 4000);
}

/**
 * Hidden the end overlay.
 */
function disableEndOverlay() {
    let endOverlay = document.getElementsByClassName("end-overlay")[0];
    let endOverlayImage = document.getElementById("end-overlay-image");
    endOverlay.classList.remove("d_none");
    endOverlay.classList.remove("hidden");
    endOverlayImage.src = "";
}

/**
 * Show the end overlay.
 */
function showEndOverlay() {
    let endOverlay = document.getElementsByClassName("end-overlay")[0];
    endOverlay.classList.remove("hidden");
    endOverlay.classList.remove("d_none");
}

/**
 * Hides the start and end overlays.
 */
function hiddenOverlays() {
    let startOverlay = document.getElementById("start-overlay");
    let endOverlay = document.getElementsByClassName("end-overlay")[0];
    startOverlay.style = "height: 0 !important;";
    startOverlay.classList.add("hidden");
    endOverlay.classList.add("hidden");
}

function defineEndOverlaySize() {
    let endOverlay = document.querySelector(".end-overlay");
    if (window.innerWidth < 1300) {
        endOverlay.style.height = window.innerWidth / 2.8 + "px";
    }
}