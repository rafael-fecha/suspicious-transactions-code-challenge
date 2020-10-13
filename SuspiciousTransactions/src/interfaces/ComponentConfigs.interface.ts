import { ITransactionProps } from "./ComponentProps.interface";

export interface ITextConfigs {
    style: any;
    property: string;
    value: keyof ITransactionProps;
}