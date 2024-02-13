import { InputText } from "./inputText";
import { TextWrapper } from "./textWrapper";
/**
 * Class used to create a password control
 */
export declare class InputPassword extends InputText {
    protected _getTypeName(): string;
    protected _beforeRenderText(textWrapper: TextWrapper): TextWrapper;
}
