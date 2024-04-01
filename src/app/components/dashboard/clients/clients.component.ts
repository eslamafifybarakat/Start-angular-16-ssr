import { ClientsList } from './../../../interfaces/dashboard/clients';
import { ClientsService } from './../services/clients.service';
import { DialogService } from 'primeng/dynamicdialog';
import { DynamicTableLocalActionsComponent } from './../../../shared/components/dynamic-table-local-actions/dynamic-table-local-actions.component';
import { PublicService } from './../../../services/generic/public.service';
import { DynamicTableComponent } from './../../../shared/components/dynamic-table/dynamic-table.component';
import { CommonModule } from '@angular/common';
import { ChangeDetectorRef, Component } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { AddEditClientComponent } from './add-edit-client/add-edit-client.component';
import { Router, RouterModule } from '@angular/router';
import { ClientCardComponent } from './client-card/client-card.component';
import { Subject, debounceTime, finalize, map } from 'rxjs';
import { SidebarModule } from 'primeng/sidebar';
import { FilterClientsComponent } from './filter-clients/filter-clients.component';

@Component({
  standalone: true,
  imports: [CommonModule, RouterModule, DynamicTableComponent, TranslateModule, CommonModule, DynamicTableLocalActionsComponent, ClientCardComponent, SidebarModule, FilterClientsComponent],
  selector: 'app-clients',
  templateUrl: './clients.component.html',
  styleUrls: ['./clients.component.scss']
})
export class ClientsComponent {

}
