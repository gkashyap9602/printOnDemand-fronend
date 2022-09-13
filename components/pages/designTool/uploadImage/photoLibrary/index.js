import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Button, Typography, Grid } from '@material-ui/core'
import Image from 'next/image'
import Icon from 'icomoons/Icon'
import { addImageToCanvas, getLibraryImages, uploadImage } from 'redux/actions/designToolActions'
import SearchArea from 'components/searchArea'
import style from '../style'
import { v4 as uuidv4 } from 'uuid'
import { Box, CircularProgress } from '@material-ui/core'
const useStyles = style

const PhotoLibrary = ({ setModalClose, showLoader }) => {
  const classes = useStyles()
  const dispatch = useDispatch()
  const design = useSelector((state) => state.design)
  const [selected, setSelected] = useState('')
  const [photoLibraryImages, setPhotoLibraryImages] = useState([])
  const [loading, setLoading] = useState(false)
  // const [searchItem, setSearchItem] = useState('')
  useEffect(() => {
    setLoading(true)
    dispatch(getLibraryImages()).then((res) => {
      setLoading(false)
      if (res?.response?.libraryImages) {
        setPhotoLibraryImages(res?.response?.libraryImages.reverse())
      }
    })
  }, [])
  const handleApplyToCanvas = (img) => {
    let uploadedImage = {
      file: img.file,
      fileName: img.fileName
      // fromPhotoLibrary: img.fromPhotoLibrary
    }
    uploadedImage.libraryImageId = img.libraryImageId

    if (!design.uploadedImages.find((item) => item.guid === img.guid))
      dispatch(uploadImage({ guid: img.guid, ...uploadedImage }))
    let guidToBeChecked
    if (design.addons.image.find((item) => item.uuid === img.guid)) {
      guidToBeChecked = uuidv4()
    } else {
      guidToBeChecked = img.guid
    }
    dispatch(addImageToCanvas({ uuid: guidToBeChecked, ...uploadedImage }))

    setSelected('')
    setModalClose()
  }

  return (
    <>
      <div>
        <div className={classes.library_Search}>
          <div style={{ margin: '20px 0 20px 0' }}>
            <Typography variant='h4'>{`${
              design.uploadedImages.length + photoLibraryImages.length
            } image available`}</Typography>
          </div>
        </div>

        {/* <!--images--> */}
        <div className={classes.library_Scroll}>
          <div className={classes.library_Root}>
            <Typography variant='body2' className={classes.photoLib_Head}>
              {`Recently used files (${design.uploadedImages.length})`}
            </Typography>
            {design?.uploadedImages?.length > 0 && (
              <Grid container spacing={2} direction='row' className={classes.imageGrid}>
                {design.uploadedImages.map((image, index) => {
                  return (
                    <Grid item xs={6} sm={4} md={4} lg={4} xl={4} key={image.file}>
                      <div
                        className={classes.library_Image}
                        onClick={() => {
                          setSelected({
                            file: image.file,
                            fileName: image.fileName,
                            libraryImageId: image.libraryImageId,
                            guid: image.guid
                          })
                        }}
                      >
                        <Image
                          src={image.file}
                          alt='Photo Library'
                          width={219}
                          height={209}
                          objectFit='contain'
                        />
                        {image.file === selected.file && (
                          <div className={classes.selectedImage}>
                            <Icon icon='select-icon' size={22} />
                          </div>
                        )}
                      </div>
                    </Grid>
                  )
                })}
              </Grid>
            )}
          </div>
          <div className={classes.library_Root}>
            <Typography variant='body2' className={classes.photoLib_Head}>
              {`Files in library (${photoLibraryImages.length})`}
            </Typography>
            {loading && (
              <Box sx={{ display: 'flex' }}>
                <CircularProgress />
              </Box>
            )}
            {photoLibraryImages.length > 0 && (
              <Grid container spacing={2} direction='row' className={classes.imageGrid}>
                {photoLibraryImages.map((image, index) => {
                  return (
                    <Grid item xs={6} sm={4} md={4} lg={4} xl={4} key={image.imagePath}>
                      <div
                        className={classes.library_Image}
                        onClick={() => {
                          setSelected({
                            file: image.imagePath,
                            fileName: image.fileName,
                            // fromPhotoLibrary: true,
                            libraryImageId: image.imageId,
                            guid: image.guid
                          })
                        }}
                      >
                        <Image
                          src={image.imagePath}
                          alt='Photo Library'
                          width={219}
                          height={209}
                          objectFit='contain'
                          placeholder={'blur'}
                          blurDataURL={
                            'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAOEAAADhCAMAAAAJbSJIAAAAMFBMVEX09PTMzMzJycnPz8/d3d3V1dXi4uLo6Ojw8PDx8fH39/ft7e3Y2NjQ0NDp6enb29uHE20LAAACaklEQVR4nO3b6W6CQBhGYUTWD9T7v9uylLIN6jCk8Cbn+deEGo6DMOAYRQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAIJyFiuzshLesStJAdVZdufEV38LFydkZm6w+IrBJrK86itkxgU1ifnaKmz363QvUvsbjmoNYdjuXPPMQz6R7lfLsGKeq3bd76LvfHwnFIXt0tOKYwjuF51kVtjMUbzqFVmR1/cpK30idwv7qH98yz0SVwvI+XP19JygqhY9xehMnXokihfl0/hZ77a5I4WM2zXz5DKJI4XwKvjHLNGeGRmE1L7w7N7fKeRLSKCy+KGwCnedZjcJofruXuo7SbpwdiRqFlk4D42y9rf0eyOtEjcL5BzFeb2rV5oRApNAmj6QcjyRs8g4sE0UKJ4nxemJq8yGeJ6oURpY/uic26frppy0uJvNEmcI2JM/yovlz8cxlGbhIFCrcsA6cX0/kC52Bt3hMlC90Bk5HUbzQPYL9KA6b6BXmk8/YZuCYqFdYj/f47wL/EtUKrR6/LXsfOCSKFbaBQ+KnwGa79sqpVWjp7x1Ec6B+DhQsHAK7xM+BeoVjYLPzr499eoXTwO+IFfoHihXuWbWgVVh792kV7lt3IlRoe0ZQqvCLax+FZ8c4UUghheebFu6jU1gk++gU7l3t3f2rRmGAyxcGr329cuEh60stunBh2Z3y6yxM/wX52S1u/bf3Ryzzdq9tuIDnYWv1q7NTNlhy0O8t/Nb6/SfLbnHoYbpjSep/sjLfOZ0ZXfTXJKPgH69deAABAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABDyA0uAKIxQw0bjAAAAAElFTkSuQmCC'
                          }
                        />
                        {image.imagePath === selected.file && (
                          <div className={classes.selectedImage}>
                            <Icon icon='select-icon' size={22} />
                          </div>
                        )}
                      </div>
                    </Grid>
                  )
                })}
              </Grid>
            )}
          </div>
        </div>
        {/* <!--images--> */}

        <div className={classes.btnAddLibrary}>
          <Button
            className={classes.btnCancel}
            onClick={() => {
              setModalClose()
            }}
          >
            Cancel
          </Button>
          <Button
            className={classes.btnAddDesign}
            variant='contained'
            onClick={() => {
              handleApplyToCanvas(selected)
            }}
            disabled={selected ? false : true}
          >
            Add to design
          </Button>
        </div>
      </div>
    </>
  )
}

export default PhotoLibrary
