import { AbstractControl, FormControl, FormGroup } from '@angular/forms';
import { TranslateService } from '@ngx-translate/core';
import { BehaviorSubject, Subject } from 'rxjs';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class PublicService {
  show_loader = new Subject<boolean>();
  showSearchLoader = new Subject<boolean>();
  resetTable = new BehaviorSubject<boolean>(false);
  changePageSub = new BehaviorSubject<{}>({});

  // ====Start Employees and Vehicles actions=========
  isLoadingEmployees = new BehaviorSubject<boolean>(false);
  isLoadingSearchEmployees = new BehaviorSubject<boolean>(false);
  employeesLength = new BehaviorSubject<{}>(null);
  isLoadingVehicles = new BehaviorSubject<boolean>(false);
  addItem = new BehaviorSubject<boolean>(false);
  resetData = new BehaviorSubject<boolean>(false);
  filterData = new BehaviorSubject<boolean>(false);
  searchData = new BehaviorSubject<{}>(null);
  toggleDataType = new BehaviorSubject<{}>(null);
  // ====End Employees and Vehicles actions=========

  constructor(
    private translate: TranslateService,
  ) { }
  translateTextFromJson(text: string): any {
    return this.translate.instant(text);
  }
  createGoogleMapsLink(latitude: number, longitude: number): string {
    const baseUrl = "https://www.google.com/maps/search/?api=1&query=";
    return `${baseUrl}${latitude},${longitude}`;
  }
  clearValidationErrors(control: AbstractControl): void {
    control.markAsPending();
  }
  validateAllFormFields(form: any): void {
    Object.keys(form.controls).forEach(field => {
      const control = form.get(field);
      if (control instanceof FormControl) {
        control.markAsTouched({ onlySelf: true });
      } else if (control instanceof FormGroup) {
        this.validateAllFormFields(control);
      }
    });
  }
}
