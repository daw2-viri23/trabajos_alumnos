import { createClient } from '@supabase/supabase-js'
//Creando la conexión con supabase
const supabaseUrl = 'https://jmwvqnyjvwnubrelzazo.supabase.co'
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imptd3ZxbnlqdndudWJyZWx6YXpvIiwicm9sZSI6ImFub24iLCJpYXQiOjE2NzcxNzY2MTUsImV4cCI6MTk5Mjc1MjYxNX0.dKXEepMube7kSrgAOGysb7-meGSLXUIs_1Cbuo_-Qfk'

//exportamos la conexión
export const supabase = createClient(supabaseUrl, supabaseKey)
