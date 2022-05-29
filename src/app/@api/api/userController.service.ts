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

import { PageItemDto } from '../model/pageItemDto';
import { PasswordChangeDto } from '../model/passwordChangeDto';
import { ProfileDto } from '../model/profileDto';
import { ResponseDto } from '../model/responseDto';
import { UserProfileDto } from '../model/userProfileDto';
import { UserResponseDto } from '../model/userResponseDto';

import { BASE_PATH, COLLECTION_FORMATS }                     from '../variables';
import { Configuration }                                     from '../configuration';


@Injectable()
export class UserControllerService {

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
     * Activate supplier employee account by Admin user
     *
     * @param userId userId
     * @param observe set whether or not to return the data Observable as the body, response or events. defaults to returning the body.
     * @param reportProgress flag to report request and response progress.
     */
    public activateAccountByAdminUsingPUT(userId: number, observe?: 'body', reportProgress?: boolean): Observable<UserResponseDto>;
    public activateAccountByAdminUsingPUT(userId: number, observe?: 'response', reportProgress?: boolean): Observable<HttpResponse<UserResponseDto>>;
    public activateAccountByAdminUsingPUT(userId: number, observe?: 'events', reportProgress?: boolean): Observable<HttpEvent<UserResponseDto>>;
    public activateAccountByAdminUsingPUT(userId: number, observe: any = 'body', reportProgress: boolean = false ): Observable<any> {

        if (userId === null || userId === undefined) {
            throw new Error('Required parameter userId was null or undefined when calling activateAccountByAdminUsingPUT.');
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

        return this.httpClient.put<UserResponseDto>(`${this.basePath}/api/users/${encodeURIComponent(String(userId))}/admin-activation`,
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
     * Adds a new favourite item for a user
     *
     * @param itemId itemId
     * @param observe set whether or not to return the data Observable as the body, response or events. defaults to returning the body.
     * @param reportProgress flag to report request and response progress.
     */
    public addFavouriteItemUsingPUT(itemId: number, observe?: 'body', reportProgress?: boolean): Observable<any>;
    public addFavouriteItemUsingPUT(itemId: number, observe?: 'response', reportProgress?: boolean): Observable<HttpResponse<any>>;
    public addFavouriteItemUsingPUT(itemId: number, observe?: 'events', reportProgress?: boolean): Observable<HttpEvent<any>>;
    public addFavouriteItemUsingPUT(itemId: number, observe: any = 'body', reportProgress: boolean = false ): Observable<any> {

        if (itemId === null || itemId === undefined) {
            throw new Error('Required parameter itemId was null or undefined when calling addFavouriteItemUsingPUT.');
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

        return this.httpClient.put<any>(`${this.basePath}/api/users/favouriteItems/${encodeURIComponent(String(itemId))}`,
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
     * chage user password
     *
     * @param authorization Authorization
     * @param passwordChangeDto passwordChangeDto
     * @param observe set whether or not to return the data Observable as the body, response or events. defaults to returning the body.
     * @param reportProgress flag to report request and response progress.
     */
    public changePasswordUsingPUT(authorization: string, passwordChangeDto: PasswordChangeDto, observe?: 'body', reportProgress?: boolean): Observable<ResponseDto>;
    public changePasswordUsingPUT(authorization: string, passwordChangeDto: PasswordChangeDto, observe?: 'response', reportProgress?: boolean): Observable<HttpResponse<ResponseDto>>;
    public changePasswordUsingPUT(authorization: string, passwordChangeDto: PasswordChangeDto, observe?: 'events', reportProgress?: boolean): Observable<HttpEvent<ResponseDto>>;
    public changePasswordUsingPUT(authorization: string, passwordChangeDto: PasswordChangeDto, observe: any = 'body', reportProgress: boolean = false ): Observable<any> {

        if (authorization === null || authorization === undefined) {
            throw new Error('Required parameter authorization was null or undefined when calling changePasswordUsingPUT.');
        }

        if (passwordChangeDto === null || passwordChangeDto === undefined) {
            throw new Error('Required parameter passwordChangeDto was null or undefined when calling changePasswordUsingPUT.');
        }

        let headers = this.defaultHeaders;
        if (authorization !== undefined && authorization !== null) {
            headers = headers.set('Authorization', String(authorization));
        }

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

        return this.httpClient.put<ResponseDto>(`${this.basePath}/api/users/change-password`,
            passwordChangeDto,
            {
                withCredentials: this.configuration.withCredentials,
                headers: headers,
                observe: observe,
                reportProgress: reportProgress
            }
        );
    }

    /**
     * Get favourite items count
     *
     * @param observe set whether or not to return the data Observable as the body, response or events. defaults to returning the body.
     * @param reportProgress flag to report request and response progress.
     */
    public getFavouriteItemsCountUsingGET(observe?: 'body', reportProgress?: boolean): Observable<{ [key: string]: number; }>;
    public getFavouriteItemsCountUsingGET(observe?: 'response', reportProgress?: boolean): Observable<HttpResponse<{ [key: string]: number; }>>;
    public getFavouriteItemsCountUsingGET(observe?: 'events', reportProgress?: boolean): Observable<HttpEvent<{ [key: string]: number; }>>;
    public getFavouriteItemsCountUsingGET(observe: any = 'body', reportProgress: boolean = false ): Observable<any> {

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

        return this.httpClient.get<{ [key: string]: number; }>(`${this.basePath}/api/users/favouriteItems/count`,
            {
                withCredentials: this.configuration.withCredentials,
                headers: headers,
                observe: observe,
                reportProgress: reportProgress
            }
        );
    }

    /**
     * Get a list of favourite items
     *
     * @param itemCategoryId
     * @param itemName
     * @param itemSubcategoryId
     * @param originId
     * @param page page
     * @param size size
     * @param observe set whether or not to return the data Observable as the body, response or events. defaults to returning the body.
     * @param reportProgress flag to report request and response progress.
     */
    public getFavouriteItemsUsingGET(itemCategoryId?: number, itemName?: string, itemSubcategoryId?: number, originId?: number, page?: number, size?: number, observe?: 'body', reportProgress?: boolean): Observable<PageItemDto>;
    public getFavouriteItemsUsingGET(itemCategoryId?: number, itemName?: string, itemSubcategoryId?: number, originId?: number, page?: number, size?: number, observe?: 'response', reportProgress?: boolean): Observable<HttpResponse<PageItemDto>>;
    public getFavouriteItemsUsingGET(itemCategoryId?: number, itemName?: string, itemSubcategoryId?: number, originId?: number, page?: number, size?: number, observe?: 'events', reportProgress?: boolean): Observable<HttpEvent<PageItemDto>>;
    public getFavouriteItemsUsingGET(itemCategoryId?: number, itemName?: string, itemSubcategoryId?: number, originId?: number, page?: number, size?: number, observe: any = 'body', reportProgress: boolean = false ): Observable<any> {







        let queryParameters = new HttpParams({encoder: new CustomHttpUrlEncodingCodec()});
        if (itemCategoryId !== undefined && itemCategoryId !== null) {
            queryParameters = queryParameters.set('itemCategoryId', <any>itemCategoryId);
        }
        if (itemName !== undefined && itemName !== null) {
            queryParameters = queryParameters.set('itemName', <any>itemName);
        }
        if (itemSubcategoryId !== undefined && itemSubcategoryId !== null) {
            queryParameters = queryParameters.set('itemSubcategoryId', <any>itemSubcategoryId);
        }
        if (originId !== undefined && originId !== null) {
            queryParameters = queryParameters.set('originId', <any>originId);
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

        return this.httpClient.get<PageItemDto>(`${this.basePath}/api/users/favouriteItems`,
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
     * Get profile completion percentage
     *
     * @param observe set whether or not to return the data Observable as the body, response or events. defaults to returning the body.
     * @param reportProgress flag to report request and response progress.
     */
    public getProfilePercentageUsingGET1(observe?: 'body', reportProgress?: boolean): Observable<{ [key: string]: number; }>;
    public getProfilePercentageUsingGET1(observe?: 'response', reportProgress?: boolean): Observable<HttpResponse<{ [key: string]: number; }>>;
    public getProfilePercentageUsingGET1(observe?: 'events', reportProgress?: boolean): Observable<HttpEvent<{ [key: string]: number; }>>;
    public getProfilePercentageUsingGET1(observe: any = 'body', reportProgress: boolean = false ): Observable<any> {

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

        return this.httpClient.get<{ [key: string]: number; }>(`${this.basePath}/api/users/dashboard/profilePercentage`,
            {
                withCredentials: this.configuration.withCredentials,
                headers: headers,
                observe: observe,
                reportProgress: reportProgress
            }
        );
    }

    /**
     * Get logged in user details
     *
     * @param observe set whether or not to return the data Observable as the body, response or events. defaults to returning the body.
     * @param reportProgress flag to report request and response progress.
     */
    public getUserProfileUsingGET(observe?: 'body', reportProgress?: boolean): Observable<ProfileDto>;
    public getUserProfileUsingGET(observe?: 'response', reportProgress?: boolean): Observable<HttpResponse<ProfileDto>>;
    public getUserProfileUsingGET(observe?: 'events', reportProgress?: boolean): Observable<HttpEvent<ProfileDto>>;
    public getUserProfileUsingGET(observe: any = 'body', reportProgress: boolean = false ): Observable<any> {

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

        return this.httpClient.get<ProfileDto>(`${this.basePath}/api/users/profile`,
            {
                withCredentials: this.configuration.withCredentials,
                headers: headers,
                observe: observe,
                reportProgress: reportProgress
            }
        );
    }

    /**
     * Removes a favourite item for a user
     *
     * @param itemId itemId
     * @param observe set whether or not to return the data Observable as the body, response or events. defaults to returning the body.
     * @param reportProgress flag to report request and response progress.
     */
    public removeFavouriteItemUsingDELETE(itemId: number, observe?: 'body', reportProgress?: boolean): Observable<any>;
    public removeFavouriteItemUsingDELETE(itemId: number, observe?: 'response', reportProgress?: boolean): Observable<HttpResponse<any>>;
    public removeFavouriteItemUsingDELETE(itemId: number, observe?: 'events', reportProgress?: boolean): Observable<HttpEvent<any>>;
    public removeFavouriteItemUsingDELETE(itemId: number, observe: any = 'body', reportProgress: boolean = false ): Observable<any> {

        if (itemId === null || itemId === undefined) {
            throw new Error('Required parameter itemId was null or undefined when calling removeFavouriteItemUsingDELETE.');
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

        return this.httpClient.delete<any>(`${this.basePath}/api/users/favouriteItems/${encodeURIComponent(String(itemId))}`,
            {
                withCredentials: this.configuration.withCredentials,
                headers: headers,
                observe: observe,
                reportProgress: reportProgress
            }
        );
    }

    /**
     * Update user details by user id
     *
     * @param userProfileDto userProfileDto
     * @param observe set whether or not to return the data Observable as the body, response or events. defaults to returning the body.
     * @param reportProgress flag to report request and response progress.
     */
    public updateUserDetailsUsingPUT(userProfileDto: UserProfileDto, observe?: 'body', reportProgress?: boolean): Observable<UserResponseDto>;
    public updateUserDetailsUsingPUT(userProfileDto: UserProfileDto, observe?: 'response', reportProgress?: boolean): Observable<HttpResponse<UserResponseDto>>;
    public updateUserDetailsUsingPUT(userProfileDto: UserProfileDto, observe?: 'events', reportProgress?: boolean): Observable<HttpEvent<UserResponseDto>>;
    public updateUserDetailsUsingPUT(userProfileDto: UserProfileDto, observe: any = 'body', reportProgress: boolean = false ): Observable<any> {

        if (userProfileDto === null || userProfileDto === undefined) {
            throw new Error('Required parameter userProfileDto was null or undefined when calling updateUserDetailsUsingPUT.');
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

        return this.httpClient.put<UserResponseDto>(`${this.basePath}/api/users/profile`,
            userProfileDto,
            {
                withCredentials: this.configuration.withCredentials,
                headers: headers,
                observe: observe,
                reportProgress: reportProgress
            }
        );
    }

}
