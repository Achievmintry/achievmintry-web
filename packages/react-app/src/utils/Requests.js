import axios from 'axios';
import supportedChains from './Chains';

const chainData = supportedChains[+process.env.REACT_APP_NETWORK_ID];

export const AtBaseUrl = () => {
  return chainData.api_url;
};

export const getAirTable = async (table) => {
  const baseURL = AtBaseUrl();
  const endpoint = `${table}?maxRecords=99&view=Grid%20view`

  const instance = axios.create({
    baseURL,
    headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${chainData.read_only_key}` },
  });
  try {
    return await instance.get(`/${endpoint}`);
  } catch (err) {
    throw new Error(err);
  }
};



