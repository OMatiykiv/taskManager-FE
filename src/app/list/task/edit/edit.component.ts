import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { StorageService } from '../../../storage.service';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css']
})
export class EditComponent implements OnInit {
  id: string;
  task: {} = '';
  token: {};

  constructor(
    private http: HttpClient,
    private router: Router,
    private storageService: StorageService
  ) { }

  ngOnInit() {
    this.token = this.storageService.getToken()
    this.id = this.router.url.substring(this.router.url.lastIndexOf('/') + 1);
    if(!this.task) {
      this.getTask()
    }
  }

  getTask() {
    this.http.get(
      `https://task-manager-application-share.herokuapp.com/api/task/${this.id}`,
      {
        headers: new HttpHeaders({
          'access': this.token['accessToken'],
          'refresh': this.token['refreshToken']
        })
      }
    ).subscribe(task => {
      this.task = task
    }, error => {
      document.getElementById("warning-alert").innerHTML = error.error;
      document.getElementById("warning-alert").style.display = "block";
      setTimeout(() => {
        document.getElementById("warning-alert").style.display = "none";
      },2000);
    })
  }

  goToList(){
    this.router.navigate(['/list']);
  }

  editTask(putData : {title: string, status: string, description: string}) { 
    this.http.put(
      `https://task-manager-application-share.herokuapp.com/api/task/${this.id}`, 
      putData,
      {
        headers: new HttpHeaders({
          'access': this.token['accessToken'],
          'refresh': this.token['refreshToken']
        })
      }
    ).subscribe(responseData => {
      alert(`Your task was successfully updated`)
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
