import { formEditarUsuario } from './formEditarUsuario'
import { User } from '../bd/user'
import { Perfil } from '../bd/perfil'
import { menuSuperior } from './menuSuperior'
import { menuUsuario } from './menuUsuario'

export const header = {
  template: `
  
<!-- Navbar  -->
<nav class="navbar navbar-expand-sm bg-light fixed-top">
  <div class="container-fluid">
    <a class="navbar-brand d-flex align-items-center" href="#/home">
      <img
        src="../assets/logo.svg"
        alt="Logo"
        width="30"
        height="30"
        class="d-inline-block align-text-top me-2"
      />
      <span class=""></span>
      Vanilla Games
    </a>
    
    <button
      class="navbar-toggler ms-auto
      "
      type="button"
      data-bs-toggle="collapse"
      data-bs-target="#navbarNavDropdown"
      aria-controls="navbarNavDropdown"
      aria-expanded="false"
      aria-label="Toggle navigation"
    >
    <span class="navbar-toggler-icon"></span>
    </button>
    <!-- Menú superior -->
    ${menuSuperior.template}
    <!-- Menu usuario -->
    ${menuUsuario.template}
  </div>
</nav>

//Modals
${formEditarUsuario.template}
  `,
  script: async () => {
    
    try {
      // Capturamos los datos del usuario logueado
      const usuarioLogueado = await User.getUser()
   
      const perfilLogueado = await Perfil.getByUserId(usuarioLogueado.id)
      console.log("El perfil logueado es" + perfilLogueado);
      if (perfilLogueado.rol != "anonimo") {
        console.log("Dentro de la funcion" + perfilLogueado.rol);
        
        const rol = perfilLogueado.rol
      
        // cargamos el menú superior y usuario para su rol
        menuSuperior.script(perfilLogueado.rol)
        menuUsuario.script(usuarioLogueado, rol)
    
        rol = "anonimo"
       
        menuSuperior.script(perfilLogueado.rol)
        menuUsuario.script(usuarioLogueado , rol)
      }

      

    } catch (error) {
      Swal.fire('Recuerda que para crear proyectos y demas, debes iniciar sesion o registrarte')
      
    }
  }
}