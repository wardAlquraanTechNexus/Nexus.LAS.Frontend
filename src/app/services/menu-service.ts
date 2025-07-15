import { Injectable } from '@angular/core';
import { environment } from '../../environment/environment';
import { HttpClient } from '@angular/common/http';
import { MenuTree } from '../models/menus/menu-tree';
import { Observable, shareReplay, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MenuService {
  private cachedMenus$: Observable<MenuTree[]> | null = null;
  url: string = environment.serverUrls.host + "Menus/";
  constructor(private httpClient: HttpClient) {

  }

  getMenus(): Observable<any> {
      return this.httpClient.get<any>(this.url + 'GetAllMenus').pipe(
        tap(data=>console.log("from pipe ", data))
      )
  }

  getMenusCached(){
    
  }
}
