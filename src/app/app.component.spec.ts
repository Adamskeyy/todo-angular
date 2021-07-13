import { ComponentFixture, fakeAsync, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { AppComponent } from './app.component';
import { AuthenticationService } from './shared';
import { RouterTestingModule } from '@angular/router/testing';

class AuthenticationServiceSpy implements Partial<AuthenticationService> {
  currentUser$ = of(null);
}

describe('AppComponent', () => {
  let fixture: ComponentFixture<AppComponent>;
  let component: AppComponent;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RouterTestingModule],
      declarations: [AppComponent],
      providers: [
        {
          provide: AuthenticationService,
          useClass: AuthenticationServiceSpy,
        },
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AppComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the app', () => {
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

  describe('when user is logged in', () => {
    const user = {
      id: 123,
      username: 'test',
      token: 'qwe',
    };

    it('should show logout button ', fakeAsync(() => {
      component.currentUser$ = of(user);
      fixture.detectChanges();
      const compiled = fixture.nativeElement;
      expect(compiled.querySelector('.btn').textContent).toContain('Logout');
    }));
  });

  describe('when user is logged out', () => {
    const user = null;

    it('should not show logout button ', fakeAsync(() => {
      component.currentUser$ = of(user);
      fixture.detectChanges();
      const compiled = fixture.nativeElement;
      expect(compiled.querySelector('.btn')).toBeFalsy();
    }));
  });
});
