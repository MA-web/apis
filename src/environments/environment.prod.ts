export const environment = {
  production: true,
  apiURL:'http://apis.marksphinx.com:8060'
};


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
