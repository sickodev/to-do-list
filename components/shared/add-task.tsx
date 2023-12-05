"use client";
import React from "react";
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
import { PlusIcon } from "@radix-ui/react-icons";
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "../ui/form";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Textarea } from "../ui/textarea";
import { DropdownMenu, DropdownMenuTrigger } from "../ui/dropdown-menu";
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "../ui/select";
import { Badge } from "../ui/badge";
import { taskTable } from "@/hooks/database.config";
import { redirect, useRouter } from "next/navigation";
import { useToast } from "../ui/use-toast";

const AddTask = () => {
    const router = useRouter();
    const { toast } = useToast();

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
            task: "",
            status: "",
        },
    });

    const onSubmit = async (values: z.infer<typeof formSchema>) => {
        try {
            await taskTable.add(values);
            form.reset();
            toast({
                title: "Added Task",
            });
            redirect("/");
        } catch (error) {
            console.error("Failed to add.");
        }
    };
    return (
        <div>
            <Dialog>
                <DialogTrigger asChild>
                    <Button
                        variant='outline'
                        className='flex items-center space-x-2 border border-green-500 w-[120px]'
                    >
                        <PlusIcon />
                        <p>Add Task</p>
                    </Button>
                </DialogTrigger>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Add a Task</DialogTitle>
                        <DialogDescription>
                            Add your task here. You can add badges to keep a
                            track of it.
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
                                            defaultValue={field.value}
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
                                                    <Badge className='bg-blue-400'>
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
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <DialogFooter>
                                <Button
                                    variant='outline'
                                    className='border-2 border-green-500'
                                    type='submit'
                                >
                                    Add Task
                                </Button>
                            </DialogFooter>
                        </form>
                    </Form>
                </DialogContent>
            </Dialog>
        </div>
    );
};

export default AddTask;
