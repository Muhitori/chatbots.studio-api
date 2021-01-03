import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { TeachersService } from './teachers.service';
import { Gender, TeacherDto } from '../interfaces/teacher.dto';

@Controller('teachers')
export class TeachersController {
  constructor(private teachersService: TeachersService) {}

  @Get()
  async getAllTeachers() {
    console.log('lol');
    return this.teachersService.getAll();
  }

  @Get(':name')
  async getByName(@Param('name') name: string) {
    console.log(name);
    return this.teachersService.getBy({ name });
  }

  @Get(':age')
  async getByAge(@Param('age') age: number) {
    console.log(age);
    return this.teachersService.getBy({ age });
  }

  @Get(':gender')
  async getByGender(@Param('gender') gender: string) {
    console.log(gender);
    const enumGender: Gender = Gender[gender];
    return this.teachersService.getBy({ gender: enumGender });
  }

  @Get(':experience')
  async getByExperience(@Param('experience') yearsOfExperience: number) {
    return this.teachersService.getBy({ yearsOfExperience });
  }

  @Post()
  async createTeacher(@Body() teacher: TeacherDto) {
    return this.teachersService.create(teacher);
  }

  @Put(':id')
  async updateTeacher(@Param('id') id: string, @Body() teacher: TeacherDto) {
    return this.teachersService.update(id, teacher);
  }

  @Delete(':id')
  async deleteTeacher(@Param('id') id: string) {
    console.log(id);
    return this.teachersService.delete(id);
  }
}
