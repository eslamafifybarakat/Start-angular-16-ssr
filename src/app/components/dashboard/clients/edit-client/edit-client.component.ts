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
  isRegistrationNumberReadOnly: boolean = true;
  isRecordDateReadOnly: boolean = true;
  isEditRegistrationFile: boolean = false;

  details: any = {
    registrationNumber: '332111111',
    recordDate: new Date(),
    registrationFile: 'assets/images/home/sidebar-bg.webp',
  };
  registrationFile: string = '';
  // imageSrc: string = 'assets/images/home/sidebar-bg.webp';

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
      id: ['', {
        validators: [
          Validators.required], updateOn: "blur"
      }],
      phoneNumber: ['', {
        validators: [
          Validators.required], updateOn: "blur"
      }],

      country: [null, {
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
  uploadFile(event: any): void {
    console.log(event);
  }
  patchValue(): void {
    this.modalForm?.patchValue({
      registrationNumber: this.details?.registrationNumber,
      recordDate: this.details?.recordDate,
    })
    this.isEditRegistrationFile = true;
    this.registrationFile = this.details?.registrationFile;
  }
  editInput(name: string): void {
    if (name == 'registrationNumber') {
      this.isRegistrationNumberReadOnly = false;
    }
    if (name == 'recordDate') {
      this.isRecordDateReadOnly = false;
    }
  }

}
