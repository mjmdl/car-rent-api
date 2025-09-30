import { MigrationInterface, QueryRunner } from "typeorm";
import { sql } from "../util/sql";

export class Init1759258461766 implements MigrationInterface {
	public async up(queryRunner: QueryRunner): Promise<void> {
		queryRunner.query(sql`
			CREATE TABLE @.person (
				id UUID NOT NULL DEFAULT uuid_generate_v4(),

				name VARCHAR(255) NOT NULL,
				email VARCHAR(255) NOT NULL,

				version INTEGER NOT NULL DEFAULT 1,
				next_id UUID,
				valid_from TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
				valid_to TIMESTAMPTZ,

				CONSTRAINT person_pk PRIMARY KEY (id),
				CONSTRAINT person_fk_next FOREIGN KEY (next_id) REFERENCES @.person (id)
			);

			CREATE TABLE @.credential (
				id UUID NOT NULL DEFAULT uuid_generate_v4(),
				person_id UUID NOT NULL,

				password VARCHAR(126) NOT NULL,

				version INTEGER NOT NULL DEFAULT 1,
				next_id UUID,
				valid_from TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
				valid_to TIMESTAMPTZ,

				CONSTRAINT credential_pk PRIMARY KEY (id),
				CONSTRAINT credential_fk_next FOREIGN KEY (next_id) REFERENCES @.credential (id),
				CONSTRAINT credential_fk_person FOREIGN KEY (person_id) REFERENCES @.person (id)
			);

			CREATE TABLE @.session_token (
				id UUID NOT NULL DEFAULT uuid_generate_v4(),

				code VARCHAR NOT NULL,
				expires_at TIMESTAMPTZ,

				CONSTRAINT session_token_pk PRIMARY KEY (id)
			);

			CREATE TABLE @.session (
				id UUID NOT NULL DEFAULT uuid_generate_v4(),
				person_id UUID NOT NULL,

				access_id UUID NOT NULL,
				refresh_id UUID,
				ip_address INET,
				user_agent VARCHAR,

				valid_from TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
				valid_to TIMESTAMPTZ,

				CONSTRAINT session_pk PRIMARY KEY (id),
				CONSTRAINT session_fk_person FOREIGN KEY (person_id) REFERENCES @.person (id),
				CONSTRAINT session_fk_access_token FOREIGN KEY (access_id) REFERENCES @.session_token (id),
				CONSTRAINT session_fk_refresh_token FOREIGN KEY (refresh_id) REFERENCES @.session_token (id)
			);
		`);
	}

	public async down(queryRunner: QueryRunner): Promise<void> {
		queryRunner.query(sql`
			DROP TABLE @.session;
			DROP TABLE @.session_token;
			DROP TABLE @.credential;
			DROP TABLE @.person;
		`);
	}
}