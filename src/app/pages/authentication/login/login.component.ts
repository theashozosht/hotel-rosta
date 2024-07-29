import { Component, inject } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { CheckboxModule } from 'primeng/checkbox';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { PasswordModule } from 'primeng/password';
import { InputTextModule } from 'primeng/inputtext';
import { Router, RouterModule } from '@angular/router';
import { MessageService } from 'primeng/api';
import { ToastModule } from 'primeng/toast';
import { delay, map, of, throwError } from 'rxjs';
import { StaticName } from '../../../core/constants/static-name';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    PasswordModule,
    RouterModule,
    ButtonModule,
    CheckboxModule,
    InputTextModule,
    FormsModule,
    ReactiveFormsModule,
    ToastModule
  ],
  providers: [MessageService],
  templateUrl: './login.component.html',
  styles: [
    `
      :host ::ng-deep .pi-eye,
      :host ::ng-deep .pi-eye-slash {
        transform: scale(1.6);
        margin-right: 1rem;
        color: var(--primary-color) !important;
      }
    `,
  ],
})
export class LoginComponent {
  protected authenticationForm = new FormGroup({
    username: new FormControl<string>('', [Validators.required]),
    password: new FormControl<string>('', [Validators.required])
  })
  private messageService = inject(MessageService);
  private _router = inject(Router)

  onSubmit(): void {
    if (this.authenticationForm.invalid) {
      this.messageService.add({ severity: 'error', summary: 'داده نادرست', detail: 'لطفاْ از صحیح بودن داده‌ها مطمئن شوید' });
      return;
    }

    const payload = {
      username: this.authenticationForm.controls.username.value,
      password: this.authenticationForm.controls.password.value
    }
    of({
      success: true, 
      result: {
        sessionId: 'xxx-yyy(aaa',
      }
    }).pipe(delay(1000), map(item => {
      if(this.authenticationForm.value.password === 'admin' && this.authenticationForm.value.username === 'admin'){
        return item
      }else {
        return null;
      }
    })).subscribe(res => {
      if(res?.success){
        localStorage.setItem(StaticName.localStorage.session, res.result.sessionId);
        this._router.navigate(['/dashboard/home']);
      } else {
        this.messageService.add({ severity: 'error',life: 5000000, summary: 'خطا در ورود', detail: 'نام کاربری یا پسورد صحیح نمی‌باشد' });
      }
    })
  }
}
