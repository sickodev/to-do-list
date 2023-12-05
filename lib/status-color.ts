export const getStatusColor = (status: string) => {
    switch (status) {
        case "Not Started": {
            return "bg-gray-400";
        }
        case "Started": {
            return "bg-blue-400";
        }
        case "In Progress": {
            return "bg-yellow-400";
        }
        case "Finished": {
            return "bg-green-400";
        }
        case "Stopped": {
            return "bg-red-400";
        }
        default: {
            return "bg-secondary";
        }
    }
};
