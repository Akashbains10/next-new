'use server'

import Task from "@/models/task.mode";
import db from "@/utils/connectDB";

export async function createTask(prevState: any, formData: FormData) {
    const task = formData.get('task');
    try {
    //    db.connectDB();
       await Task.create({taskName: task});
       return { message: `Successfuly added ${task}` }
    } catch (error) {
        return {message: `Failed to create task`}
    }
};