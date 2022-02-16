import { useQuery } from "react-query";
import axios from "axios";
import Constants from '../constants/constants';


export default function useTeacher() {

  let token: string | null | object = null
  const user_info = localStorage.getItem("user_info");
  if (user_info) {
    if (JSON.parse(user_info).token) {
      token = JSON.parse(user_info).token;
    }
  }
  return useQuery(['useTeacher'], async () => {

    const { data } = await axios.get(
      `${Constants.apiPath}api/users/allTeacher/`, { headers: { 'x-auth-token': token } });
    return data
  })

}
