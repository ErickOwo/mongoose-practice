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

const getObject = async url =>{
  const response = await axios(url);
  return response.data;
}

const deleteObject = async id =>{
  const response = await axios.delete(`${API}/${id}`);
  return response.data;
}

const putObject = async (id , body) =>{
  const response = await axios.put(`${API}/${id}`, body, config);
  return response.data;
}

export {
  addObject,
  getObject,
  deleteObject,
  putObject,
}