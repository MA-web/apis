// This file can be replaced during build by using the `fileReplacements` array.
// `ng build` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  apiURL:'http://164.92.242.241:8060'
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/plugins/zone-error';  // Included with Angular CLI.



export const appRouts = {
  productsList:'/products/list',
  ourSuppliersList:'/suppliers/list',
  news:'news',
  events:'events'
}


export const generalValidations = {
  email: '^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$',
  password: '^(?=.*[A-Z])(?=.*[0-9])(?=.*[a-z]).{8,16}$',
  url:`(https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|www\.[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9]+\.[^\s]{2,}|www\.[a-zA-Z0-9]+\.[^\s]{2,})`,
  zip:`(^\\d{5}$)|(^\\d{5}-\\d{4}$)`
}


export const roles = {
  customer: "CUSTOMER",
  supplier:"SUPPLIER"

}

