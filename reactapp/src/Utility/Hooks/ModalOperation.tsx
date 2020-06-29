import {useEffect, useState} from "react";
import * as React from "react";
import { ModalOperationHook } from "../HookTypes/ModalOperationHook";

export const useModalOperation = () : ModalOperationHook => {
    let [modalOperation, setModalOperation] = useState<string>("");

    let changeModalOperation = (newModalOperation: string) => {
        setModalOperation(newModalOperation);
    }

    return {
        modalOperation,
        changeModalOperation
    }
}

