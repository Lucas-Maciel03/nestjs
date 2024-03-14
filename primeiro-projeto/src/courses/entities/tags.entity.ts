import { BeforeInsert, Column, CreateDateColumn, Entity, ManyToMany, PrimaryGeneratedColumn } from "typeorm";
import { Course } from "./courses.entity";
import { randomUUID } from "crypto";

@Entity('tags')
export class Tag{
    @PrimaryGeneratedColumn('uuid')
    id: string

    @Column()
    name: string

    @ManyToMany(() => Course, course => course.tags)
    courses: Course[]

    @CreateDateColumn({ type: 'timestamp' })
    created_at: Date

    //esse metodo sera executando sempre antes q um registro entre no banco de dados 
    @BeforeInsert()
    generatedId(){
        if(this.id){
            return //se existir algum valor na prop id ira apenas retornar
        }
        //se nao existir nenhum valor na pro id ira criar um aleatorio
        this.id = randomUUID()
    }
}
