import { dataSourceOptions } from "src/database/database.module";
import { DataSource } from "typeorm";
import { CreateCoursesTable1710214288467 } from "../migrations/1710214288467-CreateCoursesTable";
import { CreateTagsTable1710378320012 } from "src/migrations/1710378320012-CreateTagsTable";
import { CreateCoursesTagsTable1710381055785 } from "src/migrations/1710381055785-CreateCoursesTagsTable";

export const dataSource = new DataSource({
    ... dataSourceOptions,
    synchronize: false,
    migrations: [
        CreateCoursesTable1710214288467,
        CreateTagsTable1710378320012,
        CreateCoursesTagsTable1710381055785,
    ]
    /*
        cada migração q for criada ira passar no arquivo de migrations,
        sera pego o que está no arquivo junto com as propriedades
        de Conexao(datasourceoptions) e ira aplicar no banco de dados
    */
})