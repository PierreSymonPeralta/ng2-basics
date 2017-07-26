import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { Customer } from './customer.interface'; // our customer model interface

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.css']
})
export class AboutComponent implements OnInit {
  private myForm: FormGroup; // ou model driven form
  private PAYMENT_METHOD_TYPE = {
    BANK:'bank',
    CARD:'card'
  };


  constructor(private _fb:FormBuilder, private router:Router) {

  }

  ngOnInit() {
    //we will initialize our model here
    this.myForm = this._fb.group({
      name:[],
      paymentMethod: this.initPaymentMethodFormGroup()
    });

      // subscribe to payment method type changes
     this.subscribePaymentTypeChanges();

     // set default type to BANK
     this.setPaymentMethodType(this.PAYMENT_METHOD_TYPE.BANK);
  }

  initPaymentMethodFormGroup(){
   const group = this._fb.group({
     type:[''],
     card: this._fb.group(this.initPaymentMethodCardModel()),
     bank: this._fb.group(this.initPaymentMethodBankModel())
   });
   return group;
 }

  initPaymentMethodCardModel(){
    // regex for master, visa, amex card
    // you get valid testing credit card from http://www.getcreditcardnumbers.com/
    const cardNoRegex = `^(?:4[0-9]{12}(?:[0-9]{3})?|5[1-5][0-9]{14}|6(?:011|5[0-9][0-9])[0-9]{12}|3[47][0-9]{13}|3(?:0[0-5]|[68][0-9])[0-9]{11}|(?:2131|1800|35\d{3})\d{11})$`;
    // regex for expiry format MM/YY
    const expiryRegex = `^(0[1-9]|1[0-2])\/?([0-9]{4}|[0-9]{2})$`;

    const model = {
      cardNo:['',[Validators.required, Validators.pattern(cardNoRegex)]],
      cardHolder:['',Validators.required],
      expiry:['',[Validators.required, Validators.pattern(expiryRegex)]]
    }
    return model;
 }

  initPaymentMethodBankModel(){
   const model = {
     accountNo:['', Validators.required],
     accountHolder:['', Validators.required],
     routingNo:['', Validators.required]
   }
   return model;
 }

  setPaymentMethodType(type: string){
    const ctrl: FormControl = (<any>this.myForm).controls.paymentMethod.controls.type;
    ctrl.setValue(type);
  }

  subscribePaymentTypeChanges() {
    // controls
    const pmCtrl = (<any>this.myForm).controls.paymentMethod;
    const bankCtrl = pmCtrl.controls.bank;
    const cardCtrl = pmCtrl.controls.card;

    // initialize value changes stream
    const changes$ = pmCtrl.controls.type.valueChanges;

    // subscribe to the stream
    changes$.subscribe(paymentMethodType => {
        // BANK
        if (paymentMethodType === this.PAYMENT_METHOD_TYPE.BANK) {
            // apply validators to each bank fields, retrieve validators from bank model
            Object.keys(bankCtrl.controls).forEach(key => {
                bankCtrl.controls[key].setValidators(this.initPaymentMethodBankModel()[key][1]);
                bankCtrl.controls[key].updateValueAndValidity();
            });

            // remove all validators from card fields
            Object.keys(cardCtrl.controls).forEach(key => {
                cardCtrl.controls[key].setValidators(null);
                cardCtrl.controls[key].updateValueAndValidity();
            });
        }

        // CARD
        if (paymentMethodType === this.PAYMENT_METHOD_TYPE.CARD) {
            // remove all validators from bank fields
            Object.keys(bankCtrl.controls).forEach(key => {
                bankCtrl.controls[key].setValidators(null);
                bankCtrl.controls[key].updateValueAndValidity();
            });

            // apply validators to each card fields, retrieve validators from card model
            Object.keys(cardCtrl.controls).forEach(key => {
                cardCtrl.controls[key].setValidators(this.initPaymentMethodCardModel()[key][1]);
                cardCtrl.controls[key].updateValueAndValidity();
            });
        }

    });
  }

  save(model: Customer, isValid:boolean){
    console.log(model, isValid);
  }

  gotoUsers(){
    this.router.navigate(['users'])
  }

}
