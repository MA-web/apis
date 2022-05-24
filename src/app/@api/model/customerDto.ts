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


export interface CustomerDto { 
    businessLicense?: AttachmentDto;
    companyType?: string;
    establishmentDate?: string;
    exportPercentage?: string;
    mainCustomer?: string;
    mainMarkets?: string;
    numberOfEmployees?: number;
    totalAnnualSalesVolume?: string;
    website?: string;
}
