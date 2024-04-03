import { PublicService } from './../../../../services/generic/public.service';
import { UploadMultiFilesComponent } from '../../../../shared/components/upload-files/upload-multi-files/upload-multi-files.component';
import { FileUploadComponent } from '../../../../shared/components/upload-files/file-upload/file-upload.component';
import { TranslateModule } from '@ngx-translate/core';
import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { CalendarModule } from 'primeng/calendar';
import { MaxDigitsDirective } from '../../directives/max-digits.directive';

@Component({
  standalone: true,
  imports: [
    CommonModule, TranslateModule, FileUploadComponent, UploadMultiFilesComponent, CalendarModule, FormsModule, ReactiveFormsModule,
    // Directive
    MaxDigitsDirective
  ],
  selector: 'app-edit-client',
  templateUrl: './edit-client.component.html',
  styleUrls: ['./edit-client.component.scss']
})
export class EditClientComponent {
  isRegistrationNumberReadOnly: boolean = true;
  isRecordDateReadOnly: boolean = true;
  isLicenseNumberReadOnly: boolean = true;
  isLicenseDateReadOnly: boolean = true;
  isCertificateNumberReadOnly: boolean = true;
  isCertificateDateReadOnly: boolean = true;
  isMedicalInsuranceNumberReadOnly: boolean = true;
  isMedicalInsuranceDateReadOnly: boolean = true;
  isBusinessLicenseReadOnly: boolean = true;
  isBusinessLicenseNumberReadOnly: boolean = true;

  details: any = {
    registrationNumber: '2135836527289',
    recordDate: new Date(),
    registrationFile: 'assets/images/home/sidebar-bg.webp',

    licenseDate: new Date(),
    licenseNumber: '135836527289',
    licenseFile: 'assets/images/home/sidebar-bg.webp',

    certificateDate: new Date(),
    certificateNumber: '135836527289',
    certificateFile: 'assets/images/home/sidebar-bg.webp',

    medicalInsuranceDate: new Date(),
    medicalInsuranceNumber: '135836527289',

    businessLicense: "business License 1",
    businessLicenseNumber: "135836527289"
  };

  isEditRegistrationFile: boolean = false;
  registrationFile: string = '';

  isEditLicenseFile: boolean = false;
  licenseFile: string = '';

  isEditCertificateFile: boolean = false;
  certificateFile: string = '';

  modalForm = this.fb?.group(
    {
      registrationNumber: ['', {
        validators: [
          Validators.required], updateOn: "blur"
      }],
      recordDate: [null, {
        validators: [
          Validators.required]
      }],
      licenseNumber: ['', {
        validators: [
          Validators.required], updateOn: "blur"
      }],
      licenseDate: [null, {
        validators: [
          Validators.required]
      }],
      certificateNumber: ['', {
        validators: [
          Validators.required], updateOn: "blur"
      }],
      certificateDate: [null, {
        validators: [
          Validators.required]
      }],
      medicalInsuranceNumber: ['', {
        validators: [
          Validators.required], updateOn: "blur"
      }],
      medicalInsuranceDate: [null, {
        validators: [
          Validators.required]
      }],
      businessLicense: ['', {
        validators: [
          Validators.required], updateOn: "blur"
      }],
      businessLicenseNumber: ['', {
        validators: [
          Validators.required], updateOn: "blur"
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
  uploadFile(event: any): void {
    console.log(event);
  }
  patchValue(): void {
    this.modalForm?.patchValue({
      registrationNumber: this.details?.registrationNumber,
      recordDate: this.details?.recordDate,
      licenseNumber: this.details?.registrationNumber,
      licenseDate: this.details?.recordDate,
      certificateNumber: this.details?.certificateNumber,
      certificateDate: this.details?.certificateDate,
      medicalInsuranceNumber: this.details?.medicalInsuranceNumber,
      medicalInsuranceDate: this.details?.medicalInsuranceDate,
      businessLicenseNumber: this.details?.businessLicenseNumber,
      businessLicense: this.details?.businessLicense,
    })
    this.isEditRegistrationFile = true;
    this.registrationFile = this.details?.registrationFile;
    this.isEditLicenseFile = true;
    this.licenseFile = this.details?.licenseFile;
    this.isEditCertificateFile = true;
    this.certificateFile = this.details?.licenseFile;
  }
  editInput(name: string): void {
    if (name == 'registrationNumber') {
      this.isRegistrationNumberReadOnly = false;
    }
    if (name == 'recordDate') {
      this.isRecordDateReadOnly = false;
    }
    if (name == 'licenseNumber') {
      this.isLicenseNumberReadOnly = false;
    }
    if (name == 'licenseDate') {
      this.isLicenseDateReadOnly = false;
    }
    if (name == 'certificateNumber') {
      this.isCertificateNumberReadOnly = false;
    }
    if (name == 'certificateDate') {
      this.isCertificateDateReadOnly = false;
    }
    if (name == 'medicalInsuranceNumber') {
      this.isMedicalInsuranceNumberReadOnly = false;
    }
    if (name == 'medicalInsuranceDate') {
      this.isMedicalInsuranceDateReadOnly = false;
    }
    if (name == 'businessLicense') {
      this.isBusinessLicenseReadOnly = false;
    }
    if (name == 'businessLicenseNumber') {
      this.isBusinessLicenseNumberReadOnly = false;
    }
  }

}
