import { DeleteOutline } from "@mui/icons-material"
import { Button, ImageList, ImageListItem } from "@mui/material"
import { useDispatch, useSelector } from "react-redux"
import { startDeletingImg } from "../../store/journal"


export const ImageGallery = ({ images }) => {

    const dispatch = useDispatch()

    const onImgDelete = ( id ) => {
        dispatch (startDeletingImg( id ) )
    }

  return (
    <ImageList 
        sx={{ width: '100%', height: 500 }} 
        cols={4} 
        rowHeight={200}
    >
        {
            images?.map((item) => (
                <ImageListItem key={item}>
                    <img
                        src={`${item}?w=164&h=164&fit=crop&auto=format`}
                        srcSet={`${item}?w=164&h=164&fit=crop&auto=format&dpr=2 2x`}
                        alt={item}
                        loading="lazy"
                    />
                    <Button
                        onClick={ () => onImgDelete( item ) }
                    >
                        <DeleteOutline />
                    </Button>
                </ImageListItem>
            ))
        }
    </ImageList>
  )
}


