import { UUID } from "crypto";
import { Account } from "../account/account";

export interface Credential {
	id: UUID;
	accountId: UUID;

	password: string;

	validFrom: Date;
	validTo: Date | null;

	account: Account;
}