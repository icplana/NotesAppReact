import { Grid, Typography } from "@mui/material"

// El layout sirve para que un fragmento de codigo comun en varias paginas no se repite y este centralizado para facilitar su mantenimiento
export const AuthLayout = ({ children, title = '' }) => {
  return (
    <Grid
      container
      spacing={ 0 }
      direction="column"
      alignItems="center"
      justifyContent="center"
      sx={{ minHeight: '100vh', backgroundColor: 'primary.main', padding:4 }}

    >
        <Grid item
            className= 'box-shadow'
            xs={ 3 }
            sx= {{
                width: { md: 450 }, 
                backgroundColor: 'white', 
                padding: 3, 
                borderRadius: 2 }}
        >
            <Typography variant="h5" sx={{ mb: 5 }}>
                { title }
            </Typography>


            { children }
        
        </Grid>

    </Grid>    

  )
}
