import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { GeneralRoutingModule } from './general-routing.module';
import { MatStepperModule } from "@angular/material/stepper";
import { MatNativeDateModule } from '@angular/material/core';
import { NgCircleProgressModule } from 'ng-circle-progress';
import { MatSliderModule } from '@angular/material/slider';
import { MatDialogModule } from '@angular/material/dialog';
import { MatInputModule } from '@angular/material/input';
import { SharedModule } from '../shared/shared.module';
import { MatIconModule } from '@angular/material/icon';
import { MultiSelectModule } from 'primeng/multiselect';
import { PaginatorModule } from 'primeng/paginator';
import { DropdownModule } from 'primeng/dropdown';
import { PasswordModule } from 'primeng/password';
import { DividerModule } from "primeng/divider";
import { SidebarModule } from 'primeng/sidebar';
import { AccordionModule } from 'primeng/accordion';
import { CalendarModule } from 'primeng/calendar';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';

import { AvailableDoctorAppointmentsComponent } from './components/available-doctor-appointments/available-doctor-appointments.component';
import { TermsAndConditionsViewerComponent } from './components/terms-and-conditions-viewer/terms-and-conditions-viewer.component';
import { DoctorDetailsComponent } from './components/doctors/components/doctor-details/doctor-details.component';
import { DoctorRegiterationComponent } from './components/doctor-regiteration/doctor-regiteration.component';
import { DoctorsListComponent } from './components/doctors/components/doctors-list/doctors-list.component';
import { AddSocialModalComponent } from './components/add-social-modal/add-social-modal.component';
import { DownloadAppsComponent } from './components/download-apps/download-apps.component';
import { BlogDetailsComponent } from './blogs/blog-details/blog-details.component';
import { BlogsListComponent } from './blogs/blogs-list/blogs-list.component';
import { DoctorsComponent } from './components/doctors/doctors.component';
import { JoinUsComponent } from './components/join-us/join-us.component';
import { BlogsComponent } from './blogs/blogs.component';
import { GeneralComponent } from './general.component';
import { NoMinusDirective } from './directives/no-minus.directive';
import { PrivacyComponent } from './components/privacy/privacy.component';
import { FaqsComponent } from './components/faqs/faqs.component';
import { TermsAndConditionsComponent } from './components/terms-and-conditions/terms-and-conditions.component';
import { BrowseAllComponent } from './components/doctor-regiteration/components/browse-all/browse-all.component';
import { RatingModule } from 'primeng/rating';
import { DiscountPolicyComponent } from './components/discount-policy/discount-policy.component';

@NgModule({
  declarations: [
    AvailableDoctorAppointmentsComponent,
    TermsAndConditionsViewerComponent,
    DoctorRegiterationComponent,
    TermsAndConditionsComponent,
    AddSocialModalComponent,
    DoctorDetailsComponent,
    DownloadAppsComponent,
    DoctorsListComponent,
    BlogDetailsComponent,
    BlogsListComponent,
    DoctorsComponent,
    GeneralComponent,
    JoinUsComponent,
    BlogsComponent,
    NoMinusDirective,
    PrivacyComponent,
    FaqsComponent,
    BrowseAllComponent,
    DiscountPolicyComponent,
  ],
  imports: [
    NgCircleProgressModule.forRoot(),
    GeneralRoutingModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatFormFieldModule,
    MultiSelectModule,
    RatingModule,
    MatStepperModule,
    MatSliderModule,
    MatDialogModule,
    PaginatorModule,
    DropdownModule,
    PasswordModule,
    MatInputModule,
    DividerModule,
    SidebarModule,
    MatIconModule,
    CommonModule,
    SharedModule,
    FormsModule,
    CalendarModule,
    AccordionModule
  ]
})
export class GeneralModule { }
