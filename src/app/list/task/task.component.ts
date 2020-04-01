import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router'

@Component({
  selector: 'app-task',
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.css']
})
export class TaskComponent implements OnInit {
  @Input() task: {}

  constructor(private router: Router) { }

  ngOnInit() {
  }

  toEdit(task){
    this.router.navigate(['/edit', task._id]);
  }

  toShare(task){
    this.router.navigate(['/share', task._id]);
  }

}
