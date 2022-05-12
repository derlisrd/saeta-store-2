import Axios from "axios";
import CryptoJS from 'crypto-js';
import { APIURL, XAPITOKEN, SECRETO } from "../Utils/config";
export const DescifrarTexto = (text) =>  CryptoJS.AES.decrypt(text, SECRETO).toString(CryptoJS.enc.Utf8);

export const APICALLER = {
  get: async ({
    table,sort = "",pagenumber = "",pagesize = "",fields = "",where = "",include = "",on = "",token = "",filtersSearch = "",filtersField = ""}) => {
    
    try {
      let tk = DescifrarTexto(token);
      let URLFINAL = `${APIURL}${table}?where=${where}&sort=${sort}&page[number]=${pagenumber}&page[size]=${pagesize}&fields=${fields}&include=${include}&on=${on}&token=${tk}&filters[search]=${filtersSearch}&filters[field]=${filtersField}`;
      const res = await fetch(URLFINAL, {headers: { "X-Api-Token": XAPITOKEN }});
      return await res.json();
    } catch (thrown) {
      return { response: "Error", message: thrown };
    }
  },
    login: async (datas) => {
        try {
          const res = await Axios({
            url: `${APIURL}Auth/Login`,
            method: "POST",
            data: JSON.stringify(datas),
            headers: { "X-Api-Token": XAPITOKEN },
          });
          return await res.data;
        } catch (error) {
          console.log(error);
          const err = [{ results: `error`, response: `error`, message: error }];
          return err;
        }
      },
      validateToken: async (token) => {
        try {
          let tk = DescifrarTexto(token);
          const res = await Axios({
            url: `${APIURL}Auth/ValidateToken`,
            method: "POST",
            data: JSON.stringify({ token: tk }),
            headers: { "X-Api-Token": XAPITOKEN },
          });
          return await res.data;
        } catch (error) {
          const err = [{ results: `error`, response: `error`, message: error }];
          return err;
        }
      },
}