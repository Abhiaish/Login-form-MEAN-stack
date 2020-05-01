import { NgModule } from '@angular/core';

import {Routes ,RouterModule} from '@angular/router';
import { SpecialEventsComponent } from './special-events/special-events.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { AuthGuard } from './auth.guard';


const routes : Routes = [
  {
    path:'',
    redirectTo:'/login',
    pathMatch:'full'
  },
{
  path:'special',
  component:SpecialEventsComponent,
  canActivate : [AuthGuard]
},
{
  path:'login',
  component:LoginComponent
},
{
  path:'register',
  component:RegisterComponent
}
]
@NgModule({
  declarations: [],
  imports: [
  RouterModule.forRoot(routes),
],
  exports:[RouterModule]
})
export class AppRoutingModule { }
