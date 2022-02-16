
import axios from 'axios';
import { useMutation } from 'react-query'
import Constants from '../constants/constants';

export const useGeneratePayment = () => {
	let token: string | null | object = null
	const user_info = localStorage.getItem("user_info");
	if (user_info) {
		if (JSON.parse(user_info).token) {
			token = JSON.parse(user_info).token;
		}
	}
	return useMutation((values: any) => {
		return axios.post(`${Constants.apiPath}api/payment/generatePayment`, values, { headers: { 'x-auth-token': token } })
	}, {
		onSuccess: (data, variables) => {
			// if (data?.data.error) {

			// } else {
			// 	setTimeout(function () { window.location.reload(); }, 2000);
			// }
		},
		onError: () => {
			console.log('erorr')
		}
	})
}