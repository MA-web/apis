import { EMPTY } from "rxjs";

export const environment = {
  production: true,
  apiURL:'https://apis.marksphinx.com:4444'
};


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

