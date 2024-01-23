import axios from "axios";
import { useState, useReducer } from "react";

const options = {
  method: "GET",
  url: "https://tasty.p.rapidapi.com/recipes/get-more-info",
  params: { id: "8138" },
  headers: {
    "X-RapidAPI-Key": "30b594a022mshc657030b09147dcp153ad1jsn8b9a863a5527",
    "X-RapidAPI-Host": "tasty.p.rapidapi.com",
  },
};

const initialStates = {
  data: null,
  loading: false,
  error:null
}

const Action = {
  FETCH_DATA:"FETCH_DATA",
  FETCH_SUCCESSFUL: "FETCH_SUCCESSFUL",
  FETCH_ERROR: "FETCH_ERROR"
}

const reducer = (_, action) => {
  switch (action.type) {
    case Action.FETCH_DATA:
      return {
        data: null, 
        loading: true,
        error:null
      } 
    case Action.FETCH_SUCCESSFUL:
      return{
        data: action.payload,
        loading: false,
        error: false
      } 
    case Action.FETCH_ERROR:
      return{
        data:null,
        loading: false,
        error: action.payload
      }
    default:
      return initialStates
  }
}


const useFetchRecipe = () => {

  const [{ data, loading, error } , dispatch] = useReducer(
  reducer ,
  initialStates
  )

  const fetchRecipe = async (id) => {

    dispatch({
      type: Action.FETCH_DATA
    })

    try {
      const reqOptions = { ...options };
      reqOptions.params.id = id;
      const response = await axios.request(reqOptions);
      dispatch({
        type: Action.FETCH_SUCCESSFUL, payload: response.data
      })
    } catch (err) {
      dispatch({
        type: Action.FETCH_ERROR, payload: err.message
      })
    }
  };

  return [fetchRecipe, { data, loading, error }];
};

export default useFetchRecipe;
