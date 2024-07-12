import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';

declare var paypal: any;

@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.css'],
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterModule]
})
export class PaymentComponent implements OnInit {
  paymentForm!: FormGroup;

  @ViewChild('paymentRef', { static: true }) paymentRef!: ElementRef;

  constructor(private fb: FormBuilder, private router: Router) { }

  ngOnInit(): void {
    this.paymentForm = this.fb.group({
      amount: ['', Validators.required],
    });

    this.renderPayPalButton();
  }

  renderPayPalButton(): void {
    paypal.Buttons({
      style: {
        layout: 'horizontal',
        color: 'blue',
        shape: 'rect',
        label: 'paypal',
      },
      createOrder: (data: any, actions: any) => {
        const amount = this.paymentForm.get('amount')?.value;
        return actions.order.create({
          purchase_units: [{
            amount: {
              value: amount
            },
          }],
        });
      },
      onApprove: (data: any, actions: any) => {
        return actions.order.capture().then((details: any) => {
          console.log('Transaction completed by ' + details.payer.name.given_name);
          // Handle successful transaction here
        });
      },
      onError: (err: any) => {
        console.error('Error during the transaction', err);
        // Handle error here
      }
    }).render(this.paymentRef.nativeElement);
  }

  onSubmit(): void {
    if (this.paymentForm.valid) {
      this.renderPayPalButton();
    }
  }

  onCancel(): void {
    this.router.navigate(['/auth/login']);
  }
}



