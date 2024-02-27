import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, Patch, Post, Res } from '@nestjs/common';
import { CoursesService } from './courses.service';

@Controller('courses')
export class CoursesController {
    //importando service no controller
    constructor(private readonly courseService: CoursesService){}
    //readonly: para garantir a imutabilidade    

    @Get() //get representa o tipo de metodo q a função findAll vai ser
    findAll(){
        return 'Listagem de cursos';
    }

    //ROTAS ALINHADAS
    @Get('list') //http://localhost:3000/courses/list
    findAlls(){
        return 'Listagem de cursos alinhados';
    }

    //ROTAS COM PARAMETROS
    @Get(':id')
    findOne(@Param() params){ //params é referente ao @Param
        return `Curso com ID ${params.id}`;
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

    //Trabalhando com os dados enviados no corpo da requisição
    @Post()
    create(@Body() body){
        return body;
    }

    //Manipulando status code da requisição http
    @HttpCode(204)
    @Post('create') //para mudar o caminho da req
    createCode(@Body() body){
        return body;
    }

    //Decarator Res premite usar recursos do express
    @Get('lista')
    findAllRes(@Res() res){
        return res.status(200).json({ message: 'Lista de alunos' });
    }

    //Manipulando requisições de Update(patch e put)
    @Patch(':id')
    update(@Param('id') id: string, @Body() body){
        console.log(body);
        return `Update course with ID: ${id}`;
    }

    //Manipulando requisições com Delete
    //@HttpCode(HttpStatus.NO_CONTENT) //httpStatus usando enum global de status do nest
    @HttpCode(204)
    @Delete(':id')
    remove(@Param('id') id: string){
        return `Delete course with ID: ${id}`;
    }
}
