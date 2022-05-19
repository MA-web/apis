// This file can be replaced during build by using the `fileReplacements` array.
// `ng build` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  apiURL:'http://apis.marksphinx.com:8060'
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
  ourSuppliersList:'/suppliers/list'
}


export const generalValidations = {
  email: '^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$',
  password: '^(?=.*[A-Z])(?=.*[0-9])(?=.*[a-z]).{8,16}$',
  googleUrl: '^https?\\:\\/\\/((www|maps)\\.)?google\\.[a-z]+\\/maps\/?\\?+q=+([0-9.-]+).+?([0-9.-]+).+',
  googleUrl2: '^https?\\:\\/\\/(www\\.)?google\\.(com|fr|de)\\/maps\\b.*'

}
