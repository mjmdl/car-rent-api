import "dotenv/config"

export function sql(strings: TemplateStringsArray, ...values: any[]): string {
	const schema = process.env.POSTGRES_SCHEMA ?? "public";

	return values
		.reduce<string>(
			(result, value, index) => (result += value + strings[index + 1]),
			strings[0],
		)
		.replaceAll("@.", `${schema}.`);
}