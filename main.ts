// const START_DISPLAY = "Hello, \
//               I'm Listenning!!!";
const START_DISPLAY = "Hello!!!";
radio.setGroup(1)
OLED.init(128, 95);

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
            return;
        }
        else {
            OLED.clear();
            OLED.writeString(current_display);
        }
    }
}

function sendRadioSignal(signal: boolean): boolean {
    let ret = false;
    if (signal == true) {
        radio.sendString("Help on the way!!");
        ret = true;
    }
    return ret;
}

function recieveRadioSignal(): boolean {
    let ret = false;
    radio.onReceivedString(function (receivedString: string) {
        ret = true;
        //screenDisplay(receivedString);
        basic.showString(receivedString);

    })
    return ret;
}

basic.forever(function () {
    let radio_signal = recieveRadioSignal()
    basic.showString(START_DISPLAY);
    input.onButtonPressed(Button.B, function () {
        let message_sent = sendRadioSignal(true);
        if (message_sent = true) {
            basic.showString("Notifying!")
        }
        else {
            basic.showString("Failed!")
        }
    })



    input.onButtonPressed(Button.AB, function () {
        basic.showString(START_DISPLAY);
    })

})
