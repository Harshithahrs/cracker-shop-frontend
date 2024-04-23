import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CheckoutService } from '../../service/checkout.service';
import { CheckoutData } from '../../model/CheckoutData';
import { Router } from '@angular/router';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']
})
export class CheckoutComponent implements OnInit {
  checkoutFormGroup!: FormGroup;
  savedCheckoutData: CheckoutData | any = null;
  constructor(private formBuilder: FormBuilder, private checkoutService: CheckoutService,
    private router:Router
  ) { }

  ngOnInit(): void {
    this.checkoutFormGroup = this.formBuilder.group({
      customer: this.formBuilder.group({
        firstName: ['', [Validators.required, Validators.minLength(2)]],
        lastName: ['', [Validators.required, Validators.minLength(2)]],
        email: ['', [Validators.required, Validators.email]],
        phone: ['', [Validators.required]]
      }),
      shippingAddress: this.formBuilder.group({
        street: ['', [Validators.required]],
        city: [''],
        state: [''],
        zipCode: ['']
      })
    });
    const savedData = localStorage.getItem('checkoutData');
    if (savedData) {
      this.savedCheckoutData = JSON.parse(savedData);
      // Patch the form with saved data
      this.checkoutFormGroup.patchValue(this.savedCheckoutData);
    }
  }

  onSubmit(): void {
    if (this.checkoutFormGroup.invalid) {
      this.checkoutFormGroup.markAllAsTouched();
      return;
    }
     const formData=this.checkoutFormGroup.value as CheckoutData
     localStorage.setItem('checkoutData', JSON.stringify(formData));

    this.checkoutService.placeOrder(formData);
    this.router.navigate(['/order-success']);
    console.log('Form submitted successfully!');
    console.log(formData);
  }

  // Getter methods for form controls
  get firstName() { return this.checkoutFormGroup.get('customer.firstName'); }
  get lastName() { return this.checkoutFormGroup.get('customer.lastName'); }
  get email() { return this.checkoutFormGroup.get('customer.email'); }
  get phone() { return this.checkoutFormGroup.get('customer.phone'); }
  get street() { return this.checkoutFormGroup.get('shippingAddress.street'); }
}
