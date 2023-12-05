"use client";
import React, { useEffect, useRef, useState } from "react";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "../ui/dialog";
import { Button } from "../ui/button";
import { MagnifyingGlassIcon } from "@radix-ui/react-icons";
import TaskCard from "./task-card";
import { Input } from "../ui/input";
import { useLiveQuery } from "dexie-react-hooks";
import database, { taskTable } from "@/hooks/database.config";
import {
    Command,
    CommandEmpty,
    CommandGroup,
    CommandInput,
    CommandItem,
    CommandList,
} from "../ui/command";
import SearchItem from "./search-item";

const SearchTask = () => {
    const results = useLiveQuery(async () => {
        return await taskTable.filter(() => true).toArray();
    });

    if (!results) {
        return null;
    }

    return (
        <div>
            <Dialog>
                <DialogTrigger asChild>
                    <Button
                        variant='outline'
                        className='flex items-center space-x-2 border dark:border-white/50 border-black/50 w-[120px]'
                    >
                        <MagnifyingGlassIcon />
                        <p>Search</p>
                    </Button>
                </DialogTrigger>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Search for a Task.</DialogTitle>
                    </DialogHeader>
                    <DialogDescription>
                        Search for your task by entering the description
                    </DialogDescription>
                    <Command>
                        <CommandInput placeholder='Type task title to search...' />
                        <CommandList>
                            <CommandEmpty>No results found.</CommandEmpty>
                            <CommandGroup heading='Search Results'>
                                <div>
                                    {results?.map((result) => (
                                        <CommandItem key={result.id}>
                                            <SearchItem task={result} />
                                        </CommandItem>
                                    ))}
                                </div>
                            </CommandGroup>
                        </CommandList>
                    </Command>
                </DialogContent>
            </Dialog>
        </div>
    );
};

export default SearchTask;
