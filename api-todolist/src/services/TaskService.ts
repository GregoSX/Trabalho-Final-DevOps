import { HttpStatusCode } from '@/controllers/protocols';
import { prisma } from '@/database';
import { AppError } from '@/errors/AppError';
import { ITask } from '@/models/Task';

export const GetTasksService = async () => {
  return await prisma.task.findMany();
};

export const GetTaskByIdService = async (id: string) => {
  const task = await prisma.task.findUnique({
    where: { id },
  });

  if (!task) {
    throw new AppError('Task not found', HttpStatusCode.NOT_FOUND);
  }

  return task;
};

export const CreateTaskService = async (task: ITask) => {
  return await prisma.task.create({
    data: task,
  });
};

export const UpdateTaskService = async (id: string, task: ITask) => {
  const updatedTask = await prisma.task.update({
    where: { id },
    data: task,
  });

  if (!updatedTask) {
    throw new AppError('Task not found', HttpStatusCode.NOT_FOUND);
  }

  return updatedTask;
};

export const DeleteTaskService = async (id: string) => {
  const deletedTask = await prisma.task.delete({
    where: { id },
  });

  if (!deletedTask) {
    throw new AppError('Task not found', HttpStatusCode.NOT_FOUND);
  }

  return deletedTask;
};

export const ToggleDoneTaskService = async (id: string) => {
  const task = await prisma.task.findUnique({
    where: { id },
  });

  if (!task) {
    throw new AppError('Task not found', HttpStatusCode.NOT_FOUND);
  }

  const updatedTask = await prisma.task.update({
    where: { id },
    data: { done: !task.done },
  });

  return updatedTask;
};
