export interface DisplayColumn{
    key: string,
    keysPipes?:keysPipes[],
    label:string,
    pipes?:string[],
    sort?:boolean,
    inputType?:string,
    compareKey?:string
}

export interface keysPipes{
    key: string,
    pipes?: string[]
}