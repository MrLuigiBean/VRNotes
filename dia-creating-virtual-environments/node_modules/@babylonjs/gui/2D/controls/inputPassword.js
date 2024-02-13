import { InputText } from "./inputText.js";
import { RegisterClass } from "@babylonjs/core/Misc/typeStore.js";
import { TextWrapper } from "./textWrapper.js";
/**
 * Class used to create a password control
 */
export class InputPassword extends InputText {
    _getTypeName() {
        return "InputPassword";
    }
    _beforeRenderText(textWrapper) {
        const pwdTextWrapper = new TextWrapper();
        let txt = "";
        for (let i = 0; i < textWrapper.length; i++) {
            txt += "\u2022";
        }
        pwdTextWrapper.text = txt;
        return pwdTextWrapper;
    }
}
RegisterClass("BABYLON.GUI.InputPassword", InputPassword);
//# sourceMappingURL=inputPassword.js.map