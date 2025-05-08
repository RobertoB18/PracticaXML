import { Component, Input, AfterViewInit } from '@angular/core';

declare var paypal: any;

@Component({
  selector: 'app-paypal-button',
  templateUrl: './paypal-button.component.html',
})
export class PaypalButtonComponent implements AfterViewInit {
  @Input() total: number = 0;
  
  ngAfterViewInit(): void {
    paypal.Buttons({
      createOrder: (data: any, actions: any) => {
        return actions.order.create({
          purchase_units: [{
            amount: {
              value: this.total.toFixed(2) // Monto a cobrar
            }
          }]
        });
      },
      onApprove: (data: any, actions: any) => {
        return actions.order.capture().then((details: any) => {
          alert('Pago completado por ' + details.payer.name.given_name);
        });
      }
    }).render('#paypal-button-container');
  }
}

