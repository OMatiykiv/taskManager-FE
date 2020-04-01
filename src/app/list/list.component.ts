import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { StorageService } from '../storage.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit {
  list: {};
  token: {}

  constructor(
    private http: HttpClient,
    private storageService: StorageService,
    private router: Router
  ) { }

  ngOnInit() {
    this.token = this.storageService.getToken()
    if (!this.token) {
      this.router.navigate(['']);
    }
    this.getTasks()
  }

  getTasks() {
    this.http.get(
      'https://task-manager-application-share.herokuapp.com/api/task',
      {
        headers: new HttpHeaders({
          'access': this.token['accessToken'],
          'refresh': this.token['refreshToken']
        })
      }
    ).subscribe(tasks => {
      this.list = tasks
    }, error => {
      document.getElementById("warning-alert").innerHTML = error.error;
      document.getElementById("warning-alert").style.display = "block";
      setTimeout(() => {
        document.getElementById("warning-alert").style.display = "none";
      },2000);
    })
  }

}
