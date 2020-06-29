import { Dispatch } from "react";

export interface InputAttributesHook {
    value: string
    onChange: Dispatch<any>
    id: string,
    className: string,
    type: string
    placeholder: string
}