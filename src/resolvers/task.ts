import { Arg, Int, Mutation, Query, Resolver } from "type-graphql"
import { Task } from "../entities/Task"

@Resolver()
export class TaskResolver{
    @Query(() => String)
    hello(): string {
        return "hello world"
    }

    //find all tasks
    @Query(() => [Task])
    tasks(): Promise<Task[]> {
        return Task.find({})
    }

    //find single task by id
    @Query(() => Task, {nullable: true})
    task(
        @Arg("id", () => Int)
        id: number
    ): Promise<Task | undefined> {
        return Task.findOne({ 
            where: {
                id
            } 
        })
    }
    
    //create single task
    @Mutation(() => Task)
    createTask(
        @Arg("title", () => String)
        title: string
    ): Promise<Task> {
        return Task.create({ title, isComplete: false }).save();
    }

    //delete task by id
    @Mutation(() => Boolean, { nullable: true})
    deleteTask(
        @Arg("id", () => Int)
        id: number
    ): boolean | null{
        const task = Task.findOne({ 
            where: {
                id
            } 
        })
        if (!task) {
            return null;
        }
        try {
            Task.delete({id})
            return true
        } catch {
            return false
        }
    }

    //update task isComplete by id
    @Mutation(() => Boolean, { nullable: true})
    updateTask(
        @Arg("id", () => Int)
        id: number, 
        @Arg("isComplete", () => Boolean)
        isComplete: boolean
    ): boolean | null {
        const task = Task.findOne({ 
            where: {
                id
            } 
        })
        if (!task) {
            return null
        }
        try {
            Task.update({id}, {isComplete})
            return true
        } catch {
            return false
        }
    }
}