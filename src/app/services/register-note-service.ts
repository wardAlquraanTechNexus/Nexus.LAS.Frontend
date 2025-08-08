import { Injectable } from '@angular/core';
import { RegisterNote } from '../models/register-note/register-note';
import { BaseService } from './base/base-service';
import { HttpClient } from '@angular/common/http';
import { CreateRegisterNoteCommand } from '../models/register-note/create-register-note/create-register-note-command';
import { Observable } from 'rxjs';
import { UpdateRegisterNoteCommand } from '../models/register-note/update-register-note/update-register-note';

@Injectable({
  providedIn: 'root'
})
export class RegisterNoteService extends BaseService<RegisterNote> {
  constructor(httpClient: HttpClient){
    super(httpClient);
    this.setPath('RegisterNote');
  }

  createRegisterNote(command:CreateRegisterNoteCommand):Observable<number>
  {
    return this.httpClient.post<number>(this.url , command);
  }
  updateRegisterNote(command:UpdateRegisterNoteCommand)
  {
    return this.httpClient.put(this.url , command);
  }
}
