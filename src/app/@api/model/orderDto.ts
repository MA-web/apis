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
import { BankAccountDto } from './bankAccountDto';
import { DealStepDto } from './dealStepDto';


export interface OrderDto { 
    adjustment?: string;
    bankAccount?: BankAccountDto;
    dealStep?: DealStepDto;
    orderId?: number;
    status?: number;
}
