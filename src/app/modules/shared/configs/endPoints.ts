export const roots = {
  auth: {
    login: '/login',
    register: "/register",
    logout: "/logout",
    forgetPassword: "/forgetPassword",
    validateResetCode: '/validateResetCode',
    resetPassword: '/resetPassword'
  },
  homePage: {
    getData: 'site/home',
    contactUs: 'site/contact-us'
  },
  doctors: {
    getAll: 'site/doctors',
    joinUs: 'site/doctor-registration-request',
    countries: 'site/countries',
    getSpecialists: 'site/specialists'
  },
  blogs: {
    getAll: 'site/blogs'
  }
}
