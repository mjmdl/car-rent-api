import { UUID } from "crypto";
import { Account } from "../account/account";
import { SessionToken } from "./token/session-token";

export interface Session {
	id: UUID;
	accountId: UUID;

	accessTokenId: UUID;
	refreshTokenId: UUID | null;
	ipAddress: string | null;
	userAgent: string | null;

	validFrom: Date;
	validTo: Date | null;

	account: Account;
	accessToken: SessionToken;
	refreshToken: SessionToken | null;
}