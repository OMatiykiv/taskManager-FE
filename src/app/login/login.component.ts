import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { StorageService } from '../storage.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(
    private http: HttpClient,
    private storageService: StorageService,
    private router: Router
  ) { }

  ngOnInit() {
  }

  login(postData: {name: string, password: string}) {
    this.http.post('https://task-manager-application-share.herokuapp.com/api/user/login',
    postData
    ).subscribe(res => {
      this.storageService.saveToken(res);
      this.router.navigate(['/list']);
    }, error => {
      document.getElementById("warning-alert").innerHTML = error.error;
      document.getElementById("warning-alert").style.display = "block";
      setTimeout(() => {
        document.getElementById("warning-alert").style.display = "none";
      },2000);
    })
  }

}
