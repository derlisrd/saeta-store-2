import { useReducer } from "react";
import { InitialState} from "./InitialState"

function reducerFunction(state,action){

    switch (action.type) {
        case value:
            
            break;
    
        default:
            break;
    }

}


export function useReducer(){
    const [states, dispatch] = useReducer(reducerFunction,InitialState);
    return {states, dispatch}
}