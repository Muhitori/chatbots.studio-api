import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
} from '@nestjs/common';
import { TeachersService } from './teachers.service';
import { Gender } from '../interfaces/teacher.interface';
import { TeacherDto } from '../dto/teacher.dto';

@Controller('teachers')
export class TeachersController {
  constructor(private teachersService: TeachersService) {}

  @Get()
  async getTeachers(@Query() query): Promise<TeacherDto[] | []> {
    if (query.name) {
      return this.teachersService.getBy({ name: query.name });
    }
    if (query.age) {
      return this.teachersService.getBy({ age: query.age });
    }
    if (query.gender) {
      const enumGender: Gender = Gender[query.gender];
      return this.teachersService.getBy({
        gender: enumGender,
      });
    }
    if (query.experience) {
      return this.teachersService.getBy({
        yearsOfExperience: query.experience,
      });
    }
    return this.teachersService.getAll();
  }

  @Get(':id')
  async getTeacherById(@Param('id') id: string): Promise<TeacherDto | null> {
    return this.teachersService.getById(id);
  }

  @Post()
  async createTeacher(@Body() teacher: TeacherDto): Promise<TeacherDto | null> {
    return this.teachersService.create(teacher);
  }

  @Put(':id')
  async updateTeacher(
    @Param('id') id: string,
    @Body() teacher: TeacherDto,
  ): Promise<TeacherDto | null> {
    return this.teachersService.update(id, teacher);
  }

  @Delete(':id')
  async deleteTeacher(@Param('id') id: string): Promise<any> {
    return this.teachersService.delete(id);
  }
}
