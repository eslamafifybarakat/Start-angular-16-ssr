export const roots = {
  auth: {
    login: 'User/Login',
    currentUserInformation: '/User/GetCurrentLoginInformations',
    
    forgetPassword: '/Account/ForgetPassword',
    validateCode: '/Account/ValidateCode',
    resetPassword: '/Account/ResetPassword',
    updateProfile: '/Account/UpdateProfile',

    isEmailAvailable: "/Account/IsEmailAvailable",
    
    isUserNameFound: "/Account/IsUserNameFound",
    isVatIdAvailableRegister: '/Application/IsVatNumberAvailable',
    checkCompanyNameAvailability: 'Supplier/checkCompanyNameAvailability',
    register: "/Application/Register",
  },
  supplier: {
    getCountries: "/Country/GetCountrys",
    getCitiesByCountryId: "/City/GetCitysByCountryId",
  },
  dashboard: {
    clients: {
      getClients: 'Client/AllClients',
      addClient: '/addClient',
      editClient: '/editClient',
      deleteClients: '/deleteClients',
      IsNationalIdentityAvailable: "/nationalIdentity",
      IsEmailAvailable: "/check_email",
      IsPhoneAvailable: "/check_phone"
    },
    records: {
      getRecords: '/getRecords',
      addRecords: '/addRecords',
      editRecords: '/editRecords',
      IsRecordNumberAvailable: "/RecordNumber",
    },
    employees: {
      getEmployees: '/getEmployees',
      addEmployee: '/addEmployee'
    },
    vehicles: {
      getVehicles: '/getVehicles',
      addVehicle: '/addVehicle'
    }
  }
}
