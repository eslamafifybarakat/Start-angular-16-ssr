import { Routes } from '@angular/router';

// Components
import { ContactUsComponent } from './modules/general/components/contact-us/contact-us.component';
// import { ErrorsComponent } from './components/errors/errors.component';

// // TS Files
// import { doctorsChildrenRoutes } from './components/doctors/doctors-children-routes';
// import { placesChildrenRoutes } from './components/places/places-children-routes';
// import { errorsChildrenRoutes } from './components/errors/errors-routes';
// import { Error404Component } from './components/errors/error404/error404.component';


export const appRoutes: Routes = [
  { path: '', redirectTo: '/posts', pathMatch: 'full' },

  // Lazy Routes
  {
    path: 'posts',
    component: ContactUsComponent,
    // loadComponent: () =>
    //   import('./components/contact-us/contact-us.component').then(
    //     (c) => c.ContactUsComponent
    //   ),
     // children: placesChildrenRoutes
    // pathMatch: 'full'
  },
  // {
  //   path: '**', loadComponent: () =>
  //     import('./components/errors/errors.component').then(
  //       (c) => c.ErrorsComponent
  //     ),
  //   children: errorsChildrenRoutes
  //   path: '**', component: Error404Component
  // }
];
