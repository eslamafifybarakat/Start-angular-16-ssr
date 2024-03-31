import { PublicService } from './../../../../services/generic/public.service';
import { UploadMultiFilesComponent } from './../../../../shared/components/upload-multi-files/upload-multi-files.component';
import { FileUploadComponent } from './../../../../shared/components/file-upload/file-upload.component';
import { TranslateModule } from '@ngx-translate/core';
import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';

@Component({
  standalone: true,
  imports: [CommonModule, TranslateModule, FileUploadComponent, UploadMultiFilesComponent],
  selector: 'app-edit-client',
  templateUrl: './edit-client.component.html',
  styleUrls: ['./edit-client.component.scss']
})
export class EditClientComponent {
  isEditFile: boolean = false;
  imageSrc: string = '';
  // imageSrc: string = 'assets/images/home/sidebar-bg.webp';

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
          Validators.required], updateOn: "blur"
      }],

      birthDate: [null, {
        validators: [
          Validators.required]
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
  uploadFile(event: any): void {
    console.log(event);
  }
}
