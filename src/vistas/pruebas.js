// cargamos libreira de supabase
import { createClient } from '@supabase/supabase-js'

export const pruebas = {
  template: `
        <h1>pruebas</h1>
    `,
  script: async () => {
    console.log('vista pruebas cargada')

    // Conexion con supabase

    const supabaseUrl = 'https://jmwvqnyjvwnubrelzazo.supabase.co'
    // const supabaseKey = process.env.SUPABASE_KEY
    const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imptd3ZxbnlqdndudWJyZWx6YXpvIiwicm9sZSI6ImFub24iLCJpYXQiOjE2NzcxNzY2MTUsImV4cCI6MTk5Mjc1MjYxNX0.dKXEepMube7kSrgAOGysb7-meGSLXUIs_1Cbuo_-Qfk'
    const supabase = createClient(supabaseUrl, supabaseKey)

    console.log('conexion a supabase = ', supabase)

    const leerTodosPerfiles = async () => {
      // READ ALL ROWS
      const { data: perfiles, error } = await supabase
        .from('perfiles')
        .select('*')

      console.log(perfiles)
    }

    const agregarPerfil = async () => {
      // INSERTAR NUEVO PERFIL
      const { data, error } = await supabase
        .from('perfiles')
        .insert([
          { nombre: 'ejemplo' }
        ])
    }

    // ProyectoDetalles a partir de funcion postgresSQL
    const leerProyectosDetalle = async () => {
      const { data, error } = await supabase
        .rpc('proyectodetalle')

      if (error) console.error(error)
      else console.log('Proyectos con Detalle: ', data)
    }

    const registro = async () => {
      // USER SIGNUP
      const { data, error } = await supabase.auth.signUp({
        email: 'joseluisviri6@gmail.com',
        password: '123456'
      })
    }

    const login = async () => {
      // USER LOGIN
      const { data, error } = await supabase.auth.signInWithPassword({
        email: 'joseluisviri6@gmail.com',
        password: '123456'
      })
    }
    const verUsuarioLogeado = async () => {
      // GET USER
      const { data: { user } } = await supabase.auth.getUser()
      return user
    }

    const logout = async () => {
      // USER LOGOUT
      const { error } = await supabase.auth.signOut()
    }
    // await registro()
    // 1.- miramos el usuario logeado
    console.log('esto es el usuario logeado ', await verUsuarioLogeado())

    // 2.-me logueo
    await login()
    console.log('esto es el usuario logeado ', await verUsuarioLogeado())
    await logout()
    console.log('esto es el usuario logeado ', await verUsuarioLogeado())
  }

}
