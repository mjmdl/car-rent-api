import { UUID } from "crypto";
import { Session } from "../session";

export interface SessionToken {
	id: UUID;

	code: string;
	expiresAt: Date | null;

	accessForSession: Session | null;
	refreshForSession: Session | null;
}