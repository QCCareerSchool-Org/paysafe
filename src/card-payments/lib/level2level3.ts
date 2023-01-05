import { createArray } from '../../common/create-array';
import { LineItem } from './line-item';

const LOCAL_TAX_AMOUNT_MAX = 99999999999;
const NATIONAL_TAX_AMOUNT_MAX = 99999999999;
const FREIGHT_AMOUNT_MAX = 99999999999;
const DUTY_AMOUNT_MAX = 99999999999;
const DESINTATION_ZIP_MAX_LENGTH = 10;
const DESTINATION_COUNTRY_MAX_LENGTH = 2;
const SHIP_FROM_ZIP_MAX_LENGTH = 10;

export class Level2level3 {

  private exemptLocalTax?: boolean;
  private localTaxAmount?: number;
  private nationalTaxAmount?: number;
  private freightAmount?: number;
  private dutyAmount?: number;
  private destinationZip?: string;
  private destinationCountry?: string;
  private shipFromZip?: string;
  private lineItems?: LineItem[];

  constructor(resp?: Level2level3) {
    if (!resp) {
      return;
    }
    if (typeof resp.exemptLocalTax !== 'undefined') {
      this.exemptLocalTax = resp.exemptLocalTax;
    }
    if (typeof resp.localTaxAmount !== 'undefined') {
      this.localTaxAmount = resp.localTaxAmount;
    }
    if (typeof resp.nationalTaxAmount !== 'undefined') {
      this.nationalTaxAmount = resp.nationalTaxAmount;
    }
    if (typeof resp.freightAmount !== 'undefined') {
      this.freightAmount = resp.freightAmount;
    }
    if (typeof resp.dutyAmount !== 'undefined') {
      this.dutyAmount = resp.dutyAmount;
    }
    if (typeof resp.destinationZip !== 'undefined') {
      this.destinationZip = resp.destinationZip;
    }
    if (typeof resp.destinationCountry !== 'undefined') {
      this.destinationCountry = resp.destinationCountry;
    }
    if (typeof resp.shipFromZip !== 'undefined') {
      this.shipFromZip = resp.shipFromZip;
    }
    if (typeof resp.lineItems !== 'undefined') {
      this.lineItems = createArray(resp.lineItems, LineItem);
    }
  }

  public setExemptLocalTax(exemptLocalTax: boolean): void { this.exemptLocalTax = exemptLocalTax; }
  public getExemptLocalTax(): boolean | undefined { return this.exemptLocalTax; }

  public setLocalTaxAmount(localTaxAmount: number): void {
    if (localTaxAmount < 0 || localTaxAmount > LOCAL_TAX_AMOUNT_MAX) {
      throw new Error('invalid localTaxAmount');
    }
    this.localTaxAmount = localTaxAmount;
  }

  public getLocalTaxAmount(): number | undefined { return this.localTaxAmount; }

  public setNationalTaxAmount(nationalTaxAmount: number): void {
    if (nationalTaxAmount < 0 || nationalTaxAmount > NATIONAL_TAX_AMOUNT_MAX) {
      throw new Error('invalid nationalTaxAmount');
    }
    this.nationalTaxAmount = nationalTaxAmount;
  }

  public getNationalTaxAmount(): number | undefined { return this.nationalTaxAmount; }

  public setFreightAmount(freightAmount: number): void {
    if (freightAmount < 0 || freightAmount > FREIGHT_AMOUNT_MAX) {
      throw new Error('invalid freightAmount');
    }
    this.freightAmount = freightAmount;
  }

  public getFreightTaxAmount(): number | undefined { return this.freightAmount; }

  public setDutyAmount(dutyAmount: number): void {
    if (dutyAmount < 0 || dutyAmount > DUTY_AMOUNT_MAX) {
      throw new Error('invalid dutyAmount');
    }
    this.dutyAmount = dutyAmount;
  }

  public getDutyAmount(): number | undefined { return this.dutyAmount; }

  public setDesitinationZip(destinationZip: string): void {
    if (destinationZip.length > DESINTATION_ZIP_MAX_LENGTH) {
      throw new Error('invalid destinationZip');
    }
    this.destinationZip = destinationZip;
  }

  public getDesitinationZip(): string | undefined { return this.destinationZip; }

  public setDesitinationCountry(destinationCountry: string): void {
    if (destinationCountry.length > DESTINATION_COUNTRY_MAX_LENGTH) {
      throw new Error('invalid destinationCountry');
    }
    this.destinationCountry = destinationCountry;
  }

  public getDesitinationCountry(): string | undefined { return this.destinationCountry; }

  public setShipFromZip(shipFromZip: string): void {
    if (shipFromZip.length > SHIP_FROM_ZIP_MAX_LENGTH) {
      throw new Error('invalid shipFromZip');
    }
    this.shipFromZip = shipFromZip;
  }

  public getShipFromZip(): string | undefined { return this.shipFromZip; }

  public setLineItems(lineItems: LineItem[]): void { this.lineItems = lineItems; }
  public getLineItems(): LineItem[] | undefined { return this.lineItems; }

}
