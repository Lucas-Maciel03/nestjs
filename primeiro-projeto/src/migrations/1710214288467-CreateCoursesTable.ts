import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class CreateCoursesTable1710214288467 implements MigrationInterface {

    //metodo down é executado quando rodamos o script up
    public async up(queryRunner: QueryRunner): Promise<void> {
        //esta definindo o tipo do campo id da tabela courses
        await queryRunner.query('CREATE EXTENSION IF NOT EXISTS "uuid-ossp"')

        await queryRunner.createTable(new Table({
            name: 'courses',
            columns: [
                {
                    name: 'id',
                    type: 'uuid',
                    isPrimary: true,
                },
                {
                    name: 'name',
                    type: 'varchar',
                },
                {
                    name: 'description',
                    type: 'varchar',
                },
                {
                    name: 'created_at',
                    type: 'timestamp',
                    default: 'CURRENT_TIMESTAMP',
                },
            ]
        }))
    }
    
    //metodo down é executado quando rodamos o script down
    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable('courses')
    }

}
