import { Injectable } from '@angular/core';
import { Http, Response, RequestOptions, URLSearchParams } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';
import { User } from './user';

@Injectable()
export class UserService {
  private usersUrl:string = 'https://reqres.in/api/users';

  // observable source
  private userCreatedSource = new Subject<User>();
  private userDeletedSource = new Subject();

  // observable stream
  userCreated$ = this.userCreatedSource.asObservable();
  userDeleted$ = this.userDeletedSource.asObservable();

  constructor( private http:Http ) {

  }

  /**
   * Get all users
   */
  getUsers(requestParams:any): Observable<any> {
    let params = new URLSearchParams();
    // params.set('page',requestParams.pageNumber);
    // params.set('per_page',requestParams.perPage);
    for (let param in requestParams) {
           params.set(param, requestParams[param]);
       }
    return this.http.get(this.usersUrl,{search:params})
             .map(res => res.json())
             .map(users => {
               users.data = users.data.map(this.toUser);
               return users;
             })
             .catch(this.handleError);
  }
  /**
   * Get a single users
   */
   getUser(id:number): Observable<User> {
     return this.http.get(`${this.usersUrl}/${id}`)
              .map(res => res.json().data)
              .map(this.toUser)
              .catch(err => {
                return this.handleError(err)
              });
   }
  /**
   * Create user
  */
  createUser(user:User):Observable<User>{
    return this.http.post(this.usersUrl, user)
            .map(res=> res.json())
            .do(user => this.userCreated(user))
            .catch(this.handleError);
  }

  /**
   * Update the user
   */
  updateUser(user:User): Observable<User>{
    return this.http.put(`${this.usersUrl}/${user.id}`, user)
           .map(res=>res.json())
           .catch(this.handleError);
  }

  /**
   * Delete user
   */
  deleteUser(id:number): Observable<any>{
    return this.http.delete(`${this.usersUrl}/${id}`)
            .do(res => this.userDeleted())
           .catch(this.handleError);
  }
  /**
   * The user was created. Add this info to our stream
   */
    userCreated(user: User) {
      this.userCreatedSource.next(user);
    }

   /**
    * The user was deleted. Add this info to our stream
    */
    userDeleted() {
      this.userDeletedSource.next();
    }


  /**
   * Convert user info from the API to our standard/format
   */
  private toUser(user): any {
    return {
      id: user.id,
      name: `${user.first_name} ${user.last_name}`,
      username: user.first_name,
      avatar: user.avatar
    }
  }

  /**
   * Handle any Error
   */
  private handleError(err) {
    let errMessage: string;

   if (err instanceof Response) {
     let body   = err.json() || '';
     let error  = body.error || JSON.stringify(body);
     errMessage = `${err.status} - ${err.statusText || ''} ${error}`;
   } else {
     errMessage = err.message ? err.message : err.toString();
   }

   return Observable.throw(errMessage);
  }

}
