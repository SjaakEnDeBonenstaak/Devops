import { Injectable } from '@angular/core';

declare global {
  interface Window {
    __env: { apiUrl: string };
  }
}

@Injectable({ providedIn: 'root' })
export class EnvService {
  get apiUrl(): string {
    return window.__env?.apiUrl ?? 'http://localhost:3000';
  }
}
