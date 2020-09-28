import {useState} from "react";
import * as React from "react";
import { InputAttributesHook } from "../HookTypes/InputAttributeHook";

export const useInputAttributes = (inputID: string, className: string, placeholder: string, type: string) : InputAttributesHook => {
    const [inputValue, setInputValue] = useState("");

    const handleInputValueChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setInputValue(event.target.value);
    }

    return {
        value: inputValue,
        onChange: handleInputValueChange,
        id: inputID,
        className: className,
        type: type,
        placeholder: placeholder
    }
}