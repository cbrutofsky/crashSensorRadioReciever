const START_DISPLAY = "Hello, \
              I'm Listenning!!!";
OLED.init(128,95)

/**
 * Function that controls the message that the OLED is displaying.
 * Default is set to the START_MESSAGE constant.
 * If the message changes the screen is cleared before displaying the message.
 * Parameters: String message
 */
function screenDisplay(default_display = START_DISPLAY, current_display: string): void {
    if (current_display == default_display) {
        OLED.writeString(current_display);
    }
    else if (default_display != current_display) {
        if (default_display == START_DISPLAY) {
            return
        }
        else {
            OLED.clear()
            OLED.writeString(current_display);
        }
    }
}

basic.forever(function () {

})
