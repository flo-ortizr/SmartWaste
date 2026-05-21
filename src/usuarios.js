export function registrarUsuario(username, password, listaDeUsuarios) {
  if (!username || username.trim() === "" || !password || password.trim() === "") {
    return "Por favor, complete los campos requeridos";
  }

  const usuarioExiste = listaDeUsuarios.some(u => u.username === username.trim());
  
  if (usuarioExiste) {
    return "Este usuario ya se encuentra registrado";
  }

  listaDeUsuarios.push({
    username: username.trim(),
    password: password
  });

  return "Usuario registrado correctamente";
}