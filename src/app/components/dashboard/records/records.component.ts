import { AlertsService } from './../../../services/generic/alerts.service';
import { PublicService } from './../../../services/generic/public.service';
// Modules
import { TranslateModule } from '@ngx-translate/core';
import { SidebarModule } from 'primeng/sidebar';
import { CommonModule } from '@angular/common';

// Components
import { DynamicTableLocalActionsComponent } from './../../../shared/components/dynamic-table-local-actions/dynamic-table-local-actions.component';
import { DynamicTableComponent } from './../../../shared/components/dynamic-table/dynamic-table.component';
import { SkeletonComponent } from './../../../shared/skeleton/skeleton/skeleton.component';
import { FilterRecordComponent } from './filter-record/filter-record.component';
import { RecordCardComponent } from './record-card/record-card.component';
import { AddRecordComponent } from './add-record/add-record.component';

//Services
import { Subject, Subscription, catchError, debounceTime, finalize, tap } from 'rxjs';
import { ChangeDetectorRef, Component } from '@angular/core';
import { RecordsService } from '../services/records.service';
import { DialogService } from 'primeng/dynamicdialog';
import { Router } from '@angular/router';

@Component({
  standalone: true,
  imports: [
    // Modules
    TranslateModule,
    SidebarModule,
    CommonModule,

    // Components
    DynamicTableLocalActionsComponent,
    DynamicTableComponent,
    RecordCardComponent,
    SkeletonComponent,
  ],
  selector: 'records',
  templateUrl: './records.component.html',
  styleUrls: ['./records.component.scss']
})
export class RecordsComponent {
  private subscriptions: Subscription[] = [];

  dataStyleType: string = 'list';

  isLoadingSearch: boolean = false;
  isSearch: boolean = false;

  isLoadingRecordsList: boolean = false;
  recordsList: any[] = [];
  recordsCount: number = 0;
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

  filterCards: any = [];

  constructor(
    private recordsService: RecordsService,
    private publicService: PublicService,
    private dialogService: DialogService,
    private alertsService: AlertsService,
    private cdr: ChangeDetectorRef,
    private router: Router
  ) { }
  ngOnInit(): void {
    this.tableHeaders = [
      { field: 'recordName', header: 'dashboard.tableHeader.recordName', title: this.publicService?.translateTextFromJson('dashboard.tableHeader.recordName'), type: 'text', sort: true, showDefaultSort: true, showAscSort: false, showDesSort: false, filter: true, },
      { field: 'recordNumber', header: 'dashboard.tableHeader.recordNumber', title: this.publicService?.translateTextFromJson('dashboard.tableHeader.recordNumber'), type: 'numeric', sort: true, showDefaultSort: true, showAscSort: false, showDesSort: false, filter: true, },
      { field: 'endDate', header: 'dashboard.tableHeader.endDate', title: this.publicService?.translateTextFromJson('dashboard.tableHeader.endDate'), type: 'date', sort: true, showDefaultSort: true, showAscSort: false, showDesSort: false, filter: true, },
    ];
    this.getAllRecords();
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
    this.clearTable();
    this.dataStyleType = type;
  }
  // ======Start get all records=========
  getAllRecords(isFiltering?: boolean): void {
    isFiltering ? this.publicService.showSearchLoader.next(true) : this.isLoadingRecordsList = true;
    this.recordsService?.getRecordsList(this.page, this.perPage, this.searchKeyword, this.sortObj, this.filtersArray ?? null)
      .pipe(
        tap((res: any) => this.processRecordsListResponse(res)),
        catchError(err => this.handleError(err)),
        finalize(() => this.finalizeRecordsListLoading())
      ).subscribe();
  }
  private processRecordsListResponse(response: any): void {
    if (response) {
      this.recordsCount = response.total;
      this.pagesCount = Math.ceil(this.recordsCount / this.perPage);
      this.recordsList = response.data;
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
  private finalizeRecordsListLoading(): void {
    this.isLoadingRecordsList = false;
    this.isLoadingSearch = false;
    this.enableSortFilter = false;
    this.publicService.showSearchLoader.next(false);
    setTimeout(() => {
      this.enableSortFilter = true;
    }, 200);
    this.setDummyData();
  }
  private setDummyData(): void {
    this.recordsList = [
      { recordName: "Commercial register 1", recordNumber: '1', endDate: new Date() },
      { recordName: "Commercial register 2", recordNumber: '2', endDate: new Date() },
      { recordName: "Commercial register 3", recordNumber: '3', endDate: new Date() },
      { recordName: "Commercial register 4", recordNumber: '4', endDate: new Date() },
      { recordName: "Commercial register 5", recordNumber: '5', endDate: new Date() },
      { recordName: "Commercial register 6", recordNumber: '6', endDate: new Date() }
    ];
    this.recordsCount = 3225;
  }
  /* --- Handle api requests error messages --- */
  private handleError(err: any): any {
    this.alertsService?.openToast('error', 'error', err || this.publicService.translateTextFromJson('general.errorOccur'));
    this.finalizeRecordsListLoading();
  }
  // ======End get all records=========

  // ======Start search==========
  handleSearch(event: any): void {
    this.searchSubject.next(event);
  }
  searchHandler(keyWord: any): void {
    this.page = 1;
    this.perPage = 20;
    this.searchKeyword = keyWord;
    this.isLoadingRecordsList = true;
    this.getAllRecords(true);
    if (keyWord?.length > 0) {
      this.isLoadingSearch = true;
    }
    this.cdr.detectChanges();
  }
  clearSearch(search: any): void {
    search.value = null;
    this.getAllRecords(true);
  }
  // ======End search==========

  // ======Start pagination==========
  onPageChange(e: any): void {
    this.page = e?.page + 1;
    this.getAllRecords();
  }
  onPaginatorOptionsChange(e: any): void {
    this.perPage = e?.value;
    this.pagesCount = Math?.ceil(this.recordsCount / this.perPage);
    this.page = 1;
    this.publicService?.changePageSub?.next({ page: this.page });
  }
  // ======End pagination==========

  itemDetails(item?: any): void {
  }

  addItem(item?: any, type?: any): void {
    const ref = this.dialogService?.open(AddRecordComponent, {
      data: {
        item,
        type: type == 'edit' ? 'edit' : 'add'
      },
      header: type == 'edit' ? this.publicService?.translateTextFromJson('dashboard.records.editRecord') : this.publicService?.translateTextFromJson('dashboard.records.addRecord'),
      dismissableMask: false,
      width: '60%',
      styleClass: 'custom-modal',
    });
    ref.onClose.subscribe((res: any) => {
      if (res?.listChanged) {
        this.page = 1;
        this.publicService?.changePageSub?.next({ page: this.page });
        this.getAllRecords();
      }
    });
  }
  // Filter record
  filterItem(): void {
    const ref = this.dialogService?.open(FilterRecordComponent, {
      header: this.publicService?.translateTextFromJson('general.filter'),
      dismissableMask: false,
      width: '45%',
      data: this.filterCards,
      styleClass: 'custom-modal',
    });
    ref.onClose.subscribe((res: any) => {
      if (res) {
        this.page = 1;
        this.filtersArray = res.conditions;
        this.filterCards = res.conditions;
        // this.publicService?.changePageSub?.next({ page: this.page });
        this.getAllRecords(true);
      }
    });
  }

  // Edit record
  editItem(item: any): void {
    this.router.navigate(['Dashboard/Clients/Record-Details']);
  }
  //========Start Delete record==========
  deleteItem(item: any): void {
    if (!item?.confirmed) {
      return;
    }

    const data = {
      name: item?.item?.title
    };

    this.publicService.show_loader.next(true);
    this.recordsService?.deleteRecordById(item?.item?.id, data)?.subscribe(
      (res: any) => {
        this.processDeleteResponse(res);
      },
      (err) => {
        this.handleErrorDelete(err);
      }
    ).add(() => {
      this.publicService.show_loader.next(false);
      this.cdr.detectChanges();
    });
  }
  private processDeleteResponse(res: any): void {
    const messageType = res?.code === 200 ? 'success' : 'error';
    const message = res?.message || '';

    this.alertsService.openToast(messageType, messageType, message);
    if (messageType === 'success') {
      this.getAllRecords();
    }
  }
  private handleErrorDelete(err: any): void {
    const errorMessage = err?.message || this.publicService.translateTextFromJson('general.errorOccur');
    this.alertsService.openToast('error', 'error', errorMessage);
  }
  //========End Delete record==========

  // Clear table
  clearTable(): void {
    this.searchKeyword = '';
    this.sortObj = {};
    this.filtersArray = [];
    this.page = 1;
    this.publicService.resetTable.next(true);
    // this.publicService?.changePageSub?.next({ page: this.page });
    this.getAllRecords();
  }
  // Sort table
  sortItems(event: any): void {
    if (event?.order == 1) {
      this.sortObj = {
        column: event?.field,
        order: 'asc'
      }
      this.getAllRecords();
    } else if (event?.order == -1) {
      this.sortObj = {
        column: event?.field,
        order: 'desc'
      }
      this.getAllRecords();
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
    this.getAllRecords();
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach((subscription: Subscription) => {
      if (subscription && subscription.closed) {
        subscription.unsubscribe();
      }
    });
  }
}

