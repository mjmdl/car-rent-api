import { EntityClassOrSchema } from "@nestjs/typeorm/dist/interfaces/entity-class-or-schema.type";
import { AccountEntity } from "./account.entity";
import { CredentialEntity } from "./credential.entity";
import { SessionTokenEntity } from "./session-token.entity";
import { SessionEntity } from "./session.entity";

export const POSTGRESQL_ENTITIES: EntityClassOrSchema[] = [
	AccountEntity,
	CredentialEntity,
	SessionTokenEntity,
	SessionEntity,
];