import { Box, Button, Chip, Grid, Paper, Stack, TextField, Typography } from "@mui/material"
import DeleteIcon from '@mui/icons-material/Delete';
import HourglassEmptyIcon from '@mui/icons-material/HourglassEmpty';
import PendingIcon from '@mui/icons-material/Pending';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import SearchIcon from '@mui/icons-material/Search';

import { TaskRaw, TaskStatus } from "../../types/task-types";
import { Save } from "@mui/icons-material";

type TaskItemProps = {
    task: TaskRaw
    setTask: (task: TaskRaw) => void;
    AddNew?: boolean;
    onView: (task?: TaskRaw) => void;
    onProcess: (task?: TaskRaw) => void;
}

const TaskItem = ({ task, setTask, AddNew = false, onView, onProcess }: TaskItemProps) => {
    const onChange = (evt: any) => {
        const name = evt.target.name;
        const value = evt.target.value;

        setTask({
            ...task,
            [name]: value
        })
    }

    return (
        <Box sx={{ margin: 0.5 }} >
            <Paper sx={{ padding: 2 }} >
                <Grid container spacing={2}  alignItems={"center"} >
                    <Grid item xs={12} md={1}>
                        {!AddNew &&
                            <Stack direction={"row"} spacing={1}>
                                <Button variant="contained" color="primary" fullWidth onClick={() => onView(task)}>
                                    <SearchIcon />
                                </Button>
                                <Button variant="contained" color="error" fullWidth onClick={() => onProcess(task)}>
                                    <DeleteIcon />
                                </Button>
                            </Stack>
                        }
                        {AddNew &&
                            <Button variant="contained" color="success" fullWidth onClick={() => onProcess(task)}>
                                <Save />
                            </Button>
                        }
                    </Grid>
                    <Grid item xs={12} md={10}>
                        {AddNew &&
                            <TextField
                                name="task_title"
                                label="Task"
                                variant="outlined"
                                sx={{ fontSize: "18px" }}
                                onChange={onChange}
                                value={task.task_title}
                                fullWidth
                            >
                                {task?.task_title}
                            </TextField  >}
                        {!AddNew && <Typography sx={{ fontSize: "18px" }}>
                            {task?.task_title}
                        </Typography >}

                    </Grid>
                    <Grid item xs={12} md={1}>
                        {task?.status == TaskStatus.NotStarted &&
                            <Chip color="warning" label="Not Started" icon={<HourglassEmptyIcon />} sx={{ width: "100%" }} />
                        }
                        {task?.status == TaskStatus.InProgress &&
                            <Chip color="primary" label="In Progress" icon={<PendingIcon />} sx={{ width: "100%" }} />
                        }
                        {task?.status == TaskStatus.Done &&
                            <Chip color="success" label="Done" icon={<CheckCircleOutlineIcon />} sx={{ width: "100%" }} />
                        }
                    </Grid>
                </Grid>
            </Paper>
        </Box >
    )
}

export default TaskItem