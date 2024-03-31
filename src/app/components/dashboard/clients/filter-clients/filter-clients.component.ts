import { FormBuilder, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { ChangeDetectorRef, Component, EventEmitter, Output } from '@angular/core';
import { AlertsService } from './../../../../services/generic/alerts.service';
import { PublicService } from './../../../../services/generic/public.service';
import { patterns } from './../../../../shared/configs/patterns';
import { ClientsService } from '../../services/clients.service';
import { TranslateModule } from '@ngx-translate/core';
import { CalendarModule } from 'primeng/calendar';
import { CommonModule } from '@angular/common';
import { Subscription } from 'rxjs';

@Component({
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule, TranslateModule, CommonModule, CalendarModule], selector: 'filter-clients',
  templateUrl: './filter-clients.component.html',
  styleUrls: ['./filter-clients.component.scss']
})
export class FilterClientsComponent {
  private subscriptions: Subscription[] = [];
  @Output() closeSidebar = new EventEmitter();

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
          Validators.required, Validators.pattern(patterns?.phone)], updateOn: "blur"
      }],
      birthDate: [null, {
        validators: [
          Validators.required]
      }],

    }
  );
  get formControls(): any {
    return this.modalForm?.controls;
  }
  constructor(
    private clientsService: ClientsService,
    public alertsService: AlertsService,
    public publicService: PublicService,
    private cdr: ChangeDetectorRef,
    public fb: FormBuilder,
  ) { }

  submit(): void {
    if (this.modalForm?.valid) {
      const formData = this.extractFormData();
      this.handleClientFiltering(formData);
    } else {
      this.publicService?.validateAllFormFields(this.modalForm);
    }
  }
  private extractFormData(): any {
    return {
      fullName: this.modalForm?.value?.fullName,
      mobileNumber: this.modalForm?.value?.phoneNumber,
      id: this.modalForm?.value?.id,
      birthDate: this.modalForm?.value?.birthDate
    };
  }
  private handleClientFiltering(formData: any): void {
    this.publicService?.show_loader?.next(true);
    let subscribeFilter = this.clientsService?.filterClientsList(formData)?.subscribe(
      (res: any) => {
        this.handleFilteringSuccess(res);
      },
      (err: any) => {
        this.handleFilteringError(err);
      }
    );
    this.subscriptions.push(subscribeFilter);
  }
  private handleFilteringSuccess(response: any): void {
    this.publicService?.show_loader?.next(false);
    if (response?.isSuccess && response?.statusCode === 200) {
      response?.message ? this.alertsService?.openToast('success', 'success', response?.message) : '';
    } else {
      response?.message ? this.alertsService?.openToast('error', 'error', response?.message) : '';
    }
  }
  private handleFilteringError(error: any): void {
    this.publicService?.show_loader?.next(false);
    error?.message ? this.alertsService?.openToast('error', 'error', error?.message) : '';
  }

  cancel(): void {
    this.closeSidebar.emit();
  }
  ngOnDestroy(): void {
    this.subscriptions.forEach((subscription: Subscription) => {
      if (subscription && subscription.closed) {
        subscription.unsubscribe();
      }
    });
  }
}
