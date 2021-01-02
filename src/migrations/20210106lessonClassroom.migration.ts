import {
  MigrationInterface,
  QueryRunner,
  Table,
  TableForeignKey,
} from 'typeorm';
import { Classroom } from '../entities/classroom.entity';
import { Lesson } from '../entities/lesson.entity';

export class LessonClassroomMigration20210106235630
  implements MigrationInterface {
  private tableName = 'LessonsClassrooms';

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
            name: 'lessonId',
            type: 'uuid',
            isNullable: false,
          },
          {
            name: 'classroomId',
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
        columnNames: ['lessonId'],
        referencedColumnNames: ['id'],
        referencedTableName: 'Lessons',
        onDelete: 'CASCADE',
      }),
    );

    await queryRunner.createForeignKey(
      this.tableName,
      new TableForeignKey({
        columnNames: ['classroomId'],
        referencedColumnNames: ['id'],
        referencedTableName: 'Classrooms',
        onDelete: 'CASCADE',
      }),
    );

    const [
      lesson,
    ]: Lesson[] = await queryRunner.query(
      'SELECT * FROM "Lessons" WHERE subject = $1',
      ['Math'],
    );

    const [
      classroom,
    ]: Classroom[] = await queryRunner.query(
      'SELECT * FROM "Classrooms" WHERE number = $1',
      [100],
    );

    await queryRunner.query(
      'INSERT INTO "LessonsClassrooms"("lessonId", "classroomId") VALUES ($1, $2);',
      [lesson.id, classroom.id],
    );
  }

  async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable(this.tableName);
  }
}
