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
/* tslint:disable:no-unused-variable member-ordering */

import { Inject, Injectable, Optional }                      from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams,
         HttpResponse, HttpEvent }                           from '@angular/common/http';
import { CustomHttpUrlEncodingCodec }                        from '../encoder';

import { Observable }                                        from 'rxjs';

import { ChatDto } from '../model/chatDto';
import { MessageDto } from '../model/messageDto';
import { PageChatDto } from '../model/pageChatDto';

import { BASE_PATH, COLLECTION_FORMATS }                     from '../variables';
import { Configuration }                                     from '../configuration';


@Injectable()
export class InboxControllerService {

    protected basePath = 'https://164.92.242.241:8060';
    public defaultHeaders = new HttpHeaders();
    public configuration = new Configuration();

    constructor(protected httpClient: HttpClient, @Optional()@Inject(BASE_PATH) basePath: string, @Optional() configuration: Configuration) {
        if (basePath) {
            this.basePath = basePath;
        }
        if (configuration) {
            this.configuration = configuration;
            this.basePath = basePath || configuration.basePath || this.basePath;
        }
    }

    /**
     * @param consumes string[] mime-types
     * @return true: consumes contains 'multipart/form-data', false: otherwise
     */
    private canConsumeForm(consumes: string[]): boolean {
        const form = 'multipart/form-data';
        for (const consume of consumes) {
            if (form === consume) {
                return true;
            }
        }
        return false;
    }


    /**
     * get count of all chats messages in a user&#39;s inbox
     *
     * @param observe set whether or not to return the data Observable as the body, response or events. defaults to returning the body.
     * @param reportProgress flag to report request and response progress.
     */
    public countReceivedMessagesUsingGET(observe?: 'body', reportProgress?: boolean): Observable<{ [key: string]: number; }>;
    public countReceivedMessagesUsingGET(observe?: 'response', reportProgress?: boolean): Observable<HttpResponse<{ [key: string]: number; }>>;
    public countReceivedMessagesUsingGET(observe?: 'events', reportProgress?: boolean): Observable<HttpEvent<{ [key: string]: number; }>>;
    public countReceivedMessagesUsingGET(observe: any = 'body', reportProgress: boolean = false ): Observable<any> {

        let headers = this.defaultHeaders;

        // authentication (JWT) required
        if (this.configuration.apiKeys && this.configuration.apiKeys["Authorization"]) {
            headers = headers.set('Authorization', this.configuration.apiKeys["Authorization"]);
        }

        // to determine the Accept header
        let httpHeaderAccepts: string[] = [
            'application/json'
        ];
        const httpHeaderAcceptSelected: string | undefined = this.configuration.selectHeaderAccept(httpHeaderAccepts);
        if (httpHeaderAcceptSelected != undefined) {
            headers = headers.set('Accept', httpHeaderAcceptSelected);
        }

        // to determine the Content-Type header
        const consumes: string[] = [
        ];

        return this.httpClient.get<{ [key: string]: number; }>(`${this.basePath}/api/inbox/count`,
            {
                withCredentials: this.configuration.withCredentials,
                headers: headers,
                observe: observe,
                reportProgress: reportProgress
            }
        );
    }

    /**
     * creates a new chat between a user and a supplier or between a user/supplier and an admin
     *
     * @param chat chat
     * @param observe set whether or not to return the data Observable as the body, response or events. defaults to returning the body.
     * @param reportProgress flag to report request and response progress.
     */
    public createChatUsingPOST(chat: ChatDto, observe?: 'body', reportProgress?: boolean): Observable<ChatDto>;
    public createChatUsingPOST(chat: ChatDto, observe?: 'response', reportProgress?: boolean): Observable<HttpResponse<ChatDto>>;
    public createChatUsingPOST(chat: ChatDto, observe?: 'events', reportProgress?: boolean): Observable<HttpEvent<ChatDto>>;
    public createChatUsingPOST(chat: ChatDto, observe: any = 'body', reportProgress: boolean = false ): Observable<any> {

        if (chat === null || chat === undefined) {
            throw new Error('Required parameter chat was null or undefined when calling createChatUsingPOST.');
        }

        let headers = this.defaultHeaders;

        // authentication (JWT) required
        if (this.configuration.apiKeys && this.configuration.apiKeys["Authorization"]) {
            headers = headers.set('Authorization', this.configuration.apiKeys["Authorization"]);
        }

        // to determine the Accept header
        let httpHeaderAccepts: string[] = [
            'application/json'
        ];
        const httpHeaderAcceptSelected: string | undefined = this.configuration.selectHeaderAccept(httpHeaderAccepts);
        if (httpHeaderAcceptSelected != undefined) {
            headers = headers.set('Accept', httpHeaderAcceptSelected);
        }

        // to determine the Content-Type header
        const consumes: string[] = [
            'application/json'
        ];
        const httpContentTypeSelected: string | undefined = this.configuration.selectHeaderContentType(consumes);
        if (httpContentTypeSelected != undefined) {
            headers = headers.set('Content-Type', httpContentTypeSelected);
        }

        return this.httpClient.post<ChatDto>(`${this.basePath}/api/inbox/chat`,
            chat,
            {
                withCredentials: this.configuration.withCredentials,
                headers: headers,
                observe: observe,
                reportProgress: reportProgress
            }
        );
    }

    /**
     * retrieve user&#39;s inbox
     *
     * @param page page
     * @param searchForValue searchForValue
     * @param size size
     * @param observe set whether or not to return the data Observable as the body, response or events. defaults to returning the body.
     * @param reportProgress flag to report request and response progress.
     */
    public getInboxUsingGET(page?: number, searchForValue?: string, size?: number, observe?: 'body', reportProgress?: boolean): Observable<PageChatDto>;
    public getInboxUsingGET(page?: number, searchForValue?: string, size?: number, observe?: 'response', reportProgress?: boolean): Observable<HttpResponse<PageChatDto>>;
    public getInboxUsingGET(page?: number, searchForValue?: string, size?: number, observe?: 'events', reportProgress?: boolean): Observable<HttpEvent<PageChatDto>>;
    public getInboxUsingGET(page?: number, searchForValue?: string, size?: number, observe: any = 'body', reportProgress: boolean = false ): Observable<any> {




        let queryParameters = new HttpParams({encoder: new CustomHttpUrlEncodingCodec()});
        if (page !== undefined && page !== null) {
            queryParameters = queryParameters.set('page', <any>page);
        }
        if (searchForValue !== undefined && searchForValue !== null) {
            queryParameters = queryParameters.set('searchForValue', <any>searchForValue);
        }
        if (size !== undefined && size !== null) {
            queryParameters = queryParameters.set('size', <any>size);
        }

        let headers = this.defaultHeaders;

        // authentication (JWT) required
        if (this.configuration.apiKeys && this.configuration.apiKeys["Authorization"]) {
            headers = headers.set('Authorization', this.configuration.apiKeys["Authorization"]);
        }

        // to determine the Accept header
        let httpHeaderAccepts: string[] = [
            'application/json'
        ];
        const httpHeaderAcceptSelected: string | undefined = this.configuration.selectHeaderAccept(httpHeaderAccepts);
        if (httpHeaderAcceptSelected != undefined) {
            headers = headers.set('Accept', httpHeaderAcceptSelected);
        }

        // to determine the Content-Type header
        const consumes: string[] = [
        ];

        return this.httpClient.get<PageChatDto>(`${this.basePath}/api/inbox`,
            {
                params: queryParameters,
                withCredentials: this.configuration.withCredentials,
                headers: headers,
                observe: observe,
                reportProgress: reportProgress
            }
        );
    }

    /**
     * reply with a message to a chat with id {chatId}
     *
     * @param chatId chatId
     * @param message message
     * @param observe set whether or not to return the data Observable as the body, response or events. defaults to returning the body.
     * @param reportProgress flag to report request and response progress.
     */
    public replyToChatUsingPOST(chatId: number, message: MessageDto, observe?: 'body', reportProgress?: boolean): Observable<MessageDto>;
    public replyToChatUsingPOST(chatId: number, message: MessageDto, observe?: 'response', reportProgress?: boolean): Observable<HttpResponse<MessageDto>>;
    public replyToChatUsingPOST(chatId: number, message: MessageDto, observe?: 'events', reportProgress?: boolean): Observable<HttpEvent<MessageDto>>;
    public replyToChatUsingPOST(chatId: number, message: MessageDto, observe: any = 'body', reportProgress: boolean = false ): Observable<any> {

        if (chatId === null || chatId === undefined) {
            throw new Error('Required parameter chatId was null or undefined when calling replyToChatUsingPOST.');
        }

        if (message === null || message === undefined) {
            throw new Error('Required parameter message was null or undefined when calling replyToChatUsingPOST.');
        }

        let headers = this.defaultHeaders;

        // authentication (JWT) required
        if (this.configuration.apiKeys && this.configuration.apiKeys["Authorization"]) {
            headers = headers.set('Authorization', this.configuration.apiKeys["Authorization"]);
        }

        // to determine the Accept header
        let httpHeaderAccepts: string[] = [
            'application/json'
        ];
        const httpHeaderAcceptSelected: string | undefined = this.configuration.selectHeaderAccept(httpHeaderAccepts);
        if (httpHeaderAcceptSelected != undefined) {
            headers = headers.set('Accept', httpHeaderAcceptSelected);
        }

        // to determine the Content-Type header
        const consumes: string[] = [
            'application/json'
        ];
        const httpContentTypeSelected: string | undefined = this.configuration.selectHeaderContentType(consumes);
        if (httpContentTypeSelected != undefined) {
            headers = headers.set('Content-Type', httpContentTypeSelected);
        }

        return this.httpClient.post<MessageDto>(`${this.basePath}/api/inbox/chat/${encodeURIComponent(String(chatId))}/reply`,
            message,
            {
                withCredentials: this.configuration.withCredentials,
                headers: headers,
                observe: observe,
                reportProgress: reportProgress
            }
        );
    }

}
