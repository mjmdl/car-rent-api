import { UUID } from "crypto";
import { Account } from "src/api/user/account/account";
import { Column, CreateDateColumn, DeleteDateColumn, Entity, JoinColumn, OneToMany, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { CredentialEntity } from "./credential.entity";
import { SessionEntity } from "./session.entity";

@Entity("account")
export class AccountEntity implements Account {
	@PrimaryGeneratedColumn("uuid", { name: "id", primaryKeyConstraintName: "account_pk" })
	id!: UUID;

	@Column("varchar", { name: "name" })
	name!: string;

	@Column("varchar", { name: "email" })
	email!: string;

	@Column("integer", { name: "version" })
	version!: number;

	@Column("uuid", { name: "next_id", nullable: true })
	nextId!: UUID | null;

	@CreateDateColumn({ name: "valid_from" })
	validFrom!: Date;

	@DeleteDateColumn({ name: "valid_to" })
	validTo!: Date | null;

	@OneToOne(() => AccountEntity, nextAccount => nextAccount.previousAccount, { nullable: true })
	@JoinColumn({ name: "next_id", referencedColumnName: "id", foreignKeyConstraintName: "account_fk_next" })
	nextAccount!: AccountEntity | null;

	@OneToOne(() => AccountEntity, previousAccount => previousAccount.nextAccount, { nullable: true })
	previousAccount!: AccountEntity | null;

	@OneToOne(() => CredentialEntity, credential => credential.account, { nullable: true })
	credential!: Credential | null;

	@OneToMany(() => SessionEntity, session => session.account)
	sessions!: SessionEntity[];
}