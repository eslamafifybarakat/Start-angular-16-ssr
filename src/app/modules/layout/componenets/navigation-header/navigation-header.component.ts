import { ChangeDetectorRef } from "@angular/core";
import { Component } from '@angular/core';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-navigation-header',
  templateUrl: './navigation-header.component.html',
  styleUrls: ['./navigation-header.component.scss']
})
export class NavigationHeaderComponent {
  private unsubscribe: Subscription[] = [];

  collapsed = false;
  userData: any = null;
  isloggedIn: boolean = false;

  constructor() { }

  ngOnInit(): void {
  }

  ngOnDestroy(): void {
    this.unsubscribe.forEach((sb) => sb.unsubscribe());
  }
}
