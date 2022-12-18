import Axios from "axios";
import CryptoJS from 'crypto-js';
import { APIURL, XAPITOKEN, SECRETO } from "../Utils/config";
export const DescifrarTexto = (text) =>  CryptoJS.AES.decrypt(text, SECRETO).toString(CryptoJS.enc.Utf8);

export const APICALLER = {
  
  
  deleteImage: async ({ table, path, idImage, token }) => {
    try {
      let tk = DescifrarTexto(token);
      var url = `${APIURL}${table}/${path}/?accion=deleteImage&token=${tk}&idImage=${idImage}`;
      const res = await Axios({
        url,
        method: "DELETE",
        headers: { "X-Api-Token": XAPITOKEN },
      });
      return await res.data;
    } catch (error) {
      const err = [{ results: `error`, response: `error`, message: error }];
      return err;
    }
  },

  uploadImage: async ({ file, token, table = "", data, path = Date.now() }) => {
    var formData = new FormData();
    formData.append("table", table);
    formData.append("path", path);
    formData.append("data", JSON.stringify(data));
    formData.append("image", file);

    try {
      let tk = DescifrarTexto(token);
      const res = await Axios({
        url: `${APIURL}Upload/?token=${tk}`,
        method: "POST",
        data: formData,
        headers: {
          "Content-Type": "multipart/form-data",
          "X-Api-Token": XAPITOKEN,
        },
      });
      return await res.data;
    } catch (error) {
      const err = { results: `error`, response: `error` };
      return err;
    }
  },

  login: async (datas) => {
    try {
      const res = await Axios({
        url: `${APIURL}Auth/Login`,
        method: "POST",
        data: JSON.stringify(datas),
        headers: { "x-api-token": XAPITOKEN , 'Content-Type': 'application/json' },
      });
      return await res.data;
    } catch (error) {
      console.log(error);
      const err = { results:null, response: `error`, message: error.message };
      return err;
    }    
  }, 


  ReValidateToken : async(token)=>{
    try {
      let tk = DescifrarTexto(token);
      const res = await Axios({
        url: `${APIURL}Auth/ReValidateToken`,
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
      const err = { results: null, response:  false, message: error };
      return err;
    }
  },

  updatePassword: async (datas) => {
    try {
      const res = await Axios({
        url: `${APIURL}Auth/UpdatePassword`,
        method: "POST",
        data: JSON.stringify(datas),
        headers: { "X-Api-Token": XAPITOKEN },
      });
      return await res.data;
    } catch (error) {
      const err = { results: null, response:  false, message: error };
      return err;
    }
  },

  confirmPassword: async (datas) => {
    try {
      const res = await Axios({
        url: `${APIURL}Auth/ConfirmPassword`,
        method: "POST",
        data: JSON.stringify(datas),
        headers: { "X-Api-Token": XAPITOKEN },
      });
      return await res.data;
    } catch (error) {
      const err = { results: null, response:  false, message: error };
      return err;
    }
  },

  register: async ({ datos }) => {
    try {
      var url = `${APIURL}Auth/Register`;
      const res = await Axios({
        url,
        method: "POST",
        data: JSON.stringify(datos),
        headers: { "X-Api-Token": XAPITOKEN },
      });
      return await res.data;
    } catch (error) {
      const err = { results: null, response:  false, message: error };
      return err;
    }
  },

  get: async ({table,sort = "",pagenumber = "",pagesize = "",fields = "",where = "",include = "",on = "",token = "",filtersSearch = "",filtersField = ""}) => {
    try {
      let tk = DescifrarTexto(token);
      let URLFINAL = `${APIURL}${table}?where=${where}&sort=${sort}&page[number]=${pagenumber}&page[size]=${pagesize}&fields=${fields}&include=${include}&on=${on}&token=${tk}&filters[search]=${filtersSearch}&filters[field]=${filtersField}`;
      const res = await fetch(URLFINAL, {
        headers: { "X-Api-Token": XAPITOKEN },
      });
      return await res.json();
    } catch (error) {
      return { results: null, response:  false, message: error };
    }
  },

  insert: async ({ table, data, token }) => {
    try {
      let tk = DescifrarTexto(token);
      const res = await Axios({
        url: `${APIURL}${table}/?token=${tk}`,
        method: "POST",
        data: JSON.stringify(data),
        headers: { "X-Api-Token": XAPITOKEN },
      });
      return await res.data;
    } catch (error) {
      const err = { results: null, response:  false, message: error };
      return err;
    }
  },

  update: async ({ table, data, id, token,operator }) => {
    try {
      let tk = DescifrarTexto(token);
      const res = await Axios({
        url: `${APIURL}${table}/${id}/?token=${tk}&operator=${operator}`,
        method: "PUT",
        data: JSON.stringify(data),
        headers: { "X-Api-Token": XAPITOKEN },
      });
      return await res.data;
    } catch (error) {
      const err = { results: null, response:  false, message: error };
      return err;
    }
  },

  updateOrInsert: async ({ table, data, id=null, token })=>{
    try {
      let tk = DescifrarTexto(token);
      let urlor = id ? `${APIURL}${table}/${id}/?token=${tk}` : `${APIURL}${table}/?token=${tk}` ;
      const res = await Axios({
        url: urlor,
        method: "PATCH",
        data: JSON.stringify(data),
        headers: { "X-Api-Token": XAPITOKEN },
      });
      return await res.data;
    } catch (error) {
      const err = { results: null, response:  false, message: error };
      return err;
    }
  },

  delete: async ({ table, id = "", token, namecolumns = "", ids = "" }) => {
    try {
      let tk = DescifrarTexto(token);
      let ID = id !== "" ? id + "/" : "";
      let url = `${APIURL}${table}/${ID}?token=${tk}&namecolumns=${namecolumns}&ids=${ids}`;
      const res = await Axios({
        url,
        method: "DELETE",
        headers: { "X-Api-Token": XAPITOKEN },
      });
      return await res.data;
    } catch (error) {
      const err = { results: null, response:  false, message: error };
      return err;
    }
  },
};
