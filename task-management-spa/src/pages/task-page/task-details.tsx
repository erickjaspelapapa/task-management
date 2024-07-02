import { Box, Button, FormControl, Grid, InputLabel, MenuItem, Modal, Select, Stack, TextField } from "@mui/material";

import { TaskRaw, TaskStatus } from "../../types/task-types"
import { Cancel, Save } from "@mui/icons-material";
import { useMutation } from "@tanstack/react-query";
import taskService from '../../services/service'

type TaskDetailsProps = {
  task: TaskRaw;
  setTask: (task: TaskRaw) => void;
  open: boolean;
  handleClose: () => void;
}

const style = {
  position: 'absolute' as 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: "60%",
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

const TaskDetails = ({ task, setTask, open, handleClose }: TaskDetailsProps) => {

  const onChange = (evt: any) => {
    const name = evt.target.name;
    const value = evt.target.value;

    setTask({
      ...task,
      [name]: value
    })
  }

  const { mutate: UpdateTask } = useMutation({
    mutationFn: taskService.updateTask,
    onSuccess: () => {
      handleClose()
    },
    onError: () => {
    },
  });
  
  const Update = (data: TaskRaw) => {
    var payload = { ...data };

    UpdateTask({
      ...payload
    });
    handleClose();
  }


  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={style}>
        <Grid container spacing={1}>
          <Grid item xs={12} md={10}>
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
            </TextField  >
          </Grid>
          <Grid item xs={12} md={2}>
            <FormControl fullWidth>
              <InputLabel >Status</InputLabel>
              <Select
                id="status"
                name="status"
                value={task.status}
                label="Status"
                onChange={onChange}
              >
                <MenuItem value={TaskStatus.NotStarted}>Not Started</MenuItem>
                <MenuItem value={TaskStatus.InProgress}>In Progress</MenuItem>
                <MenuItem value={TaskStatus.Done}>Done</MenuItem>
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12} md={12}>
            <TextField
              name="description"
              label="Task"
              variant="outlined"
              sx={{ fontSize: "18px" }}
              onChange={onChange}
              value={task.description}
              fullWidth
              multiline
              rows={5}
            >
              {task?.description}
            </TextField  >
          </Grid>
          <Grid item xs={12} md={12}>
            <Stack direction={'row'}>
            <Button variant="contained" color="success" fullWidth onClick={() => Update(task)}>
              <Save />
            </Button>
            <Button variant="contained" color="error" fullWidth onClick={handleClose}>
              <Cancel />
            </Button>
            </Stack>
          </Grid>


        </Grid>

      </Box>
    </Modal>
  )
}

export default TaskDetails