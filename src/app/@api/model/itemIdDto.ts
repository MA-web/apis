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
import { ItemCategoryIdDto } from './itemCategoryIdDto';
import { ItemSubcategoryIdDto } from './itemSubcategoryIdDto';
import { SupplierIdDto } from './supplierIdDto';


export interface ItemIdDto { 
    itemCategory?: ItemCategoryIdDto;
    itemId: number;
    itemName?: string;
    itemSubcategory?: ItemSubcategoryIdDto;
    supplier: SupplierIdDto;
}
