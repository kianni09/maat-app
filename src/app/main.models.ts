export interface User {
  userID: string,
  login: string,
  name?: string,
  companyID?: string,
  companyName?: string,
  queryLimit?: number
}

export interface LoginForm {
  login: string,
  password: string
}

export interface RegistrationForm {
  login: string,
  password: string,
  companyID: string,
  name: string
}

export interface DocumentsForm {
  companyID: string,
  number: string,
  notificationID: number
}

export interface Participant {
  name: string,
  type: string
}

export interface Document {
  adjudication_date: string,
  link: string,
  court_name: string,
  stage: string
}

export interface Stages {
  first: Document[],
  appeals: Document[],
  cassations: Document[]
}

export interface Case {
  number: string,
  court_name: string,
  judge?: string,
  date_start?: string,
  date_stage?: string,
  type?: string,
  stage_name: string,
  description: string,
  plaintiffs: Participant[],
  defendants: Participant[],
  third_persons: Participant[],
  stages?: Stages
}

export interface Notification {
  _id: number,
  companyID: string,
  subscriptionID: string,
  term: string,
  number: string,
  date: string,
  read: boolean
}

export interface Subscription {
  _id: string,
  companyID: string,
  type: string,
  subscriptionKey: string,
  subscribeTime: string,
  users: User[],
  notifications: Notification[],
  description: string;
  open?: boolean,
  delete: boolean
}

export interface SubscriptionAddForm {
  companyID: string,
  targets: string[],
  type: string,
  description: string;
  user: User
}

export interface SubscriptionAddAnswer {
  result: string,
  subscriptionID?: string[]
}

export interface SubscriptionDeleteForm {
  companyID: string,
  subscriptionID: string
}

export interface SubscriptionUserForm {
  companyID: string,
  subscriptionID: string,
  userID: string,
  name?: string
}

export interface SelectionItem {
  name: string,
  value: string
}

export interface MonitoringReportForm {
  companyID: string,
  dateFrom: string,
  dateTo: string
}

export interface ReportFileName {
  file: string
}

export interface DebtSearchFormItem {
  FirmEdrpou?: string,
  FirmName?: string,
  LastName?: string,
  FirstName?: string,
  MiddleName?: string,
  BirthDate?: string,
  BirthDateV?: string,
  IdentCode?: string,
  categoryCode?: string

}

export interface DebtSearchForm {
  searchType: string,
  paging: string,
  filter: DebtSearchFormItem,
  reCaptchaToken: string
}

export interface DebtSearchAnswer {
  isSuccess: boolean,
  results: DebtItem[]
}

export interface VPside {
  debtorOfVdID?: number,
  creditorOfVdID?: number,
  lastName?: string,
  firstName?: string,
  middleName?: string,
  birthDate?: string,
  name?: string,
  edrpou?: string,
  personSubType: string
}

export interface VPinfo {
  vdID: number,
  orderNum: string,
  mi_wfStateWithError: string,
  depID: number,
  depStr: string,
  beginDate: string,
  debtors: VPside[],
  creditors: VPside[]
}

export interface DebtItem {
  ID: number,
  rootID: number,
  lastName?: string,
  firstName?: string,
  middleName?: string,
  birthDate?: string,
  name?: string,
  code?: string,
  publisher: string,
  departmentCode: string,
  departmentName: string,
  departmentPhone: string,
  executor: string,
  executorPhone: string,
  executorEmail: string,
  deductionType: string,
  vpNum: string,
  vpInfo?: VPinfo
}

export interface CaseItem {
  "cause_number": string,
  "adjudication_date": string,
  "judgment_name": string,
  "justice_name": string,
  "stage": string,
  "court_name": string,
  "judge": string,
  "link": string
}

export interface CaseSearchResult {
  page: number,
  totalPages: number,
  totalCases: number,
  query: string,
  cases: CaseItem[]
}

export interface CompanyShort {
  hash_key: string,
  edrpou: string,
  name_short: string
}

export interface Company {
  hash_key: string,
  edrpou: string,
  name_short: string,
  status: string,
  registration_date: string,
  address: string,
  kinds: string[],
  capital: string,
  founders: string[],
  head: string,
  contacts: string,
  monitoring: boolean
}

export interface CompanyGet {
  hash_key: string,
  user_id: string
}

export interface MonitoringAction {
  key: string,
  user_id: string
}
