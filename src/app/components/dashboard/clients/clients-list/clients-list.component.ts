// Modules
import { TranslateModule } from '@ngx-translate/core';
import { SidebarModule } from 'primeng/sidebar';
import { CommonModule } from '@angular/common';

// Components
import { DynamicTableLocalActionsComponent } from './../../../../shared/components/dynamic-table-local-actions/dynamic-table-local-actions.component';
import { DynamicTableComponent } from './../../../../shared/components/dynamic-table/dynamic-table.component';
import { AddEditClientComponent } from '../add-edit-client/add-edit-client.component';
import { FilterClientsComponent } from '../filter-clients/filter-clients.component';
import { ClientCardComponent } from './../client-card/client-card.component';

//Services
import { AlertsService } from './../../../../services/generic/alerts.service';
import { PublicService } from './../../../../services/generic/public.service';
import { ClientsList } from './../../../../interfaces/dashboard/clients';
import { catchError, debounceTime, finalize, map, tap } from 'rxjs/operators';
import { ClientsService } from '../../services/clients.service';
import { ChangeDetectorRef, Component } from '@angular/core';
import { DialogService } from 'primeng/dynamicdialog';
import { Subject, Subscription } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  standalone: true,
  imports: [
    // Modules
    TranslateModule,
    SidebarModule,
    CommonModule,
    CommonModule,

    // Components
    DynamicTableLocalActionsComponent,
    DynamicTableComponent,
    ClientCardComponent,
  ],
  selector: 'app-clients-list',
  templateUrl: './clients-list.component.html',
  styleUrls: ['./clients-list.component.scss']
})
export class ClientsListComponent {
  private subscriptions: Subscription[] = [];

  dataStyleType: string = 'list';

  isLoadingSearch: boolean = false;
  isSearch: boolean = false;
  isLoadingFileDownload: boolean = false;

  isLoadingClientsList: boolean = false;
  clientsList: ClientsList[] = [];
  clientsCount: number = 0;
  tableHeaders: any = [];

  page: number = 1;
  perPage: number = 5;
  pagesCount: number = 0;
  rowsOptions: number[] = [5, 10, 15, 30];

  enableSortFilter: boolean = true;
  searchKeyword: any = null;
  filtersArray: any = [];
  sortObj: any = {};

  showActionTableColumn: boolean = false;
  showEditAction: boolean = false;
  showToggleAction: boolean = false;
  showActionFiles: boolean = false;

  private searchSubject = new Subject<any>();
  openFilter: boolean = false;
  constructor(
    private clientsService: ClientsService,
    private publicService: PublicService,
    private dialogService: DialogService,
    private alertsService: AlertsService,
    private cdr: ChangeDetectorRef,
    private router: Router
  ) { }
  ngOnInit(): void {
    this.tableHeaders = [
      { field: 'fullName', header: 'dashboard.tableHeader.name', title: this.publicService?.translateTextFromJson('dashboard.tableHeader.name'), type: 'text', sort: true, showDefaultSort: true, showAscSort: false, showDesSort: false, filter: true, },
      { field: 'id', header: 'dashboard.tableHeader.id', title: this.publicService?.translateTextFromJson('dashboard.tableHeader.id'), type: 'text', sort: true, showDefaultSort: true, showAscSort: false, showDesSort: false, filter: true, },
      { field: 'birthDate', header: 'dashboard.tableHeader.date', title: this.publicService?.translateTextFromJson('dashboard.tableHeader.date'), type: 'date', sort: true, showDefaultSort: true, showAscSort: false, showDesSort: false, filter: true, },
      { field: 'mobileNumber', header: 'dashboard.tableHeader.mobilePhone', title: this.publicService?.translateTextFromJson('dashboard.tableHeader.mobilePhone'), type: 'text', sort: true, showDefaultSort: true, showAscSort: false, showDesSort: false, filter: true, },
      // { field: 'status', header: 'dashboard.tableHeader.status', title: this.publicService?.translateTextFromJson('dashboard.tableHeader.status'), filter: false, type: 'filterArray', dataType: 'array', list: 'orderStatus', placeholder: this.publicService?.translateTextFromJson('placeholder.status'), label: this.publicService?.translateTextFromJson('labels.status'), status: true },
      // { field: 'propertyType', header: 'dashboard.tableHeader.propertyType', title: this.publicService?.translateTextFromJson('dashboard.tableHeader.propertyType'), sort: false, showDefaultSort: true, showAscSort: false, showDesSort: false, filter: true, type: 'filterArray', dataType: 'array', list: 'propertyType', placeholder: this.publicService?.translateTextFromJson('placeholder.propertyType'), label: this.publicService?.translateTextFromJson('labels.propertyType') },
    ];
    this.getAllClients();
    this.searchSubject
      .pipe(
        debounceTime(500) // Throttle time in milliseconds (1 seconds)
      )
      .subscribe(event => {
        this.searchHandler(event);
      });
  }
  // Toggle data style table or card
  changeDateStyle(type: string): void {
    this.dataStyleType = type;
  }
  // ======Start get all clients=========
  getAllClients(): void {
    this.isLoadingClientsList = true;
    this.clientsService?.getClientsList(this.page, this.perPage, this.searchKeyword, this.sortObj, this.filtersArray ?? null)
      .pipe(
        map((res: any) => this.processClientsListResponse(res)),
        catchError(err => this.handleError(err)),
        finalize(() => this.finalizeClientListLoading())
      ).subscribe();
  }
  private processClientsListResponse(response: any): void {
    if (response) {
      this.clientsCount = response.total;
      this.pagesCount = Math.ceil(this.clientsCount / this.perPage);
      this.clientsList = response.data;
      // return response.data.map((item: any) => ({
      //   id: item.id ?? null,
      //   fullName: item.fullName ?? '',
      //   birthDate: item.birthDate ?? '',
      //   mobileNumber: item.mobileNumber ?? '',
      // }))
    } else {
      this.handleError(response.error);
      return;
    }
  }
  private finalizeClientListLoading(): void {
    this.isLoadingClientsList = false;
    this.isLoadingSearch = false;
    this.enableSortFilter = false;
    setTimeout(() => {
      this.enableSortFilter = true;
    }, 200);
    this.setDummyData();
  }
  private setDummyData(): void {
    this.clientsList = [
      { fullName: "Ali Ahmed", mobileNumber: '01009887876', id: '33u2929899', birthDate: new Date() },
      { fullName: "Mohamed Ali", mobileNumber: '01009887876', id: '33u2929899', birthDate: new Date() },
      { fullName: "Celine Ahmed", mobileNumber: '01009887876', id: '33u2929899', birthDate: new Date() },
      { fullName: "Nour Ahmed", mobileNumber: '01009887876', id: '33u2929899', birthDate: new Date() },
      { fullName: "Kareem Ibrahim", mobileNumber: '01009887876', id: '33u2929899', birthDate: new Date() },
      { fullName: "Ahmed Ibrahim", mobileNumber: '01009887876', id: '33u2929899', birthDate: new Date() },
    ];
    this.clientsCount = 3225;
  }
  /* --- Handle api requests error messages --- */
  private handleError(err: any): any {
    this.alertsService?.openToast('error', 'error', err || 'An error has occurred');
    this.finalizeClientListLoading();
  }
  // ======End get all clients=========

  handleSearch(event: any): void {
    this.searchSubject.next(event);
  }
  searchHandler(keyWord: any): void {
    this.page = 1;
    this.perPage = 20;
    this.searchKeyword = keyWord;
    this.isLoadingClientsList = true;
    this.getAllClients();
    if (keyWord?.length > 0) {
      this.isLoadingSearch = true;
    }
    this.cdr.detectChanges();
  }
  // ======Start pagination==========
  onPageChange(e: any): void {
    this.page = e?.page + 1;
    //  this.getAllClients();
  }
  onPaginatorOptionsChange(e: any): void {
    this.perPage = e?.value;
    this.pagesCount = Math?.ceil(this.clientsCount / this.perPage);
    this.page = 1;
    // this.publicService?.changePageSub?.next({ page: this.page });
  }
  // ======End pagination==========

  itemDetails(item?: any): void {
  }

  addOrEditItem(item?: any, type?: any): void {
    const ref = this.dialogService?.open(AddEditClientComponent, {
      data: {
        item,
        type: type == 'edit' ? 'edit' : 'add'
      },
      header: type == 'edit' ? this.publicService?.translateTextFromJson('dashboard.customers.editCustomer') : this.publicService?.translateTextFromJson('dashboard.customers.addCustomer'),
      dismissableMask: false,
      width: '60%',
      styleClass: 'custom-modal',
    });
    ref.onClose.subscribe((res: any) => {
      if (res?.listChanged) {
        this.page = 1;
        // this.publicService?.changePageSub?.next({ page: this.page });
        this.getAllClients();
      }
    });
  }
  // Filter clients
  filterItem(): void {
    this.clearTable();
    const ref = this.dialogService?.open(FilterClientsComponent, {
      header: this.publicService?.translateTextFromJson('general.filter'),
      dismissableMask: false,
      width: '45%',
      styleClass: 'custom-modal',
    });
    ref.onClose.subscribe((res: any) => {
      if (res) {
        this.page = 1;
        this.filtersArray = res.conditions;
        // this.publicService?.changePageSub?.next({ page: this.page });
        this.getAllClients();
      }
    });
  }

  // Edit client
  editItem(item: any): void {
    this.router.navigate(['Dashboard/Clients/' + item.id]);
  }
  // Delete client
  deleteItem(item: any): void {

  }

  // Clear table
  clearTable(): void {
    this.searchKeyword = '';
    this.sortObj = {};
    this.filtersArray = [];
    this.page = 1;
    this.publicService.resetTable.next(true);
    // this.publicService?.changePageSub?.next({ page: this.page });
    this.getAllClients();
  }
  // Sort table
  sortItems(event: any): void {
    if (event?.order == 1) {
      this.sortObj = {
        column: event?.field,
        order: 'asc'
      }
      this.getAllClients();
    } else if (event?.order == -1) {
      this.sortObj = {
        column: event?.field,
        order: 'desc'
      }
      this.getAllClients();
    }
  }
  // filter table
  filterItems(event: any): void {
    this.filtersArray = [];
    Object.keys(event)?.forEach((key: any) => {
      this.tableHeaders?.forEach((colHeader: any) => {
        if (colHeader?.field == key) {
          event[key]?.forEach((record: any) => {
            record['type'] = colHeader?.type;
          });
        }
      });
    });
    Object.keys(event).forEach((key: any) => {
      event[key]?.forEach((record: any) => {
        if (record['type'] && record['value'] !== null) {
          let filterData;
          if (record['type'] == 'text' || record['type'] == 'date' || record['type'] == 'numeric' || record['type'] == 'status') {
            let data: any;
            if (record['type'] == 'date') {
              data = new Date(record?.value?.setDate(record?.value?.getDate() + 1));
              record.value = new Date(record?.value?.setDate(record?.value?.getDate() - 1));
            } else {
              data = record?.value;
            }

            filterData = {
              column: key,
              type: record?.type,
              data: data,
              operator: record?.matchMode
            }
          }

          else if (record['type'] == 'filterArray') {
            let arr: any = [];
            record?.value?.forEach((el: any) => {
              arr?.push(el?.id || el?.value);
            });
            if (arr?.length > 0) {
              filterData = {
                column: key,
                type: 'relation',
                data: arr
              }
            }
          }
          else if (record['type'] == 'boolean') {
            filterData = {
              column: key,
              type: record?.type,
              data: record?.value
            }
          }
          if (filterData) {
            this.filtersArray?.push(filterData);
          }
        }
      });
    });
    this.page = 1;
    // this.publicService?.changePageSub?.next({ page: this.page });
    this.getAllClients();
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach((subscription: Subscription) => {
      if (subscription && subscription.closed) {
        subscription.unsubscribe();
      }
    });
  }
}