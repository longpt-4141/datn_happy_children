import axios from "axios";
import { baseUrl } from "../constants/baseUrl";
axios.defaults.withCredentials = true;

const getAllNormalDonatesServices = async () => {
	try {
		const response = await axios.get(
			`${baseUrl}/transaction/admin-get`,
			{
				withCredentials: true,
			}
		);
		console.log(response.data);
		return response.data;
	} catch (error) {
		console.log({ error });
	}
};

const getAllFundDonatesServices = async () => {
	try {
		const response = await axios.get(
			`${baseUrl}/transaction/admin-get-fund-transaction`,
			{
				withCredentials: true,
			}
		);
		console.log(response.data);
		return response.data;
	} catch (error) {
		console.log({ error });
	}
};

const getAllItemDonatesServices = async () => {
	try {
		const response = await axios.get(
			`${baseUrl}/transaction/admin-get-item-transaction`,
			{
				withCredentials: true,
			}
		);
		console.log(response.data);
		return response.data;
	} catch (error) {
		console.log({ error });
	}
};

const confirmDonationServices = async (confirm_data) => {
	try {
		const response = await axios.post(
			`${baseUrl}/transaction/confirm-donation`,
			confirm_data,
			{
				withCredentials: true,
			}
		);
		console.log(response.data);
		return response.data;
	} catch (error) {
		console.log({ error });
	}
};

const confirmItemDonationServices = async (confirm_data) => {
	try {
		const response = await axios.post(
			`${baseUrl}/transaction/confirm-item-donation`,
			confirm_data,
			{
				withCredentials: true,
			}
		);
		console.log(response.data);
		return response.data;
	} catch (error) {
		console.log({ error });
	}
};

const rejectDonationServices = async (reject_data) => {
	try {
		const response = await axios.post(
			`${baseUrl}/transaction/reject-donation`,
			reject_data,
			{
				withCredentials: true,
			}
		);
		console.log(response.data);
		return response.data;
	} catch (error) {
		console.log({ error });
	}
};

const rejectItemDonationServices = async (reject_data) => {
	try {
		const response = await axios.post(
			`${baseUrl}/transaction/reject-item-donation`,
			reject_data,
			{
				withCredentials: true,
			}
		);
		console.log(response.data);
		return response.data;
	} catch (error) {
		console.log({ error });
	}
};

export {
	getAllNormalDonatesServices,
	confirmDonationServices,
	getAllFundDonatesServices,
	getAllItemDonatesServices,
	confirmItemDonationServices,
    rejectDonationServices,
    rejectItemDonationServices
};
