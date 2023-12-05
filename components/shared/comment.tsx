import React, { useRef } from "react";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "../ui/dialog";
import { ChatBubbleIcon, PaperPlaneIcon } from "@radix-ui/react-icons";
import { Button } from "../ui/button";
import { useLiveQuery } from "dexie-react-hooks";
import { commentTable } from "@/hooks/database.config";
import { Input } from "../ui/input";
import { useToast } from "../ui/use-toast";

const Comment = () => {
    const inputRef = useRef<HTMLInputElement>(null);
    const comments = useLiveQuery(async () => {
        return await commentTable.filter(() => true).toArray();
    });
    const onClick = async () => {
        alert("Done");
        await commentTable.add(inputRef.current?.value);
    };
    return (
        <Dialog>
            <DialogTrigger>
                <Button
                    variant='outline'
                    className='border border-teal-500 flex items-center justify-between gap-3'
                >
                    <ChatBubbleIcon />
                    <p>Add Comments</p>
                </Button>
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Comments</DialogTitle>
                    <DialogDescription>
                        All your comments are shown here.
                    </DialogDescription>
                </DialogHeader>
                <div className='flex flex-col'>
                    <div className='min-h-[150px]'>
                        {comments ? (
                            <p className='text-gray-600 text-sm text-center'>
                                No Comments.
                            </p>
                        ) : (
                            <div>Hello</div>
                        )}
                    </div>
                    <div className='flex items-center space-x-2'>
                        <Input placeholder='Prioritize This' ref={inputRef} />
                        <div>
                            <Button
                                variant='outline'
                                className='border border-teal-500 space-x-1'
                                onClick={onClick}
                            >
                                <PaperPlaneIcon />
                                <p>Post</p>
                            </Button>
                        </div>
                    </div>
                </div>
            </DialogContent>
        </Dialog>
    );
};

export default Comment;
