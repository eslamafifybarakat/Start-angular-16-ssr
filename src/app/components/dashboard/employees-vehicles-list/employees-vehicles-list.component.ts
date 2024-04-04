// Modules
import { TranslateModule } from '@ngx-translate/core';
import { CommonModule } from '@angular/common';

// Components
import { DynamicTableLocalActionsComponent } from './../../../shared/components/dynamic-table-local-actions/dynamic-table-local-actions.component';
import { DynamicTableComponent } from './../../../shared/components/dynamic-table/dynamic-table.component';
import { SkeletonComponent } from './../../../shared/skeleton/skeleton/skeleton.component';
import { ClientCardComponent } from '../clients/client-card/client-card.component';
import { EmployeesListComponent } from './employees-list/employees-list.component';
import { VehiclesListComponent } from './vehicles-list/vehicles-list.component';

//Services
import { PublicService } from './../../../services/generic/public.service';
import { Component, ChangeDetectorRef } from '@angular/core';
import { Subject, Subscription, debounceTime } from 'rxjs';
import { DialogService } from 'primeng/dynamicdialog';

@Component({
  standalone: true,
  imports: [
    // Modules
    TranslateModule,
    CommonModule,

    // Components
    DynamicTableLocalActionsComponent,
    EmployeesListComponent,
    VehiclesListComponent,
    DynamicTableComponent,
    ClientCardComponent,
    SkeletonComponent,
  ],
  selector: 'employees-vehicles-list',
  templateUrl: './employees-vehicles-list.component.html',
  styleUrls: ['./employees-vehicles-list.component.scss']
})
export class EmployeesVehiclesListComponent {
  private subscriptions: Subscription[] = [];

  dataStyleType: string = 'list';
  tabType: string = 'employee';

  isLoadingSearch: boolean = false;
  isSearch: boolean = false;

  isLoadingList: boolean = false;
  list: any = null;
  tableHeaders: any = [];

  page: number = 1;
  perPage: number = 5;
  pagesCount: number = 0;
  rowsOptions: number[] = [5, 10, 15, 30];

  enableSortFilter: boolean = true;
  searchKeyword: any = null;
  filtersArray: any = [];
  sortObj: any = {};

  private searchSubject = new Subject<any>();

  filterCards: any = [];
  constructor(
    private publicService: PublicService,
    private dialogService: DialogService,
    private cdr: ChangeDetectorRef,
  ) { }
  ngOnInit(): void {
    this.searchSubject
      .pipe(
        debounceTime(500) // Throttle time in milliseconds (1 seconds)
      )
      .subscribe(event => {
        this.searchHandler(event);
      });

    this.publicService.isLoadingEmployees.subscribe((res) => {
      this.isLoadingList = res;
    })
    this.publicService.employeesLength.subscribe((res: any) => {
      if (res) {
        this.list = res;
      }
    })
    this.publicService.isLoadingSearchEmployees.subscribe((res: any) => {
      if (res) {
        this.isLoadingSearch = res;
      }
    })

    this.publicService.isLoadingVehicles.subscribe((res) => {
      this.isLoadingList = res;
    })
    this.publicService.VehicleLength.subscribe((res: any) => {
      if (res) {
        this.list = res;
      }
    })
    this.publicService.isLoadingSearchVehicles.subscribe((res: any) => {
      if (res) {
        this.isLoadingSearch = res;
      }
    })
  }

  // Toggle data type employees or vehicles
  showTabItems(type: string): void {
    this.list = 0;
    this.tabType = type;
  }

  // Toggle data style table or card
  changeDateStyle(type: string): void {
    this.dataStyleType = type;
    this.tabType == 'employee' ? this.publicService.toggleFilterEmployeeDataType.next(type) : this.publicService.toggleFilterVehicleDataType.next(type);
  }


  // ======Start search==========
  handleSearch(event: any): void {
    this.searchSubject.next(event);
  }
  searchHandler(keyWord: any): void {
    this.tabType == 'employee' ? this.publicService.searchEmployeesData.next(keyWord) : this.publicService.searchVehiclesData.next(keyWord);
  }
  clearSearch(search: any): void {
    search.value = null;
    this.tabType == 'employee' ? this.publicService.searchEmployeesData.next(null) : this.publicService.searchVehiclesData.next(null);
  }
  // ======End search==========

  addItem(): void {
    this.tabType == 'employee' ? this.publicService.addEmployeeItem.next(true) : this.publicService.addVehicleItem.next(true);
  }
  // Filter clients
  filterItem(): void {

  }

  // Clear table
  clearTable(): void {
    this.tabType == 'employee' ? this.publicService.resetEmployeesData.next(true) : this.publicService.resetVehiclesData.next(true);
  }


  ngOnDestroy(): void {
    this.subscriptions.forEach((subscription: Subscription) => {
      if (subscription && subscription.closed) {
        subscription.unsubscribe();
      }
    });
  }
}
