import axios from "axios";

const API = process.env.NEXT_PUBLIC_API_URL;

const config = {
  Headers: {
    accept: '*/*',
    'Content-Type': 'aplication/json',
  },
};

const addObject = async body =>{
  const response = await axios.post(API, body, config);
  return response.data;
}

export {
  addObject,
}