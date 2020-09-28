import { ButtonAttributeHook } from "../HookTypes/ButtonAttributeHook";

export const useButtonAttributes = (
    type: "button" | "submit" | "reset",
    className: string,
    dataAttributes: {
        toggle?: string,
        target?: string,
        dismiss?: string
    }
): ButtonAttributeHook => {
    return {
        type: type,
        className: className,
        dataAttributes: {
            toggle: dataAttributes.toggle,
            target: dataAttributes.target,
            dismiss: dataAttributes.dismiss
        }
    }
}