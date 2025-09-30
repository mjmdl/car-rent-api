import { UUID } from "crypto";
import { Session } from "../session/session";

export interface Account {
	id: UUID;

	name: string;
	email: string;

	version: number;
	nextId: UUID | null;
	validFrom: Date;
	validTo: Date | null;

	nextAccount: Account | null;
	previousAccount: Account | null;
	credential: Credential | null;
	sessions: Session[];
}