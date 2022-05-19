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

import { ItemQuotationDto } from '../model/itemQuotationDto';
import { PageItemQuotationDto } from '../model/pageItemQuotationDto';
import { RejectionDto } from '../model/rejectionDto';

import { BASE_PATH, COLLECTION_FORMATS }                     from '../variables';
import { Configuration }                                     from '../configuration';


@Injectable()
export class QuotationControllerService {

    protected basePath = 'https://apis.marksphinx.com:8060';
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
     * accept quotation by id
     *
     * @param authorization Authorization
     * @param quotationId quotationId
     * @param observe set whether or not to return the data Observable as the body, response or events. defaults to returning the body.
     * @param reportProgress flag to report request and response progress.
     */
    public acceptQuotationUsingPUT(authorization: string, quotationId: number, observe?: 'body', reportProgress?: boolean): Observable<ItemQuotationDto>;
    public acceptQuotationUsingPUT(authorization: string, quotationId: number, observe?: 'response', reportProgress?: boolean): Observable<HttpResponse<ItemQuotationDto>>;
    public acceptQuotationUsingPUT(authorization: string, quotationId: number, observe?: 'events', reportProgress?: boolean): Observable<HttpEvent<ItemQuotationDto>>;
    public acceptQuotationUsingPUT(authorization: string, quotationId: number, observe: any = 'body', reportProgress: boolean = false ): Observable<any> {

        if (authorization === null || authorization === undefined) {
            throw new Error('Required parameter authorization was null or undefined when calling acceptQuotationUsingPUT.');
        }

        if (quotationId === null || quotationId === undefined) {
            throw new Error('Required parameter quotationId was null or undefined when calling acceptQuotationUsingPUT.');
        }

        let headers = this.defaultHeaders;
        if (authorization !== undefined && authorization !== null) {
            headers = headers.set('Authorization', String(authorization));
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

        return this.httpClient.put<ItemQuotationDto>(`${this.basePath}/api/quotations/${encodeURIComponent(String(quotationId))}/acceptance`,
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
     * Add a new quotation about an existing inquiry.
     *
     * @param authorization Authorization
     * @param quotationDto quotationDto
     * @param observe set whether or not to return the data Observable as the body, response or events. defaults to returning the body.
     * @param reportProgress flag to report request and response progress.
     */
    public addQuotationUsingPOST(authorization: string, quotationDto: ItemQuotationDto, observe?: 'body', reportProgress?: boolean): Observable<ItemQuotationDto>;
    public addQuotationUsingPOST(authorization: string, quotationDto: ItemQuotationDto, observe?: 'response', reportProgress?: boolean): Observable<HttpResponse<ItemQuotationDto>>;
    public addQuotationUsingPOST(authorization: string, quotationDto: ItemQuotationDto, observe?: 'events', reportProgress?: boolean): Observable<HttpEvent<ItemQuotationDto>>;
    public addQuotationUsingPOST(authorization: string, quotationDto: ItemQuotationDto, observe: any = 'body', reportProgress: boolean = false ): Observable<any> {

        if (authorization === null || authorization === undefined) {
            throw new Error('Required parameter authorization was null or undefined when calling addQuotationUsingPOST.');
        }

        if (quotationDto === null || quotationDto === undefined) {
            throw new Error('Required parameter quotationDto was null or undefined when calling addQuotationUsingPOST.');
        }

        let headers = this.defaultHeaders;
        if (authorization !== undefined && authorization !== null) {
            headers = headers.set('Authorization', String(authorization));
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

        return this.httpClient.post<ItemQuotationDto>(`${this.basePath}/api/quotations`,
            quotationDto,
            {
                withCredentials: this.configuration.withCredentials,
                headers: headers,
                observe: observe,
                reportProgress: reportProgress
            }
        );
    }

    /**
     * get page of quotations for specific user by username from authorization header
     *
     * @param authorization Authorization
     * @param page page
     * @param size size
     * @param observe set whether or not to return the data Observable as the body, response or events. defaults to returning the body.
     * @param reportProgress flag to report request and response progress.
     */
    public getOrdersForUserUsingGET1(authorization: string, page?: number, size?: number, observe?: 'body', reportProgress?: boolean): Observable<PageItemQuotationDto>;
    public getOrdersForUserUsingGET1(authorization: string, page?: number, size?: number, observe?: 'response', reportProgress?: boolean): Observable<HttpResponse<PageItemQuotationDto>>;
    public getOrdersForUserUsingGET1(authorization: string, page?: number, size?: number, observe?: 'events', reportProgress?: boolean): Observable<HttpEvent<PageItemQuotationDto>>;
    public getOrdersForUserUsingGET1(authorization: string, page?: number, size?: number, observe: any = 'body', reportProgress: boolean = false ): Observable<any> {

        if (authorization === null || authorization === undefined) {
            throw new Error('Required parameter authorization was null or undefined when calling getOrdersForUserUsingGET1.');
        }



        let queryParameters = new HttpParams({encoder: new CustomHttpUrlEncodingCodec()});
        if (page !== undefined && page !== null) {
            queryParameters = queryParameters.set('page', <any>page);
        }
        if (size !== undefined && size !== null) {
            queryParameters = queryParameters.set('size', <any>size);
        }

        let headers = this.defaultHeaders;
        if (authorization !== undefined && authorization !== null) {
            headers = headers.set('Authorization', String(authorization));
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

        return this.httpClient.get<PageItemQuotationDto>(`${this.basePath}/api/quotations/users`,
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
     * get quotation by quotation id
     *
     * @param quotationId quotationId
     * @param observe set whether or not to return the data Observable as the body, response or events. defaults to returning the body.
     * @param reportProgress flag to report request and response progress.
     */
    public getQuotationByIdUsingGET(quotationId: number, observe?: 'body', reportProgress?: boolean): Observable<ItemQuotationDto>;
    public getQuotationByIdUsingGET(quotationId: number, observe?: 'response', reportProgress?: boolean): Observable<HttpResponse<ItemQuotationDto>>;
    public getQuotationByIdUsingGET(quotationId: number, observe?: 'events', reportProgress?: boolean): Observable<HttpEvent<ItemQuotationDto>>;
    public getQuotationByIdUsingGET(quotationId: number, observe: any = 'body', reportProgress: boolean = false ): Observable<any> {

        if (quotationId === null || quotationId === undefined) {
            throw new Error('Required parameter quotationId was null or undefined when calling getQuotationByIdUsingGET.');
        }

        let headers = this.defaultHeaders;

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

        return this.httpClient.get<ItemQuotationDto>(`${this.basePath}/api/quotations/${encodeURIComponent(String(quotationId))}`,
            {
                withCredentials: this.configuration.withCredentials,
                headers: headers,
                observe: observe,
                reportProgress: reportProgress
            }
        );
    }

    /**
     * get page of quotations for specific supplier by supplier employee username from authorization header
     *
     * @param authorization Authorization
     * @param page page
     * @param size size
     * @param observe set whether or not to return the data Observable as the body, response or events. defaults to returning the body.
     * @param reportProgress flag to report request and response progress.
     */
    public getQuotationsForSupplierUsingGET(authorization: string, page?: number, size?: number, observe?: 'body', reportProgress?: boolean): Observable<PageItemQuotationDto>;
    public getQuotationsForSupplierUsingGET(authorization: string, page?: number, size?: number, observe?: 'response', reportProgress?: boolean): Observable<HttpResponse<PageItemQuotationDto>>;
    public getQuotationsForSupplierUsingGET(authorization: string, page?: number, size?: number, observe?: 'events', reportProgress?: boolean): Observable<HttpEvent<PageItemQuotationDto>>;
    public getQuotationsForSupplierUsingGET(authorization: string, page?: number, size?: number, observe: any = 'body', reportProgress: boolean = false ): Observable<any> {

        if (authorization === null || authorization === undefined) {
            throw new Error('Required parameter authorization was null or undefined when calling getQuotationsForSupplierUsingGET.');
        }



        let queryParameters = new HttpParams({encoder: new CustomHttpUrlEncodingCodec()});
        if (page !== undefined && page !== null) {
            queryParameters = queryParameters.set('page', <any>page);
        }
        if (size !== undefined && size !== null) {
            queryParameters = queryParameters.set('size', <any>size);
        }

        let headers = this.defaultHeaders;
        if (authorization !== undefined && authorization !== null) {
            headers = headers.set('Authorization', String(authorization));
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

        return this.httpClient.get<PageItemQuotationDto>(`${this.basePath}/api/quotations/suppliers`,
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
     * reject quotation by id
     *
     * @param authorization Authorization
     * @param quotationId quotationId
     * @param rejectionDto rejectionDto
     * @param observe set whether or not to return the data Observable as the body, response or events. defaults to returning the body.
     * @param reportProgress flag to report request and response progress.
     */
    public rejectQuotationUsingPUT(authorization: string, quotationId: number, rejectionDto: RejectionDto, observe?: 'body', reportProgress?: boolean): Observable<ItemQuotationDto>;
    public rejectQuotationUsingPUT(authorization: string, quotationId: number, rejectionDto: RejectionDto, observe?: 'response', reportProgress?: boolean): Observable<HttpResponse<ItemQuotationDto>>;
    public rejectQuotationUsingPUT(authorization: string, quotationId: number, rejectionDto: RejectionDto, observe?: 'events', reportProgress?: boolean): Observable<HttpEvent<ItemQuotationDto>>;
    public rejectQuotationUsingPUT(authorization: string, quotationId: number, rejectionDto: RejectionDto, observe: any = 'body', reportProgress: boolean = false ): Observable<any> {

        if (authorization === null || authorization === undefined) {
            throw new Error('Required parameter authorization was null or undefined when calling rejectQuotationUsingPUT.');
        }

        if (quotationId === null || quotationId === undefined) {
            throw new Error('Required parameter quotationId was null or undefined when calling rejectQuotationUsingPUT.');
        }

        if (rejectionDto === null || rejectionDto === undefined) {
            throw new Error('Required parameter rejectionDto was null or undefined when calling rejectQuotationUsingPUT.');
        }

        let headers = this.defaultHeaders;
        if (authorization !== undefined && authorization !== null) {
            headers = headers.set('Authorization', String(authorization));
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

        return this.httpClient.put<ItemQuotationDto>(`${this.basePath}/api/quotations/${encodeURIComponent(String(quotationId))}/rejection`,
            rejectionDto,
            {
                withCredentials: this.configuration.withCredentials,
                headers: headers,
                observe: observe,
                reportProgress: reportProgress
            }
        );
    }

    /**
     * update quotation by id
     *
     * @param authorization Authorization
     * @param quotationDto quotationDto
     * @param observe set whether or not to return the data Observable as the body, response or events. defaults to returning the body.
     * @param reportProgress flag to report request and response progress.
     */
    public updateQuotationUsingPUT(authorization: string, quotationDto: ItemQuotationDto, observe?: 'body', reportProgress?: boolean): Observable<ItemQuotationDto>;
    public updateQuotationUsingPUT(authorization: string, quotationDto: ItemQuotationDto, observe?: 'response', reportProgress?: boolean): Observable<HttpResponse<ItemQuotationDto>>;
    public updateQuotationUsingPUT(authorization: string, quotationDto: ItemQuotationDto, observe?: 'events', reportProgress?: boolean): Observable<HttpEvent<ItemQuotationDto>>;
    public updateQuotationUsingPUT(authorization: string, quotationDto: ItemQuotationDto, observe: any = 'body', reportProgress: boolean = false ): Observable<any> {

        if (authorization === null || authorization === undefined) {
            throw new Error('Required parameter authorization was null or undefined when calling updateQuotationUsingPUT.');
        }

        if (quotationDto === null || quotationDto === undefined) {
            throw new Error('Required parameter quotationDto was null or undefined when calling updateQuotationUsingPUT.');
        }

        let headers = this.defaultHeaders;
        if (authorization !== undefined && authorization !== null) {
            headers = headers.set('Authorization', String(authorization));
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

        return this.httpClient.put<ItemQuotationDto>(`${this.basePath}/api/quotations`,
            quotationDto,
            {
                withCredentials: this.configuration.withCredentials,
                headers: headers,
                observe: observe,
                reportProgress: reportProgress
            }
        );
    }

}