import { patterns } from './../../../../shared/configs/patterns';
import { PublicService } from './../../../../services/generic/public.service';
import { UploadMultiFilesComponent } from './../../../../shared/components/upload-multi-files/upload-multi-files.component';
import { FileUploadComponent } from './../../../../shared/components/file-upload/file-upload.component';
import { TranslateModule } from '@ngx-translate/core';
import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { CalendarModule } from 'primeng/calendar';

@Component({
  standalone: true,
  imports: [CommonModule, TranslateModule, FileUploadComponent, UploadMultiFilesComponent, CalendarModule, FormsModule, ReactiveFormsModule],
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
