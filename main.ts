const START_DISPLAY = "Hello, \
              I'm Listenning!!!";
radio.setGroup(1)
OLED.init(128, 95);
screenDisplay(null, START_DISPLAY);
let red = DigitalPin.P1;
let green = DigitalPin.P8;
let blue = DigitalPin.P16;
let off = OnOff.Off;
let on = OnOff.On;
tinkercademy.LED(red, off);
tinkercademy.LED(green, on);
tinkercademy.LED(blue, off);

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
    radio.sendString("Help on the way!!");
    screenDisplay("", "Notifying!");
    return true;
}

function onRecieveRadioSignal(recievedString: string): boolean {
    tinkercademy.LED(red, on);
    tinkercademy.LED(green, off);
    screenDisplay("", recievedString);
    return true;
}

basic.forever(() => {
    let recieved_radio_signal = false;
    let message_sent = false;
    radio.onReceivedString(function (receivedString: string) {
        if (receivedString != null) {
            recieved_radio_signal = onRecieveRadioSignal(receivedString);
        }
    })

    input.onButtonPressed(Button.B, function () {
        message_sent = sendRadioSignal(recieved_radio_signal);
        if (message_sent == true) {
            tinkercademy.LED(blue, on);
            tinkercademy.LED(red, off);
            tinkercademy.LED(green, off);
        }
    })

    input.onButtonPressed(Button.AB, function () {
        screenDisplay(null, START_DISPLAY);
        tinkercademy.LED(red, off);
        tinkercademy.LED(blue, off);
        tinkercademy.LED(green, on);
    })
})

