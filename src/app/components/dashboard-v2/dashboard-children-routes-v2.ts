
import { PermissionGuard } from '../../services/authentication/guards/permission.guard';
import { EditClientComponent } from "./../dashboard/clients/edit-client/edit-client.component";
import { clientsChildrenRoutes } from "./../dashboard/clients/clients-children-routes";
import { StatisticsComponent } from "./../dashboard/statistics/statistics.component";
import { ErrorsComponent } from "../errors/errors.component";

export const dashBoardChildrenV2Routes: any[] = [
  { path: '', redirectTo: 'Statistics', pathMatch: 'full' },
  {
    path: 'Clients',
    // canActivate: [PermissionGuard],
    data: {
      permission: 'Pages.Client.List',
      title: 'Appointments'
    },
    loadComponent: () =>
      import('./../dashboard/clients/clients-list-v2/clients-list-v2.component').then(
        (c) => c.ClientsListV2Component
      ),
    children: clientsChildrenRoutes
  },
  {
    path: 'Statistics',
    component: StatisticsComponent,
    pathMatch: 'full'
  },
  {
    path: 'Clients/:id',
    component: EditClientComponent,
    pathMatch: 'full'
  },
  { path: '**', component: ErrorsComponent }
];
