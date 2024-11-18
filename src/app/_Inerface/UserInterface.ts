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
