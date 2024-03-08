import { Column, Entity, JoinTable, ManyToMany, PrimaryColumn, PrimaryGeneratedColumn } from "typeorm"
import { Tag } from "./tags.entity"

@Entity('courses')//nome da tabela
export class Course{
    @PrimaryGeneratedColumn()
    id: number

    @Column()
    name: string

    @Column()
    description: string

    @JoinTable()//é usado no many to many para definir o proprietario/lado principal desse relacionamento
    @ManyToMany(() => Tag, tag => tag.courses)
    tags: Tag[]
}
