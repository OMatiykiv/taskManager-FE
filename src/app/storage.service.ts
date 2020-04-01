import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class StorageService {
  token: {} = ''

  constructor() { 
    this.token = this.getToken();
  }

  saveToken(token): void {
    localStorage.setItem('token', JSON.stringify(token));
  }

  getToken() {
    const tokenString = localStorage.getItem('token');

    if (!tokenString) {
      return null;
    }

    try {
      return JSON.parse(tokenString);
    } catch {
      return null;
    }
  }
}
