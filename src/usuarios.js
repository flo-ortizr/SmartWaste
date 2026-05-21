export function registrarUsuario(username, password, listaDeUsuarios) {
  listaDeUsuarios.push({
    username: username.trim(),
    password: password
  });

  return "Usuario registrado correctamente";
}