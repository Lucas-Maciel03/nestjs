import { Controller, Get } from '@nestjs/common';

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
}
