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
import { AttachmentDto } from './attachmentDto';
import { IncotermDto } from './incotermDto';
import { ItemCategoryIdDto } from './itemCategoryIdDto';
import { ItemCertificateDto } from './itemCertificateDto';
import { ItemKeywordDto } from './itemKeywordDto';
import { ItemPricingDto } from './itemPricingDto';
import { ItemSampleTypeDto } from './itemSampleTypeDto';
import { ItemSubcategoryIdDto } from './itemSubcategoryIdDto';
import { ItemSupplimentDto } from './itemSupplimentDto';
import { OriginIdDto } from './originIdDto';
import { PaymentTermDto } from './paymentTermDto';
import { SupplierCategoryDto } from './supplierCategoryDto';
import { SupplierIdDto } from './supplierIdDto';
import { TransportationDto } from './transportationDto';
import { UomIdDto } from './uomIdDto';


export interface ItemDto { 
    advantage?: string;
    appearence?: string;
    application: string;
    attachment: AttachmentDto;
    caseNumber: string;
    coa: string;
    commercialQuantity?: number;
    creationDate?: Date;
    details?: string;
    dissolutionRate: string;
    dmf?: string;
    escherichiaColi?: string;
    estimatedDeliveryLeadTime?: string;
    expiryDate: Date;
    form?: string;
    freeSamplePaidShippingQuantity?: number;
    freeSampleShippingQuantity?: number;
    gmpCertificate?: string;
    halal?: string;
    heavyMetal: string;
    incoterms?: Array<IncotermDto>;
    indotoxinTest?: string;
    injection?: boolean;
    iso?: string;
    itemCategory: ItemCategoryIdDto;
    itemCertificates?: Array<ItemCertificateDto>;
    itemId?: number;
    itemKeywords?: Array<ItemKeywordDto>;
    itemName: string;
    itemPricings: Array<ItemPricingDto>;
    itemSampleType?: ItemSampleTypeDto;
    itemSubcategory: ItemSubcategoryIdDto;
    itemSuppliments?: Array<ItemSupplimentDto>;
    lossOnDrying: number;
    meltingRange: number;
    micronization?: boolean;
    minOrderQuantity: number;
    molFormula?: string;
    opticalRotation?: number;
    origin?: OriginIdDto;
    packaging?: string;
    paidSampleQuantity?: number;
    particleSize: string;
    paymentTerms: Array<PaymentTermDto>;
    ph: number;
    portOfDispatching?: string;
    productionCapacity?: string;
    purity: string;
    relatedSubstance?: string;
    residualSolvents?: number;
    residueIgnition: number;
    salmonelaSpecies?: string;
    sampleSize?: number;
    sampleUnit?: UomIdDto;
    status: number;
    storage: string;
    supplier?: SupplierIdDto;
    supplierCategory?: SupplierCategoryDto;
    totalVac?: string;
    totalYamc?: string;
    transportation?: TransportationDto;
    uom: UomIdDto;
}
