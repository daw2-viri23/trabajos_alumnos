import { User } from '../../bd/user'
import { Proyecto } from '../../bd/proyecto'
export default {
  template: `
  <div
  class="container d-flex mt-5 justify-content-center">
  <div class="col-12">
      <h1 class="text-center p-2">Nuevo Proyecto</h1>
      <form id="form_proyecto" class="p-3" novalidate>
          <label class="mt-3 form-label" for="nombre">Nombre: </label>
          <input
            id="nombre2" 
            type="text" 
            class="form-control" 
            value="" 
            placeholder ="Nombre del proyecto" 
            required 
          />
          <div class="invalid-feedback">El nombre no es correcto</div>

          <label class="mt-3 form-label" for="descripcion">Descripción: </label>
          <textarea 
            id="descripcion"
            class="form-control" 
            value="" 
            required 
            />
          </textarea>
          <div class="invalid-feedback">Este campo no es correcto</div>

          <label class="mt-3 form-label" for="enlace">Enlace a producción</label>
          <input
              id="enlace"
              type="enlace"
              class="form-control"
              value=""
              placeholder = "http://miproyecto.com"
              required
          />
          <div class="invalid-feedback">El link no es correcto</div>
          <button type="submit" class="mt-5 btn btn-success">
              Crear nuevo proyecto
          </button>
      </form>
  </div>
</div>
    `,
  script: () => {
    document.querySelector('#form_proyecto').addEventListener('submit', async function (e) {
      e.preventDefault()
      try {
        const user = await User.getUser()
        // Objeto con datos para proyecto
        const proyecto = {
          nombre: document.querySelector('#nombre2').value,
          descripcion: document.querySelector('#descripcion').value,
          enlace: document.querySelector('#enlace').value,
          user_id: user.id // Tomamos el id del usuario logueado
        }
        alert(proyecto.nombre)
        await Proyecto.create(proyecto)
        alert('Proyecto creado con éxito')
        // Cargamos la página login
        window.location.href = '/#/proyectos'
      } catch (error) {
        Swal.fire('No se a podido crear el proyecto')
      }
    })
  }
}
