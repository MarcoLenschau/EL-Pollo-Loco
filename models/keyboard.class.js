class Keyboard {
    RIGHT = false;
    LEFT = false;
    UP = false;
    DOWN = false;
    SPACE = false;
    D = false;
    F = false;
    M = false;

    mobileArrowKey() {
        document.getElementById("btn-left").addEventListener("touchstart", (e) => {
            e.preventDefault();
            this.LEFT = true;
        });
        document.getElementById("btn-left").addEventListener("touchend", (e) => {
            e.preventDefault();
            this.LEFT = false;
        });
        document.getElementById("btn-right").addEventListener("touchstart", (e) => {
            e.preventDefault();
            this.RIGHT = true;
        });
        document.getElementById("btn-right").addEventListener("touchend", (e) => {
            e.preventDefault();
            this.RIGHT = false;
        });
        document.getElementById("btn-space").addEventListener("touchstart", (e) => {
            e.preventDefault();
            this.SPACE = true;
        });
        document.getElementById("btn-space").addEventListener("touchend", (e) => {
            e.preventDefault();
            this.SPACE = false;
        });
        document.getElementById("btn-throw").addEventListener("touchstart", (e) => {
            e.preventDefault();
            this.D = true;
        });
        document.getElementById("btn-throw").addEventListener("touchend", (e) => {
            e.preventDefault();
            this.D = false;
        });
    }

    searchKeyEvent(event, state) {
        if(event.keyCode == 32) keyboard.SPACE = state;
        if(event.keyCode == 68) keyboard.D = state;
        if(event.keyCode == 70) keyboard.F = state;
        if(event.keyCode == 77) keyboard.M = state;
        this.arrowKeys(event, state);
    }
    
    arrowKeys(event, state) {
        if(event.keyCode == 37) keyboard.LEFT = state;
        if(event.keyCode == 38) keyboard.UP = state;
        if(event.keyCode == 39) keyboard.RIGHT = state;
        if(event.keyCode == 40) keyboard.DOWN = state;
    }
}
