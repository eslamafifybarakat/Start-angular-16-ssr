
import { ErrorsComponent } from "../errors/errors.component";
import { ClientsComponent } from "./clients/clients.component";
import { EditClientComponent } from "./clients/edit-client/edit-client.component";

export const dashBoardChildrenRoutes: any[] = [
  { path: '', redirectTo: 'Clients', pathMatch: 'full' },
  {
    path: 'Clients',
    component: ClientsComponent,
    pathMatch: 'full'
  },
  {
    path: 'Clients/:id',
    component: EditClientComponent,
    pathMatch: 'full'
  },
  { path: '**', component: ErrorsComponent }
];
