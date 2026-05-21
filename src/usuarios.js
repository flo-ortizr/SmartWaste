export function registrarUsuario(username, password, listaDeUsuarios) {
  if (!username || username.trim() === "" || !password || password.trim() === "") {
    return "Por favor, complete los campos requeridos";
  }

  listaDeUsuarios.push({
    username: username.trim(),
    password: password
  });

  return "Usuario registrado correctamente";
}