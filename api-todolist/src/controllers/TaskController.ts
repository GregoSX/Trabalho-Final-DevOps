import {
  GetTasksService,
  GetTaskByIdService,
  CreateTaskService,
  UpdateTaskService,
  DeleteTaskService,
  ToggleDoneTaskService,
} from '@/services/TaskService';
import { Router } from 'express';
import { taskSchema } from '@/models/Task';
import { AppError } from '@/errors/AppError';

const router = Router();

router.get('/', async (req, res) => {
  res.send(await GetTasksService());
});

router.get('/:id', async (req, res) => {
  res.send(await GetTaskByIdService(req.params.id));
});

router.post('/', async (req, res) => {
  const body = req.body;

  const validatedBody = taskSchema.safeParse(body);

  if (!validatedBody.success) {
    throw new AppError(validatedBody.error);
  }

  res.send(await CreateTaskService(validatedBody.data));
});

router.put('/:id', async (req, res) => {
  const body = req.body;

  const validatedBody = taskSchema.safeParse(body);

  if (!validatedBody.success) {
    throw new AppError(validatedBody.error);
  }

  res.send(await UpdateTaskService(req.params.id, validatedBody.data));
});

router.delete('/:id', async (req, res) => {
  res.send(await DeleteTaskService(req.params.id));
});

router.patch('/:id', async (req, res) => {
  res.send(await ToggleDoneTaskService(req.params.id));
});

export { router as TaskController };
