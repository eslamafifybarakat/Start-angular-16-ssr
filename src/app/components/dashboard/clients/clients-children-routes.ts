
import { ClientsListComponent } from "./clients-list/clients-list.component";
import { EditClientComponent } from "./edit-client/edit-client.component";
import { ErrorsComponent } from "../../errors/errors.component";


export const clientsChildrenRoutes: any[] = [
  { path: '', redirectTo: 'List', pathMatch: 'full' },
  {
    path: 'List',
    component: ClientsListComponent,
    pathMatch: 'full'
  },
  {
    path: 'Clients/:id',
    component: EditClientComponent,
    pathMatch: 'full'
  },
  { path: '**', component: ErrorsComponent }
];
