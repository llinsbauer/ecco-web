export interface ButtonAttributeHook {
    type: "button" | "submit" | "reset",
    className: string,
    dataAttributes: {
        toggle?: string,
        dismiss?: string,
        target?: string
    }
}