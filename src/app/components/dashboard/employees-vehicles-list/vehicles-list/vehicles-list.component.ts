// Modules
import { TranslateModule } from '@ngx-translate/core';
import { CommonModule } from '@angular/common';

// Components
import { DynamicTableLocalActionsComponent } from './../../../../shared/components/dynamic-table-local-actions/dynamic-table-local-actions.component';
import { DynamicTableComponent } from './../../../../shared/components/dynamic-table/dynamic-table.component';
import { SkeletonComponent } from './../../../../shared/skeleton/skeleton/skeleton.component';
import { ClientCardComponent } from '../../clients/client-card/client-card.component';
import { AddVehicleComponent } from '../add-vehicle/add-vehicle.component';

//Services
import { Subject, Subscription, catchError, debounceTime, finalize, tap } from 'rxjs';
import { AlertsService } from './../../../../services/generic/alerts.service';
import { PublicService } from './../../../../services/generic/public.service';
import { VehiclesService } from './../../services/vehicles.service';
import { Component, ChangeDetectorRef } from '@angular/core';
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
  selector: 'vehicles-list',
  templateUrl: './vehicles-list.component.html',
  styleUrls: ['./vehicles-list.component.scss']
})
export class VehiclesListComponent {
  private subscriptions: Subscription[] = [];

  dataStyleType: string = 'list';

  isLoadingSearch: boolean = false;
  isSearch: boolean = false;

  isLoadingVehiclesList: boolean = false;
  vehiclesList: any[] = [];
  vehiclesCount: number = 0;
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
    private vehiclesService: VehiclesService,
    private publicService: PublicService,
    private dialogService: DialogService,
    private alertsService: AlertsService,
    private cdr: ChangeDetectorRef,
    private router: Router
  ) { }
  ngOnInit(): void {
    this.tableHeaders = [
      { field: 'operatingCard', header: 'dashboard.tableHeader.operatingCard', title: this.publicService?.translateTextFromJson('dashboard.tableHeader.operatingCard'), type: 'text', sort: true, showDefaultSort: true, showAscSort: false, showDesSort: false, filter: true, },
      { field: 'endDate', header: 'dashboard.tableHeader.endDate', title: this.publicService?.translateTextFromJson('dashboard.tableHeader.endDate'), type: 'date', sort: true, showDefaultSort: true, showAscSort: false, showDesSort: false, filter: true, },
      { field: 'insuranceExpiryDate', header: 'dashboard.tableHeader.insuranceExpiryDate', title: this.publicService?.translateTextFromJson('dashboard.tableHeader.insuranceExpiryDate'), type: 'date', sort: true, showDefaultSort: true, showAscSort: false, showDesSort: false, filter: true, },
      { field: 'formPhoto', header: 'dashboard.tableHeader.formPhoto', title: this.publicService?.translateTextFromJson('dashboard.tableHeader.formPhoto'), type: 'img' },
    ];
    this.getAllVehicles();
    this.searchSubject
      .pipe(
        debounceTime(500) // Throttle time in milliseconds (1 seconds)
      )
      .subscribe(event => {
        this.searchHandler(event);
      });
    this.publicService.toggleFilterVehicleDataType.subscribe((res: any) => {
      if (res) {
        this.changeDateStyle(res);
      }
    })
    this.publicService.addVehicleItem.subscribe((res: any) => {
      if (res) {
        this.addItem();
      }
    })
    this.publicService.resetVehiclesData.subscribe((res: any) => {
      if (res) {
        this.clearTable();
      }
    })
    this.publicService.searchVehiclesData.subscribe((res: any) => {
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
  // ======Start get all Vehicles=========
  getAllVehicles(isFiltering?: boolean): void {
    isFiltering ? this.publicService.showSearchLoader.next(true) : this.isLoadingVehiclesList = true;
    this.publicService.isLoadingEmployees.next(true);
    this.vehiclesService?.getVehiclesList(this.page, this.perPage, this.searchKeyword, this.sortObj, this.filtersArray ?? null)
      .pipe(
        tap((res: any) => this.processVehiclesListResponse(res)),
        catchError(err => this.handleError(err)),
        finalize(() => this.finalizeVehiclesListLoading())
      ).subscribe();
  }
  private processVehiclesListResponse(response: any): void {
    if (response) {
      this.vehiclesCount = response.total;
      this.pagesCount = Math.ceil(this.vehiclesCount / this.perPage);
      this.vehiclesList = response.data;
      this.publicService.employeesLength.next(this.vehiclesCount);
    } else {
      this.handleError(response.error);
      return;
    }
  }
  private finalizeVehiclesListLoading(): void {
    this.isLoadingVehiclesList = false;
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
    this.vehiclesList = [
      { operatingCard: "operating card 1", endDate: new Date(), insuranceExpiryDate: new Date(), formPhoto: 'assets/images/home/sidebar-bg.webp' },
      { operatingCard: "operating card 1", endDate: new Date(), insuranceExpiryDate: new Date(), formPhoto: 'assets/images/home/sidebar-bg.webp' },
      { operatingCard: "operating card 1", endDate: new Date(), insuranceExpiryDate: new Date(), formPhoto: 'assets/images/home/sidebar-bg.webp' },
      { operatingCard: "operating card 1", endDate: new Date(), insuranceExpiryDate: new Date(), formPhoto: 'assets/images/home/sidebar-bg.webp' }, { operatingCard: "operating card 1", endDate: new Date(), insuranceExpiryDate: new Date(), formPhoto: 'assets/images/home/sidebar-bg.webp' },
    ];
    this.publicService.employeesLength.next(this.vehiclesCount);
    this.vehiclesCount = 3225;
  }
  /* --- Handle api requests error messages --- */
  private handleError(err: any): any {
    this.alertsService?.openToast('error', 'error', err || this.publicService.translateTextFromJson('general.errorOccur'));
    this.finalizeVehiclesListLoading();
  }
  // ======End get all Vehicles=========

  // ======Start search==========
  handleSearch(event: any): void {
    this.searchSubject.next(event);
  }
  searchHandler(keyWord: any): void {
    this.page = 1;
    this.perPage = 20;
    this.searchKeyword = keyWord;
    this.isLoadingVehiclesList = true;
    this.publicService.isLoadingEmployees.next(true);
    this.getAllVehicles(true);
    if (keyWord?.length > 0) {
      this.isLoadingSearch = true;
      this.publicService.isLoadingSearchEmployees.next(true);
    }
    this.cdr.detectChanges();
  }
  clearSearch(search: any): void {
    search.value = null;
    this.getAllVehicles(true);
  }
  // ======End search==========

  // ======Start pagination==========
  onPageChange(e: any): void {
    this.page = e?.page + 1;
    this.getAllVehicles();
  }
  onPaginatorOptionsChange(e: any): void {
    this.perPage = e?.value;
    this.pagesCount = Math?.ceil(this.vehiclesCount / this.perPage);
    this.page = 1;
    this.publicService?.changePageSub?.next({ page: this.page });
  }
  // ======End pagination==========

  itemDetails(item?: any): void {
  }

  addItem(item?: any, type?: any): void {
    const ref = this.dialogService?.open(AddVehicleComponent, {
      data: {
        item,
        type: type == 'edit' ? 'edit' : 'add'
      },
      header: type == 'edit' ? this.publicService?.translateTextFromJson('dashboard.vehicles.editVehicle') : this.publicService?.translateTextFromJson('dashboard.vehicles.addVehicle'),
      dismissableMask: false,
      width: '60%',
      styleClass: 'custom-modal',
    });
    ref.onClose.subscribe((res: any) => {
      if (res?.listChanged) {
        this.page = 1;
        this.publicService?.changePageSub?.next({ page: this.page });
        this.getAllVehicles();
      }
    });
  }
  // Filter Vehicle
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
    //     this.getAllVehicles(true);
    //   }
    // });
  }

  // Edit Vehicle
  editItem(item: any): void {
    // this.router.navigate(['Dashboard/Clients/Details/' + item.id]);
  }
  //========Start Delete Vehicle==========
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
      this.getAllVehicles();
    }
  }
  private handleErrorDelete(err: any): void {
    const errorMessage = err?.message || this.publicService.translateTextFromJson('general.errorOccur');
    this.alertsService.openToast('error', 'error', errorMessage);
  }
  //========End Delete Vehicle==========

  // Clear table
  clearTable(): void {
    this.searchKeyword = '';
    this.sortObj = {};
    this.filtersArray = [];
    this.page = 1;
    this.publicService.resetTable.next(true);
    // this.publicService?.changePageSub?.next({ page: this.page });
    this.getAllVehicles();
  }
  // Sort table
  sortItems(event: any): void {
    if (event?.order == 1) {
      this.sortObj = {
        column: event?.field,
        order: 'asc'
      }
      this.getAllVehicles();
    } else if (event?.order == -1) {
      this.sortObj = {
        column: event?.field,
        order: 'desc'
      }
      this.getAllVehicles();
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
    this.getAllVehicles();
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach((subscription: Subscription) => {
      if (subscription && subscription.closed) {
        subscription.unsubscribe();
      }
    });
  }
}
