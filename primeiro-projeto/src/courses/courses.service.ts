import { HttpException, HttpStatus, Injectable, NotFoundException } from '@nestjs/common';
import { Course } from './entities/courses.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Tag } from './entities/tags.entity';
import { CreateCourseDTO } from './dto/create-course.dto';
import { UpdateCourseDTO } from './dto/update-course.dto';

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
        private readonly courseRepository: Repository<Course>,

        @InjectRepository(Tag)
        private readonly tagRepository: Repository<Tag>
    ){}

    async findAll(){
        return this.courseRepository.find({
            relations: ['tags'],
        })
    }

    async findOne(id: string){
        const course = await this.courseRepository.findOne({
            where: { id },
            relations: ['tags'],
        })

        if(!course){
            //throw new HttpException(`Course ID: ${id} not found!`, HttpStatus.NOT_FOUND) //exception mais generica
            throw new NotFoundException(`Course ID: ${id} not found!`)
        }

        return course
    }

    async create(createCourseDTO: CreateCourseDTO){
        const tags = await Promise.all(
            createCourseDTO.tags.map(name => this.preloadTagByName(name))
        )
        const course = this.courseRepository.create({
            ... createCourseDTO,
            tags,
        })

        return this.courseRepository.save(course)
    }

    async update(id: string, updateCourseDTO: UpdateCourseDTO){
        const tags = 
            updateCourseDTO.tags &&
            (await Promise.all(
                updateCourseDTO.tags.map(name => this.preloadTagByName(name)),
            ))
        /*  
            preload cria os objetos da nossa entidade a partir dos dados que ela recebe
            se o id corresponder a algo que existe na tabela ele vai salvar os dados
            na variavel course
        */
        const course = await this.courseRepository.preload({
            ... updateCourseDTO,
            id,
            tags,
        }) //esta montando uma variavel com o id + os objetos que está passando em updateCouseDTO

        if(!course){
            throw new NotFoundException(`Course ID: ${id} not found`)
        }

        return this.courseRepository.save(course)
    }

    async remove(id: string){
        const course = await this.courseRepository.findOne({ where: { id } })

        if(!course){
            throw new NotFoundException(`Course ID: ${id} not found`)
        }

        return this.courseRepository.remove(course)
    }

    private async preloadTagByName(name: string): Promise<Tag>{
        const tag = await this.tagRepository.findOne({ where: { name } })

        if(tag){
            return tag
        }

        return this.tagRepository.create({ name })
    }
}
