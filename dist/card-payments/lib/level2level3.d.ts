import { LineItem } from './line-item';
export declare class Level2level3 {
    private exemptLocalTax?;
    private localTaxAmount?;
    private nationalTaxAmount?;
    private freightAmount?;
    private dutyAmount?;
    private destinationZip?;
    private destinationCountry?;
    private shipFromZip?;
    private lineItems?;
    constructor(resp?: Level2level3);
    setExemptLocalTax(exemptLocalTax: boolean): void;
    getExemptLocalTax(): boolean | undefined;
    setLocalTaxAmount(localTaxAmount: number): void;
    getLocalTaxAmount(): number | undefined;
    setNationalTaxAmount(nationalTaxAmount: number): void;
    getNationalTaxAmount(): number | undefined;
    setFreightAmount(freightAmount: number): void;
    getFreightTaxAmount(): number | undefined;
    setDutyAmount(dutyAmount: number): void;
    getDutyAmount(): number | undefined;
    setDesitinationZip(destinationZip: string): void;
    getDesitinationZip(): string | undefined;
    setDesitinationCountry(destinationCountry: string): void;
    getDesitinationCountry(): string | undefined;
    setShipFromZip(shipFromZip: string): void;
    getShipFromZip(): string | undefined;
    setLineItems(lineItems: LineItem[]): void;
    getLineItems(): LineItem[] | undefined;
}
