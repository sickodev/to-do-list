import { useLiveQuery } from "dexie-react-hooks";
import { taskTable } from "./database.config";

const useSearch = async (search: string) => {
    const result = useLiveQuery(async () => {
        await taskTable.where("task").startsWithIgnoreCase(search).toArray();
    });

    return result;
};

export { useSearch };
