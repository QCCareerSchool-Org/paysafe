"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const create_array_1 = require("../../common/create-array");
const line_item_1 = require("./line-item");
const LOCAL_TAX_AMOUNT_MAX = 99999999999;
const NATIONAL_TAX_AMOUNT_MAX = 99999999999;
const FREIGHT_AMOUNT_MAX = 99999999999;
const DUTY_AMOUNT_MAX = 99999999999;
const DESINTATION_ZIP_MAX_LENGTH = 10;
const DESTINATION_COUNTRY_MAX_LENGTH = 2;
const SHIP_FROM_ZIP_MAX_LENGTH = 10;
class Level2level3 {
    constructor(resp) {
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
            this.lineItems = create_array_1.createArray(resp.lineItems, line_item_1.LineItem);
        }
    }
    setExemptLocalTax(exemptLocalTax) { this.exemptLocalTax = exemptLocalTax; }
    getExemptLocalTax() { return this.exemptLocalTax; }
    setLocalTaxAmount(localTaxAmount) {
        if (localTaxAmount < 0 || localTaxAmount > LOCAL_TAX_AMOUNT_MAX) {
            throw new Error('invalid localTaxAmount');
        }
        this.localTaxAmount = localTaxAmount;
    }
    getLocalTaxAmount() { return this.localTaxAmount; }
    setNationalTaxAmount(nationalTaxAmount) {
        if (nationalTaxAmount < 0 || nationalTaxAmount > NATIONAL_TAX_AMOUNT_MAX) {
            throw new Error('invalid nationalTaxAmount');
        }
        this.nationalTaxAmount = nationalTaxAmount;
    }
    getNationalTaxAmount() { return this.nationalTaxAmount; }
    setFreightAmount(freightAmount) {
        if (freightAmount < 0 || freightAmount > FREIGHT_AMOUNT_MAX) {
            throw new Error('invalid freightAmount');
        }
        this.freightAmount = freightAmount;
    }
    getFreightTaxAmount() { return this.freightAmount; }
    setDutyAmount(dutyAmount) {
        if (dutyAmount < 0 || dutyAmount > DUTY_AMOUNT_MAX) {
            throw new Error('invalid dutyAmount');
        }
        this.dutyAmount = dutyAmount;
    }
    getDutyAmount() { return this.dutyAmount; }
    setDesitinationZip(destinationZip) {
        if (destinationZip.length > DESINTATION_ZIP_MAX_LENGTH) {
            throw new Error('invalid destinationZip');
        }
        this.destinationZip = destinationZip;
    }
    getDesitinationZip() { return this.destinationZip; }
    setDesitinationCountry(destinationCountry) {
        if (destinationCountry.length > DESTINATION_COUNTRY_MAX_LENGTH) {
            throw new Error('invalid destinationCountry');
        }
        this.destinationCountry = destinationCountry;
    }
    getDesitinationCountry() { return this.destinationCountry; }
    setShipFromZip(shipFromZip) {
        if (shipFromZip.length > SHIP_FROM_ZIP_MAX_LENGTH) {
            throw new Error('invalid shipFromZip');
        }
        this.shipFromZip = shipFromZip;
    }
    getShipFromZip() { return this.shipFromZip; }
    setLineItems(lineItems) { this.lineItems = lineItems; }
    getLineItems() { return this.lineItems; }
}
exports.Level2level3 = Level2level3;
