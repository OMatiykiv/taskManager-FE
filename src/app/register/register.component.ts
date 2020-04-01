import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { StorageService } from '../storage.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  constructor(
    private http: HttpClient,
    private storageService: StorageService,
    private router: Router
  ) { }

  ngOnInit() {
  }

  register(postData: {name: string, mail: string, password: string}) {
    this.http.post('https://task-manager-application-share.herokuapp.com/api/user/register',
    postData
    ).subscribe(res => {
      this.router.navigate(['/login']);
    }, error => {
      document.getElementById("warning-alert").innerHTML = error.error;
      document.getElementById("warning-alert").style.display = "block";
      setTimeout(() => {
        document.getElementById("warning-alert").style.display = "none";
      },2000);
    })
  }

}
