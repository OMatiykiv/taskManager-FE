import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';
import { ListComponent } from './list/list.component';
import { NewComponent } from './list/new/new.component';
import { EditComponent } from './list/task/edit/edit.component';
import { ShareComponent } from './list/task/share/share.component';


const routes: Routes = [
  { path: '', component: RegisterComponent },
  { path: 'login', component: LoginComponent },
  { path: 'list', component: ListComponent },
  { path: 'new', component: NewComponent },
  { path: 'edit/:id', component: EditComponent },
  { path: 'share/:id', component: ShareComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
