import Task from '../models/Task.js';

export const getAllTasks = async () => {
  try {
    const tasks = await Task.find({});
    return tasks;
  } catch (error) {
    throw new Error(`Erro ao buscar tarefas: ${error.message}`);
  }
}
export const getTaskById = async (id) => {
  try {
    const task = await Task.findById(id);
    if (!task) {
      throw new Error('Tarefa não encontrada');
    }
    return task;
  } catch (error) {
    throw new Error(`Erro ao buscar tarefa: ${error.message}`);
  }
}

export const createTask = async ({ title, description, status, priority, dueDate, tags }) => {
  try {
    const newTask = new Task({ title, description, status, priority, dueDate, tags });
    newTask.dueDate = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000); 
    await newTask.save();
    return newTask;
  } catch (error) {
    throw new Error(`Erro ao criar tarefa: ${error.message}`);
  }
}

export const updateTask = async (id, updateData) => {
  try {
    const task = await Task.findByIdAndUpdate(id, updateData, {
      new: true, // retorna o documento atualizado
      runValidators: true, // valida os dados de acordo com o schema
    });
    if (!task) {
      throw new Error('Tarefa não encontrada para atualizar');
    }
    return task;
  } catch (error) {
    throw new Error(`Erro ao atualizar tarefa: ${error.message}`);
  }
}

export const deleteTask = async (id) => {
  try {
    const deletedTask = await Task.findByIdAndDelete(id);
    if (!deletedTask) {
      throw new Error('Tarefa não encontrada para deletar');
    }
    return { message: 'Tarefa deletada com sucesso', task: deletedTask };
  } catch (error) {
    throw new Error(`Erro ao deletar tarefa: ${error.message}`);
  }
};


export const getTasksByUser = async (userId) => {
  try {
    const tasks = await Task.find({ assignedTo: userId });
    return tasks;
  } catch (error) {
    throw new Error(`Erro ao buscar tarefas do usuário: ${error.message}`);
  }
}