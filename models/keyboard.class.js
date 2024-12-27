class Keyboard {
    RIGHT = false;
    LEFT = false;
    UP = false;
    DOWN = false;
    SPACE = false;
    D = false;
    F = false;

    searchKeyEvent(event, state) {
        if(event.keyCode == 32) keyboard.SPACE = state;
        if(event.keyCode == 68) keyboard.D = state;
        if(event.keyCode == 70) keyboard.F = state;
        this.arrowKeys(event, state);
    }
    
    arrowKeys(event, state) {
        if(event.keyCode == 37) keyboard.LEFT = state;
        if(event.keyCode == 38) keyboard.UP = state;
        if(event.keyCode == 39) keyboard.RIGHT = state;
        if(event.keyCode == 40) keyboard.DOWN = state;
    }
}
