import Agenda from '../models/Agenda.js';

export const getAllAgendas = async () => {
  try {
    const agendas = await Agenda.find({});
    return agendas;
  } catch (error) {
    throw new Error(`Erro ao buscar agendas: ${error.message}`);
  }
};

export const getAgendaById = async (id) => {
  try {
    const agenda = await Agenda.findById(id);
    if (!agenda) {
      throw new Error('Agenda não encontrada');
    }
    return agenda;
  } catch (error) {
    throw new Error(`Erro ao buscar agenda: ${error.message}`);
  }
};

export const createAgenda = async (data) => {
  try {
    const newAgenda = await Agenda.createAgenda(data);
    return newAgenda;
  } catch (error) {
    throw new Error(`Erro ao criar agenda: ${error.message}`);
  }
};

export const updateAgenda = async (id, data) => {
  try {
    const updatedAgenda = await Agenda.findByIdAndUpdate(id, data, {
      new: true,
      runValidators: true,
    });
    if (!updatedAgenda) {
      throw new Error('Agenda não encontrada para atualização');
    }
    return updatedAgenda;
  } catch (error) {
    throw new Error(`Erro ao atualizar agenda: ${error.message}`);
  }
};

export const deleteAgenda = async (id) => {
  try {
    const deletedAgenda = await Agenda.findByIdAndDelete(id);
    if (!deletedAgenda) {
      throw new Error('Agenda não encontrada para deletar');
    }
    return { message: 'Agenda deletada com sucesso', agenda: deletedAgenda };
  } catch (error) {
    throw new Error(`Erro ao deletar agenda: ${error.message}`);
  }
};
