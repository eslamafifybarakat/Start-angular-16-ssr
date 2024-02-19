import { TermsAndConditionsComponent } from './components/terms-and-conditions/terms-and-conditions.component';
import { DoctorDetailsComponent } from './components/doctors/components/doctor-details/doctor-details.component';
import { DoctorRegiterationComponent } from './components/doctor-regiteration/doctor-regiteration.component';
import { DoctorsListComponent } from './components/doctors/components/doctors-list/doctors-list.component';
import { DiscountPolicyComponent } from './components/discount-policy/discount-policy.component';
import { BlogDetailsComponent } from './blogs/blog-details/blog-details.component';
import { ContactUsComponent } from './components/contact-us/contact-us.component';
import { BlogsListComponent } from './blogs/blogs-list/blogs-list.component';
import { DoctorsComponent } from './components/doctors/doctors.component';
import { PrivacyComponent } from './components/privacy/privacy.component';
import { JoinUsComponent } from './components/join-us/join-us.component';
import { FaqsComponent } from './components/faqs/faqs.component';
import { BlogsComponent } from './blogs/blogs.component';
import { GeneralComponent } from './general.component';

import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';

const routes: Routes = [
  {
    path: '', component: GeneralComponent,
    children: [
      {
        path: 'home-page',
        loadChildren: () => import('./../layout/modules/home/home.module').then(m => m.HomeModule),
        data: {
          title: 'titles.homePage',
          page: 'home-page'
        }
      },

      {
        path: "doctors",
        component: DoctorsComponent,
        children: [
          {
            path: "",
            component: DoctorsListComponent,
            data: { title: "titles.doctors" }
          },
          {
            path: "details/:id",
            component: DoctorDetailsComponent,
            data: { title: "titles.doctorDetails" }
          },
        ],
      },

      {
        path: "blogs",
        component: BlogsComponent,
        children: [
          {
            path: "",
            component: BlogsListComponent,
            data: { title: "titles.blogsTab" }
          },
          {
            path: "details/:id",
            component: BlogDetailsComponent,
            data: { title: "titles.blogDetails" }
          },
        ],
      },

      // {
      //   path: "psychological-tests",
      //   component: PsychologicalTestsComponent,
      //   data: { title: "user_info.psychological_tests" },
      // },

      // {
      //   path: "all-categories",
      //   component: AllCategoriesComponent,
      //   data: { title: "user_info.all_cat" },
      // },

      // {
      //   path: "test/:id",
      //   component: TestQuestionsComponent,
      //   data: { title: "user_info.test" },
      // },

      // {
      //   path: "blogs",
      //   component: BlogsComponent,
      //   data: { title: "Header.blogs" },
      // },

      // {
      //   path: "blogs/:id",
      //   component: BlogDetailsComponent,
      //   data: { title: "home.hero_section.blog_details" },
      // },

      {
        path: "contact",
        component: ContactUsComponent,
        data: { title: "titles.contact" }
      },
      {
        path: "privacy",
        component: PrivacyComponent,
        data: { title: "titles.privacy" }
      },
      {
        path: "discount-policy",
        component: DiscountPolicyComponent,
        data: { title: "titles.discountPolicy" }
      },
      {
        path: "terms-and-conditions",
        component: TermsAndConditionsComponent,
        data: { title: "titles.terms" }
      },
      {
        path: "faqs",
        component: FaqsComponent,
        data: { title: "titles.faqs" }
      },

      {
        path: "join-us",
        component: JoinUsComponent,
        data: { title: "titles.joinUs" }
      },

      {
        path: "doctor-registeration",
        component: DoctorRegiterationComponent,
        data: { title: "titles.doctorRegisteration" }
      },

      {
        path: "",
        redirectTo: "home-page",
        pathMatch: "full",
      },

      {
        path: "**",
        redirectTo: "error/404",
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class GeneralRoutingModule { }
