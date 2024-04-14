import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-reset-password',
  standalone: true,
  imports: [],
  templateUrl: './reset-password.component.html',
  styleUrl: './reset-password.component.css'
})
export class ResetPasswordComponent {
  token!: string;

  constructor(private route: ActivatedRoute) {
    this.route.params.subscribe(params => {
      this.token = params['token'];
    })
  }

  ngOnInit(): void{}
}
