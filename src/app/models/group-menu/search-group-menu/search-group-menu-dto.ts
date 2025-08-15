export interface SearchGroupMenuDTO
{
    id:number,
    menuId:number,
    groupId:number ,
    menuName:string ,
    groupName:string ,
    access:boolean,
    canInsert:boolean,
    canUpdate:boolean,
    canDelete:boolean,
    admin:boolean,

}