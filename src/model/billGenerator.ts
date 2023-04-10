import { BillGeneratorAdapter } from '../interfaces/billGeneratorAdapter';

export class billGenerator {
  private billGeneratorAdapter?: BillGeneratorAdapter;

  public generateBill(): string {
    return this.billGeneratorAdapter ? this.billGeneratorAdapter.generateBill() : '';
  }
}
