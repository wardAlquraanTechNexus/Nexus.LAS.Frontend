export interface DisplayColumn{
    key: string,
    keysPipes?:keysPipes[],
    label:string,
    pipes?:string[],
    sort?:boolean,
    inputType?:string,
    compareKey?:string,
    decimals?:number  // Add support for custom decimal places
}

export interface keysPipes{
    key: string,
    pipes?: string[]
}