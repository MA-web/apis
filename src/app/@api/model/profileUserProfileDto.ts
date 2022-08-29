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
import { AddressDto } from './addressDto';
import { AttachmentDto } from './attachmentDto';


export interface ProfileUserProfileDto { 
    aboutMe?: string;
    address?: AddressDto;
    fax?: string;
    gender?: ProfileUserProfileDto.GenderEnum;
    image?: AttachmentDto;
    interestedIn?: string;
    landLine?: string;
    phone?: string;
    skype?: string;
    title?: string;
    userProfileId?: number;
    workingIn?: string;
    type?: ProfileUserProfileDto.TypeEnum;
}
export namespace ProfileUserProfileDto {
    export type GenderEnum = 'FEMALE' | 'MALE';
    export const GenderEnum = {
        FEMALE: 'FEMALE' as GenderEnum,
        MALE: 'MALE' as GenderEnum
    };

    export type TypeEnum = 'Manufacturer' | 'Trader' | 'Manufacturer_and_Trader' | 'Broker';
    export const TypeEnum = {
        Manufacturer: 'Manufacturer' as TypeEnum,
        Trader: 'Trader' as TypeEnum,
        Manufacturer_and_Trader: 'Manufacturer and Trader' as TypeEnum,
        Broker: 'Broker' as TypeEnum,
    };
}
