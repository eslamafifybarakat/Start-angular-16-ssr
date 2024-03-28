
import { ErrorsComponent } from "../errors/errors.component";
import { ClientsComponent } from "./clients/clients.component";

export const dashBoardChildrenRoutes: any[] = [
  { path: '', redirectTo: 'Clients', pathMatch: 'full' },
  {
    path: 'Clients',
    component: ClientsComponent,
    pathMatch: 'full'
  },
  { path: '**', component: ErrorsComponent }
];
