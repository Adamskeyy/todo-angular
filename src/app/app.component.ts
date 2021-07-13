import { Router } from '@angular/router';
import { Component } from '@angular/core';
import { AuthenticationService } from '@app/shared/services';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  currentUser$ = this.authenticationService.currentUser$;

  constructor(
      private router: Router,
      private authenticationService: AuthenticationService
  ) {}

  logout(): void {
    this.authenticationService.logout();
    this.router.navigate(['/login']);
}
}
