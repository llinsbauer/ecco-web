import * as React from "react";
import { ButtonStateHook } from "../HookTypes/ButtonStateHook";
import {useState} from "react";

export const useButtonClickedState = (initialState: boolean, showModal: boolean) : ButtonStateHook => {
    const [isClicked, setIsClicked] = useState(initialState);

    function handleButtonClick() {
        console.log("SHOWMODAL WIRD GEÄNDERT!!!!");
        setIsClicked(showModal);
    }

    return {
        buttonStateValue: isClicked,
        setButtonStateValue: handleButtonClick
    }

}