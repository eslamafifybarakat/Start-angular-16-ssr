// Modules
import { TranslateModule } from '@ngx-translate/core';
import { CalendarModule } from 'primeng/calendar';
import { CommonModule } from '@angular/common';

// Components
import { UploadMultiFilesComponent } from './../../../../shared/components/upload-multi-files/upload-multi-files.component';

//Services
import { FormBuilder, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { PublicService } from './../../../../services/generic/public.service';
import { patterns } from './../../../../shared/configs/patterns';
import { Component } from '@angular/core';

@Component({
  standalone: true,
  imports: [
    // Modules
    ReactiveFormsModule,
    TranslateModule,
    CalendarModule,
    CommonModule,
    FormsModule,

    // Components
    UploadMultiFilesComponent,
  ],
  selector: 'app-edit-client',
  templateUrl: './edit-client.component.html',
  styleUrls: ['./edit-client.component.scss']
})
export class EditClientComponent {
  isFullNameReadOnly: boolean = true;
  isIdReadOnly: boolean = true;
  isPhoneNumberReadOnly: boolean = true;
  isEmailReadOnly: boolean = true;
  isBirthDateReadOnly: boolean = true;

  details: any = {
    fullName: 'Ahmed Ibrahim',
    id: '3448484874874',
    phoneNumber: '432222222',
    email: 'ahmedIbrahim@amil.com',
    birthDate: new Date(),
  };
  modalForm = this.fb?.group(
    {
      fullName: ['', {
        validators: [
          Validators.required,
          Validators?.minLength(3)], updateOn: "blur"
      }],
      id: ['', {
        validators: [
          Validators.required], updateOn: "blur"
      }],
      phoneNumber: ['', {
        validators: [
          Validators.required, Validators.pattern(patterns?.phone)], updateOn: "blur"
      }],
      email: ['', {
        validators: [
          Validators.required, Validators.pattern(patterns?.email)], updateOn: "blur"
      }],
      birthDate: [null, {
        validators: [
          Validators.required]
      }],
    }
  );

  get formControls(): any {
    return this.modalForm?.controls;
  }
  constructor(
    public publicService: PublicService,
    private fb: FormBuilder,
  ) { }
  ngOnInit(): void {
    this.patchValue();
  }

  patchValue(): void {
    this.modalForm?.patchValue({
      fullName: this.details?.fullName,
      id: this.details?.id,
      phoneNumber: this.details?.phoneNumber,
      birthDate: this.details?.birthDate,
      email: this.details?.email,
    })
  }
  editInput(name: string): void {
    if (name == 'fullName') {
      this.isFullNameReadOnly = false;
    }
    if (name == 'id') {
      this.isIdReadOnly = false;
    }
    if (name == 'birthDate') {
      this.isBirthDateReadOnly = false;
    }
    if (name == 'phoneNumber') {
      this.isPhoneNumberReadOnly = false;
    }
    if (name == 'email') {
      this.isEmailReadOnly = false;
    }
  }

}
