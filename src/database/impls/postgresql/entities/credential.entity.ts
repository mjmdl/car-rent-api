import { UUID } from "crypto";
import { Credential } from "src/api/user/credential/credential";
import { Column, CreateDateColumn, DeleteDateColumn, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { AccountEntity } from "./account.entity";

@Entity("credential")
export class CredentialEntity implements Credential {
	@PrimaryGeneratedColumn("uuid", { name: "id", primaryKeyConstraintName: "credential_pk" })
	id!: UUID;

	@Column("uuid", { name: "account_id" })
	accountId!: UUID;

	@Column("varchar", { name: "password" })
	password!: string;

	@CreateDateColumn({ name: "valid_from" })
	validFrom!: Date;

	@DeleteDateColumn({ name: "valid_to" })
	validTo!: Date | null;

	@OneToOne(() => AccountEntity, account => account.credential)
	@JoinColumn({ name: "account_id", referencedColumnName: "id", foreignKeyConstraintName: "credential_fk_account" })
	account!: AccountEntity;
}