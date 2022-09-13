import React, { useState, useEffect } from 'react'
import { Grid, Box, Button } from '@material-ui/core'
import { style } from 'styles/designerTool'
import clsx from 'clsx'
import Icon from 'icomoons/Icon'
import { TooltipBootstrap } from 'components/bootstrapTooltip'
import Image from 'next/image'
import JSZip from 'jszip'
import { saveAs } from 'file-saver'
import { useDispatch, useSelector } from 'react-redux'
const useStyles = style

const Preview = React.forwardRef((props, ref) => {
  const {
    showPreview,
    setShowPreview,
    showPreviewLoader,
    setShowPreviewLoader,
    previewImages,
    mode
  } = props
  const { sceneRef, canvasRef } = ref
  const design = useSelector((state) => state.design)
  const designModel = useSelector((state) => state.designModel)
  const classes = useStyles()
  const [selectedView, setSelectedView] = useState('front')
  const [selectedImage, setSelectedImage] = useState('')
  let unParsedDesignerJSON
  if (mode === 'create') {
    unParsedDesignerJSON = designModel?.productVariants?.find(
      (item) => item.isDefaultTemplate
    )?.designerJSON
  } else if (mode === 'edit' || mode === 'duplicate')
    unParsedDesignerJSON = designModel?.savedDesign?.designerJSON
  // const [designerJSON, setDesignerJSON] = useState({})
  let designerJSON
  if (unParsedDesignerJSON)
    designerJSON = mode === 'create' ? JSON.parse(unParsedDesignerJSON) : unParsedDesignerJSON

  useEffect(() => {
    setSelectedImage(previewImages.find((item) => item.key === selectedView).file)
  }, [selectedView, previewImages])

  const handleMockupDownload = () => {
    const zip = new JSZip()
    var img = zip.folder('images')

    for (let i = 0; i < previewImages.length; i++) {
      img.file(`${previewImages[i].key}.png`, previewImages[i].file, { base64: true })
    }
    zip.generateAsync({ type: 'blob' }).then(function (content) {
      // see FileSaver.js
      // window.open(content)
      saveAs(content, `${designModel.title} - Views.zip`)
    })
    // previewImages.forEach((item) => {
    //   window.open(item.file)
    // })
  }

  useEffect(() => {
    return () => {
      if (showPreview === true) {
        setShowPreview(!showPreview)
        setShowPreviewLoader(false)
        // if (
        //   designerJSON.mockupModel &&
        //   designerJSON.cameraViewPositions &&
        //   designerJSON.cameraTargetViewPositions
        // ) {
        //   sceneRef.current.removePreviewModel(
        //     canvasRef.current,
        //     design.fabricViewSelected,
        //     designerJSON
        //   )
        // }
      }
    }
  }, [])

  const handleClosePreview = () => {
    setShowPreview(!showPreview)
    setShowPreviewLoader(false)
    if (
      designerJSON.mockupModel &&
      designerJSON.cameraViewPositions &&
      designerJSON.cameraTargetViewPositions
    ) {
      sceneRef.current.removePreviewModel(
        canvasRef.current,
        design.fabricViewSelected,
        designerJSON
      )
    }
  }
  return (
    <>
      <Grid
        container
        direction='row'
        spacing={3}
        className={classes.rootPreview}
        // style={{ position: 'absolute' }}
      >
        <Grid item xs={12} sm={12} md={4} lg={4} xl={4} className={classes.sizeChartTop}></Grid>

        <Grid item xs={12} sm={8} md={4} lg={4} xl={4}>
          <Box
            display='flex'
            justifyContent='center'
            alignItems='center'
            className={classes.Image_Tabs}
          >
            {previewImages.map((item) => (
              <>
                <Box
                  key={item.key}
                  className={clsx(classes.avatarBlock, {
                    [classes.activeBlock]: selectedView === item.key
                  })}
                  mr={2}
                  onClick={() => {
                    setSelectedView(item.key)
                  }}
                >
                  <a className={classes.form_Link}>
                    <TooltipBootstrap title={item.key}>
                      <div className={classes.pdtViewImageTab}>
                        <Image
                          alt={item.key}
                          src={'data:image/png;base64,' + item.file}
                          width={'45px'}
                          height={'45px'}
                          objectFit='contain'
                        />
                      </div>
                    </TooltipBootstrap>
                  </a>
                </Box>
              </>
            ))}
          </Box>
        </Grid>
        <Grid item xs={12} sm={4} md={4} lg={4} xl={4}>
          <Box display='flex' width='100%' className={classes.btnPreview}>
            <Box mr={2}>
              <Button
                type='submit'
                variant='outlined'
                fullWidth
                startIcon={<Icon icon='pop-close' size={16} color='#babac9' />}
                onClick={handleClosePreview}
              >
                Close preview
              </Button>
            </Box>
          </Box>
        </Grid>
      </Grid>
      <Box
        style={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          marginBottom: '5rem'
        }}
      >
        <Image
          alt={selectedView}
          src={'data:image/png;base64,' + selectedImage}
          width={'400px'}
          height={'400px'}
          objectFit='contain'
          style={{ marginBottom: '1rem' }}
        />
        <Button
          variant='outlined'
          style={{ marginTop: '1rem' }}
          startIcon={<Icon icon='file_download' size={16} color='#babac9' />}
          onClick={handleMockupDownload}
        >
          Download mockups
        </Button>
      </Box>
    </>
  )
})

export default Preview
