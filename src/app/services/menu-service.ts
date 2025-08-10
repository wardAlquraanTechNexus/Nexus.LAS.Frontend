import { Injectable } from '@angular/core';
import { environment } from '../../environment/environment';
import { HttpClient } from '@angular/common/http';
import { MenuTree } from '../models/menus/menu-tree';
import { Observable, shareReplay, tap } from 'rxjs';
import { BaseService } from './base/base-service';
import { Menu } from '../models/menus/menu';

@Injectable({
  providedIn: 'root'
})
export class MenuService extends BaseService<Menu> {
  constructor(override httpClient: HttpClient) {
    super(httpClient);
    this.setPath("Menus");
  }

  getMenus(): Observable<any> {
    return this.httpClient.get<any>(this.url + '/GetAllMenus').pipe(
      tap(menus => {
        localStorage.setItem('menu', JSON.stringify(menus));
      })
    );
  }

  GetParents(id: number): Observable<Menu[]> {
    return this.httpClient.get<Menu[]>(this.url + "/GetParents/" + id);
  }

  getMenuByPath(path: string): MenuTree | null {
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
