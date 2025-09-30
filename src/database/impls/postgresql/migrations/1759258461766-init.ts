import { MigrationInterface, QueryRunner } from "typeorm";
import { sql } from "../util/sql";

export class Init1759258461766 implements MigrationInterface {
	public async up(queryRunner: QueryRunner): Promise<void> {
		queryRunner.query(sql`
			CREATE TABLE @.account (
				id UUID NOT NULL DEFAULT uuid_generate_v4(),

				name VARCHAR NOT NULL,
				email VARCHAR NOT NULL,

				version INTEGER NOT NULL DEFAULT 1,
				next_id UUID,
				valid_from TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
				valid_to TIMESTAMPTZ,

				CONSTRAINT account_pk PRIMARY KEY (id),
				CONSTRAINT account_fk_next FOREIGN KEY (next_id) REFERENCES @.account (id)
			);

			CREATE TABLE @.credential (
				id UUID NOT NULL DEFAULT uuid_generate_v4(),
				account_id UUID NOT NULL,

				password VARCHAR(126) NOT NULL,

				valid_from TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
				valid_to TIMESTAMPTZ,

				CONSTRAINT credential_pk PRIMARY KEY (id),
				CONSTRAINT credential_fk_account FOREIGN KEY (account_id) REFERENCES @.account (id)
			);

			CREATE UNIQUE INDEX credential_uq_account ON @.credential (account_id) WHERE valid_to IS NULL;

			CREATE TABLE @.session_token (
				id UUID NOT NULL DEFAULT uuid_generate_v4(),

				code VARCHAR NOT NULL,
				expires_at TIMESTAMPTZ,

				CONSTRAINT session_token_pk PRIMARY KEY (id)
			);

			CREATE TABLE @.session (
				id UUID NOT NULL DEFAULT uuid_generate_v4(),
				account_id UUID NOT NULL,

				access_token_id UUID NOT NULL,
				refresh_token_id UUID,
				ip_address INET,
				user_agent VARCHAR,

				valid_from TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
				valid_to TIMESTAMPTZ,

				CONSTRAINT session_pk PRIMARY KEY (id),
				CONSTRAINT session_fk_account FOREIGN KEY (account_id) REFERENCES @.account (id),
				CONSTRAINT session_fk_access_token FOREIGN KEY (access_token_id) REFERENCES @.session_token (id),
				CONSTRAINT session_fk_refresh_token FOREIGN KEY (refresh_token_id) REFERENCES @.session_token (id)
			);

			CREATE UNIQUE INDEX session_uq_access_token ON @.session (access_token_id);
			CREATE UNIQUE INDEX session_uq_refresh_token ON @.session (refresh_token_id) WHERE refresh_token_id IS NOT NULL;
		`);
	}

	public async down(queryRunner: QueryRunner): Promise<void> {
		queryRunner.query(sql`
			DROP TABLE @.session;
			DROP TABLE @.session_token;
			DROP TABLE @.credential;
			DROP TABLE @.account;
		`);
	}
}