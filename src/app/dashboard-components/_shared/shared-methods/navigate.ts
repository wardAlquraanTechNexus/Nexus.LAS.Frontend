import { Router } from "@angular/router";
import { MenuTree } from "../../../models/menus/menu-tree";

 export function navigate(router:Router, basePath: MenuTree | null, path: MenuTree | null, id: any): void {
    if (!id || !basePath || !path) return;

    // Force reload if navigating to same route
    router.routeReuseStrategy.shouldReuseRoute = () => false;
    router.onSameUrlNavigation = 'reload';

    let queryParams: { [key: string]: any } | null = null;
    if(id){
        queryParams = { id };
    }
    router.navigate([`${basePath.path}/${path.path}`], { queryParams });
  }