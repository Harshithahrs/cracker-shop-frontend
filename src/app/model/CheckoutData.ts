// Define an interface for checkout data
export interface CheckoutData {
    customer: {
      firstName: string;
      lastName: string;
      email: string;
      phone: string;
    };
    shippingAddress: {
      street: string;
      city: string;
      state: string;
      zipCode: string;
    };
  }
  