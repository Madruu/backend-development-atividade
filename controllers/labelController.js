import Label from '../models/Label.js';

export const getAllLabels = async () => {
  try {
    const labels = await Label.find({});
    return labels;
  } catch (error) {
    throw new Error(`Erro ao buscar labels: ${error.message}`);
  }
};

export const getLabelById = async (id) => {
  try {
    const label = await Label.findById(id);
    if (!label) {
      throw new Error('Label não encontrada');
    }
    return label;
  } catch (error) {
    throw new Error(`Erro ao buscar label: ${error.message}`);
  }
};

export const createLabel = async (data) => {
  try {
    const newLabel = await Label.createLabel(data);
    return newLabel;
  } catch (error) {
    throw new Error(`Erro ao criar label: ${error.message}`);
  }
};

export const updateLabel = async (id, data) => {
  try {
    const updatedLabel = await Label.findByIdAndUpdate(id, data, {
      new: true,
      runValidators: true,
    });
    if (!updatedLabel) {
      throw new Error('Label não encontrada para atualização');
    }
    return updatedLabel;
  } catch (error) {
    throw new Error(`Erro ao atualizar label: ${error.message}`);
  }
};

export const deleteLabel = async (id) => {
  try {
    const deletedLabel = await Label.findByIdAndDelete(id);
    if (!deletedLabel) {
      throw new Error('Label não encontrada para deletar');
    }
    return { message: 'Label deletada com sucesso', label: deletedLabel };
  } catch (error) {
    throw new Error(`Erro ao deletar label: ${error.message}`);
  }
};
