import { Proyecto } from "../../bd/proyecto";




export const editarProyecto = {
    template: `

    <div class="container justify-content-center mt-5">
      <form class="p-3 mt-5" id="formEditarUsuario" >
          <h1>Edicion del formulario</h1>
          <div class="mt-5">
            <label class="mt-3 form-label" for="nick">Nombre Proyecto </label>
            <input id="nombre3" type="text" class="form-control" />
    
            <label class="mt-3 form-label" for="apellidos">Descripcion </label>
            <input id="descripcion" type="text" class="form-control" />
  
            <label class="mt-3 form-label" for="contraseña">Enlace </label>
            <input id="enlaceEditar" type="text" class="form-control" />
          </div>
        </form>
        <div class="p-3">
            <button class="btn btn-success" id="guardarCambiosEditar">Guardar Cambios</button>
            <button class="btn btn-danger" id="cancelarCambios">Cancelar</button>
        </div>
    </div>
    
    `,
    script: async (id)=>{
  
        const proyecto = await Proyecto.getById(id)
        console.log(proyecto.nombre);
        document.querySelector("#nombre3").value = proyecto.nombre
        document.querySelector('#descripcion').value = proyecto.descripcion
        document.querySelector("#enlaceEditar").value = proyecto.enlace

        //Capturamos los eventos de guardar datos y cancelar
        document.querySelector('#guardarCambiosEditar').addEventListener("click", ()=>{
           proyecto.nombre = document.querySelector('#nombre3').value
           proyecto.descripcion = document.querySelector("#descripcion").value
           proyecto.enlace = document.querySelector('#enlaceEditar').value
           proyecto.update(proyecto)
           window.location.href = '/#/proyectos'
        })
        document.querySelector('#cancelarCambios').addEventListener("click", ()=>{
            console.log("Has pulsado sobre cancelar cambios")
        })

    }
}