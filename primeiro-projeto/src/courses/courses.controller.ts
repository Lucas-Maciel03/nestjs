import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, Post, Put, Res } from '@nestjs/common';
import { CoursesService } from './courses.service';
import { CreateCourseDTO } from './dto/create-course.dto';
import { UpdateCourseDTO } from './dto/update-course.dto';

@Controller('courses')
export class CoursesController {
    //importando service no controller
    constructor(private readonly courseService: CoursesService){}//readonly: para garantir a imutabilidade  

    @Get() //get representa o tipo de metodo q a função findAll vai ser
    findAll(){
        return this.courseService.findAll();
    }

    //ROTAS COM PARAMETROS
    @Get(':id')
    findOne(@Param('id') id: number){
        return this.courseService.findOne(+id);
    }

    //Trabalhando com os dados enviados no corpo da requisição
    @Post()
    create(@Body() createCourseDTO: CreateCourseDTO){
        return this.courseService.create(createCourseDTO);
    }

    //Manipulando requisições de Update(patch e put)
    @Put(':id')
    update(@Param('id') id: number, @Body() UpdateCourseDTO){
        return this.courseService.update(+id, UpdateCourseDTO);
    }
  
    //Manipulando requisições com Delete
    //@HttpCode(HttpStatus.NO_CONTENT) //httpStatus usando enum global de status do nest
    @HttpCode(204)
    @Delete(':id')
    remove(@Param('id') id: number){
        return this.courseService.remove(+id);
    }

    //--- ALGUNS EXEMPLOS ----

    //ROTAS ALINHADAS
    @Get('list') //http://localhost:3000/courses/list
    findAlls(){
        return this.courseService.findAll();
    }

    // @Get(':id')
    // findOneDesconstruindo(@Param('id') id: string){ //@Param(id) id: string referente ao 'id'
    //     return `Curso com ID: ${id}`
    // }
    //DOIS PARAMETROS
    @Get(':id/:name')
    findOneDesconstruindo(@Param('id') id: string, @Param('name') name: string){ //@Param(id) id: string referente ao 'id'
        return `Curso com ID: ${id} e nome: ${name}`;
    }

    //Manipulando status code da requisição http
    @HttpCode(204)
    @Post('create') //para mudar o caminho da req
    createCode(@Body() body){
        return this.courseService.create(body);
    }

    //Decarator Res premite usar recursos do express
    @Get('lista')
    findAllRes(@Res() res){
        return res.status(200).json({ message: 'Lista de alunos' });
    }
}
