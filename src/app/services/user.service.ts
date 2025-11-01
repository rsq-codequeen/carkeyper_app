import { Injectable } from '@angular/core';
import { API_URL } from '../app.constants';
import { Observable, of } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs';
import { User } from '../user-management/user';
@Injectable({
  providedIn: 'root'
})
export class UserService {
  private userUrl = `${API_URL}/users`;

  constructor(private httpClient: HttpClient) { }
  
    // components subscribe to this
  getUsers(): Observable<User[]> {
  return this.httpClient.get<User[]>(this.userUrl); 
}

  // add a user and emit updated list
  addUser(user: User): Observable<any> {
  return this.httpClient.post<any>(this.userUrl, user);
}

  // delete a user (by id when available)
  deleteUser(userId: number): Observable<any> {
  
  return this.httpClient.delete<any>(`${this.userUrl}/${userId}`);
}

  // replace/edit a user
  editUser(userId: number, updatedUser: User): Observable<any> {
  
  return this.httpClient.put<any>(`${this.userUrl}/${userId}`, updatedUser);
}
}
