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
    @ManyToMany(() => Tag, tag => tag.courses, {
        cascade: true,
        /*ualquer dado da entidade tags q estiver na operação de post, put ou patch
        esses dados relacionados tbm devem ser criados/atualizados*/
    })
    tags: Tag[]
}
