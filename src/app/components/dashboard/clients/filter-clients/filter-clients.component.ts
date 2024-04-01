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
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';

@Component({
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule, TranslateModule, CommonModule, CalendarModule], selector: 'filter-clients',
  templateUrl: './filter-clients.component.html',
  styleUrls: ['./filter-clients.component.scss']
})
export class FilterClientsComponent {
  private subscriptions: Subscription[] = [];

  modalForm = this.fb?.group(
    {
      fullName: ['', {
        validators: [
          Validators?.minLength(3)], updateOn: "blur"
      }],
      id: ['', {
        validators: [], updateOn: "blur"
      }],
      phoneNumber: ['', {
        validators: [
          Validators.required, Validators.pattern(patterns?.phone)], updateOn: "blur"
      }],
      birthDate: [null, {
        validators: []
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
    private config: DynamicDialogConfig,
    private ref: DynamicDialogRef,
    public fb: FormBuilder,
  ) { }

  submit(): any {
    let data = {
      fullName: this.modalForm?.value?.fullName,
      mobileNumber: this.modalForm?.value?.phoneNumber,
      id: this.modalForm?.value?.id,
      birthDate: this.modalForm?.value?.birthDate
    };
    let conditions = [];
    for (const [key, value] of Object.entries(data)) {
      // Check if the value exists and is not empty
      if (value) {
        // Determine the operator based on the type of data
        const operator = (typeof value === 'string') ? 'startsWith' : 'dateIs';
        // Push the condition object into the conditions array
        conditions.push({ "column": key, "type": typeof value, "data": value, "operator": operator });
      }
    }
    this.ref.close({ conditions: conditions });
    // conditions: [{ "column": "fullName", "type": "text", "data": "lll", "operator": "startsWith" }, { "column": "id", "type": "text", "data": "oo", "operator": "startsWith" }, { "column": "birthDate", "type": "date", "data": "2024-04-22T22:00:00.000Z", "operator": "dateIs" }, { "column": "mobileNumber", "type": "text", "data": "555", "operator": "startsWith" }]
  }

  close(): void {
    this.ref.close();
  }
  ngOnDestroy(): void {
    this.subscriptions.forEach((subscription: Subscription) => {
      if (subscription && subscription.closed) {
        subscription.unsubscribe();
      }
    });
  }
}
