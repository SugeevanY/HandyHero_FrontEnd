import { Routes } from '@angular/router';
import {LoginComponent} from "./login/login.component";
import {SignupComponent} from "./signup/signup.component";
import {LandingComponent} from "./landing/landing.component";
import {AuthLayoutComponent} from "./auth-layout/auth-layout.component"
import {OTPVerificationComponent} from "./otpverification/otpverification.component";
import {DashboardLayoutComponent} from "./dashboard-layout/dashboard-layout.component";
import {ProjectsComponent} from "./customer/projects/projects.component";
import {FindComponent} from "./customer/find/find.component";
import {PaymentComponent} from "./customer/payment/payment.component";
import {ChatComponent} from "./chat/chat.component";
import {ComplaintComponent} from "./complaint/complaint.component";
import {RouteGuard} from "../Common/RouteGuard";
import {WorkerRequestComponent} from "./Admin/worker-request/worker-request.component";
import {WorkersComponent} from "./Admin/workers/workers.component";
import {UsersComponent} from "./Admin/users/users.component";
import { ProjectRequestComponent } from './FieldWorker/projectrequest/projectrequest.component';
import { ReviewComponent } from './customer/review/review.component';
import { GettingReviewComponent } from './Admin/getting-review/getting-review.component';
import {ForgotPasswordComponent} from "./forgot-password/forgot-password.component";
import {ResetPasswordComponent} from "./reset-password/reset-password.component";
import {StarRatingComponent} from "./star-rating/star-rating.component";



export const routes: Routes = [
  {
    path:'auth',
    component: AuthLayoutComponent,
    children: [
      {path:'login', component: LoginComponent},
      {path: 'signup', component: SignupComponent},
      {path: 'OTP-Verification', component:OTPVerificationComponent},
      {path: 'ForgotPassword', component:ForgotPasswordComponent},
      {path: 'ResetPassword', component:ResetPasswordComponent}
    ]
  },
  {
    path:'dashboard',
    component: DashboardLayoutComponent,
    canActivate: [RouteGuard],
    children: [
      {path: 'projects', component: ProjectsComponent},
      {path: 'find', component: FindComponent},
      {path: 'payment', component: PaymentComponent},
      {path:'chat', component: ChatComponent},
      {path: 'complaint', component: ComplaintComponent},
      {path: 'Review', component: ReviewComponent},
      {path: 'starrating',component: StarRatingComponent}
    ]
  },
  {
    path: "dashboard",
    component: DashboardLayoutComponent,
    canActivate: [RouteGuard],
    children: [
      {path: 'requests', component: WorkerRequestComponent},
      {path: 'fieldWorkers', component: WorkersComponent},
      {path: 'users', component: UsersComponent},
      {path: 'GettingReview', component: GettingReviewComponent},
      {path: 'complaint', component: ComplaintComponent},
      {path: 'projectrequest', component: ProjectRequestComponent},
    ]
  },
  {path:'', component:LandingComponent, pathMatch:'full'},
  {path:'**',component:LoginComponent}
];
