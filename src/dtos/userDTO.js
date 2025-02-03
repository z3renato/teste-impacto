const validateUserCreateDTO = (data) => {
  if (!data.name || typeof data.name !== 'string') {
    return { isValid: false, message: 'O nome é obrigatório e deve ser uma string' };
  }
  if (!data.email || !/\S+@\S+\.\S+/.test(data.email)) {
    return { isValid: false, message: 'O email é obrigatório e deve ser válido' };
  }

  if(!!data.is_admin)
    if(data.is_admin != 0 && data.is_admin != 1){
      return { isValid: false, message: 'O campo is_admin deve ser 0 ou 1 ' }
    }
  return { isValid: true };
};

const validateUserUpdateDTO = (data) => {
  if (data.name && typeof data.name !== 'string') {
    return { isValid: false, message: 'O nome deve ser uma string' };
  }
  if (data.email && !/\S+@\S+\.\S+/.test(data.email)) {
    return { isValid: false, message: 'O email deve ser válido' };
  }
  return { isValid: true };
};

module.exports = { validateUserCreateDTO, validateUserUpdateDTO };