import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ButtonModule } from 'primeng/button';

@Component({
  selector: 'app-404',
  standalone: true,
  imports: [
    RouterModule,
    ButtonModule],
  templateUrl: './404.component.html',
  styleUrl: './404.component.scss'
})
export class NotFoundComponent {

}
