import axios from "axios";

const API_URL = "http://localhost:5000/api/calculate";

export async function calculateNumerology(name, dob, gender) {
  const response = await axios.post(API_URL, { name, dob, gender });
  return response.data.data;
}
