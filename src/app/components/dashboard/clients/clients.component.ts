import { DynamicTableLocalActionsComponent } from './../../../shared/components/dynamic-table-local-actions/dynamic-table-local-actions.component';
import { PublicService } from './../../../services/generic/public.service';
import { DynamicTableComponent } from './../../../shared/components/dynamic-table/dynamic-table.component';
import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  standalone: true,
  imports: [CommonModule, DynamicTableComponent, TranslateModule, CommonModule, DynamicTableLocalActionsComponent],
  selector: 'app-clients',
  templateUrl: './clients.component.html',
  styleUrls: ['./clients.component.scss']
})
export class ClientsComponent {
  dataStyleType: string = 'list';
  isLoadingSearch: boolean = false;
  isSearch: boolean = false;
  isLoadingFileDownload: boolean = false;

  loadingIndicator: boolean = false;
  customersList: any = [
    { name: "name", mobileNumber: '01009887876', id: '33u2929899', date: new Date() },
    { name: "name", mobileNumber: '01009887876', id: '33u2929899', date: new Date() },
    { name: "name", mobileNumber: '01009887876', id: '33u2929899', date: new Date() },
    { name: "name", mobileNumber: '01009887876', id: '33u2929899', date: new Date() },
    { name: "name", mobileNumber: '01009887876', id: '33u2929899', date: new Date() },
    { name: "name", mobileNumber: '01009887876', id: '33u2929899', date: new Date() },
  ];
  customersCount: number = 0;
  tableHeaders: any = [];

  page: number = 1;
  perPage: number = 30;
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

  constructor(
    private publicService: PublicService
  ) { }
  ngOnInit(): void {
    this.tableHeaders = [
      { field: 'name', header: 'dashboard.tableHeader.name', title: this.publicService?.translateTextFromJson('dashboard.tableHeader.name'), type: 'text' },
      { field: 'id', header: 'dashboard.tableHeader.id', title: this.publicService?.translateTextFromJson('dashboard.tableHeader.id'), type: 'text' },
      { field: 'date', header: 'dashboard.tableHeader.date', title: this.publicService?.translateTextFromJson('dashboard.tableHeader.date'), type: 'date' },
      { field: 'mobileNumber', header: 'dashboard.tableHeader.mobilePhone', title: this.publicService?.translateTextFromJson('dashboard.tableHeader.mobilePhone'), type: 'text' },
    ];
  }
  changeDateStyle(type: string): void {
    this.dataStyleType = type;
  }
  getAllCustomers(): any {
    // this.loadingIndicator = true;
    // this.customersService?.getCustomersList(this.page, this.perPage, this.searchKeyword ? this.searchKeyword : null, this.sortObj ? this.sortObj : null, this.filtersArray ? this.filtersArray : null)
    //   .pipe(
    //     map((res: any) => {
    //       this.customersCount = res?.total;
    //       this.pagesCount = Math.ceil(this.customersCount / this.perPage);
    //       let arr: any = [];
    //       res?.data ? res?.data?.forEach((item: any) => {
    //         arr.push({
    //           id: item?.id ? item?.id : null,
    //           name: item?.name ? item?.name : '',
    //           address: item?.address ? item?.address : '',
    //           location: item?.location ? item?.location : '',
    //           locationLink: item?.locationLink ? item?.locationLink : null,
    //           mobileNumber: item?.mobileNumber ? item?.mobileNumber : '',
    //           isVip: item?.isVip ? item?.isVip : false
    //         });
    //       }) : '';
    //       console.log(arr);
    //       this.customersList$ = arr;

    //     }),
    //     finalize(() => {
    //       this.loadingIndicator = false;
    //       this.isLoadingSearch = false;
    //       this.enableSortFilter = false;
    //       setTimeout(() => {
    //         this.enableSortFilter = true;
    //       }, 200);
    //     })

    //   ).subscribe((res: any) => {
    //   });
  }
  getCustomers(): void {

  }

  search(event: any): void {
    this.isLoadingSearch = true;
    this.searchKeyword = event;
    if (event?.length > 0) {
      this.isSearch = true;
    }
    this.page = 1;
    // this.publicService?.changePageSub?.next({ page: this.page });
    this.getAllCustomers();
  }
  onPageChange(e: any): void {
    this.page = e?.page + 1;
    //  this.getAllCustomers();
  }
  onPaginatorOptionsChange(e: any): void {
    this.perPage = e?.value;
    this.pagesCount = Math?.ceil(this.customersCount / this.perPage);
    this.page = 1;
    // this.publicService?.changePageSub?.next({ page: this.page });
  }

  itemDetails(item?: any): void {

  }
  addOrEditItem(item?: any, type?: any): void {

  }
  deleteItem(item: any): void {

  }
  VIPCustomerAction(item: any): void {

  }

  clearTable(event: any): void {
    this.searchKeyword = '';
    this.sortObj = {};
    this.filtersArray = [];
    this.page = 1;
    // this.publicService?.changePageSub?.next({ page: this.page });
    this.getAllCustomers();
  }
  sortItems(event: any): void {
    if (event?.order == 1) {
      this.sortObj = {
        column: event?.field,
        order: 'asc'
      }
      this.getAllCustomers();
    } else if (event?.order == -1) {
      this.sortObj = {
        column: event?.field,
        order: 'desc'
      }
      this.getAllCustomers();
    }
  }
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
    this.getAllCustomers();
  }
}
