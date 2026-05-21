export function registrarUsuario(username, password, listaDeUsuarios) {
  if (!username || username.trim() === "" || !password || password.trim() === "") {
    return "Por favor, complete los campos requeridos";
  }

  const usuarioExiste = listaDeUsuarios.some(u => u.username === username.trim());
  
  if (usuarioExiste) {
    return "Este usuario ya se encuentra registrado";
  }

  if (password.length < 8) {
    return "La contraseña debe tener al menos 8 caracteres";
  }

  listaDeUsuarios.push({
    username: username.trim(),
    password: password
  });

  return "Usuario registrado correctamente";
}

export function iniciarSesion(username, password, listaDeUsuarios) {
  if (!username || username.trim() === "" || !password || password.trim() === "") {
    return "Por favor, complete los campos requeridos";
  }

  const usuarioEncontrado = listaDeUsuarios.find(
    u => u.username === username && u.password === password
  );

  if (usuarioEncontrado) {
    return "Inicio de sesión exitoso";
  }

  return "Usuario o contraseña incorrectos";
}