import { Body, Controller, Get, HttpCode, Param, Post } from '@nestjs/common';

@Controller('courses')
export class CoursesController {
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
}
