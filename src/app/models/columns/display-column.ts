export interface DisplayColumn{
    key: string,
    keysPipes?:keysPipes[],
    label:string,
    pipes?:string[],
    sort?:boolean,
    inputType?:string,
    compareKey?:string,
    decimals?:number,
    hasIcon?:boolean;
}

export interface keysPipes{
    key: string,
    pipes?: string[]
}