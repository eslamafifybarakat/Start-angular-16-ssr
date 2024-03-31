import { UploadMultiFilesComponent } from './../../../../shared/components/upload-multi-files/upload-multi-files.component';
import { FileUploadComponent } from './../../../../shared/components/file-upload/file-upload.component';
import { TranslateModule } from '@ngx-translate/core';
import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

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
  uploadFile(event: any): void {
    console.log(event);
  }
}
