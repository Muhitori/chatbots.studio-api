import { MigrationInterface, QueryRunner, Table } from 'typeorm';
import { Gender } from '../interfaces/teacher.dto';

export class TeacherMigration20210102235630 implements MigrationInterface {
  private tableName = 'Teachers';

  async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query('CREATE EXTENSION IF NOT EXISTS "uuid-ossp";');

    await queryRunner.createTable(
      new Table({
        name: this.tableName,
        columns: [
          {
            name: 'id',
            type: 'uuid',
            default: 'uuid_generate_v4()',
            isPrimary: true,
          },
          {
            name: 'name',
            type: 'varchar',
            length: '255',
            isNullable: false,
          },
          {
            name: 'age',
            type: 'int',
            isNullable: false,
          },
          {
            name: 'gender',
            type: 'enum',
            enum: Object.values(Gender),
            isNullable: false,
          },
          {
            name: 'yearsOfExperience',
            type: 'int',
            isNullable: false,
          },
          {
            name: 'createdAt',
            type: 'timestamptz',
            default: 'now()',
            isNullable: false,
          },
          {
            name: 'updatedAt',
            type: 'timestamptz',
            isNullable: true,
          },
          {
            name: 'deletedAt',
            type: 'timestamptz',
            isNullable: true,
          },
        ],
      }),
    );

    await queryRunner.query(
      'INSERT INTO "Teachers"("name", "age", "gender", "yearsOfExperience") VALUES ($1, $2, $3, $4);',
      ['teacher', 50, 'male', 25],
    );
  }

  async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable(this.tableName);
  }
}
