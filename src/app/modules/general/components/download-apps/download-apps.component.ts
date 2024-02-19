import { Component } from '@angular/core';
import { DynamicDialogRef } from 'primeng/dynamicdialog';

@Component({
  selector: 'app-download-apps',
  templateUrl: './download-apps.component.html',
  styleUrls: ['./download-apps.component.scss']
})
export class DownloadAppsComponent {

  constructor(
    private ref: DynamicDialogRef
  ) { }

  ngOnInit(): void { }

  close(): void {
    this.ref?.close();
  }
  goNow(): void {
    this.ref.close();
  }
}
