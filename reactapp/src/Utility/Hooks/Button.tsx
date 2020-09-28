import { ButtonAttributeHook } from "../HookTypes/ButtonAttributeHook";
import { ButtonStateHook } from "../HookTypes/ButtonStateHook";
import { useButtonClickedState } from "./ButtonClickedState";
import { useButtonAttributes } from "./ButtonAttribute";
import { ButtonHook } from "../HookTypes/ButtonHook";

export const useModalButton = (
    type: "button" | "submit" | "reset",
    className: string,
    dataAttributes: {
        target?: string,
        toggle?: string,
        dismiss?: string
    },
    showModal: boolean
    ) : ButtonHook => {

    let buttonAttributes : ButtonAttributeHook = useButtonAttributes(type, className, {
        target: dataAttributes.target,
        toggle: dataAttributes.toggle,
        dismiss: dataAttributes.dismiss
    })

    let clickedState : ButtonStateHook = useButtonClickedState(null, showModal);

    return {
        buttonAttributes: buttonAttributes,
        buttonState: clickedState
    }
}