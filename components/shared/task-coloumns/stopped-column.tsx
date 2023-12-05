"use client";

import React, { useState } from "react";
import { useLiveQuery } from "dexie-react-hooks";
import { taskTable } from "@/hooks/database.config";
import TaskCard from "../task-card";

const StoppedColumn = () => {
    const tasks = useLiveQuery(async () => {
        return await taskTable
            .where("status")
            .equalsIgnoreCase("stopped")
            .toArray();
    });

    if (!tasks) {
        return null;
    }

    return (
        <div className='border-2 border-zinc-800/50 dark:border-zinc-400/40 rounded-md h-full w-[300px] py-1'>
            <div className='text-center'>
                <p className='uppercase text-xs font-bold dark:text-primary/50 text-black/50'>
                    Stopped
                </p>
                <hr className='mx-2 opacity-60' />
            </div>
            <div className=''>
                {tasks.map((task) => (
                    <TaskCard task={task} key={task.id} />
                ))}
            </div>
        </div>
    );
};

export default StoppedColumn;
