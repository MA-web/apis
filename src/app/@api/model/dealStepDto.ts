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
import { DealIdDto } from './dealIdDto';
import { DealStepTypeDto } from './dealStepTypeDto';


export interface DealStepDto { 
    deal: DealIdDto;
    dealStepId?: number;
    dealStepType?: DealStepTypeDto;
}
