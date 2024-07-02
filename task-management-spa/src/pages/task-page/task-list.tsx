import { Box, Button } from "@mui/material";
import PostAddIcon from '@mui/icons-material/PostAdd';
import { useMutation, useQuery } from "@tanstack/react-query";
import React from "react";

import taskService from '../../services/service';
import TaskItem from "./task-item";
import { TaskRaw, TaskStatus } from "../../types/task-types";
import { TASK_LIST, TASK_ID } from "../../utils/const";
import TaskDetails from "./task-details";

const TaskListPage = () => {
  // const [taskList, setTaskList] = React.useState<TaskRaw[]>();
  const defaultValue: TaskRaw = {
    id: "0",
    created_by: "",
    description: "",
    estimation: 0,
    status: TaskStatus.NotStarted,
    task_title: ""
  }
  
  const [isAdd, setIsAdd] = React.useState<boolean>(false);
  const [newTask, setNewTask] = React.useState<TaskRaw>(
    defaultValue
  );
  const [currentTask, setCurrentTask] = React.useState<TaskRaw>(defaultValue);
  const [openTask, setOpenTask] = React.useState<boolean>(false);

  const { data: taskList, refetch: getTaskList } = useQuery<TaskRaw[]>({
    queryKey: [TASK_LIST],
    queryFn: taskService.getTaskList
  })

  useQuery<TaskRaw>({
    queryKey: [TASK_ID, currentTask?.id],
    queryFn: async () =>
      await taskService.getTask(currentTask?.id),
    enabled: !!currentTask?.id
  });

  const getCLick = () => {
    setIsAdd(!isAdd);
  }

  const showTask = async (data: TaskRaw) => {
    setOpenTask(true);
    setCurrentTask(data);
  }

  const { mutate: DeleteTask } = useMutation({
    mutationFn: taskService.deleteTask,
    onSuccess: () => {
      getTaskList();
    },
    onError: () => {
    },
  });

  const Delete = (data?: TaskRaw) => {
    DeleteTask(data?.id);
  }

  const { mutate: SaveTask } = useMutation({
    mutationFn: taskService.postTask,
    onSuccess: () => {
      getTaskList();
    },
    onError: () => {
    },
  });

  const Save = (data?: TaskRaw) => {
    var payload = { ...data };
    var taskId = taskList?.length ?? 0;

    SaveTask({
      created_by: "user",
      description: "",
      estimation: 0,
      id: (taskId + 1).toString(),
      status: TaskStatus.NotStarted,
      task_title: payload.task_title
    });
    
    setIsAdd(false);
    setNewTask(defaultValue);
  }

  return (
    <Box sx={{ marginTop: 10 }}>
      <Button size="large" startIcon={<PostAddIcon />} variant="contained" onClick={getCLick} sx={{ marginBottom: 1 }}>
        {!isAdd ? "Add Task" : "Cancel"}
      </Button>

      <TaskDetails
        task={currentTask}
        open={openTask}
        setTask={(task) => { 
          setCurrentTask(task)
        }}
        handleClose={() => {
          setOpenTask(false);
          setCurrentTask(defaultValue);
          getTaskList();
        }}
      />

      {isAdd &&
        <TaskItem
          task={newTask}
          setTask={(task) => {
            setNewTask(task);
          }}
          AddNew={isAdd}
          onView={() => { }}
          onProcess={(process) => {
            Save(process)
          }}

        />
      }
      {taskList?.map(data => {
        return (
          <TaskItem
            key={data.id}
            task={data}
            setTask={() => {
            }}
            onView={(task) => showTask(task ?? defaultValue)}
            onProcess={(process) => {
              Delete(process)
            }}
          />
        );
      })}
    </Box>
  )
}

export default TaskListPage;