import { BASE_URL } from "../../utils/constants";
import { ChangePassword, UserData } from "../../utils/types";


export const getUsers = async () => {
  const res = await fetch(`${BASE_URL}/user/profile`, {
    method: 'GET',
    credentials: 'include',
    headers: { 'Content-Type': 'application/json' },
  });
  handlerError(res, 'No se encontro el usuario.');
  return await res.json();
};

export const forgotPassword = async (email: string) => {
  const res = await fetch(`${BASE_URL}/user/forgot-password`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email }),
  });
  handlerError(res, 'No se pudo enviar el correo. Verifica tu email o intenta nuevamente.');
};


export const resetPassword = async (token: string, newPassword: string) => {
  const res = await fetch(`${BASE_URL}/user/reset-password`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ token, newPassword }),
  });
  handlerError(res, 'No se pudo cambiar la contraseña. Intenta nuevamente.');
};

export async function loginUser(email:string, password:string) {
  const res = await fetch(`${BASE_URL}/user/login`, {
    method: 'POST',
    credentials: 'include',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({user:{ email, password }}),
  });
  console.log('res', res);
  if(res.ok) return;
  if(res.status === 401){
    throw new Error('Email o contraseña incorrectos');
  }
  return res;
}

export async function updateUser(userData: UserData) {
  const res = await fetch(`${BASE_URL}/user/update`, {
    method: 'PUT',
    credentials: 'include',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({user:{ ...userData }}),
  });
  handlerError(res, 'Error al actualizar el usuario');
  return await res.json();
}

export async function changePassword( passwordData: ChangePassword) {
  const res = await fetch(`${BASE_URL}/user/changePassword`, {
    method: 'PUT',
    credentials: 'include',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({...passwordData}),
  });
  handlerError(res, 'Error al cambiar la contraseña');
  return res;
}

export const registerUser = async (userData: UserData) => {
  const endpoint = "user/create";
  const dataToSend = { user: { ...userData } };
  const res = await fetch(`${BASE_URL}/${endpoint}`, {
    method: "POST",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(dataToSend),
  });
  console.log('res', res);
  if(res.ok) return;
  if(res.status === 400){
    throw new Error('El email ya está en uso');
  }
  handlerError(res, 'Error al registrarse');
};

export const logoutUser = async () => {
  const res = await fetch(`${BASE_URL}/user/logout`, {
    method: 'GET',
    credentials: 'include',
    headers: { 'Content-Type': 'application/json' },
  });
  handlerError(res, 'Error al realizar logout');
}

export const all = async () => {
  const res = await fetch(`${BASE_URL}/user/all`, {
    method: 'GET',
    credentials: 'include',
    headers: { 'Content-Type': 'application/json' },
  });
  handlerError(res, 'Error al obtener los usuarios');
  return await res.json();
}

export const makeAdmin = async (email:string, isAdmin: boolean) => {
  const params = new URLSearchParams({
    email
});
  const res = await fetch(`${BASE_URL}/user/makeAdmin?${params}`, {
    method: 'PUT',
    credentials: 'include',
  });
  handlerError(res, isAdmin ? 'Error al hacer admin':'Error al quitar admin');
  return await res.json();
}

const handlerError = (res: Response, message: string) => {
  if(res.ok) return;
  if(res.status === 401){
    logoutUser();
    window.location.href = "/login";
  }
  else if(res.status === 403){
    throw new Error('No tienes permisos para realizar esta acción');
  } 
  else {
    throw new Error(message);
  }
}

