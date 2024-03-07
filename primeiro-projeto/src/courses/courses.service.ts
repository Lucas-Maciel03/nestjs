import { HttpException, HttpStatus, Injectable, NotFoundException } from '@nestjs/common';
import { Course } from './entities/courses.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

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
    constructor(
        @InjectRepository(Course)
        private readonly courseRepository: Repository<Course>
    ){}

    async findAll(){
        return this.courseRepository.find()
    }

    async findOne(id: number){
        const course = await this.courseRepository.findOne({ where: { id }})

        if(!course){
            //throw new HttpException(`Course ID: ${id} not found!`, HttpStatus.NOT_FOUND) //exception mais generica
            throw new NotFoundException(`Course ID: ${id} not found!`)
        }

        return course
    }

    async create(createCourseDTO: any){
        const course = this.courseRepository.create(createCourseDTO)

        return this.courseRepository.save(course)
    }

    async update(id: number, updateCourseDTO: any){
        /*  
            preload cria os objetos da nossa entidade a partir dos dados que ela recebe
            se o id corresponder a algo que existe na tabela ele vai salvar os dados
            na variavel course
        */
        const course = await this.courseRepository.preload({
            ... updateCourseDTO,
            id,
        }) //esta montando uma variavel com o id + os objetos que está passando em updateCouseDTO

        if(!course){
            throw new NotFoundException(`Course ID: ${id} not found`)
        }

        return this.courseRepository.save(course)
    }

    async remove(id: number){
        const course = await this.courseRepository.findOne({ where: { id } })

        if(!course){
            throw new NotFoundException(`Course ID: ${id} not found`)
        }

        return this.courseRepository.remove(course)
    }
}
