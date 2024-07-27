import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ButtonModule } from 'primeng/button';

@Component({
  selector: 'app-403',
  standalone: true,
  imports: [
    RouterModule,
    ButtonModule],
  templateUrl: './403.component.html',
  styleUrl: './403.component.scss'
})
export class AccessDeniedComponent {

}
