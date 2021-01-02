import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class LessonMigration20210103235630 implements MigrationInterface {
  private tableName = 'Lessons';

  async up(queryRunner: QueryRunner): Promise<void> {
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
            name: 'subject',
            type: 'varchar',
            length: '255',
            isNullable: false,
          },
          {
            name: 'dayOfWeek',
            type: 'varchar',
            length: '255',
            isNullable: false,
          },
          {
            name: 'startTime',
            type: 'varchar',
            length: '255',
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
      'INSERT INTO "Lessons"("subject", "dayOfWeek", "startTime") VALUES ($1, $2, $3);',
      ['Math', 'Thursday', '10:30'],
    );
  }

  async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable(this.tableName);
  }
}
