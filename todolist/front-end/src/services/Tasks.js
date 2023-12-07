import Api from "./Api";

const GetTasks = () => {
    return Api().get("/tasks");
};

const GetTask = (id) => {
    return Api().get(`/tasks/${id}`);
};

const CreateTask = (task) => {
    return Api().post("/tasks", task);
};

const UpdateTask = (id, task) => {
    return Api().put(`/tasks/${id}`, task);
};

const DeleteTask = (id) => {
    return Api().delete(`/tasks/${id}`);
};

export { GetTasks, GetTask, CreateTask, UpdateTask, DeleteTask };