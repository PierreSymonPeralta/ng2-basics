export interface Customer {
  name:string;
  paymentMethod : {
    type:string;
    card:{
      cardNo:string;
      cardHolder: string;
      expiry:string;
    },
    bank:{
      accountNo: string;
      accountHolder: string;
      routingNo: string;
    }
  }
}
