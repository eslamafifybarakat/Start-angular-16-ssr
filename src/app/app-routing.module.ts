// import { AuthGuard } from "./modules/auth/services/auth.guard";
import { RouterModule, Routes } from "@angular/router";
import { NgModule } from "@angular/core";

const routes: Routes = [
  {
    path: "",
    loadChildren: () =>
      import("./modules/layout/layout.module").then((m) => m.LayoutModule),
  },
  // {
  //   path: "meeting",
  //   loadChildren: () =>
  //     import("./pages/modules/join-meeting/join-meeting.module").then(
  //       (m) => m.JoinMeetingModule
  //     ),
  //   canActivate: [AuthGuard],
  // },
  // {
  //   path: "auth",
  //   loadChildren: () =>
  //     import("./modules/auth/auth.module").then((m) => m.AuthModule),
  // },
  // {
  //   path: "error",
  //   loadChildren: () =>
  //     import("./modules/errors/errors.module").then((m) => m.ErrorsModule),
  // },
  {
    path: "",
    redirectTo: "",
    pathMatch: "full",
  },
  { path: "**", redirectTo: "error" },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, {
      useHash: false,
      scrollPositionRestoration: 'top',
      enableTracing: false,
      initialNavigation: 'enabledBlocking',
    }),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule { }
