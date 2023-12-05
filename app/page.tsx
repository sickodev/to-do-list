import AddTask from "@/components/shared/add-task";
import SearchTask from "@/components/shared/search-task";
import FinishedColumn from "@/components/shared/task-coloumns/finished-column";
import InProgressColumn from "@/components/shared/task-coloumns/in-progress-column";
import NotStartedColumn from "@/components/shared/task-coloumns/not-started-column";
import StartedColumn from "@/components/shared/task-coloumns/started-column";
import StoppedColumn from "@/components/shared/task-coloumns/stopped-column";

export default function Home() {
    return (
        <section>
            <div className='flex space-x-2 items-center justify-center'>
                <AddTask />
                <SearchTask />
            </div>
            <div className='mt-6 mx-2 flex items-top justify-around space-x-2'>
                <NotStartedColumn />
                <StartedColumn />
                <InProgressColumn />
                <FinishedColumn />
                <StoppedColumn />
            </div>
        </section>
    );
}
