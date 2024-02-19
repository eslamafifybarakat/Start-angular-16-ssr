import { AbstractControl, FormControl, FormGroup, Validators } from '@angular/forms';
import { TranslateService } from '@ngx-translate/core';
import { BehaviorSubject, Subject } from 'rxjs';
import { Inject, Injectable, PLATFORM_ID } from '@angular/core';
import * as moment from 'moment';
import { isPlatformBrowser } from '@angular/common';

@Injectable({
  providedIn: 'root'
})
export class PublicService {
  removeUploadImg = new BehaviorSubject<boolean>(false);
  placeCategoryDetails = new BehaviorSubject<any>({});
  pushUrlData = new BehaviorSubject<boolean>(false);
  userAuthenicationChanged = new Subject<boolean>();
  showMap = new BehaviorSubject<boolean>(false);
  scrollTop = new BehaviorSubject<boolean>(false);
  placeCategory = new BehaviorSubject<any>(null);
  show_loader = new Subject<boolean>();

  constructor(
    @Inject(PLATFORM_ID) private platformId: Object,
    private translate: TranslateService
  ) { }

  translateTextFromJson(text: string): any {
    return this.translate.instant(text);
  }
  toggleBodyScroll(enableScroll: boolean): void {
    if (enableScroll) {
      document?.documentElement?.classList?.remove('modal-open');
    } else {
      document?.documentElement?.classList?.add('modal-open');
    }
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
  addValidators(form: any, controls: string[], pattern?: any): any {
    controls.forEach(c => {
      form.get(c)?.setValidators(Validators.required, Validators.pattern(pattern));
      form.get(c)?.updateValueAndValidity();
    });
  }
  removeValidators(form: any, controls: string[]): any {
    controls.forEach(c => {
      form.get(c)?.clearValidators();
      form.get(c)?.updateValueAndValidity();
    });
  }

  convertTimeOrDate(value: any, type?: any): void {
    // var date2: any = moment(value)?.format('dddd, D MMM yy');
    var date2: any = moment(value)?.format('dddd, D MMMM yy');
    var date3: any = moment(value)?.format('DD/MM/YYYY');
    var date4: any = moment(value)?.format('DD-MM-YYYY');
    var date5: any = moment(value)?.format('YYYY/MM/DD');
    var date6: any = moment(value)?.format('YYYY-MM-DD');
    var date: any = moment(value)?.format(' D MMMM yy');
    var time: any = moment(value)?.format('hh:mm A');
    var birthDate: any = moment(value).format('D MMM yy');
    var appointmentDate: any = new Date(value);

    if (type == 'date') {
      return date;
    }
    if (type == 'date2') {
      return date2;
    }
    if (type == 'date3') {
      return date3;
    }
    if (type == 'date4') {
      return date4;
    }
    if (type == 'date5') {
      return date5;
    }
    if (type == 'date6') {
      return date6;
    }
    if (type == 'birthDate') {
      return birthDate;
    }
    if (type == 'time') {
      return time;
    }
    var optionsTime: any = {
      hour: '2-digit',
      minute: '2-digit',
      hour12: true
    };
    var optionsDate: any = {
      weekday: 'short',
      month: 'short',
      day: 'numeric'
    };

    if (type == 'appointmentDate') {
      return appointmentDate?.toLocaleString('en-US', optionsDate);
    }
    if (type = 'appointmentTime') {
      return appointmentDate?.toLocaleTimeString('en-US', optionsTime);
    }
  }

  getDateArrayFromDateRange(dateRange: string): Date[] {
    // dateRange = "2023/10/28-2023/12/01"
    // Split the date range string to get start and end dates
    const [start, end] = dateRange.split('-').map(dateStr => new Date(dateStr));
    const dateArray: Date[] = [];

    // Initialize a new date object with the start date
    let currentDate = new Date(start);

    // While the current date is less than or equal to the end date
    while (currentDate <= end) {
      // Push the current date to the array
      dateArray.push(new Date(currentDate));  // Push a new instance of the date to ensure original is not modified
      // Move to the next date
      currentDate.setDate(currentDate.getDate() + 1);
    }
    return dateArray;
  }
  addDays(dateStr: string, days: number): string {
    const date = new Date(dateStr);
    date.setDate(date.getDate() + days);
    // Format date as YYYY-MM-DD
    const formattedDate = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}`;
    return formattedDate;
  }

  getGenderOptions(): any {
    let arr: any = [
      {
        id: 1,
        title: "ذكر",
        // title: this.translateTextFromJson('gender.male'),
        value: 0
      },
      {
        id: 2,
        title: "أنثي",
        // title: this.translateTextFromJson('gender.female'),
        value: 1
      }
    ];
    return arr;
  }
  getSocialOptions(): any {
    let arr: any = [
      {
        id: 1,
        title: 'Facebook',
        value: 'facebook'
      },
      {
        id: 2,
        title: 'Linkedin',
        value: 'linkedin'
      },
      {
        id: 3,
        title: 'Youtube',
        value: 'youtube'
      },
      {
        id: 4,
        title: 'Twitter',
        value: 'twitter'
      },
      {
        id: 5,
        title: 'Instagram',
        value: 'instagram'
      }
    ];
    return arr;
  }
  getLanguages(): any {
    let arr: any = [
      {
        id: 1,
        title: 'عربي',
      },
      // {
      //   id: 2,
      //   title: 'انجليزي',
      // },
      // {
      //   id: 3,
      //   title: 'عربي-انجليزي',
      // }
    ];;
    return arr;
  }
  formatSizeUnits(size: any): void {
    if (size >= 1073741824) { size = (size / 1073741824).toFixed(2) + " GB"; }
    else if (size >= 1048576) { size = (size / 1048576).toFixed(2) + " MB"; }
    else if (size >= 1024) { size = (size / 1024).toFixed(2) + " KB"; }
    else if (size > 1) { size = size + " bytes"; }
    else if (size == 1) { size = size + " byte"; }
    else { size = "0 bytes"; }
    return size;
  }

  slicedData(data: any[], number: any): any[] {
    return data?.slice(0, number);
  }
  transformDecimalToInteger(value: number): number {
    return Math.round(value);
  }
  removeNonNumeric(input: string): string {
    return input.replace(/[^\d+.]/g, '');
  }
  getAllPrefixes(): void {
    let arr: any = [
      {
        id: 1,
        name: 'دكتور',
      },
      {
        id: 2,
        name: 'أخصائي',
      },
      {
        id: 2,
        name: 'إستشاري',
      },
    ];
    return arr;
  }
}
