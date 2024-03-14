import { BeforeInsert, Column, CreateDateColumn, Entity, JoinTable, ManyToMany, PrimaryGeneratedColumn } from "typeorm"
import { Tag } from "./tags.entity"
import { randomUUID } from "crypto"

@Entity('courses')//nome da tabela
export class Course{
    @PrimaryGeneratedColumn('uuid')
    id: string

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
