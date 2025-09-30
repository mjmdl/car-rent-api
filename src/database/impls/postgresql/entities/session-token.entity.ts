import { UUID } from "crypto";
import { SessionToken } from "src/api/user/session/token/session-token";
import { Column, Entity, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { SessionEntity } from "./session.entity";

@Entity("session_token")
export class SessionTokenEntity implements SessionToken {
	@PrimaryGeneratedColumn("uuid", { name: "id", primaryKeyConstraintName: "session_token_pk" })
	id!: UUID;

	@Column("varchar", { name: "code" })
	code!: string;

	@Column("timestamptz", { name: "expires_at", nullable: true })
	expiresAt!: Date | null;

	@OneToOne(() => SessionEntity, session => session.accessToken, { nullable: true })
	accessForSession!: SessionEntity | null;

	@OneToOne(() => SessionEntity, session => session.accessToken, { nullable: true })
	refreshForSession!: SessionEntity | null;
}