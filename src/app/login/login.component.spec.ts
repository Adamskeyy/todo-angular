import { ComponentFixture, fakeAsync, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { AuthenticationService, CurrentUser } from '@app/shared';
import { Observable, of, throwError } from 'rxjs';
import { timeout } from 'rxjs/operators';
import { LoginComponent } from './login.component';

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;

  class AuthenticationServiceSpy implements Partial<AuthenticationService> {
    currentUser$ = of(null);

    login(username: string, password: string): Observable<CurrentUser> {
      if (password === 'correct') {
        return of({ id: 1, username, token: 'abc' }).pipe(timeout(0));
      }
      return throwError(new Error('oops!!')).pipe(timeout(0));
    }
  }

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RouterTestingModule, ReactiveFormsModule],
      declarations: [LoginComponent],
      providers: [
        {
          provide: AuthenticationService,
          useClass: AuthenticationServiceSpy,
        },
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('when data is valid', () => {
    beforeEach(() => {
      component.f.username.setValue('test');
    });

    describe('and correct', () => {
      beforeEach(() => {
        component.f.password.setValue('correct');
        component.onSubmit();
        fixture.detectChanges();
      });

      it('should disable button during processing', () => {
        const compiled = fixture.nativeElement;
        expect(compiled.querySelector('.btn.btn-secondary').disabled).toBeTruthy();
      });

      it('should not show error', fakeAsync(() => {
        const compiled = fixture.nativeElement;
        expect(compiled.querySelector('.alert-danger')).toBeFalsy();
      }));
    });

    describe('and incorrect', () => {
      beforeEach(() => {
        component.f.password.setValue('incorrect');
        component.onSubmit();
        fixture.detectChanges();
      });

      it('should show error', fakeAsync(() => {
        const compiled = fixture.nativeElement;
        expect(compiled.querySelector('.alert-danger')).toBeTruthy();
      }));
    });
  });

  describe('when data is not valid', () => {
    it('should show vallidation messages', () => {
      component.onSubmit();
      fixture.detectChanges();

      const compiled = fixture.nativeElement;
      expect(compiled.querySelector('.invalid-feedback')).toBeTruthy();
    });
  });
});
