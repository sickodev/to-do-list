import Dexie from "dexie";

const database = new Dexie("database");
database.version(2).stores({
    tasks: "++id, task, status",
    comments: "++id, comment",
});

export const taskTable = database.table("tasks");
export const commentTable = database.table("comments");

export default database;
