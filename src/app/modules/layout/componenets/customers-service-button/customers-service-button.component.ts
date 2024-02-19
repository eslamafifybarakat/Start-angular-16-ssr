import { PublicService } from './../../../shared/services/public.service';
import { Component, OnInit } from "@angular/core";

@Component({
  selector: 'app-customers-service-button',
  templateUrl: './customers-service-button.component.html',
  styleUrls: ['./customers-service-button.component.scss']
})
export class CustomersServiceButtonComponent {
  whatsPhoneNum: any = "+966552272756";
  scrollTop: boolean = false;

  constructor(
    private publicService: PublicService
  ) { }

  ngOnInit(): void {
    this.publicService?.scrollTop?.subscribe((res: any) => {
      if (res) {
        this.scrollTop = res;
      } else {
        this.scrollTop = false;
      }
    })
  }
}
