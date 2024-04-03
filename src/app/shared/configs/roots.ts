export const roots = {
  auth: {
    login: '/Account/login',
    isEmailFound: "/Account/IsEmailFound",
    isUserNameFound: "/Account/IsUserNameFound",
    isVatIdAvailableRegister: '/Application/IsVatNumberAvailable',
    checkCompanyNameAvailability: 'Supplier/checkCompanyNameAvailability',
    register: "/Application/Register",
    forgetPassword: '/Account/ForgetPassword',
    validateCode: '/Account/ValidateCode',
    resetNewPassword: '/Account/ResetPassword'
  },
  supplier: {
    getCountries: "/Country/GetCountrys",
    getCitiesByCountryId: "/City/GetCitysByCountryId",
  },
  dashboard: {
    clients: {
      getClients: '/getClients',
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
      IsRecordNumberAvailable: "/RecordNumber",
    }
  }
}
