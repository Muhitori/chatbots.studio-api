import {
  MigrationInterface,
  QueryRunner,
  Table,
  TableForeignKey,
} from 'typeorm';
import { Lesson } from '../entities/lesson.entity';
import { Teacher } from '../entities/teacher.entity';

export class TeacherLessonMigration20210105235630
  implements MigrationInterface {
  private tableName = 'TeachersLessons';

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
            name: 'teacherId',
            type: 'uuid',
            isNullable: false,
          },
          {
            name: 'lessonId',
            type: 'uuid',
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

    await queryRunner.createForeignKey(
      this.tableName,
      new TableForeignKey({
        columnNames: ['teacherId'],
        referencedColumnNames: ['id'],
        referencedTableName: 'Teachers',
        onDelete: 'CASCADE',
      }),
    );

    await queryRunner.createForeignKey(
      this.tableName,
      new TableForeignKey({
        columnNames: ['lessonId'],
        referencedColumnNames: ['id'],
        referencedTableName: 'Lessons',
        onDelete: 'CASCADE',
      }),
    );

    const [
      teacher,
    ]: Teacher[] = await queryRunner.query(
      'SELECT * FROM "Teachers" WHERE name = $1',
      ['teacher'],
    );

    const [
      lesson,
    ]: Lesson[] = await queryRunner.query(
      'SELECT * FROM "Lessons" WHERE subject = $1',
      ['Math'],
    );

    await queryRunner.query(
      'INSERT INTO "TeachersLessons"("teacherId", "lessonId") VALUES ($1, $2);',
      [teacher.id, lesson.id],
    );
  }

  async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable(this.tableName);
  }
}
