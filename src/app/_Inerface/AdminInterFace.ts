export interface AdminLogin {
  id: String,
  password: String
}

export interface Admin{
  token: string
}


export interface GetAllLendingRequestAndApproved{
  userId:number
  userName:string
  lastName:string
  bookTitle:string
  authorName:string
  quantity:string
  requestDate:string
  userStatus:string
  requestID:number
  amount:string

}

export interface GetAllReturn{
  lendID:number
  userId: number;
  userName: string;
  userStatus: string;
  bookTittle: string;
  lendDate: string;
  requestedDayes: string;
  dueDate: string;
  returnStatus:string
}
