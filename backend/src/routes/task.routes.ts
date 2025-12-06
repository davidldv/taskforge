import { Router } from 'express';
import {
  createTask,
  deleteTask,
  getTask,
  getTasks,
  updateTask
} from '../controllers/task.controller';
import authorize from '../middlewares/auth.middleware';

const taskRouter = Router();

taskRouter.use(authorize);

taskRouter.route('/')
  .post(createTask)
  .get(getTasks);

taskRouter.route('/:id')
  .get(getTask)
  .put(updateTask)
  .delete(deleteTask);

export default taskRouter;
