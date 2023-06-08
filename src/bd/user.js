// Importamos la conexión a la base de datos
import { supabase } from './supabase.js'

export class User {
  // Mapping de propiedades de la tabla perfiles
  constructor (id = null, email = null, password = null, rol=null) {
    this.id = id
    this.email = email
    this.password = password
    this.rol = rol
  }

  // crear registro (método static que se puede leer desde la clase sin necesidad de crear una instancia)
  static async create (userData) {
    const { data, error } = await supabase.auth.signUp(userData)

    if (error) {
      throw new Error(error.message)
    }
    console.log('usuario creado correctamente ', data)
    return new User(data.user.id, data.user.email)
  }

  // login
  static async login (userData) {
  // USER LOGIN
    const { data, error } = await supabase.auth.signInWithPassword(userData)
    if (error) {
      throw new Error(error.message)
    }
    return new User(data.user.id, data.user.email, data.user.rol)
  }

  // logout
  static async logout () {
    // USER LOGOUT
    let { error } = await supabase.auth.signOut()
    alert("Has hecho logout")
    if (error) {
      throw new Error(error.message)
    }
    return true
  }

  // leer user logeado
  static async getUser () {
    // GET USER
    const { data: { user } } = await supabase.auth.getUser()
    if (user) return new User(user.id, user.email)
  }

  // actualizar usuario (NO SE COMO USARLO DE MOMENTO)
  async update (nuevosDatos) {
    const { data, error } = await supabase.auth.updateUser({
      email: this.email,
      password: this.password
    })

    if (error) {
      throw new Error(error.message)
    }
  }

  

}