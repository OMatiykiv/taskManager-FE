import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { StorageService } from '../../../storage.service';

@Component({
  selector: 'app-share',
  templateUrl: './share.component.html',
  styleUrls: ['./share.component.css']
})
export class ShareComponent implements OnInit {
  id: string;
  mail: string;
  token: {};

  constructor(
    private http: HttpClient,
    private router: Router,
    private storageService: StorageService
  ) { }

  ngOnInit() {
    this.token = this.storageService.getToken();
    this.id = this.router.url.substring(this.router.url.lastIndexOf('/') + 1);
  }

  goToList(){
    this.router.navigate(['/list']);
  }

  shareTask(putData: {mail: string}) {   
    console.log(putData.mail)
    console.log(this.id)
    this.http.put(
      `https://task-manager-application-share.herokuapp.com/api/task/share/${this.id}`, 
      putData,
      {
        headers: new HttpHeaders({
          'access': this.token['accessToken'],
          'refresh': this.token['refreshToken']
        })
      }
    ).subscribe(responseData => {
      alert(`Your successfully invite user to the task`)
      this.goToList()
    }, error => {
      document.getElementById("warning-alert").innerHTML = error.error;
      document.getElementById("warning-alert").style.display = "block";
      setTimeout(() => {
        document.getElementById("warning-alert").style.display = "none";
      },2000);
    })
  }
}
