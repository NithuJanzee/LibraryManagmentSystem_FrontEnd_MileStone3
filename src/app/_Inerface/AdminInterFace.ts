export interface AdminLogin {
  id: String,
  password: String
}

export interface Admin{
  token: string
}


export interface GetAllLendingRequest{
  userId:number
  userName:string
  lastName:string
  bookTitle:string
  authorName:string
  quantity:string
  requestDate:string
  userStatus:string
  requestID:number
}
