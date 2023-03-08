import { env } from "../App/config"
const API_URL = env.API_URL
const X_API_TOKEN = env.X_API_TOKEN

export const APICALLER = {

    get: async ({table,sort = "",pagenumber = "",pagesize = "",fields = "",where = "",include = "",on = "",token = "",filtersSearch = "",filtersField = ""}) => {
        try {
          let URLFINAL = `${API_URL}${table}?where=${where}&sort=${sort}&page[number]=${pagenumber}&page[size]=${pagesize}&fields=${fields}&include=${include}&on=${on}&token=${token}&filters[search]=${filtersSearch}&filters[field]=${filtersField}`;
          const res = await fetch(URLFINAL, {
            headers: { "X-Api-Token": X_API_TOKEN },
          });
          return await res.json();
        } catch (error) {
          return { results: null, response:  false, message: error };
        }
      },
    insert: async({table,data})=>{
      return {
        response:true
      }
    }
}