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
import { EventDto } from '../model/eventDto';
import { NewsDto } from '../model/newsDto';
import { PageEventDto } from '../model/pageEventDto';

import { BASE_PATH, COLLECTION_FORMATS }                     from '../variables';
import { Configuration }                                     from '../configuration';


@Injectable()
export class EventControllerService {

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
     * count
     *
     * @param observe set whether or not to return the data Observable as the body, response or events. defaults to returning the body.
     * @param reportProgress flag to report request and response progress.
     */
    public countUsingGET(observe?: 'body', reportProgress?: boolean): Observable<{ [key: string]: number; }>;
    public countUsingGET(observe?: 'response', reportProgress?: boolean): Observable<HttpResponse<{ [key: string]: number; }>>;
    public countUsingGET(observe?: 'events', reportProgress?: boolean): Observable<HttpEvent<{ [key: string]: number; }>>;
    public countUsingGET(observe: any = 'body', reportProgress: boolean = false ): Observable<any> {

        let headers = this.defaultHeaders;

        // authentication (JWT) required
        if (this.configuration.apiKeys && this.configuration.apiKeys["Authorization"]) {
            headers = headers.set('Authorization', this.configuration.apiKeys["Authorization"]);
        }

        // to determine the Accept header
        let httpHeaderAccepts: string[] = [
            '*/*'
        ];
        const httpHeaderAcceptSelected: string | undefined = this.configuration.selectHeaderAccept(httpHeaderAccepts);
        if (httpHeaderAcceptSelected != undefined) {
            headers = headers.set('Accept', httpHeaderAcceptSelected);
        }

        // to determine the Content-Type header
        const consumes: string[] = [
        ];

        return this.httpClient.get<{ [key: string]: number; }>(`${this.basePath}/api/event/count`,
            {
                withCredentials: this.configuration.withCredentials,
                headers: headers,
                observe: observe,
                reportProgress: reportProgress
            }
        );
    }

    /**
     * createEvent
     *
     * @param eventDto eventDto
     * @param observe set whether or not to return the data Observable as the body, response or events. defaults to returning the body.
     * @param reportProgress flag to report request and response progress.
     */
    public createEventUsingPOST(eventDto: EventDto, observe?: 'body', reportProgress?: boolean): Observable<EventDto>;
    public createEventUsingPOST(eventDto: EventDto, observe?: 'response', reportProgress?: boolean): Observable<HttpResponse<EventDto>>;
    public createEventUsingPOST(eventDto: EventDto, observe?: 'events', reportProgress?: boolean): Observable<HttpEvent<EventDto>>;
    public createEventUsingPOST(eventDto: EventDto, observe: any = 'body', reportProgress: boolean = false ): Observable<any> {

        if (eventDto === null || eventDto === undefined) {
            throw new Error('Required parameter eventDto was null or undefined when calling createEventUsingPOST.');
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

        return this.httpClient.post<EventDto>(`${this.basePath}/api/event`,
            eventDto,
            {
                withCredentials: this.configuration.withCredentials,
                headers: headers,
                observe: observe,
                reportProgress: reportProgress
            }
        );
    }

    /**
     * deleteEvent
     *
     * @param eventId eventId
     * @param observe set whether or not to return the data Observable as the body, response or events. defaults to returning the body.
     * @param reportProgress flag to report request and response progress.
     */
    public deleteEventUsingDELETE(eventId: number, observe?: 'body', reportProgress?: boolean): Observable<NewsDto>;
    public deleteEventUsingDELETE(eventId: number, observe?: 'response', reportProgress?: boolean): Observable<HttpResponse<NewsDto>>;
    public deleteEventUsingDELETE(eventId: number, observe?: 'events', reportProgress?: boolean): Observable<HttpEvent<NewsDto>>;
    public deleteEventUsingDELETE(eventId: number, observe: any = 'body', reportProgress: boolean = false ): Observable<any> {

        if (eventId === null || eventId === undefined) {
            throw new Error('Required parameter eventId was null or undefined when calling deleteEventUsingDELETE.');
        }

        let headers = this.defaultHeaders;

        // authentication (JWT) required
        if (this.configuration.apiKeys && this.configuration.apiKeys["Authorization"]) {
            headers = headers.set('Authorization', this.configuration.apiKeys["Authorization"]);
        }

        // to determine the Accept header
        let httpHeaderAccepts: string[] = [
            '*/*'
        ];
        const httpHeaderAcceptSelected: string | undefined = this.configuration.selectHeaderAccept(httpHeaderAccepts);
        if (httpHeaderAcceptSelected != undefined) {
            headers = headers.set('Accept', httpHeaderAcceptSelected);
        }

        // to determine the Content-Type header
        const consumes: string[] = [
        ];

        return this.httpClient.delete<NewsDto>(`${this.basePath}/api/event/${encodeURIComponent(String(eventId))}`,
            {
                withCredentials: this.configuration.withCredentials,
                headers: headers,
                observe: observe,
                reportProgress: reportProgress
            }
        );
    }

    /**
     * getEvents
     *
     * @param eventEndDate eventEndDate
     * @param eventStartDate eventStartDate
     * @param page page
     * @param size size
     * @param observe set whether or not to return the data Observable as the body, response or events. defaults to returning the body.
     * @param reportProgress flag to report request and response progress.
     */
    public getEventsUsingGET(eventEndDate?: Date, eventStartDate?: Date, page?: number, size?: number, observe?: 'body', reportProgress?: boolean): Observable<PageEventDto>;
    public getEventsUsingGET(eventEndDate?: Date, eventStartDate?: Date, page?: number, size?: number, observe?: 'response', reportProgress?: boolean): Observable<HttpResponse<PageEventDto>>;
    public getEventsUsingGET(eventEndDate?: Date, eventStartDate?: Date, page?: number, size?: number, observe?: 'events', reportProgress?: boolean): Observable<HttpEvent<PageEventDto>>;
    public getEventsUsingGET(eventEndDate?: Date, eventStartDate?: Date, page?: number, size?: number, observe: any = 'body', reportProgress: boolean = false ): Observable<any> {





        let queryParameters = new HttpParams({encoder: new CustomHttpUrlEncodingCodec()});
        if (eventEndDate !== undefined && eventEndDate !== null) {
            queryParameters = queryParameters.set('eventEndDate', <any>eventEndDate.toISOString());
        }
        if (eventStartDate !== undefined && eventStartDate !== null) {
            queryParameters = queryParameters.set('eventStartDate', <any>eventStartDate.toISOString());
        }
        if (page !== undefined && page !== null) {
            queryParameters = queryParameters.set('page', <any>page);
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

        return this.httpClient.get<PageEventDto>(`${this.basePath}/api/event`,
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
     * publish
     *
     * @param eventId eventId
     * @param observe set whether or not to return the data Observable as the body, response or events. defaults to returning the body.
     * @param reportProgress flag to report request and response progress.
     */
    public publishUsingPUT(eventId: number, observe?: 'body', reportProgress?: boolean): Observable<any>;
    public publishUsingPUT(eventId: number, observe?: 'response', reportProgress?: boolean): Observable<HttpResponse<any>>;
    public publishUsingPUT(eventId: number, observe?: 'events', reportProgress?: boolean): Observable<HttpEvent<any>>;
    public publishUsingPUT(eventId: number, observe: any = 'body', reportProgress: boolean = false ): Observable<any> {

        if (eventId === null || eventId === undefined) {
            throw new Error('Required parameter eventId was null or undefined when calling publishUsingPUT.');
        }

        let headers = this.defaultHeaders;

        // authentication (JWT) required
        if (this.configuration.apiKeys && this.configuration.apiKeys["Authorization"]) {
            headers = headers.set('Authorization', this.configuration.apiKeys["Authorization"]);
        }

        // to determine the Accept header
        let httpHeaderAccepts: string[] = [
            '*/*'
        ];
        const httpHeaderAcceptSelected: string | undefined = this.configuration.selectHeaderAccept(httpHeaderAccepts);
        if (httpHeaderAcceptSelected != undefined) {
            headers = headers.set('Accept', httpHeaderAcceptSelected);
        }

        // to determine the Content-Type header
        const consumes: string[] = [
            'application/json'
        ];

        return this.httpClient.put<any>(`${this.basePath}/api/event/${encodeURIComponent(String(eventId))}/publish`,
            null,
            {
                withCredentials: this.configuration.withCredentials,
                headers: headers,
                observe: observe,
                reportProgress: reportProgress
            }
        );
    }

    /**
     * unPublish
     *
     * @param eventId eventId
     * @param observe set whether or not to return the data Observable as the body, response or events. defaults to returning the body.
     * @param reportProgress flag to report request and response progress.
     */
    public unPublishUsingPUT(eventId: number, observe?: 'body', reportProgress?: boolean): Observable<any>;
    public unPublishUsingPUT(eventId: number, observe?: 'response', reportProgress?: boolean): Observable<HttpResponse<any>>;
    public unPublishUsingPUT(eventId: number, observe?: 'events', reportProgress?: boolean): Observable<HttpEvent<any>>;
    public unPublishUsingPUT(eventId: number, observe: any = 'body', reportProgress: boolean = false ): Observable<any> {

        if (eventId === null || eventId === undefined) {
            throw new Error('Required parameter eventId was null or undefined when calling unPublishUsingPUT.');
        }

        let headers = this.defaultHeaders;

        // authentication (JWT) required
        if (this.configuration.apiKeys && this.configuration.apiKeys["Authorization"]) {
            headers = headers.set('Authorization', this.configuration.apiKeys["Authorization"]);
        }

        // to determine the Accept header
        let httpHeaderAccepts: string[] = [
            '*/*'
        ];
        const httpHeaderAcceptSelected: string | undefined = this.configuration.selectHeaderAccept(httpHeaderAccepts);
        if (httpHeaderAcceptSelected != undefined) {
            headers = headers.set('Accept', httpHeaderAcceptSelected);
        }

        // to determine the Content-Type header
        const consumes: string[] = [
            'application/json'
        ];

        return this.httpClient.put<any>(`${this.basePath}/api/event/${encodeURIComponent(String(eventId))}/unPublish`,
            null,
            {
                withCredentials: this.configuration.withCredentials,
                headers: headers,
                observe: observe,
                reportProgress: reportProgress
            }
        );
    }

    /**
     * updateEvent
     *
     * @param eventDto eventDto
     * @param observe set whether or not to return the data Observable as the body, response or events. defaults to returning the body.
     * @param reportProgress flag to report request and response progress.
     */
    public updateEventUsingPUT(eventDto: EventDto, observe?: 'body', reportProgress?: boolean): Observable<EventDto>;
    public updateEventUsingPUT(eventDto: EventDto, observe?: 'response', reportProgress?: boolean): Observable<HttpResponse<EventDto>>;
    public updateEventUsingPUT(eventDto: EventDto, observe?: 'events', reportProgress?: boolean): Observable<HttpEvent<EventDto>>;
    public updateEventUsingPUT(eventDto: EventDto, observe: any = 'body', reportProgress: boolean = false ): Observable<any> {

        if (eventDto === null || eventDto === undefined) {
            throw new Error('Required parameter eventDto was null or undefined when calling updateEventUsingPUT.');
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

        return this.httpClient.put<EventDto>(`${this.basePath}/api/event`,
            eventDto,
            {
                withCredentials: this.configuration.withCredentials,
                headers: headers,
                observe: observe,
                reportProgress: reportProgress
            }
        );
    }

}
