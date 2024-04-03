import { PublicService } from './../../../services/generic/public.service';
import { TranslateModule } from '@ngx-translate/core';
import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  standalone: true,
  imports: [CommonModule, TranslateModule],
  selector: 'search-overlay-loading',
  templateUrl: './search-overlay-loading.component.html',
  styleUrls: ['./search-overlay-loading.component.scss']
})
export class SearchOverlayLoadingComponent {
  show_overlay: boolean = false;
  constructor(private publicService: PublicService) { }

  ngOnInit(): void {
    this.publicService.show_loader.subscribe((res: any) => {
      if (res == true) {
        this.show_overlay = true;
      } else {
        this.show_overlay = false;
      }
    });
  }
}
