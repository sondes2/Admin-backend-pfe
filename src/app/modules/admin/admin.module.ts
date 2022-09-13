import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {AdminRoutingModule} from './admin-routing.module';
import {AdminDashboardComponent} from './components/admin-dashboard/admin-dashboard.component';
import {HeaderComponent} from './components/header/header.component';
import {FooterComponent} from './components/footer/footer.component';
import {HomeComponent} from './components/home/home.component';
import {ContactComponent} from './components/contact/contact.component';
import {ServicesComponent} from './components/services/services.component';
import {AboutComponent} from './components/about/about.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {GoupeManagementComponent} from "./components/goupe-management/goupe-management.component";
import {NgbDropdownModule} from "@ng-bootstrap/ng-bootstrap";
import { TaskManagementComponent } from './components/task-management/task-management.component';


@NgModule({
  declarations: [
    AdminDashboardComponent,
    HeaderComponent,
    FooterComponent,
    HomeComponent,
    ContactComponent,
    ServicesComponent,
    GoupeManagementComponent,
    AboutComponent,
    TaskManagementComponent],
    imports: [CommonModule, AdminRoutingModule, ReactiveFormsModule, FormsModule, NgbDropdownModule,],
})
export class AdminModule {
}
