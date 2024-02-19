import { Routes } from '@angular/router';

// Components
import { ErrorsComponent } from './components/errors/errors.component';

// TS Files
import { placesChildrenRoutes } from './components/places/places-children-routes';
import { errorsChildrenRoutes } from './components/errors/errors-routes';
import { Error404Component } from './components/errors/error404/error404.component';


export const appRoutes: Routes = [
  { path: '', redirectTo: '/places', pathMatch: 'full' },


  // Lazy Routes
  // {
  //   path:'contact-us',
  //   loadComponent: () =>
  //     import('./components/contact-us/contact-us.component').then(
  //       (c) => c.ContactUsComponent
  //     ),
  //     pathMatch: 'full'
  // },
  {
    path: 'places',
    loadComponent: () =>
      import('./components/places/places.component').then(
        (c) => c.PlacesComponent
      ),
    children: placesChildrenRoutes
  },
  {
    path: '**', loadComponent: () =>
      import('./components/errors/errors.component').then(
        (c) => c.ErrorsComponent
      ),
    children: errorsChildrenRoutes
    // path: '**', component: Error404Component
  }
];
