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
import { ChatUserDto } from './chatUserDto';
import { MessageDto } from './messageDto';


export interface ChatDto { 
    admin?: ChatUserDto;
    adminChat?: boolean;
    chatId?: number;
    chatTitle: string;
    messages: Array<MessageDto>;
    supplier?: ChatUserDto;
    user?: ChatUserDto;
}