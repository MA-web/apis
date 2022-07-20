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

import { AccountConfirmationToken } from '../model/accountConfirmationToken';
import { ResetPasswordDto } from '../model/resetPasswordDto';
import { ResponseDto } from '../model/responseDto';
import { SupplierEmployeeDto } from '../model/supplierEmployeeDto';
import { SupplierEmployeeResponseDto } from '../model/supplierEmployeeResponseDto';
import { UserEmailDto } from '../model/userEmailDto';
import { UserRequestDto } from '../model/userRequestDto';
import { UserResponseDto } from '../model/userResponseDto';

import { BASE_PATH, COLLECTION_FORMATS }                     from '../variables';
import { Configuration }                                     from '../configuration';


@Injectable()
export class RegisterControllerService {

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
     * This Api is responsible for add a new customer in the system 
     * 
     * @param userCustomerDto userCustomerDto
     * @param observe set whether or not to return the data Observable as the body, response or events. defaults to returning the body.
     * @param reportProgress flag to report request and response progress.
     */
    public addCustomerUsingPOST(userCustomerDto: UserRequestDto, observe?: 'body', reportProgress?: boolean): Observable<UserResponseDto>;
    public addCustomerUsingPOST(userCustomerDto: UserRequestDto, observe?: 'response', reportProgress?: boolean): Observable<HttpResponse<UserResponseDto>>;
    public addCustomerUsingPOST(userCustomerDto: UserRequestDto, observe?: 'events', reportProgress?: boolean): Observable<HttpEvent<UserResponseDto>>;
    public addCustomerUsingPOST(userCustomerDto: UserRequestDto, observe: any = 'body', reportProgress: boolean = false ): Observable<any> {

        if (userCustomerDto === null || userCustomerDto === undefined) {
            throw new Error('Required parameter userCustomerDto was null or undefined when calling addCustomerUsingPOST.');
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

        return this.httpClient.post<UserResponseDto>(`${this.basePath}/registration/customers`,
            userCustomerDto,
            {
                withCredentials: this.configuration.withCredentials,
                headers: headers,
                observe: observe,
                reportProgress: reportProgress
            }
        );
    }

    /**
     * This Api is responsible for add a new supplier in the system 
     * 
     * @param supplierEmployeeDto supplierEmployeeDto
     * @param observe set whether or not to return the data Observable as the body, response or events. defaults to returning the body.
     * @param reportProgress flag to report request and response progress.
     */
    public addSupplierUsingPOST(supplierEmployeeDto: SupplierEmployeeDto, observe?: 'body', reportProgress?: boolean): Observable<SupplierEmployeeResponseDto>;
    public addSupplierUsingPOST(supplierEmployeeDto: SupplierEmployeeDto, observe?: 'response', reportProgress?: boolean): Observable<HttpResponse<SupplierEmployeeResponseDto>>;
    public addSupplierUsingPOST(supplierEmployeeDto: SupplierEmployeeDto, observe?: 'events', reportProgress?: boolean): Observable<HttpEvent<SupplierEmployeeResponseDto>>;
    public addSupplierUsingPOST(supplierEmployeeDto: SupplierEmployeeDto, observe: any = 'body', reportProgress: boolean = false ): Observable<any> {

        if (supplierEmployeeDto === null || supplierEmployeeDto === undefined) {
            throw new Error('Required parameter supplierEmployeeDto was null or undefined when calling addSupplierUsingPOST.');
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

        return this.httpClient.post<SupplierEmployeeResponseDto>(`${this.basePath}/registration/suppliers`,
            supplierEmployeeDto,
            {
                withCredentials: this.configuration.withCredentials,
                headers: headers,
                observe: observe,
                reportProgress: reportProgress
            }
        );
    }

    /**
     * this api is responsiable for resend token to the user to verify his account
     * 
     * @param userEmailDto userEmailDto
     * @param observe set whether or not to return the data Observable as the body, response or events. defaults to returning the body.
     * @param reportProgress flag to report request and response progress.
     */
    public resendTokenUsingPUT(userEmailDto: UserEmailDto, observe?: 'body', reportProgress?: boolean): Observable<ResponseDto>;
    public resendTokenUsingPUT(userEmailDto: UserEmailDto, observe?: 'response', reportProgress?: boolean): Observable<HttpResponse<ResponseDto>>;
    public resendTokenUsingPUT(userEmailDto: UserEmailDto, observe?: 'events', reportProgress?: boolean): Observable<HttpEvent<ResponseDto>>;
    public resendTokenUsingPUT(userEmailDto: UserEmailDto, observe: any = 'body', reportProgress: boolean = false ): Observable<any> {

        if (userEmailDto === null || userEmailDto === undefined) {
            throw new Error('Required parameter userEmailDto was null or undefined when calling resendTokenUsingPUT.');
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

        return this.httpClient.put<ResponseDto>(`${this.basePath}/registration/resend-token`,
            userEmailDto,
            {
                withCredentials: this.configuration.withCredentials,
                headers: headers,
                observe: observe,
                reportProgress: reportProgress
            }
        );
    }

    /**
     * this api is responsiable for reset user password
     * 
     * @param resetPasswordDto resetPasswordDto
     * @param observe set whether or not to return the data Observable as the body, response or events. defaults to returning the body.
     * @param reportProgress flag to report request and response progress.
     */
    public resetPasswordUsingPUT(resetPasswordDto: ResetPasswordDto, observe?: 'body', reportProgress?: boolean): Observable<ResponseDto>;
    public resetPasswordUsingPUT(resetPasswordDto: ResetPasswordDto, observe?: 'response', reportProgress?: boolean): Observable<HttpResponse<ResponseDto>>;
    public resetPasswordUsingPUT(resetPasswordDto: ResetPasswordDto, observe?: 'events', reportProgress?: boolean): Observable<HttpEvent<ResponseDto>>;
    public resetPasswordUsingPUT(resetPasswordDto: ResetPasswordDto, observe: any = 'body', reportProgress: boolean = false ): Observable<any> {

        if (resetPasswordDto === null || resetPasswordDto === undefined) {
            throw new Error('Required parameter resetPasswordDto was null or undefined when calling resetPasswordUsingPUT.');
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

        return this.httpClient.put<ResponseDto>(`${this.basePath}/registration/reset-password`,
            resetPasswordDto,
            {
                withCredentials: this.configuration.withCredentials,
                headers: headers,
                observe: observe,
                reportProgress: reportProgress
            }
        );
    }

    /**
     * this api is responsiable for send token to the user to reset his password
     * 
     * @param userEmailDto userEmailDto
     * @param observe set whether or not to return the data Observable as the body, response or events. defaults to returning the body.
     * @param reportProgress flag to report request and response progress.
     */
    public sendPasswordTokenUsingPUT(userEmailDto: UserEmailDto, observe?: 'body', reportProgress?: boolean): Observable<ResponseDto>;
    public sendPasswordTokenUsingPUT(userEmailDto: UserEmailDto, observe?: 'response', reportProgress?: boolean): Observable<HttpResponse<ResponseDto>>;
    public sendPasswordTokenUsingPUT(userEmailDto: UserEmailDto, observe?: 'events', reportProgress?: boolean): Observable<HttpEvent<ResponseDto>>;
    public sendPasswordTokenUsingPUT(userEmailDto: UserEmailDto, observe: any = 'body', reportProgress: boolean = false ): Observable<any> {

        if (userEmailDto === null || userEmailDto === undefined) {
            throw new Error('Required parameter userEmailDto was null or undefined when calling sendPasswordTokenUsingPUT.');
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

        return this.httpClient.put<ResponseDto>(`${this.basePath}/registration/send-password-token`,
            userEmailDto,
            {
                withCredentials: this.configuration.withCredentials,
                headers: headers,
                observe: observe,
                reportProgress: reportProgress
            }
        );
    }

    /**
     * this api is used to verify email account in the system
     * 
     * @param accountConfirmationToken accountConfirmationToken
     * @param observe set whether or not to return the data Observable as the body, response or events. defaults to returning the body.
     * @param reportProgress flag to report request and response progress.
     */
    public verifyAccountUsingPUT(accountConfirmationToken: AccountConfirmationToken, observe?: 'body', reportProgress?: boolean): Observable<UserResponseDto>;
    public verifyAccountUsingPUT(accountConfirmationToken: AccountConfirmationToken, observe?: 'response', reportProgress?: boolean): Observable<HttpResponse<UserResponseDto>>;
    public verifyAccountUsingPUT(accountConfirmationToken: AccountConfirmationToken, observe?: 'events', reportProgress?: boolean): Observable<HttpEvent<UserResponseDto>>;
    public verifyAccountUsingPUT(accountConfirmationToken: AccountConfirmationToken, observe: any = 'body', reportProgress: boolean = false ): Observable<any> {

        if (accountConfirmationToken === null || accountConfirmationToken === undefined) {
            throw new Error('Required parameter accountConfirmationToken was null or undefined when calling verifyAccountUsingPUT.');
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

        return this.httpClient.put<UserResponseDto>(`${this.basePath}/registration/verify`,
            accountConfirmationToken,
            {
                withCredentials: this.configuration.withCredentials,
                headers: headers,
                observe: observe,
                reportProgress: reportProgress
            }
        );
    }

}
