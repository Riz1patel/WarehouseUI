export class ClientModel {
  // customerId: number;
  name: string;
  address: string;
  mobile: string;
  email: string;
  gstNo: string;
  id: number;

  constructor() {
    this.id = 0;
    this.name = '';
    this.address = '';
    this.mobile = '';
    this.email = '';
    this.gstNo = '';
  }
}