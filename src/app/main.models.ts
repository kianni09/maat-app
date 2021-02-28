export interface User {
  userID: string,
  name: string,
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
  judge: string,
  date_start: string,
  type: string,
  stage_name: string,
  description: string,
  plaintiffs: Participant[],
  defendants: Participant[],
  third_persons: Participant[],
  stages: Stages
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
  open?: boolean,
  delete: boolean
}

export interface SubscriptionAddForm {
  companyID: string,
	targets: string[],
	type: string,
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

export interface MonitoringType {
  name: string,
  value: string
}
