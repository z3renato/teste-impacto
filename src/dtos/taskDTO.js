const validateTaskCreateDTO = (data) => {
  if (!data.title || typeof data.title !== 'string') {
    return { isValid: false, message: 'O título é obrigatório e deve ser uma string' };
  }
  if (!data.person_id || typeof data.person_id !== 'number') {
    return { isValid: false, message: 'O person_id é obrigatório e deve ser um número' };
  }
  return { isValid: true };
};

const validateTaskUpdateDTO = (data) => {
  if (data.title && typeof data.title !== 'string') {
    return { isValid: false, message: 'O título deve ser uma string' };
  }
  if (data.person_id && typeof data.person_id !== 'number') {
    return { isValid: false, message: 'O person_id deve ser um número' };
  }
  return { isValid: true };
};

module.exports = { validateTaskCreateDTO, validateTaskUpdateDTO };