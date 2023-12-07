import { z } from 'zod';

const idSchema = z.string().uuid();

const taskSchema = z.object({
  title: z.string(),
  description: z.string(),
});

type Task = z.infer<typeof taskSchema>;

export { idSchema, taskSchema, Task as ITask };
