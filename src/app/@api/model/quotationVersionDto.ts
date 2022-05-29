/**
 * apis backend
 * Ahmed Abdelrhman & Mohamed sabri
 *
 * OpenAPI spec version: 1.0
 * 
 *
 * NOTE: This class is auto generated by the swagger code generator program.
 * https://github.com/swagger-api/swagger-codegen.git
 * Do not edit the class manually.
 */
import { ActionDto } from './actionDto';
import { CurrencyIdDto } from './currencyIdDto';
import { QuotationDto } from './quotationDto';
import { UomIdDto } from './uomIdDto';


export interface QuotationVersionDto { 
    action?: ActionDto;
    currency?: CurrencyIdDto;
    finalPrice?: number;
    finalQuantity?: number;
    quotation?: QuotationDto;
    quotationVersionId?: number;
    shipmentIncludedDocuments?: string;
    specialPrecaution?: string;
    status?: number;
    termsConditions?: string;
    uom?: UomIdDto;
}
