// Modules
import { TranslateModule } from '@ngx-translate/core';
import { CommonModule } from '@angular/common';

// Components
import { DynamicTableLocalActionsComponent } from './../../../../shared/components/dynamic-table-local-actions/dynamic-table-local-actions.component';
import { DynamicTableComponent } from './../../../../shared/components/dynamic-table/dynamic-table.component';
import { SkeletonComponent } from './../../../../shared/skeleton/skeleton/skeleton.component';
import { ClientCardComponent } from '../../clients/client-card/client-card.component';
import { AddEmployeeComponent } from '../add-employee/add-employee.component';

//Services
import { Subject, Subscription, catchError, debounceTime, finalize, tap } from 'rxjs';
import { AlertsService } from './../../../../services/generic/alerts.service';
import { PublicService } from './../../../../services/generic/public.service';
import { Component, ChangeDetectorRef } from '@angular/core';
import { EmployeesService } from '../../services/employees.service';
import { DialogService } from 'primeng/dynamicdialog';
import { Router } from '@angular/router';


@Component({
  standalone: true,
  imports: [
    // Modules
    TranslateModule,
    CommonModule,

    // Components
    DynamicTableLocalActionsComponent,
    DynamicTableComponent,
    ClientCardComponent,
    SkeletonComponent,
  ],
  selector: 'employees-list',
  templateUrl: './employees-list.component.html',
  styleUrls: ['./employees-list.component.scss']
})
export class EmployeesListComponent {
  private subscriptions: Subscription[] = [];

  dataStyleType: string = 'list';

  isLoadingSearch: boolean = false;
  isSearch: boolean = false;

  isLoadingEmployeesList: boolean = false;
  employeesList: any[] = [];
  employeesCount: number = 0;
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
    private employeesService: EmployeesService,
    private publicService: PublicService,
    private dialogService: DialogService,
    private alertsService: AlertsService,
    private cdr: ChangeDetectorRef,
    private router: Router
  ) { }
  ngOnInit(): void {
    this.tableHeaders = [
      { field: 'fullName', header: 'dashboard.tableHeader.fullName', title: this.publicService?.translateTextFromJson('dashboard.tableHeader.fullName'), type: 'text', sort: true, showDefaultSort: true, showAscSort: false, showDesSort: false, filter: true, },
      { field: 'residencyNumber', header: 'dashboard.tableHeader.residencyNumber', title: this.publicService?.translateTextFromJson('dashboard.tableHeader.residencyNumber'), type: 'numeric', sort: true, showDefaultSort: true, showAscSort: false, showDesSort: false, filter: true, },
      { field: 'endDate', header: 'dashboard.tableHeader.endDate', title: this.publicService?.translateTextFromJson('dashboard.tableHeader.endDate'), type: 'date', sort: true, showDefaultSort: true, showAscSort: false, showDesSort: false, filter: true, },
      { field: 'healthCertificate', header: 'dashboard.tableHeader.healthCertificate', title: this.publicService?.translateTextFromJson('dashboard.tableHeader.healthCertificate'), type: 'text', sort: true, showDefaultSort: true, showAscSort: false, showDesSort: false, filter: true },
      { field: 'residencePhoto', header: 'dashboard.tableHeader.residencePhoto', title: this.publicService?.translateTextFromJson('dashboard.tableHeader.residencePhoto'), type: 'img' },
    ];
    this.getAllEmployees();
    this.searchSubject
      .pipe(
        debounceTime(500) // Throttle time in milliseconds (1 seconds)
      )
      .subscribe(event => {
        this.searchHandler(event);
      });
    this.publicService.toggleFilterEmployeeDataType.subscribe((res: any) => {
      if (res) {
        console.log(res);
        this.changeDateStyle(res);
      }
    })
    this.publicService.addEmployeeItem.subscribe((res: any) => {
      if (res) {
        this.addEmployeeItem();
      }
    })
    this.publicService.resetEmployeesData.subscribe((res: any) => {
      if (res) {
        this.clearTable();
      }
    })
    this.publicService.searchEmployeesData.subscribe((res: any) => {
      if (res) {
        this.searchHandler(res);
      }
    })
  }
  // Toggle data style table or card
  changeDateStyle(type: string): void {
    this.clearTable();
    this.dataStyleType = type;
  }
  // ======Start get all Employees=========
  getAllEmployees(isFiltering?: boolean): void {
    isFiltering ? this.publicService.showSearchLoader.next(true) : this.isLoadingEmployeesList = true;
    this.publicService.isLoadingEmployees.next(true);
    this.employeesService?.getEmployeesList(this.page, this.perPage, this.searchKeyword, this.sortObj, this.filtersArray ?? null)
      .pipe(
        tap((res: any) => this.processEmployeesListResponse(res)),
        catchError(err => this.handleError(err)),
        finalize(() => this.finalizeEmployeesListLoading())
      ).subscribe();
  }
  private processEmployeesListResponse(response: any): void {
    if (response) {
      this.employeesCount = response.total;
      this.pagesCount = Math.ceil(this.employeesCount / this.perPage);
      this.employeesList = response.data;
      this.publicService.employeesLength.next(this.employeesCount);
    } else {
      this.handleError(response.error);
      return;
    }
  }
  private finalizeEmployeesListLoading(): void {
    this.isLoadingEmployeesList = false;
    this.publicService.isLoadingEmployees.next(false);
    this.isLoadingSearch = false;
    this.publicService.isLoadingSearchEmployees.next(false);
    this.enableSortFilter = false;
    this.publicService.showSearchLoader.next(false);
    setTimeout(() => {
      this.enableSortFilter = true;
    }, 200);
    this.setDummyData();
  }
  private setDummyData(): void {
    this.employeesList = [
      { fullName: "Ali Ahmed", residencyNumber: '01009887876', endDate: new Date(), healthCertificate: '33u2929899', residencePhoto: 'assets/images/home/sidebar-bg.webp' },
      { fullName: "Ali Ahmed", residencyNumber: '01009887876', endDate: new Date(), healthCertificate: '33u2929899', residencePhoto: 'assets/images/home/sidebar-bg.webp' },
      { fullName: "Ali Ahmed", residencyNumber: '01009887876', endDate: new Date(), healthCertificate: '33u2929899', residencePhoto: 'assets/images/home/sidebar-bg.webp' },
      { fullName: "Ali Ahmed", residencyNumber: '01009887876', endDate: new Date(), healthCertificate: '33u2929899', residencePhoto: 'assets/images/home/sidebar-bg.webp' },
      { fullName: "Ali Ahmed", residencyNumber: '01009887876', endDate: new Date(), healthCertificate: '33u2929899', residencePhoto: 'assets/images/home/sidebar-bg.webp' },
    ];
    this.publicService.employeesLength.next(this.employeesCount);
    this.employeesCount = 3225;
  }
  /* --- Handle api requests error messages --- */
  private handleError(err: any): any {
    this.alertsService?.openToast('error', 'error', err || this.publicService.translateTextFromJson('general.errorOccur'));
    this.finalizeEmployeesListLoading();
  }
  // ======End get all clients=========

  // ======Start search==========
  handleSearch(event: any): void {
    this.searchSubject.next(event);
  }
  searchHandler(keyWord: any): void {
    this.page = 1;
    this.perPage = 20;
    this.searchKeyword = keyWord;
    this.isLoadingEmployeesList = true;
    this.publicService.isLoadingEmployees.next(true);
    this.getAllEmployees(true);
    if (keyWord?.length > 0) {
      this.isLoadingSearch = true;
      this.publicService.isLoadingSearchEmployees.next(true);
    }
    this.cdr.detectChanges();
  }
  clearSearch(search: any): void {
    search.value = null;
    this.getAllEmployees(true);
  }
  // ======End search==========

  // ======Start pagination==========
  onPageChange(e: any): void {
    this.page = e?.page + 1;
    this.getAllEmployees();
  }
  onPaginatorOptionsChange(e: any): void {
    this.perPage = e?.value;
    this.pagesCount = Math?.ceil(this.employeesCount / this.perPage);
    this.page = 1;
    this.publicService?.changePageSub?.next({ page: this.page });
  }
  // ======End pagination==========

  itemDetails(item?: any): void {
  }

  addEmployeeItem(item?: any, type?: any): void {
    const ref = this.dialogService?.open(AddEmployeeComponent, {
      data: {
        item,
        type: type == 'edit' ? 'edit' : 'add'
      },
      header: type == 'edit' ? this.publicService?.translateTextFromJson('dashboard.employees.editEmployee') : this.publicService?.translateTextFromJson('dashboard.employees.addEmployee'),
      dismissableMask: false,
      width: '60%',
      styleClass: 'custom-modal',
    });
    ref.onClose.subscribe((res: any) => {
      if (res?.listChanged) {
        this.page = 1;
        this.publicService?.changePageSub?.next({ page: this.page });
        this.getAllEmployees();
      }
    });
  }
  // Filter employee
  filterItem(): void {
    // const ref = this.dialogService?.open(FilterClientsComponent, {
    //   header: this.publicService?.translateTextFromJson('general.filter'),
    //   dismissableMask: false,
    //   width: '45%',
    //   data: this.filterCards,
    //   styleClass: 'custom-modal',
    // });
    // ref.onClose.subscribe((res: any) => {
    //   if (res) {
    //     this.page = 1;
    //     this.filtersArray = res.conditions;
    //     this.filterCards = res.conditions;
    //     // this.publicService?.changePageSub?.next({ page: this.page });
    //     this.getAllEmployees(true);
    //   }
    // });
  }

  // Edit employee
  editItem(item: any): void {
    // this.router.navigate(['Dashboard/Clients/Details/' + item.id]);
  }
  //========Start Delete employee==========
  deleteItem(item: any): void {
    if (!item?.confirmed) {
      return;
    }

    const data = {
      name: item?.item?.title
    };

    // this.publicService.show_loader.next(true);

    // this.clientsService?.deleteClientById(item?.item?.id, data)?.subscribe(
    //   (res: any) => {
    //     this.processDeleteResponse(res);
    //   },
    //   (err) => {
    //     this.handleErrorDelete(err);
    //   }
    // ).add(() => {
    //   this.publicService.show_loader.next(false);
    //   this.cdr.detectChanges();
    // });
  }
  private processDeleteResponse(res: any): void {
    const messageType = res?.code === 200 ? 'success' : 'error';
    const message = res?.message || '';

    this.alertsService.openToast(messageType, messageType, message);
    if (messageType === 'success') {
      this.getAllEmployees();
    }
  }
  private handleErrorDelete(err: any): void {
    const errorMessage = err?.message || this.publicService.translateTextFromJson('general.errorOccur');
    this.alertsService.openToast('error', 'error', errorMessage);
  }
  //========End Delete employee==========

  // Clear table
  clearTable(): void {
    this.searchKeyword = '';
    this.sortObj = {};
    this.filtersArray = [];
    this.page = 1;
    this.publicService.resetTable.next(true);
    // this.publicService?.changePageSub?.next({ page: this.page });
    this.getAllEmployees();
  }
  // Sort table
  sortItems(event: any): void {
    if (event?.order == 1) {
      this.sortObj = {
        column: event?.field,
        order: 'asc'
      }
      this.getAllEmployees();
    } else if (event?.order == -1) {
      this.sortObj = {
        column: event?.field,
        order: 'desc'
      }
      this.getAllEmployees();
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
    this.getAllEmployees();
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach((subscription: Subscription) => {
      if (subscription && subscription.closed) {
        subscription.unsubscribe();
      }
    });
  }
}
