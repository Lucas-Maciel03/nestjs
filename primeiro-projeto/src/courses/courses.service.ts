import { HttpException, HttpStatus, Injectable, NotFoundException } from '@nestjs/common';
import { Course } from './courses.entity';

/*
    @injectable() configura a questão da injeção de dependencia com container do nest
    entao o nest ja cria um container de dependecy injection e atraves do decorator @Injectable()
    estamos dizendo para o nest configurar no container a classe CoursesService para que   
    quando for usar no controller a instancia ja estará sendo gerenciada no proprio nest
    sem se procupar em dar um new na classe CoursesService pq ja estara sendo gerenciada pelo container
    de injeção de dependencia do nest
*/
@Injectable()
export class CoursesService {
    private courses: Course[] = [
        {
            id: 1,
            name: "Nest.Js",
            description: "Curso sobre fundamentos do framework nestjs",
            tags: ["node.js", "nestjs", "Javascript", "typescript"]
        }
    ]

    findAll(){
        return this.courses
    }

    findOne(id: number){
        const course = this.courses.find(course => course.id === id)

        if(!course){
            //throw new HttpException(`Course ID: ${id} not found!`, HttpStatus.NOT_FOUND) //exception mais generica
            throw new NotFoundException(`Course ID: ${id} not found!`)
        }

        return course
    }

    create(createCourseDTO: any){
        this.courses.push(createCourseDTO)
        return createCourseDTO
    }

    update(id: number, updateCourseDTO: any){
        const existCourse = this.findOne(id)
        
        if(existCourse as any){
            const index = this.courses.findIndex(course => course.id === id)
            this.courses[index] = {
                id,
                ...updateCourseDTO,
            }
        }
    }

    remove(id: number){
        const index = this.courses.findIndex(course => course.id === id)
        
        if(index >= 0){
            this.courses.splice(index, 1)
        }
    }
}
