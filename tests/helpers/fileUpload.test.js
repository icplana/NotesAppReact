import { v2 as cloudinary } from 'cloudinary'
import { fileUpload } from "../../src/helpers/fileUpload";

cloudinary.config({ 
    cloud_name: 'ddmirxvap', 
    api_key: '686357699528894', 
    api_secret: 'Non53gXGzLYzTFh12WBATzZTXgI',
    secure: true
  });

describe('Pruebas en fileUpload', () => {
    
    test('debe de subir el archivo correctamente a cloudinary', async () => {
        
        const imgUrl = 'https://images.unsplash.com/photo-1503023345310-bd7c1de61c7d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8aHVtYW58ZW58MHx8MHx8fDA%3D&w=1000&q=80'

        const resp = await fetch( imgUrl )
        const blob = await resp.blob()

        const file = new File([ blob ], 'foto.jpg' )

        const url = await fileUpload( file ) 


        expect( typeof url ).toBe('string')

        const segments = url.split('/')
        const imageId = segments[ segments.length -1 ].replace( '.jpg','' )
        

        await cloudinary.api.delete_resources([ 'journal/' + imageId ],{
            resource_type:'image'
        })


    });

    test('debe de retornar null ', async () => {
        const file = new File([], 'foto.jpg' )

        const url = await fileUpload( file ) 


        expect( url ).toBe( null )
    });
});