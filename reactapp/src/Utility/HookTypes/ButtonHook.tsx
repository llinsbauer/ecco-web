import { ButtonAttributeHook } from "./ButtonAttributeHook";
import { ButtonStateHook } from "./ButtonStateHook";

export interface ButtonHook {
    buttonAttributes: ButtonAttributeHook,
    buttonState: ButtonStateHook
}