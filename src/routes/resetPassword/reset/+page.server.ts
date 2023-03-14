import { UserSchema } from "$lib/zodSchemas";

export const actions = {
	default: async ({ request, locals: { db } }) => {
		const data = await request.formData();

		const password = String(data.get("password"));

		const safeParse = UserSchema.pick({ password: true }).safeParse({
			password,
		});

		if (!safeParse.success) {
			return { error: JSON.stringify(safeParse.error.issues) };
		}

		const { error: dbError } = await db.auth.updateUser({
			password,
		});

		if (dbError) {
			return { error: dbError.message };
		}

		return { success: "Password successfully reset." };
	},
};
