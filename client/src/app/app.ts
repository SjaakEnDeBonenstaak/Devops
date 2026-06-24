import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { EnvService } from './env.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App implements OnInit {
  users: any[] = [];

  constructor(private http: HttpClient, private env: EnvService) {}

  ngOnInit() {
    this.http
      .get<any[]>(`${this.env.apiUrl}/users`, {
        headers: { 'Cache-Control': 'no-cache' }
      })
      .subscribe(data => {
        this.users = data;
      });
  }
}
