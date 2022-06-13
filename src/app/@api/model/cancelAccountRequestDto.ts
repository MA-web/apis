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
import { CustomerDto } from './customerDto';
import { SupplierDto } from './supplierDto';


export interface CancelAccountRequestDto { 
    cancelAccountId?: number;
    cancelReason?: string;
    customer?: CustomerDto;
    image?: AttachmentDto;
    status?: CancelAccountRequestDto.StatusEnum;
    supplier?: SupplierDto;
}
export namespace CancelAccountRequestDto {
    export type StatusEnum = 'CANCELED' | 'PENDING';
    export const StatusEnum = {
        CANCELED: 'CANCELED' as StatusEnum,
        PENDING: 'PENDING' as StatusEnum
    };
}
