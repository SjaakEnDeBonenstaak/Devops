import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { EnvService } from './env.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule],
  template: `
    <h1>Users</h1>
    <ul>
      <li *ngFor="let user of users">{{ user.name }} — {{ user.email }}</li>
    </ul>
  `
})
export class AppComponent implements OnInit {
  users: any[] = [];

  constructor(private http: HttpClient, private env: EnvService) {}

  ngOnInit() {
    this.http.get<any[]>(`${this.env.apiUrl}/users`).subscribe(data => {
      this.users = data;
    });
  }
}
