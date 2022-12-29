import "reflect-metadata"
import express, { Express } from 'express'
import { ApolloServer } from 'apollo-server-express'
import { buildSchema } from 'type-graphql'
import { TaskResolver } from './resolvers/task'
import { ApolloServerPluginLandingPageGraphQLPlayground } from "apollo-server-core"
import { createConnection } from "typeorm"
import { Task } from "./entities/Task"

const main = async () => {
    const conn = await createConnection({
        type: "mysql",
        database: "graphql-api",
        entities: [Task],
        logging: true,
        synchronize: true,
        username: "root",
        password: "",
        port: 3306
    })
    const apolloServer = new ApolloServer({
        schema: await buildSchema({
            resolvers: [TaskResolver],
            validate: false
        }),
        plugins: [ApolloServerPluginLandingPageGraphQLPlayground()]
    })

    await apolloServer.start()
    const app: Express = express()

    apolloServer.applyMiddleware({app})    
    app.get('/', (req, res) => res.send("hello world"))

    const PORT = process.env.PORT || 8001;
    app.listen(PORT, () => console.log(`Server started on ${PORT}`))
}

main().catch(err => console.error(err))