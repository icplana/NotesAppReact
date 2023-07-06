import { Box, Divider, Drawer, List, Toolbar, Typography } from "@mui/material"
import { useSelector } from 'react-redux';
import { SideBarItem } from './SideBarItem';


export const SideBar = ({ drawerWidth = 240 }) => {

    const { displayName } = useSelector( state => state.auth )
    const { notes } = useSelector( state => state.journal )

  return (
    <Box
        component='nav'
        sx={{ 
            width: { sm: drawerWidth }, 
            flexShrink: { sm: 0 }
        }}
    >
        <Drawer
            variant="permanent" //temporary en caso de ocultarlo de manera condicional
            open= { true } //recordemos que aqui valdria con poner open, sin ninguna igualdad, la sintaxis de react indica que "open" = "open = { true }" (aplicable con cualquier propiedad) 
            sx={{ 
                display: { xs: 'block' },
                '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth } // esta linea, indica que crea añade la clase MuiDrawer-paper al elemento y que esta tiene las propiedades descritas.

             }}
        >
            <Toolbar>
                <Typography
                    variant="h6"
                    noWrap
                    component="div"
                >
                    { displayName }
                </Typography>
            </Toolbar>
            <Divider />

            <List>
                {
                    notes.map( note =>(
                       <SideBarItem { ...note } key = { note.id } />
                    ))
                }
            </List>
        </Drawer>
    </Box>
  )
}
