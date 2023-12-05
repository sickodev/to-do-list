"use client";

import React from "react";
import { Badge } from "../ui/badge";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "../ui/dialog";
import { getStatusColor } from "@/lib/status-color";
import { cn } from "@/lib/utils";
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "../ui/form";
import { Textarea } from "../ui/textarea";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "../ui/select";
import { Button } from "../ui/button";
import { useRouter } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";
import { taskTable } from "@/hooks/database.config";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { Pencil2Icon, TrashIcon } from "@radix-ui/react-icons";
import { useToast } from "../ui/use-toast";

type Props = {
    task: {
        id: number;
        task: string;
        status: string;
    };
};

const SearchItem = ({ task }: Props) => {
    const statusColor = getStatusColor(task.status);

    const router = useRouter();

    const formSchema = z.object({
        task: z.string().min(2, {
            message: "Task should be at least 2 characters.",
        }),
        status: z.string().min(3, {
            message: "Task status should be assigned",
        }),
    });
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            task: task.task,
            status: task.status,
        },
    });

    const onSubmit = async (values: z.infer<typeof formSchema>) => {
        try {
            await taskTable.update(task.id, values);
            form.reset();
            router.push("/");
        } catch (error) {
            console.error("Failed to edit.");
        }
    };

    const handleClick = async () => {
        try {
            await taskTable.delete(task.id);
            router.refresh();
        } catch (error) {
            console.error("Failed to delete.");
        }
    };

    return (
        <div className=' cursor-pointer'>
            <Dialog>
                <DialogTrigger asChild>
                    <div className='w-[50vw] border rounded-lg m-2 p-2'>
                        <div className='flex justify-end'>
                            <Badge
                                className={cn(
                                    "scale-90 opacity-90 font-bold  text-black",
                                    statusColor
                                )}
                            >
                                {task.status}
                            </Badge>
                        </div>
                        <div>
                            <p className='text-lg'>{task.task}</p>
                        </div>
                    </div>
                </DialogTrigger>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Edit Task</DialogTitle>
                        <DialogDescription>
                            Edit or Delete your task here.
                        </DialogDescription>
                    </DialogHeader>
                    <Form {...form}>
                        <form onSubmit={form.handleSubmit(onSubmit)}>
                            <FormField
                                control={form.control}
                                name='task'
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Task</FormLabel>
                                        <FormControl>
                                            <Textarea
                                                defaultValue={task.task}
                                                placeholder='Drink water.'
                                                className='resize-none'
                                                {...field}
                                            />
                                        </FormControl>
                                        <FormDescription>
                                            You can be as descriptive as you
                                            want.
                                        </FormDescription>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name='status'
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Status</FormLabel>
                                        <Select
                                            onValueChange={field.onChange}
                                            defaultValue={task.status}
                                        >
                                            <FormControl>
                                                <SelectTrigger className='w-[180px]'>
                                                    <SelectValue placeholder='Select a Status' />
                                                </SelectTrigger>
                                            </FormControl>
                                            <SelectContent>
                                                <SelectItem value='Not Started'>
                                                    <Badge className='bg-gray-400'>
                                                        Not Started
                                                    </Badge>
                                                </SelectItem>
                                                <SelectItem value='Started'>
                                                    <Badge className='bg-zinc-400'>
                                                        Started
                                                    </Badge>
                                                </SelectItem>
                                                <SelectItem value='In Progress'>
                                                    <Badge className='bg-yellow-400'>
                                                        In Progress
                                                    </Badge>
                                                </SelectItem>
                                                <SelectItem value='Finished'>
                                                    <Badge className='bg-green-400'>
                                                        Finished
                                                    </Badge>
                                                </SelectItem>
                                                <SelectItem value='Stopped'>
                                                    <Badge className='bg-red-400'>
                                                        Stopped
                                                    </Badge>
                                                </SelectItem>
                                            </SelectContent>
                                        </Select>
                                        <FormDescription>
                                            Select a status for your task.
                                        </FormDescription>
                                    </FormItem>
                                )}
                            />
                            <DialogFooter>
                                <Button
                                    variant='outline'
                                    className='border-2 border-green-500 flex items-center gap-2 justify-between'
                                    type='submit'
                                >
                                    <Pencil2Icon />
                                    Edit Task
                                </Button>
                                <Button
                                    onClick={handleClick}
                                    variant='outline'
                                    className='border-2 border-red-500 flex items-center gap-2 justify-between'
                                >
                                    <TrashIcon />
                                    Delete Task
                                </Button>
                            </DialogFooter>
                        </form>
                    </Form>
                </DialogContent>
            </Dialog>
        </div>
    );
};

export default SearchItem;
