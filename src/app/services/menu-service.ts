import { Injectable, Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { environment } from '../../environment/environment';
import { HttpClient } from '@angular/common/http';
import { MenuTree } from '../models/menus/menu-tree';
import { Observable, shareReplay, tap } from 'rxjs';
import { BaseService } from './base/base-service';
import { Menu } from '../models/menus/menu';
import { PaginateRsult } from '../models/paginate-result';

@Injectable({
  providedIn: 'root'
})
export class MenuService extends BaseService<Menu> {
  private isBrowser: boolean;

  constructor(
    override httpClient: HttpClient,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {
    super(httpClient);
    this.setPath("Menus");
    this.isBrowser = isPlatformBrowser(this.platformId);
  }

    searchMenu(paramsObj?: { [param: string]: any }): Observable<PaginateRsult<Menu>> {
    return this.httpClient.get<PaginateRsult<Menu>>(this.url+"/searchMenu", { params: this.httpParams(paramsObj) });

  }

  getMenus(): Observable<any> {
    return this.httpClient.get<any>(this.url + '/GetAllMenus').pipe(
      tap(menus => {
        if (this.isBrowser) {
          localStorage.setItem('menu', JSON.stringify(menus));
        }
      })
    );
  }

  GetParents(id: number): Observable<Menu[]> {
    return this.httpClient.get<Menu[]>(this.url + "/GetParents/" + id);
  }

  getMenuByPath(path: string): MenuTree | null {
    if (!this.isBrowser) return null;
    
    const menuJson = localStorage.getItem('menu');
    if (!menuJson) return null;

    try {
      let menus = JSON.parse(menuJson) as MenuTree[];
      return this.findMenuByPath(menus, path);

    } catch (e) {
      return null;
    }
  }

  private findMenuByPath(menuList: MenuTree[], path: string): MenuTree | null {
    for (const menu of menuList) {
      if (menu.path === path) {
        return menu;
      }
      if (menu.children?.length) {
        const found = this.findMenuByPath(menu.children, path);
        if (found) {
          return found;
        }
      }
    }
    return null;
  }
}
