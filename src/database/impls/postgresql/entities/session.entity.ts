import { UUID } from "crypto";
import { Account } from "src/api/user/account/account";
import { Session } from "src/api/user/session/session";
import { Column, CreateDateColumn, DeleteDateColumn, Entity, JoinColumn, ManyToOne, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { AccountEntity } from "./account.entity";
import { SessionTokenEntity } from "./session-token.entity";

@Entity("session")
export class SessionEntity implements Session {
	@PrimaryGeneratedColumn("uuid", { name: "id", primaryKeyConstraintName: "account_pk" })
	id!: UUID;

	@Column("uuid", { name: "account_id" })
	accountId!: UUID;

	@Column("uuid", { name: "access_token_id" })
	accessTokenId!: UUID;

	@Column("uuid", { name: "refresh_token_id", nullable: true })
	refreshTokenId!: UUID | null;

	@Column("varchar", { name: "ip_address", nullable: true })
	ipAddress!: string | null;

	@Column("varchar", { name: "user_agent", nullable: true })
	userAgent!: string | null;

	@CreateDateColumn({ name: "valid_from" })
	validFrom!: Date;

	@DeleteDateColumn({ name: "valid_to" })
	validTo!: Date | null;

	@ManyToOne(() => AccountEntity, account => account.sessions)
	@JoinColumn({ name: "account_id", referencedColumnName: "id", foreignKeyConstraintName: "session_fk_account" })
	account!: Account;

	@OneToOne(() => SessionTokenEntity, token => token.accessForSession)
	@JoinColumn({ name: "access_token_id", referencedColumnName: "id", foreignKeyConstraintName: "session_fk_access_token" })
	accessToken!: SessionTokenEntity;

	@OneToOne(() => SessionTokenEntity, token => token.refreshForSession, { nullable: true })
	@JoinColumn({ name: "refresh_token_id", referencedColumnName: "id", foreignKeyConstraintName: "session_fk_refresh_token" })
	refreshToken!: SessionTokenEntity | null;
}