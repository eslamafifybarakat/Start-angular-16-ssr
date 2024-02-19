import { PublicService } from './../shared/services/public.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss']
})
export class LayoutComponent implements OnInit {
  page: any;

  constructor(
    private publicService: PublicService
  ) { }

  ngOnInit(): void {
    this.publicService?.pushUrlData?.subscribe((res: any) => {
      this.page = res.page;
    });
  }
}
