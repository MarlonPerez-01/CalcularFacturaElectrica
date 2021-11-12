import * as Yup from 'yup';

export const params = Yup.object({
	params: Yup.object({
		id: Yup.number().positive().required(),
	}),
});
