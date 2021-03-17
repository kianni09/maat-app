const link = "http://95.181.178.7:3658/"

export const environment = {
  production: true,

  registration: link + "user/registration/",
  login: link + "user/login/",
  getUserData: link + "user?userID=",
  checkUserLogin: link + "user/login-check?login=",
  checkCompanyID: link + "user/company-check?companyID=",

  getSubscriptions: link + "subscriptions?companyID=",
  getDocuments: link + "court-cases/",
  addSubscription: link + "subscriptions/",
  deleteSubscription: link + "subscriptions/delete/",
  addSubscriptionUser: link + "subscriptions/watch",
  deleteSubscriptionUser: link + "subscriptions/unwatch/",

  searchCourt: link + "search/court?value=",
  createMonitoringCourtReport: link + "monitoring/court/report/",
  downloadReport: link + "monitoring/report/download/"
};
