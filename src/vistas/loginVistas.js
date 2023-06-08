import { Perfil } from "../bd/perfil"
import { supabase } from "../bd/supabase"
import { User } from "../bd/user"
import { menuSuperior } from "../componentes/menuSuperior"
import { menuUsuario } from "../componentes/menuUsuario"




export default {
    template: `
    <div
    class="vh-100 d-flex align-items-center justify-content-center"
    style="padding-top: 100px"
  >
    <div class="col-12 col-md-4">
        <h1 class="text-center p-2">Login</h1>
        <form id="login" class="p-3" novalidate>
            <label class="mt-3 form-label" for="email">Email</label>
            <input type="email" class="form-control" value="" id="email2" required />
            <div class="invalid-feedback">Debes introducir un email valido</div>
  
            <label class="mt-3 form-label" for="nick">Contraseña: </label>
            <input type="password" class="form-control" id="password2" value="" required />
            <div class="invalid-feedback">Esta no es una contraseña correcta</div>
  
            <button
                id="btn_submit"
                type="submit"
                class="mt-4 btn btn-success w-100"
            >
                Enviar
            </button>
            <p class="mt-3">
                <a href="">No recuerdo mi contraseña</a>
                <br />
                <a href="registro.html">Quiero Registrarme</a>
            </p>
            <p></p>
            <hr class="mt-5" />
  
            <button type="button" class="mt-1 btn btn-primary w-100">
                Login con Google
            </button>
        </form>
    </div>
  </div>
  
    `,
    script: () => {
        // script para validación de formulario
        const form = document.querySelector('#login')
        form.addEventListener('submit', async (event) => {
          event.preventDefault()
          event.stopPropagation()
          // Verificamos validación del formulario
          form.classList.add('was-validated')
          if (!form.checkValidity()) {
            console.log('formulario no valido')
          } else {
            // Si los datos validan
            try {
              // Capturamos datos del formulario
              const userData = {
                email: document.querySelector('#email2').value,
                password: document.querySelector('#password2').value
              }
   
              // Intentamos loguearnos utilizando el método login de nuestra clase User
              const usuarioLogeado = await User.login(userData)
              // Si nos logueamos con exito pintamos el email en header y menú de usuario 
              const divUsuarioLogeado = document.querySelector('#emailUsuarioLogueado')
              const userthisMoment = await User.getUser()
              //console.log(userthisMoment.id);
              
              //const perfilThisMoment = await Perfil.getByUserId(userthisMoment)
              const perfil = await Perfil.getByUserId(userthisMoment.id)
              
              
              console.log(perfil);
             
              
              
              // y ocultamos item 'login' para mostrar item 'logout'
              divUsuarioLogeado.innerHTML = usuarioLogeado.email
              menuUsuario.script(userthisMoment, perfil.rol)
              menuSuperior.script(perfil.rol)
              
              //* Cagamos la página home
              window.location.href = '/#/home'
             

            } catch (error) {
              Swal.fire('No se a podido Iniciar sesion con el usuario')
            }
          }
        })
      }
     
    
  }