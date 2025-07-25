export interface DisplayColumn{
    key: string,
    keysPipes?:keysPipes[],
    label:string,
    pipe?:string,
    sort?:boolean,
    inputType?:string,
}

export interface keysPipes{
    key: string,
    pipe?: string
}