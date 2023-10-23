import * as dotenv from 'dotenv'
dotenv.config()
import {Options} from '@mikro-orm/core';
import {PostgreSqlDriver} from "@mikro-orm/postgresql";

const options: Options<PostgreSqlDriver> = {
    entities: ['./dist/entities'], 
    entitiesTs: ['./src/entities'], 
    migrations: {
        path: './dist/migrations', 
        pathTs: './src/migrations',
    },
    type: 'postgresql',
    seeder: {
        path: './dist/seeders', 
        pathTs: './src/seeders', 
        defaultSeeder: 'DatabaseSeeder', 
        glob: '!(*.d).{js,ts}', 
        emit: 'ts', 
        fileName: (className: string) => className + '.seeder', 
    },
};

export default options;
