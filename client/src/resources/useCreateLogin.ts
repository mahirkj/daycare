
import axios from 'axios';
import { useMutation } from 'react-query'
import { login } from '.././utils/auth';
import Constants from '../constants/constants';

export const useCreateLogin = () => {
	let permission = ''
	return useMutation((values: any) => {
		return axios.post(`${Constants.apiPath}api/auth/`, values)
	}, {
		onSuccess: (data:any) => {
			
			const role = data.data.role;
			const name = data.data.name;
			const user_id = data.data.user_id;
			login({ "token": data.data.token, "role": role, "user_id": user_id, "name": name, "permission": permission});
		},
		onError: () => {
			console.log('erorr')
		}
	})
}