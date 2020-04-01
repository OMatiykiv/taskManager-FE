import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { StorageService } from '../../storage.service';

@Component({
  selector: 'app-new',
  templateUrl: './new.component.html',
  styleUrls: ['./new.component.css']
})
export class NewComponent implements OnInit {
  token: {};

  constructor(
    private http: HttpClient,
    private router: Router,
    private storageService: StorageService
  ) { }

  ngOnInit() {
    this.token = this.storageService.getToken()
  }

  goToList(){
    this.router.navigate(['/list']);
  }

  createNewTask(postData : {title: string, status: string, description: string}) {
    this.http.post(
      'https://task-manager-application-share.herokuapp.com/api/task', 
      postData,
      {
        headers: new HttpHeaders({
          'access': this.token['accessToken'],
          'refresh': this.token['refreshToken']
        })
      }
    ).subscribe(responseData => {
      alert(`Your recipe of ${responseData['title']} was successfully created`)
      setTimeout(() => { this.goToList() }, 1000);
    }, error => {
      document.getElementById("warning-alert").innerHTML = error.error;
      document.getElementById("warning-alert").style.display = "block";
      setTimeout(() => {
        document.getElementById("warning-alert").style.display = "none";
      },2000);
    })
  }
}
