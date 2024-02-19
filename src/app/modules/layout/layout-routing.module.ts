// import { RouterModule, Routes } from '@angular/router';
// import { LayoutComponent } from './layout.component';
// import { NgModule } from '@angular/core';

// const routes: Routes = [{
//   path: '', component: LayoutComponent, children: [
//     { path: 'pages', loadChildren: () => import('../pages/pages.module').then(m => m.PagesModule) },
//     {
//       path: 'home-page', loadChildren: () => import('./modules/home/home.module').then(m => m.HomeModule),
//       data: {
//         title: 'titles.homePage',
//         page: 'home-page'
//       }
//     },
//     {
//       path: '',
//       redirectTo: 'home-page',
//       pathMatch: 'full',
//     }

//   ]
// },

// ];

// @NgModule({
//   imports: [RouterModule.forChild(routes)],
//   exports: [RouterModule]
// })
// export class LayoutRoutingModule { }

import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LayoutComponent } from './layout.component';

const routes: Routes = [
  {
    path: '',
    component: LayoutComponent,
    children: [
      {
        path: '',
        loadChildren: () =>
          import('./../general/general.module').then((m) => m.GeneralModule),
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class LayoutRoutingModule { }

