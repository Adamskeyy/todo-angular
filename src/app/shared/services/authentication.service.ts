import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from '@environments/environment';
import { CurrentUser } from '@app/shared/models';

@Injectable({ providedIn: 'root' })
export class AuthenticationService {
  private currentUserSubject: BehaviorSubject<CurrentUser>;
  public currentUser$: Observable<CurrentUser>;

  constructor(private http: HttpClient) {
    this.currentUserSubject = new BehaviorSubject<CurrentUser>(JSON.parse(localStorage.getItem('currentUser')));
    this.currentUser$ = this.currentUserSubject.asObservable();
  }

  public get currentUserValue(): CurrentUser {
    return this.currentUserSubject.value;
  }

  login(username: string, password: string): Observable<CurrentUser> {
    return this.http.post<CurrentUser>(`${environment.apiUrl}/api/users/authenticate`, { username, password }).pipe(
      map((user) => {
        localStorage.setItem('currentUser', JSON.stringify(user));
        this.currentUserSubject.next(user);
        return user;
      })
    );
  }

  logout(): void {
    localStorage.removeItem('currentUser');
    this.currentUserSubject.next(null);
  }
}
