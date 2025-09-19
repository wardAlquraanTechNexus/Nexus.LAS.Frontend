import { Injectable } from '@angular/core';
import { Property } from '../../models/property-models/property/property';
import { HttpClient } from '@angular/common/http';
import { BaseService } from '../base/base-service';
import { BulkChangePrivateCommand } from '../../models/person-models/bulk-change-private-command';
import { BulkChangeStatusCommand } from '../../models/person-models/bulk-change-status-command';

@Injectable({
  providedIn: 'root'
})
export class PropertyService extends BaseService<Property> {

  constructor(httpClient: HttpClient) {
    super(httpClient);
    this.setPath('Property');
  }

  updateStatus(command: BulkChangeStatusCommand) {
      return this.httpClient.put<number>(this.url + "/BulkChangeStatus", command);
    }
  
    updatePrivate(command: BulkChangePrivateCommand) {
      return this.httpClient.put<number>(this.url + "/BulkChangePrivate", command);
    }

}
