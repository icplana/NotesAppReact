 
 
 
 
 
 export const fileUpload = async ( file ) => {
    // if ( !file ) throw new Error( 'No hay ningún archivo seleccionado' )
    if ( !file ) return null

    const cloudUrl = 'https://api.cloudinary.com/v1_1/ddmirxvap/upload'

    const formData = new FormData()
    formData.append( 'upload_preset', 'journalApp-rect' )
    formData.append( 'file', file )
    


    try {
        
        const resp = await fetch ( cloudUrl, {
            method: 'POST',
            body: formData,
        })


        if ( !resp.ok ) throw new Error( 'No se pudo subir la imagen' )

        const cloudResp = await resp.json()

        return cloudResp.secure_url


    } catch (error) {
        return null
    }
 }