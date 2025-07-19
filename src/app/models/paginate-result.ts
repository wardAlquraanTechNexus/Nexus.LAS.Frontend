export interface PaginateRsult<T>{
    page:number,
    pageSize:number,
    totalRecords:number,
    totalPages:number,
    collection:T[],
}