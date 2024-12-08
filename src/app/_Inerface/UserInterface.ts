export interface UserAccount {
  nic: string
  firstName: string
  lastName: string
  email: string
  phone: string
  password: string
}


export interface UserLogin {
  nic: String,
  password: String
}

export interface LoggedUsers {
  token: string
}

export interface DecodedToken {
  NIC: string;
  Phone: string;
  email: string;
  exp: number;
  family_name: string;
  given_name: string;
  iat: number;
  nameid: string;
  nbf: number;
  role: string;
}

export interface UserTransactionById{
  bookId:number
  lendID:number
  bookTitle:string
  authorName:string
  status:number
  requestDate:string
  requestDays:string
  rentDate:string
  dueDate:string
  todayDatepluse2:string
  todayDatepluse1:string
  actualDate:string
  approvedDate:string
  waitingStart:string
  waitingEnd:string
}

export interface password{
  nic:string
  newPassword:string
}

export interface UserID{
  userId:number
}
