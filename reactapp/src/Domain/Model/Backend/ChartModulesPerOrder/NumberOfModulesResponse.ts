import { ApiData } from "../ApiData";
import { NumberModulesPerOrder } from "./NumberModulesPerOrder";

export interface NumberOfModulesResponse extends ApiData {
    data: NumberModulesPerOrder[];
}