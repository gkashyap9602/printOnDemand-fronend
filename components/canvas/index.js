import React, { useState, useRef, useEffect, useCallback } from 'react'
import { fabric } from 'fabric'
import { svgModelConstants } from 'constants/svgModelConstants'
import LoadScene from './scene.js'
import * as THREE from 'three'
import { useRouter } from 'next/router'
import { generateMockupImages } from './utilFunctions.js'

import {
  updateAddOnsList,
  updateSelectedAddOn,
  changeSelectedAddOn,
  updateSelectedObjectPosition,
  updateProduct,
  deleteLayer,
  clearEntireState,
  changeImageDimensions,
  addImageInitialDimensions,
  addInitialDesign,
  getLibraryImages,
  saveSelectedProductSizes,
  storeDefaultDesignerJSON
} from 'redux/actions/designToolActions.js'
import {
  addModelConfig,
  getProductDesignDetails,
  getProductLibraryDesignDetails
} from 'redux/actions/designModelActions'
import { useDispatch, useSelector } from 'react-redux'
import { usePrevious } from '../../utils/hooks'
import { registerCanvasEvents, unregisterCanvasEvents, removeClonedImagesAndUpdate } from './events.js'
import { addText, changeTextParameters } from './textEvents.js'
import { changeColor, changeColorForProduct } from './applyColor.js'
import { addControlButtons } from './additionalControls.js'
import { makeGreyScaleImage, cropAndAddImageToScene } from './clipImage.js'
import { NotificationManager } from 'react-notifications'
import { addEditProductToCanvas } from './addEditProduct.js'
import {  parseJSON } from '../../utils/helpers'
import { v4 as uuidv4 } from 'uuid'


const DCanvas = React.forwardRef((props, ref) => {

  const finalSizeList = {

    "XS": 58.0066666667,
    "S": 58,
    "M": 58.0066666667,
    "L": 58.0066666667,
    "XL": 58.0066666667,
    "XXL": 58.0066666667
  }

  const {
    canvasId,
    className,
    design,
    showLoader,
    setToggleImageUploadModal,
    productId,
    productVariantId,
    productLibraryId,
    productLibraryVariantId,
    mode,
    showPreview,
    setPreviewImages,
    duplicateProductDetails,
    showProgressLoader
  } = props;
  const { canvasRef,
    sceneRef, progressRef } = ref
  let canvas
  let svgModels

  const dispatch = useDispatch()

  const prevValue = usePrevious(design)
  const designModel = useSelector((state) => state.designModel)
  let unParsedDesignerJSON
  if (mode === 'create') {
    unParsedDesignerJSON = designModel?.productVariants?.find(
      (item) => item.isDefaultTemplate
    )?.designerJSON
  } else if (mode === 'edit' || mode === 'duplicate')
    unParsedDesignerJSON = designModel?.savedDesign?.designerJSON
  let designerJSON
  if (unParsedDesignerJSON)
    designerJSON = mode === 'create' ? JSON.parse(unParsedDesignerJSON) : unParsedDesignerJSON
  const designerJSONArray = []
  const [initCanvasDone, setInitCanvasDone] = useState(false)
  const [photoLibraryImages, setPhotoLibraryImages] = useState([])
  const product = useSelector((state) => state.product.product_details?.response)
  const userDetails = useSelector((state) => state.user.userDetails)

  const finalPrintFileDimensions = {}
  useEffect(() => {
    if ((prevValue?.addons?.text?.length !== design?.addons?.text?.length) && (prevValue?.addons?.text?.length < design?.addons?.text?.length)) {
      let textToadd = design.addons.text[design.addons.text.length - 1]
      addText(textToadd, canvasRef, findCanvasParameters, design, svgPathRef?.current)
    }

    if ((prevValue?.addons?.image?.length !== design?.addons?.image?.length) && (prevValue?.addons?.image?.length < design?.addons?.image?.length)) {
      let imageToAdd = design.addons.image[design.addons.image.length - 1]
      addImage(imageToAdd)
    }

    if ((prevValue?.addons?.text?.length > design?.addons?.text?.length)) {

      removeObjectFromLayer()
    }

    if ((prevValue?.addons?.image?.length > design?.addons?.image?.length)) {

      removeObjectFromLayer()
    }

    if (prevValue?.fabricViewSelected !== design?.fabricViewSelected) {

      changeFabricSVG(design.fabricViewSelected)
    }

    if (
      !design.fabricEntireProduct.applyToAll &&
      prevValue?.fabricViewColor != design?.fabricViewColor
    ) {
      changeColor(
        design.fabricViewColor[design.fabricViewSelected],
        canvasRef,
        design.fabricViewSelected
      )
    }

    if (prevValue?.fabricEntireProduct !== design?.fabricEntireProduct) {
      if (design.fabricEntireProduct.applyToAll) {
        changeColorForProduct(
          design.fabricEntireProduct.color,
          canvasRef,
          changeFabricSVG,
          design.fabricViewSelected,
          sceneRef
        )
      }
    }
  }, [
    design.addons,
    design.fabricViewList,
    design.fabricViewSelected,
    design.fabricViewColor,
    design.fabricEntireProduct
  ])

  useEffect(() => {

    let action
    if (design.cropStatus === "inprogress") {
      action = "begin"
    } else if (design.cropStatus === "apply") {
      action = "clip"
    } else {
      action = "cancel"
    }
    clipImageUsingRect(action)

  }, [design.cropStatus])

  useEffect(() => {

    alignObject(design.selectedObjectPosition)
    dispatch(updateSelectedObjectPosition(""))
  }, [design.selectedObjectPosition])

  useEffect(() => {
    if (prevValue?.selectedAddOn !== design?.selectedAddOn) {

      if (design.selectedAddOn.uuid && prevValue?.selectedAddOn?.uuid !== design?.selectedAddOn?.uuid) {

        if (!design?.selectedAddOn?.locked) {
          selectObjectFromCanvas(design?.selectedAddOn?.uuid)
        } else {
          discardCanvasActiveObject()
        }

      }
      let addonFromList
      let imageAddonFromList
      if (Object.keys(design.selectedAddOn).includes('text')) {
        addonFromList = design?.addons?.text.find((item) => {
          return item.uuid === design.selectedAddOn.uuid
        })
      }

      if (Object.keys(design.selectedAddOn).includes("file")) {
        imageAddonFromList = design?.addons?.image.find((item) => {
          return item.uuid === design.selectedAddOn.uuid
        })
      }
      if (Object.keys(design.selectedAddOn).length !== 0) {
        if (design.selectedAddOn.fontSize !== addonFromList?.fontSize) {
          changeTextParameters(
            design.selectedAddOn.fontSize,
            'fontSize',
            design.selectedAddOn,
            canvasRef,
            dispatch
          )
        }

        if (design.selectedAddOn.textFont !== addonFromList?.textFont) {
          changeTextParameters(
            design.selectedAddOn.textFont,
            'fontFamily',
            design.selectedAddOn,
            canvasRef,
            dispatch
          )
        }

        if (design.selectedAddOn.textColor !== addonFromList?.textColor) {
          changeTextParameters(
            design.selectedAddOn.textColor,
            'fill',
            design.selectedAddOn,
            canvasRef,
            dispatch
          )
        }

        if (design.selectedAddOn.text !== addonFromList?.text) {
          changeTextParameters(
            design.selectedAddOn.text,
            'text',
            design.selectedAddOn,
            canvasRef,
            dispatch
          )
        }

        if (design.selectedAddOn.patternApplied && (design.selectedAddOn.patternType !== imageAddonFromList?.patternType || design.selectedAddOn.patternSpacing !== imageAddonFromList?.patternSpacing)) {

          const patternSpacing = design.selectedAddOn.patternSpacing >= 0 ? design.selectedAddOn.patternSpacing : 4
          addPatterns(patternSpacing, undefined, design.selectedAddOn.patternType, canvasRef.current, design.fabricViewSelected, design.selectedAddOn, design.layers)
        } else {
          if (!design.selectedAddOn.patternApplied && design.selectedAddOn.patternType === "none") {
            removePattern(design.selectedAddOn)
          }
        }
      } else {
        discardCanvasActiveObject()
      }
    }
  }, [design])


  useEffect(() => {

    const selectedAddonFromLayers = design?.layers[design.fabricViewSelected]?.find(item => {

      return item.uuid === design?.selectedAddOn?.uuid
    })

    canvasRef.current.layers = design.layers
    if (selectedAddonFromLayers?.locked !== design?.selectedAddOn?.locked) {
      lockObject(selectedAddonFromLayers.uuid, selectedAddonFromLayers?.locked, design?.selectedAddOn)
    } else {
      rearrangeObjects(design.layers, design.fabricViewSelected, prevValue)
    }

  }, [design.layers])
  let svgType
  let groupArray = {}
  let activeGroup
  let initialRender
  const svgPathRef = useRef([])
  let svgPath = []

  let clonedImageList = {}
  let left
  let svgWidth
  let top
  let svgHeight
  let ctx
  let selectedObject
  let outlineForSvg = []
  let loadScene
  let addedObjectCount = {}
  let scaleMultiplier
  let startRendering = true
  let finalPrintableImageList = {}

  let modelRendered = false
  let DTGRendered = false
  let canvasRendered = false

  fabric.perfLimitSizeTotal = 16777216
  fabric.Object.prototype.lockScalingFlip = true
  fabric.Object.NUM_FRACTION_DIGITS = 30
  const initCanvas = (baseURL, designerJSON, designModel, designDetails) => {
    let viewWidth = document.getElementById('2DCanvas')?.offsetWidth
    let viewHeight = document.getElementById('2DCanvas')?.offsetHeight
    if (canvasId === '2DCanvas') {

      canvas = new fabric.Canvas('2DCanvas', {
        backgroundColor: '#f4f4f4',
        perPixelTargetFind: true,
        selection: false,
        renderOnAddRemove: true
      })
      svgModels = designerJSON
      canvas.currentSize = svgModels?.size
      canvasRef.current = canvas
      svgModels.transparentPrint ? canvas.transparentPrint = true : canvas.transparentPrint = false
      svgType = svgModels.default
      ctx = canvas.getContext('2D')
      loadScene = new LoadScene(canvas, showLoader)
      sceneRef.current = loadScene
      canvas.renderAll()
      canvas.setDimensions({ width: viewWidth, height: viewHeight })
      canvas.calcOffset()
      if (designModel.objects?.find(item => {
        return item.clonedImage === true
      })) {
        startRendering = false
      }
      loadScene.preLoadTextures(true, baseURL + '/' + designerJSON.modelPath, designerJSON, renderOnceAfterLoadingCanvas, mode, baseURL)
      if (mode === "edit" || mode === 'duplicate') {
        const type = svgModels.types
        const savedCanvasWidth = designModel.objects.find(item => {
          return item.currentCanvasWidth
        })

        const savedWidth = savedCanvasWidth ? savedCanvasWidth.currentCanvasWidth : 512
        scaleMultiplier = document.getElementById('2DCanvas')?.offsetWidth / savedWidth
        const clipPathMultiplier = document.getElementById('2DCanvas')?.offsetWidth / 512
        for (let keys in type) {
          fabric.loadSVGFromURL(baseURL + "/" + type[keys], function (objects) {
            const group = new fabric.util.groupSVGElements(objects)
            group.scaleX = group.scaleX * clipPathMultiplier
            group.scaleY = group.scaleY * clipPathMultiplier
            group.left = group.left * clipPathMultiplier
            group.top = group.top * clipPathMultiplier
            group.setCoords()
            svgPath[keys] = new fabric.Path(group.d, { objectCaching: false })
            svgPath[keys].absolutePositioned = true
            svgPath[keys].scaleX = svgPath[keys].scaleX * clipPathMultiplier
            svgPath[keys].scaleY = svgPath[keys].scaleY * clipPathMultiplier
            svgPath[keys].left = svgPath[keys].left * clipPathMultiplier
            svgPath[keys].top = svgPath[keys].top * clipPathMultiplier
            svgPath[keys].setCoords()
            svgPathRef.current = svgPath
            groupArray[keys] = group

            if (keys === Object.keys(type)[Object.keys(type).length - 1]) {

              addEditProductToCanvas(designModel, canvas, designDetails, addPatterns, () => {

                activeGroup = canvas._objects.find(item => {

                  return item.name === svgType
                })
                renderOnceAfterLoadingCanvas('canvas')
                canvas.layers = designDetails.layers
              }, showLoader, scaleMultiplier)
            }
          })

        }


        design = designDetails
        registerCanvasEvents({
          canvasRef,
          design,
          dispatch,
          loadScene,
          initCanvas,
          initialRender,
          svgPath,
          svgModels,
          svgType,
          selectedObject,
          drawOutlineForSVG,
          addPatterns
        })
        findCanvasParameters(canvas, svgType)
      } else {
        scaleMultiplier = document.getElementById('2DCanvas')?.offsetWidth / 512
        changeSVGType(undefined, undefined, baseURL)
        findCanvasParameters()
      }

      addControlButtons(fabric, rotateObject, removeObject, baseURL)
      for (const key in svgModels.types) {
        addedObjectCount[key] = 1
      }

      canvas.on('after:render', () => {
        if (loadScene.model) {
          if (initialRender) {
         

            canvas._objects.forEach((child) => {
              if (child.svgType !== svgType && child.svg === true) {
                child.visible = false
              }
              if (child.svgType === svgType && child.name?.includes('safeZone')) {
                child.visible = true
              }

              if (child.clipImageParentUuid) {
                child.visible = false
              }
            })
            initialRender = false

            canvas.renderAll()
            setInitCanvasDone(true)
          }
          const child = loadScene.model.children.find((item) => {
            return item.name === svgType
          })

          if (child?.userData.initialColor) {
            child.material.color = new THREE.Color(0xffffff)
            child.userData.initialColor = false
          }

          if (
            canvas._objects.find((item) => {
              return item.name === svgType
            })?.visible
          ) {
            child?.material?.map?.needsUpdate = true
            child?.material?.needsUpdate = true
            loadScene.renderer.render(loadScene.scene, loadScene.camera)
          }
          const fringes = loadScene?.model?.children.find(item => {
            return item.name === "fringes"
          })
          if (fringes) {
            fringes.material?.map?.needsUpdate = true
            fringes.material?.needsUpdate = true
          }
        }
      })
    }
  }

  const applyColor = (imgColor) => {

    changeColorForProduct(imgColor, canvasRef, changeFabricSVG, svgType, sceneRef)
  }

  const startRenderingCanvasOnModel = () => {

    if ((mode === "edit" || mode === 'duplicate') && startRendering) {

      canvas._objects.forEach(child => {

        if (!child.name?.includes("safeZone") && !child.guideLine) {
          child.visible = true
        }
        if (child.clipImageParentUuid) {
          child.visible = false
        }
        if (child.name?.includes("safeZone") && child.svgType === svgType) {
          child.visible = true
        }

      })
      canvas.renderAll()
      for (let key in svgModels.types) {
        const meshToRender = loadScene?.model?.children.find(item => {
          return item.name === key
        })
        meshToRender?.material?.map.needsUpdate = true
        meshToRender?.material.needsUpdate = true
        loadScene.renderer.render(loadScene.scene, loadScene.camera)
      }

      const fringes = loadScene?.model?.children.find(item => {
        return item.name === "fringes"
      })
      if (fringes) {
        fringes.material?.map?.needsUpdate = true
        fringes.material?.needsUpdate = true
      }

      canvas._objects.forEach(child => {

        if (child.svgType !== svgModels.default) {
          child.visible = false
        }
      })
      canvas.renderAll()
      showLoader(false)
    }
  }

  const renderOnceAfterLoadingCanvas = (renderingObject) => {

    if (renderingObject === 'canvas') {
      canvasRendered = true
    } else if (renderingObject === "3DModel") {
      modelRendered = true
    } else if (renderingObject === "DTGCanvas") {
      DTGRendered = true
    }
    if (modelRendered && canvasRendered) {

      startRenderingCanvasOnModel()
    }
    if (modelRendered && DTGRendered) {

      startRenderingDTGCanvasOnModel()
    }

  }

  const startRenderingDTGCanvasOnModel = () => {
    canvas._objects.forEach(child => {

      if (!child.name?.includes("safeZone") && !child.guideLine) {
        child.visible = true
      }

      if (child.name?.includes("safeZone") && child.svgType === svgType) {
        child.visible = true
      }

    })
    canvas.renderAll()
    for (let key in svgModels.types) {
      const meshToRender = loadScene?.model?.children.find(item => {
        return item.name === key
      })
      meshToRender?.material?.map.needsUpdate = true
      meshToRender?.material.needsUpdate = true
      loadScene.renderer.render(loadScene.scene, loadScene.camera)
    }

    canvas._objects.forEach(child => {

      if (child.svgType !== svgModels.default) {
        child.visible = false
      }
    })
    canvas.renderAll()
    showLoader(false)
  }

  const createImageAndDownload = () => {

    loadScene.camera.position.set(-0.011000705983045363, 0.238886514695248, 0.5036606735756968)
    loadScene.camera.lookAt(0.004505052483088059, 0.1937609792532919, -0.002167252369677826)
    loadScene.renderer.render(loadScene.scene, loadScene.camera)
    const image = loadScene.renderer.domElement.toDataURL("image/png")
    const aTag = document.createElement('a')
    aTag.href = image
    aTag.download = "renderedImage.png"
    aTag.click()
  }

  const clipImageUsingRect = useCallback((action) => {

    let imageToClip
    if (action === "begin") {
      if (canvas.getActiveObject()) {
        imageToClip = canvas.getActiveObject()
      }

      const parentCroppedImage = canvas.getObjects().find(item => {
        return item.clipImageParentUuid === imageToClip.uuid
      })
      if (parentCroppedImage) {
        const parentCroppedImageScaleValues = { x: parentCroppedImage.scaleX, y: parentCroppedImage.scaleY }

        parentCroppedImage.uuid = parentCroppedImage.clipImageParentUuid
        parentCroppedImage.visible = true

        parentCroppedImage.scaleX = imageToClip.scaleX
        parentCroppedImage.scaleY = imageToClip.scaleY

        const finalRotationAngle = imageToClip.angle
        imageToClip.setCoords()
        const finalCroppedImagePosition = { x: imageToClip.left, y: imageToClip.top }
        parentCroppedImage.rotate(0)
        imageToClip.rotate(0)


        parentCroppedImage.rotate(imageToClip.angle)
        canvas.renderAll()
        imageToClip.setCoords()
        parentCroppedImage.left = imageToClip.oCoords.tl.x - (parentCroppedImage.clipDiff.leftDiff * imageToClip.scaleX / parentCroppedImageScaleValues.x)
        parentCroppedImage.top = imageToClip.oCoords.tl.y - (parentCroppedImage.clipDiff.topDiff * imageToClip.scaleY / parentCroppedImageScaleValues.y)
        parentCroppedImage.setCoords()

        const group = new fabric.Group()
        canvas.add(group)
        group.add(imageToClip)
        group.add(parentCroppedImage)
        canvas.remove(imageToClip)
        canvas.remove(parentCroppedImage)
        imageToClip.left = 0
        imageToClip.top = 0
        parentCroppedImage.left = - (parentCroppedImage.clipDiff.leftDiff * imageToClip.scaleX / parentCroppedImageScaleValues.x)
        parentCroppedImage.top = - (parentCroppedImage.clipDiff.topDiff * imageToClip.scaleY / parentCroppedImageScaleValues.y)
        group.rotate(finalRotationAngle)
        group.left = finalCroppedImagePosition.x
        group.top = finalCroppedImagePosition.y
        group._restoreObjectsState()
        canvas.remove(group)
        canvas.add(imageToClip)
        canvas.add(parentCroppedImage)

      }
      const rectToClipWith = new fabric.Rect()
      rectToClipWith.setControlsVisibility({ mtr: false, rotate90Controls: false, rotateNegative90Controls: false, resetControls: false })
      rectToClipWith.imageUuid = imageToClip.uuid
      rectToClipWith.imageClipHelper = true
    if (imageToClip.angle === 0) {
        rectToClipWith.left = Math.max(activeGroup.getBoundingRect().left, imageToClip.getBoundingRect().left)
        rectToClipWith.top = Math.max(activeGroup.getBoundingRect().top, imageToClip.getBoundingRect().top)
        rectToClipWith.width = Math.min(activeGroup.getBoundingRect().width, imageToClip.getBoundingRect().width)
        rectToClipWith.height = Math.min(activeGroup.getBoundingRect().height, imageToClip.getBoundingRect().height)
      } else {

        rectToClipWith.width = imageToClip.width * imageToClip.scaleX
        rectToClipWith.height = imageToClip.height * imageToClip.scaleY
        rectToClipWith.rotate(imageToClip.angle)
        rectToClipWith.left = imageToClip.left
        rectToClipWith.top = imageToClip.top
      }
      rectToClipWith.opacity = 0.01
      rectToClipWith.fill = "#ffffff"
      rectToClipWith.clippingRetangle = true


      if (parentCroppedImage) {
        imageToClip.previousClipImage = true
        imageToClip.visible = false
        canvas.remove(imageToClip)
        canvas.renderAll()
      }
      if (parentCroppedImage?.uuid) {
        dispatch(changeSelectedAddOn(parentCroppedImage.uuid))
      }

      canvas.add(rectToClipWith)
      canvas.setActiveObject(rectToClipWith)
      makeGreyScaleImage(canvas, svgType, rectToClipWith, svgPathRef.current)
    } else if (action === "clip") {

      cropAndAddImageToScene(canvas, svgType)
    } else if (action === "cancel") {

      if (!canvas) {
        return
      }

      if (!canvas.clippingStarted) {
        return
      }
      const rectToClip = canvas._objects.find(item => {
        return item.clippingRetangle
      })
      const parentImageAdded = canvas._objects.find(item => {
        return item.uuid === rectToClip.imageUuid
      })
      parentImageAdded.clipImageParentUuid = null
      parentImageAdded.clipDiff = null
      const imageClipHelper = canvas._objects.filter(item => {
        return item.imageClipHelper
      });
      [...imageClipHelper].forEach(child => {
        canvas.remove(child)
      })
      canvas.setActiveObject(parentImageAdded)
      canvas.renderAll()
      canvas.clippingStarted = false
    }
  }, [canvas])

  const selectObjectFromCanvas = useCallback((objectUuid) => {

    if (!canvas) {
      return
    }
    const objectToSelect = canvas?._objects.find(item => {

      return item.uuid === objectUuid
    })
    if (objectToSelect) {

      if (!objectToSelect.clonedImage || objectToSelect.parentImageUuid !== canvas.getActiveObject()?.parentImageUuid) {
        canvas.setActiveObject(objectToSelect)
      }

    }
    canvas.renderAll()
  }, [canvas])

  const drawOutlineForSVG = (canvas, selectedView) => {
    if (!canvas) {
      return
    }

    if (left === undefined) {
      ;[left, top, svgWidth, svgHeight] = findCanvasParameters(canvas, selectedView)
    }
    const verticalLine = new fabric.Line(
      [left + svgWidth / 2, top, left + svgWidth / 2, top + svgHeight],
      {
        strokeDashArray: [2, 2],
        stroke: '#34c7bd',
        selectable: false
      }
    )

    const horizontalLine = new fabric.Line(
      [left, top + svgHeight / 2, left + svgWidth, top + svgHeight / 2],
      {
        strokeDashArray: [2, 2],
        stroke: '#34c7bd',
        selectable: false
      }
    )
    verticalLine.guideLine = true
    horizontalLine.guideLine = true
    outlineForSvg.push(verticalLine, horizontalLine)
    canvas.add(verticalLine)
    canvas.add(horizontalLine)
    verticalLine.visible = false
    horizontalLine.visible = false
    horizontalLine.invisibleOnModel = true
    verticalLine.invisibleOnModel = true
    return outlineForSvg
  }

  const discardCanvasActiveObject = useCallback(() => {
    if (!canvas) {
      return
    }
    if (canvas.getActiveObject()?.clippingRetangle) {
      return
    }
    canvas.discardActiveObject()
    canvas.renderAll()
  }, [canvas])

  const changePatternParameter = (pattern, property, value) => {
    pattern._objects.forEach((child) => {
      child.set('dirty', true)
      child[property] = value
    })
  }

  const adjustSpacingForPatterns = (pattern, spacing) => {
    let patternLines = pattern._objects
    let linePosition = left + svgWidth / 2 + spacing / 2

    for (let i = patternLines.length / 2; i < patternLines.length; i++) {
      patternLines[i].left = linePosition
      patternLines[i].set('dirty', true)
      linePosition += patternLines[i].getBoundingRect().width + spacing
    }
    linePosition = left + svgWidth / 2 - spacing / 2
    canvas.renderAll()
  }

  const lockObject = useCallback((objectUuid, value, selectedAddon) => {

    if (!canvas) {
      return
    }
    const objectToLock = canvas._objects.find(item => {

      return item.uuid === objectUuid
    })

    if (value) {
      canvas.discardActiveObject()
      dispatch(updateSelectedAddOn({}))
    } else {
      if (objectToLock) {
        canvas.setActiveObject(objectToLock)
      }

    }
    if (selectedAddon.text) {
      selectedAddon.locked = value
      dispatch(updateAddOnsList("text", selectedAddon))
    } else {
      selectedAddon.locked = value
      dispatch(updateAddOnsList("image", selectedAddon))
    }

    objectToLock?.selectable = !value

    if (objectToLock?.clonedImage) {

      canvas._objects.forEach(child => {

        if (child.svgType === objectToLock.svgType && child.parentImageUuid === objectToLock.parentImageUuid && child !== objectToLock) {
          child.locked = value
          child.selectable = !value
        }
      })
    }
    canvas.renderAll()
  }, [canvas])

  const removeObjectFromLayer = useCallback(() => {

    if (!canvas) {
      return
    }

    const objectToRemove = canvas.getActiveObject()
    if (objectToRemove) {

      if (objectToRemove.clonedImage) {

        ;[...canvas._objects].forEach((child) => {
          if (child.svgType === svgType && child.clonedImage && child !== objectToRemove && child.parentImageUuid === objectToRemove.uuid) {
            canvas.remove(child)
          }
        })
      }
 
      canvas.remove(objectToRemove)

      canvas.renderAll()
    }
  }, [canvas])

  const removeObject = (eventData, transform) => {
    let object = transform.target
    if (object.clonedImage) {
      ;[...canvas._objects].forEach((child) => {
        if (child.svgType === svgType && child.clonedImage && child !== object && child.parentImageUuid === object.uuid) {
          canvas.remove(child)
        }
      })
    }
    const type = object?.text ? "text" : "image"
    dispatch(deleteLayer(object.uuid, type))
    canvas.remove(object)
    canvas.renderAll()
  }

  const alignObject = useCallback((position) => {

    if (!canvas) {
      return
    }
    const objectToAlign = canvas.getActiveObject()
    if (!objectToAlign) {
      return
    }

    if (left === undefined) {
      findCanvasParameters()
    }
    let safeZoneObject
    if (canvas.getObjects().find((item) => {
      if (item.name === svgType + 'safeZone') {
        return item
      }
    })) {
      safeZoneObject = canvas.getObjects().find((item) => {
        if (item.name === svgType + 'safeZone') {
          return item
        }
      })
    } else {
      safeZoneObject = canvas.getObjects().find((item) => {
        if (item.name === svgType) {
          return item
        }
      })
    }



    if (svgModels.limits && svgModels.limits[svgType] && svgModels.limits[svgType][position + "Offset"]) {

      objectToAlign.top = svgModels.limits[svgType][position + "Offset"].y * scaleMultiplier
      objectToAlign.left = svgModels.limits[svgType][position + "Offset"].x * scaleMultiplier

      if (position === "left") {

        objectToAlign.left
      }
    } else {
      switch (position) {
        case 'left':
          objectToAlign.left =
            safeZoneObject.left + Math.abs(objectToAlign.left - objectToAlign.getBoundingRect().left)
          objectToAlign.top = safeZoneObject.getBoundingRect().top + safeZoneObject.getBoundingRect().height / 2 - objectToAlign.getBoundingRect().height / 2 +
            Math.abs(objectToAlign.top - objectToAlign.getBoundingRect().top)
          break

        case 'right':
          objectToAlign.left =
            safeZoneObject.left +
            Math.abs(objectToAlign.left - objectToAlign.getBoundingRect().left) +
            safeZoneObject.getBoundingRect().width -
            objectToAlign.getBoundingRect().width
          objectToAlign.top = safeZoneObject.getBoundingRect().top + safeZoneObject.getBoundingRect().height / 2 - objectToAlign.getBoundingRect().height / 2 +
            Math.abs(objectToAlign.top - objectToAlign.getBoundingRect().top)
          break

        case 'top':

          objectToAlign.top =
            safeZoneObject.top + Math.abs(objectToAlign.top - objectToAlign.getBoundingRect().top)
          objectToAlign.left = safeZoneObject.getBoundingRect().left + safeZoneObject.getBoundingRect().width / 2 - objectToAlign.getBoundingRect().width / 2 +
            Math.abs(objectToAlign.left - objectToAlign.getBoundingRect().left)


          break

        case 'bottom':
          objectToAlign.top =
            safeZoneObject.top +
            Math.abs(objectToAlign.top - objectToAlign.getBoundingRect().top) +
            safeZoneObject.getBoundingRect().height -
            objectToAlign.getBoundingRect().height
          objectToAlign.left = safeZoneObject.getBoundingRect().left + safeZoneObject.getBoundingRect().width / 2 - objectToAlign.getBoundingRect().width / 2 +
            Math.abs(objectToAlign.left - objectToAlign.getBoundingRect().left)
          break

        case 'horizontal':
          objectToAlign.left =
            safeZoneObject.left +
            safeZoneObject.getBoundingRect().width / 2 -
            objectToAlign.getBoundingRect().width / 2 +
            Math.abs(objectToAlign.left - objectToAlign.getBoundingRect().left)
          break

        case 'vertical':
          objectToAlign.top =
            safeZoneObject.top +
            safeZoneObject.getBoundingRect().height / 2 -
            objectToAlign.getBoundingRect().height / 2 +
            Math.abs(objectToAlign.top - objectToAlign.getBoundingRect().top)
          break
      }
    }

    canvas.renderAll()
  }, [canvas])

  const rotateObject = (angle) => {
    const objectToRotate = canvas.getActiveObject()
    if (angle === 'reset') {
      objectToRotate.rotate(0)
    } else {
      objectToRotate.rotate(objectToRotate.angle + angle)
    }


    if (objectToRotate.clonedImage) {
      removeClonedImagesAndUpdate(canvas, objectToRotate, svgType, addPatterns)
    }


    canvas.renderAll()
  }

  const findCanvasParameters = (canvas, selectedView) => {
    if (canvas) {
      activeGroup = canvas._objects.find((item) => {
        return item.name === selectedView
      })
    }
    if (activeGroup) {
      left = activeGroup.getBoundingRect().left
      svgWidth = activeGroup.getBoundingRect().width
      top = activeGroup.getBoundingRect().top
      svgHeight = activeGroup.getBoundingRect().height
      return [left, top, svgWidth, svgHeight]
    } else {
      return []
    }
  }

  const changeOpacity = (val) => {
    canvas.getActiveObject().opacity = val
    canvas.renderAll()
  }

  const changeFabricSVGUsingClipPath = useCallback(
    (SVGName, restore) => {
      if (!canvas) {
        return
      }
      const safeZone = canvas._objects.find((item) => {
        if (item.name === svgType + 'safeZone') {
          return item
        }
      })
      safeZone.visible = false
      outlineForSvg.forEach((child) => {
        canvas.remove(child)
      })

      outlineForSvg = []
      canvas.discardActiveObject()
      dispatch(updateSelectedAddOn({}))
      canvas.renderAll()
      canvas._objects.forEach((child) => {
        if (!child?.name?.includes('safeZone') && !child.visible) {
          child.visible = true
        }
      })
      svgType = SVGName
      activeGroup = groupArray[SVGName]
      canvas.renderAll()
    },
    [canvas]
  )

  const changeFabricSVG = useCallback(

    (SVGName, restore) => {

      if (restore === undefined) {
        restore = false
      }
      if (canvas === undefined) {
        return
      }

      if (canvas.clippingStarted) {
        clipImageUsingRect("cancel")
      }
      const safeZone = canvas._objects.find((item) => {
        if (item.name === svgType + 'safeZone') {
          return item
        }
      })
      safeZone?.visible = false;
      [...canvas._objects].forEach((child) => {
        if (child.guideLine) {
          canvas.remove(child)
        }
      })

      if (restore) {
        const design = { fabricViewSelected: SVGName }
        unregisterCanvasEvents({
          canvasRef,
          design,
          dispatch,
          loadScene,
          initCanvas,
          initialRender,
          svgPath,
          svgModels,
          svgType,
          selectedObject,
          drawOutlineForSVG,
          addPatterns
        })
        registerCanvasEvents({
          canvasRef,
          design,
          dispatch,
          loadScene,
          initCanvas,
          initialRender,
          svgPath,
          svgModels,
          svgType,
          selectedObject,
          drawOutlineForSVG,
          addPatterns
        })
      }


      outlineForSvg = []
      canvas.discardActiveObject()
      dispatch(updateSelectedAddOn({}))
      canvas.renderAll()
      svgType = SVGName
      activeGroup = groupArray[SVGName]

      const objects = canvas.getObjects()
      if (!restore) {
        ctx.restore()
        ctx.save()
      }
      objects.forEach((child) => {
        if (child.svg && child.svgType === svgType) {
          child.visible = true
        } else if (child.visible) {
          child.visible = false
        }

      })
      findCanvasParameters()
      canvas.renderAll()
      objects.forEach((child) => {
        if (child.svgType === svgType && !child.svg && !child.repeatingPattern) {
          child.visible = true
        }
        if (child.clipImageParentUuid) {
          child.visible = false
        }
      })
      canvas.renderAll()
    },
    [canvas]
  )

  const rearrangeObjects = useCallback((layer, selectedView, prevValue, canvasMode, finalPatternAdded) => {

    if (!canvas) {

      return
    }
    const visibleViewLayer = layer[selectedView]

    for (let i = visibleViewLayer?.length - 1; i >= 0; i--) {

      const objectTomoveToFront = canvas._objects.find(item => {

        return item.uuid === visibleViewLayer[i].uuid
      })
      if (objectTomoveToFront?.clonedImage) {
        [...canvas._objects].forEach(child => {
          if (child.svgType === selectedView && child.clonedImage && child.parentImageUuid === objectTomoveToFront.parentImageUuid) {
            canvas.bringToFront(child)
          }
        })
      } else {
        canvas.bringToFront(objectTomoveToFront)
      }

    }

    if ((canvasMode === "edit" || canvasMode === 'duplicate') && finalPatternAdded) {

      startRendering = true
      if (loadScene.model !== undefined) {
        renderOnceAfterLoadingCanvas('canvas')
        canvas.renderAll()
      }


    }
    canvas.renderAll()
  }, [canvas])

  const addImage = useCallback((imageRef) => {
    showLoader(true)
    if (left === undefined) {
      findCanvasParameters()
    }
    if (canvas?._objects?.length === 0 || !canvas?._objects) {
      return
    }

    const imgPath = imageRef.file
    fabric.Image.fromURL(imgPath, function (img) {

      img.set('dirty', true)
      canvas.add(img)

      img.uuid = imageRef.uuid

      dispatch(addImageInitialDimensions(img.uuid, img.width, img.height))
      if (img.width > svgWidth || img.height > svgHeight) {
        const minImgSize = Math.min(svgWidth, svgHeight)
        img.scaleToWidth(minImgSize - 10)
        img.scaleToHeight(minImgSize - 10)

      }
      dispatch(changeImageDimensions(img.uuid, img.width * img.scaleX, img.height * img.scaleY))
      img.left = left + svgWidth / 2 - img.getBoundingRect().width / 2
      img.top = top + svgHeight / 2 - img.getBoundingRect().height / 2
      img.setCoords()
      img.svgType = svgType

      img.clipPath = svgPath[svgType]
      img.set({
        objectCaching: false,
        statefullCache: true,
        clipPath: svgPath[svgType]
      })
      canvas.setActiveObject(img)
      NotificationManager.success('Image added to canvas successfully', '', 3000)
      setToggleImageUploadModal(false)

      showLoader(false)
    }, { crossOrigin: 'anonymous' })
  }, [canvas])

  const removePattern = useCallback((selectedAddon) => {

    ;[...canvas._objects].forEach((child) => {
      if (child.svgType === svgType && child.clonedImage && child !== canvas.getActiveObject() && child.parentImageUuid === canvas.getActiveObject()?.uuid) {
        canvas.remove(child)
      }
    })
    canvas.getActiveObject()?.clonedImage = false
    if (selectedAddon !== undefined) {
      selectedAddon.patternType = ""
      dispatch(updateAddOnsList("image", selectedAddon))
    }

  }, [canvas])

  const addPatterns = useCallback((spacing, object, patternType, canvasPassed, selectedView, selectedAddon, layers, canvasMode, finalPatternAdded) => {

    let selectedObjectAngle
    activeGroup = canvas._objects.find((item) => {
      return item.name === selectedView
    })

    if (!canvas) {
      canvas = canvasPassed
    }
    const activeObjectToRepeat = object !== undefined ? object : canvas.getActiveObject()
    if (!activeObjectToRepeat) {
      return
    }

    [...canvas._objects].forEach((child) => {
      if (child.svgType === selectedView && child.clonedImage && child !== canvas.getActiveObject() && child.parentImageUuid === canvas.getActiveObject()?.parentImageUuid) {
        canvas.remove(child)
      }
    })

    const boundingRectForPattern = activeGroup.getBoundingRect()
  
    selectedObjectAngle = activeObjectToRepeat.angle
    if (!activeObjectToRepeat.clonedImage) {
      activeObjectToRepeat.originalImage = true
    }

    activeObjectToRepeat.clonedImage = true
    activeObjectToRepeat.setCoords()
    activeObjectToRepeat.parentImageUuid = activeObjectToRepeat.parentImageUuid !== undefined ? activeObjectToRepeat.parentImageUuid : activeObjectToRepeat.uuid
    activeObjectToRepeat.patternType = patternType
    const objectWidth = activeObjectToRepeat.getBoundingRect().width
    const objectHeight = activeObjectToRepeat.getBoundingRect().height
    let imageSpacing
    spacing !== undefined ? (imageSpacing = spacing) : (imageSpacing = 1)
    activeObjectToRepeat.spacing = imageSpacing
    let imageLeft
    let imageToClone
    let imageTop = boundingRectForPattern.top

    let patternToLeft = true
    let initial = true
    let initialLeftBottom = true
    let initialRightBottom = true
    let initialRightTop = true
    let patternToLeftTop = true
    let patternToRightTop = true
    let patternToLeftBottom = true
    let patternToRightBottom = true
    let reArrangePattern = true

    function addClonedObjectToCanvas(mirrorImage, xMirrorFlip, imagePatternType) {

      activeObjectToRepeat.clone((img) => {

        img.set({
          left: activeObjectLeft + objectRotationLeftOffset,
          top: activeObjectTop + objectRotationTopOffset,
          clipPath: svgPath[activeObjectToRepeat.svgType],
          withoutTransform: true,

        })
        imageToClone = img
        imageToClone.absolutePositioned = true
        imageToClone.spacing = imageSpacing
        imageToClone.patternType = patternType
        if (mirrorImage) {
          imageToClone.set('flipY', true)
        } else {
          imageToClone.set('flipY', false)
        }

        if (xMirrorFlip) {
          imageToClone.set('flipX', true)
        } else {
          imageToClone.set('flipX', false)
        }
        imageToClone.setCoords()
        imageToClone.repeatingPattern = false
        imageToClone.uuid = activeObjectToRepeat.uuid
        if (activeObjectLeft + objectWidth > boundingRectForPattern.left && activeObjectTop + objectHeight > imageTop && activeObjectTop < imageTop + boundingRectForPattern.height && activeObjectLeft < boundingRectForPattern.left + boundingRectForPattern.width) {

          canvas.add(imageToClone)
        }
        imageToClone.svgType = activeObjectToRepeat.svgType
        imageToClone.clonedImage = true
        imageToClone.objectCaching = false

        imageToClone.parentImageUuid = activeObjectToRepeat.uuid ? activeObjectToRepeat.uuid : activeObjectToRepeat.parentImageUuid

        if (imagePatternType === "Horizontal") {


          if (activeObjectLeft + objectWidth > boundingRectForPattern.left && patternToLeft) {
            activeObjectLeft -= (imageSpacing + objectWidth)

            addClonedObjectToCanvas(mirrorImage, xMirrorFlip, "Horizontal")
          } else {
            patternToLeft = false
            if (initial) {
              activeObjectLeft = activeObjectToRepeat.getBoundingRect().left
              initial = false
            }

            if (activeObjectLeft < boundingRectForPattern.left + boundingRectForPattern.width) {
              activeObjectLeft += (imageSpacing + objectWidth)
              addClonedObjectToCanvas(mirrorImage, xMirrorFlip, "Horizontal")
            } else {

              rearrangeObjects(layers, selectedView, undefined, canvasMode, finalPatternAdded)
            }
          }
        } else if (imagePatternType === "Vertical") {

          if (activeObjectTop + objectHeight > imageTop && patternToLeft) {
            activeObjectTop -= (imageSpacing + objectHeight)

            addClonedObjectToCanvas(mirrorImage, xMirrorFlip, "Vertical")

          } else {
            patternToLeft = false
            if (initial) {
              activeObjectTop = activeObjectToRepeat.getBoundingRect().top
              initial = false
            }
            if (activeObjectTop < imageTop + boundingRectForPattern.height) {
              activeObjectTop += (imageSpacing + objectHeight)
              addClonedObjectToCanvas(mirrorImage, xMirrorFlip, "Vertical")
            } else {
              rearrangeObjects(layers, selectedView, undefined, canvasMode, finalPatternAdded)
            }

          }
        } else if (imagePatternType === "HalfDrop") {

          //leftTop
          if (activeObjectLeft + objectWidth > boundingRectForPattern.left && patternToLeftTop) {

            activeObjectTop -= imageSpacing + objectHeight
            if (activeObjectTop + objectHeight > imageTop) {
              addClonedObjectToCanvas(mirrorImage, xMirrorFlip, "HalfDrop")

            } else {
              brickAlternatePath = !brickAlternatePath
              activeObjectLeft -= imageSpacing + objectWidth
              if (brickAlternatePath) {
                activeObjectTop =
                  activeObjectToRepeat.getBoundingRect().top - (imageSpacing + objectHeight) / 2
              } else {
                activeObjectTop = activeObjectToRepeat.getBoundingRect().top - imageSpacing - objectHeight
              }
              addClonedObjectToCanvas(mirrorImage, xMirrorFlip, "HalfDrop")
            }

          } else {
            patternToLeftTop = false
          }
          //leftBottom

          if (initialLeftBottom && !patternToLeftTop && !patternToRightTop) {

            activeObjectLeft = activeObjectToRepeat.getBoundingRect().left
            activeObjectTop = activeObjectToRepeat.getBoundingRect().top
            brickAlternatePath = false
            initialLeftBottom = false
            patternToLeftBottom = true
            patternToLeftTop = false
            patternToRightTop = false
          }
          if (activeObjectLeft + objectWidth > boundingRectForPattern.left && patternToLeftBottom && !patternToLeftTop) {
            activeObjectTop += imageSpacing + objectHeight
            if (activeObjectTop < imageTop + boundingRectForPattern.height) {
              addClonedObjectToCanvas(mirrorImage, xMirrorFlip, "HalfDrop")

            } else {
              brickAlternatePath = !brickAlternatePath
              activeObjectLeft -= imageSpacing + objectWidth

              if (activeObjectLeft === activeObjectToRepeat.getBoundingRect().left) {
                activeObjectTop = activeObjectToRepeat.getBoundingRect().top + imageSpacing + objectHeight
              } else {

                if (brickAlternatePath) {
                  activeObjectTop =
                    activeObjectToRepeat.getBoundingRect().top + (imageSpacing + objectHeight) / 2
                } else {
                  activeObjectTop = activeObjectToRepeat.getBoundingRect().top
                }
              }

              addClonedObjectToCanvas(mirrorImage, xMirrorFlip, "HalfDrop")
            }

          } else {
            patternToLeftBottom = false
          }

          //rightTop
          if (initialRightTop && !patternToLeftBottom && !patternToLeftTop) {

            activeObjectLeft = activeObjectToRepeat.getBoundingRect().left + imageSpacing + objectWidth
            activeObjectTop = activeObjectToRepeat.getBoundingRect().top - (imageSpacing + objectHeight) / 2 + imageSpacing + objectHeight
            brickAlternatePath = true
            initialRightTop = false
            patternToRightTop = true
            patternToLeftTop = false
            patternToLeftBottom = false
          }

          if (activeObjectLeft < boundingRectForPattern.left + boundingRectForPattern.width && patternToRightTop && !patternToLeftBottom && !patternToLeftTop) {
            activeObjectTop -= imageSpacing + objectHeight
            if (activeObjectTop + objectHeight > imageTop) {

              addClonedObjectToCanvas(mirrorImage, xMirrorFlip, "HalfDrop")

            } else {
              brickAlternatePath = !brickAlternatePath
              activeObjectLeft += imageSpacing + objectWidth
              if (brickAlternatePath) {
                activeObjectTop =
                  activeObjectToRepeat.getBoundingRect().top - (imageSpacing + objectHeight) / 2
              } else {
                activeObjectTop = activeObjectToRepeat.getBoundingRect().top
              }
              addClonedObjectToCanvas(mirrorImage, xMirrorFlip, "HalfDrop")
            }

          } else {
            patternToRightTop = false
          }

          //rightBottom

          if (initialRightBottom && !patternToLeftBottom && !patternToLeftTop && !patternToRightTop) {
            activeObjectLeft = activeObjectToRepeat.getBoundingRect().left + imageSpacing + objectWidth
            activeObjectTop = activeObjectToRepeat.getBoundingRect().top + (imageSpacing + objectHeight) / 2 - (imageSpacing + objectHeight)
            brickAlternatePath = true
            initialRightBottom = false
            patternToRightBottom = true

          }

          if (activeObjectLeft < boundingRectForPattern.left + boundingRectForPattern.width && !patternToRightTop && !patternToLeftBottom && !patternToLeftTop && patternToRightBottom) {
            activeObjectTop += imageSpacing + objectHeight
            if (activeObjectTop < imageTop + boundingRectForPattern.height) {

              addClonedObjectToCanvas(mirrorImage, xMirrorFlip, "HalfDrop")

            } else {
              brickAlternatePath = !brickAlternatePath
              activeObjectLeft += imageSpacing + objectWidth
              if (brickAlternatePath) {
                activeObjectTop =
                  activeObjectToRepeat.getBoundingRect().top + (imageSpacing + objectHeight) / 2
              } else {
                activeObjectTop = activeObjectToRepeat.getBoundingRect().top + imageSpacing + objectHeight
              }
            }
            addClonedObjectToCanvas(mirrorImage, xMirrorFlip, "HalfDrop")
          } else {
            patternToRightBottom = false
          }


          if (!patternToRightBottom && !patternToLeftBottom && !patternToRightTop && !patternToLeftTop && reArrangePattern) {

            reArrangePattern = false
            rearrangeObjects(layers, selectedView, undefined, canvasMode, finalPatternAdded)
          }
        } else {

          //leftTop
          if (activeObjectTop + objectHeight > imageTop && patternToLeftTop) {

            if (activeObjectLeft + objectWidth > boundingRectForPattern.left) {
              if (patternType === "mirrorImage") {
                xMirrorFlip = !xMirrorFlip
              }

              activeObjectLeft -= imageSpacing + objectWidth
              addClonedObjectToCanvas(mirrorImage, xMirrorFlip, patternType)

            } else {

              if (patternType === "mirrorImage") {
                xMirrorFlip = !activeObjectToRepeat.flipX
                mirrorImage = !mirrorImage
              }
              if (patternType === 'Brick') {
                brickAlternatePath = !brickAlternatePath
              }
              if (patternType === 'Brick' && brickAlternatePath) {
                activeObjectLeft =
                  activeObjectToRepeat.getBoundingRect().left - (imageSpacing + objectWidth) / 2
              } else {
                activeObjectLeft =
                  activeObjectToRepeat.getBoundingRect().left - imageSpacing - objectWidth
              }
              activeObjectTop -= imageSpacing + objectHeight
              addClonedObjectToCanvas(mirrorImage, xMirrorFlip, patternType)
            }
          } else {

            patternToLeftTop = false
          }

          //leftBottom

          if (initialLeftBottom && !patternToLeftTop && !patternToRightTop) {

            activeObjectTop = activeObjectToRepeat.getBoundingRect().top + imageSpacing + objectHeight
            brickAlternatePath = true
            initialLeftBottom = false
            patternToLeftBottom = true
            patternToLeftTop = false
            patternToRightTop = false
            if (patternType === 'mirrorImage') {
              mirrorImage = !activeObjectToRepeat.flipY
            }
            if (patternType === 'Brick' && brickAlternatePath) {
              activeObjectLeft =
                activeObjectToRepeat.getBoundingRect().left - (imageSpacing + objectWidth) / 2 + imageSpacing + objectWidth
            } else {
              activeObjectLeft =
                activeObjectToRepeat.getBoundingRect().left
            }

            if (patternType === "mirrorImage") {
              xMirrorFlip = activeObjectToRepeat.flipX
            }

          }
          if (activeObjectTop - objectHeight < imageTop + boundingRectForPattern.height && patternToLeftBottom && !patternToLeftTop) {
            if (activeObjectLeft + objectWidth > boundingRectForPattern.left) {
              if (patternType === "mirrorImage") {
                xMirrorFlip = !xMirrorFlip
              }
              activeObjectLeft -= imageSpacing + objectWidth

              addClonedObjectToCanvas(mirrorImage, xMirrorFlip, patternType)

            } else {
              if (patternType === 'Brick') {
                brickAlternatePath = !brickAlternatePath
              }
              if (patternType === 'Brick' && brickAlternatePath) {
                activeObjectLeft =
                  activeObjectToRepeat.getBoundingRect().left - (imageSpacing + objectWidth) / 2
              } else {
                activeObjectLeft =
                  activeObjectToRepeat.getBoundingRect().left - imageSpacing - objectWidth
              }
              if (patternType === 'mirrorImage') {
                mirrorImage = !mirrorImage
                xMirrorFlip = !activeObjectToRepeat.flipX
              }


              activeObjectTop += imageSpacing + objectHeight
              addClonedObjectToCanvas(mirrorImage, xMirrorFlip, patternType)
            }

          } else {
            patternToLeftBottom = false
          }

          //rightTop
          if (initialRightTop && !patternToLeftBottom && !patternToLeftTop) {

            activeObjectLeft =
              activeObjectToRepeat.getBoundingRect().left
            activeObjectTop = activeObjectToRepeat.getBoundingRect().top
            brickAlternatePath = false
            initialRightTop = false
            patternToRightTop = true
            patternToLeftTop = false
            patternToLeftBottom = false
            if (patternType === "mirrorImage") {
              mirrorImage = activeObjectToRepeat.flipY
              xMirrorFlip = activeObjectToRepeat.flipX
            }
            if (patternType === 'Brick' && brickAlternatePath) {
              activeObjectLeft =
                activeObjectToRepeat.getBoundingRect().left + (imageSpacing + objectWidth) / 2
            }
          }

          if (activeObjectTop + objectHeight > imageTop && patternToRightTop && !patternToLeftBottom && !patternToLeftTop) {

            if (activeObjectLeft < boundingRectForPattern.left + boundingRectForPattern.width) {
              activeObjectLeft += imageSpacing + objectWidth
              if (patternType === "mirrorImage") {
                xMirrorFlip = !xMirrorFlip
              }
              addClonedObjectToCanvas(mirrorImage, xMirrorFlip, patternType)
            } else {
              activeObjectTop -= imageSpacing + objectHeight
              activeObjectLeft = activeObjectToRepeat.getBoundingRect().left
              if (patternType === "mirrorImage") {
                xMirrorFlip = activeObjectToRepeat.flipX
                mirrorImage = !mirrorImage
              }
              if (patternType === 'Brick') {
                brickAlternatePath = !brickAlternatePath
              }

              if (patternType === 'Brick' && brickAlternatePath) {
                activeObjectLeft =
                  activeObjectToRepeat.getBoundingRect().left + (imageSpacing + objectWidth) / 2
              }
              addClonedObjectToCanvas(mirrorImage, xMirrorFlip, patternType)
            }

          } else {
            patternToRightTop = false
          }

          //rightBottom
          if (initialRightBottom && !patternToLeftBottom && !patternToLeftTop && !patternToRightTop) {

            activeObjectTop = activeObjectToRepeat.getBoundingRect().top + imageSpacing + objectHeight
            brickAlternatePath = true
            initialRightBottom = false
            patternToRightBottom = true
            if (patternType === 'mirrorImage') {
              mirrorImage = !activeObjectToRepeat.flipY
              xMirrorFlip = !activeObjectToRepeat.flipX
            }
            if (patternType === 'Brick' && brickAlternatePath) {
              activeObjectLeft =
                activeObjectToRepeat.getBoundingRect().left + (imageSpacing + objectWidth) / 2 - (imageSpacing + objectWidth)
            } else {
              activeObjectLeft = activeObjectToRepeat.getBoundingRect().left - (imageSpacing + objectWidth)
            }
          }

          if (activeObjectTop - objectHeight < imageTop + boundingRectForPattern.height && !patternToRightTop && !patternToLeftBottom && !patternToLeftTop && patternToRightBottom) {

            if (activeObjectLeft < boundingRectForPattern.left + boundingRectForPattern.width) {
              if (patternType === "mirrorImage") {
                xMirrorFlip = !xMirrorFlip
              }
              activeObjectLeft += imageSpacing + objectWidth
              addClonedObjectToCanvas(mirrorImage, xMirrorFlip, patternType)

            } else {

              if (patternType === 'mirrorImage') {
                mirrorImage = !mirrorImage
                xMirrorFlip = activeObjectToRepeat.flipX
              }
              if (patternType === 'Brick') {
                brickAlternatePath = !brickAlternatePath
              }
              if (patternType === 'Brick' && brickAlternatePath) {
                activeObjectLeft =
                  activeObjectToRepeat.getBoundingRect().left + (imageSpacing + objectWidth) / 2
              } else {
                activeObjectLeft = activeObjectToRepeat.getBoundingRect().left
              }
              activeObjectTop += imageSpacing + objectHeight
              addClonedObjectToCanvas(mirrorImage, xMirrorFlip, patternType)
            }

          } else {
            patternToRightBottom = false
          }


          if (!patternToRightBottom && !patternToLeftBottom && !patternToRightTop && !patternToLeftTop && reArrangePattern) {

            reArrangePattern = false
            rearrangeObjects(layers, selectedView, undefined, canvasMode, finalPatternAdded)
          }
        }
      })
    }


    let activeObjectTop = activeObjectToRepeat.getBoundingRect().top
    let activeObjectLeft = activeObjectToRepeat.getBoundingRect().left
    let mirrorImage = activeObjectToRepeat.flipY
    let brickAlternatePath = false
    let xMirrorFlip = activeObjectToRepeat.flipX

    const objectRotationLeftOffset =
      activeObjectToRepeat.getBoundingRect().left < activeObjectToRepeat.left
        ? activeObjectToRepeat.left - activeObjectToRepeat.getBoundingRect().left
        : 0
    const objectRotationTopOffset =
      activeObjectToRepeat.getBoundingRect().top < activeObjectToRepeat.top
        ? activeObjectToRepeat.top - activeObjectToRepeat.getBoundingRect().top
        : 0
    if (patternType === "Horizontal") {

      activeObjectLeft = activeObjectToRepeat.getBoundingRect().left - (imageSpacing + objectWidth)
      if (activeObjectLeft + objectWidth > boundingRectForPattern.left) {
        addClonedObjectToCanvas(mirrorImage, xMirrorFlip, "Horizontal")
      } else {
        patternToLeft = false
        initial = false
        activeObjectLeft = activeObjectToRepeat.getBoundingRect().left + imageSpacing + objectWidth
        if (activeObjectLeft < boundingRectForPattern.left + boundingRectForPattern.width) {
          addClonedObjectToCanvas(mirrorImage, xMirrorFlip, "Horizontal")
        }

      }
    } else if (patternType === "Vertical") {
      activeObjectTop = activeObjectToRepeat.getBoundingRect().top - (imageSpacing + objectHeight)
      if (activeObjectTop + objectHeight > imageTop) {

        addClonedObjectToCanvas(mirrorImage, xMirrorFlip, "Vertical")
      } else {
        patternToLeft = false
        initial = false
        activeObjectTop = activeObjectToRepeat.getBoundingRect().top + imageSpacing + objectHeight
        if (activeObjectTop < imageTop + boundingRectForPattern.height) {

          addClonedObjectToCanvas(mirrorImage, xMirrorFlip, "Vertical")
        }
      }
    } else if (patternType === 'HalfDrop') {

      activeObjectTop = activeObjectToRepeat.getBoundingRect().top - imageSpacing - objectHeight
      addClonedObjectToCanvas(mirrorImage, xMirrorFlip, "HalfDrop")
    } else {
      //leftTop
      activeObjectLeft =
        activeObjectToRepeat.getBoundingRect().left - imageSpacing - objectWidth
      if (patternType === "mirrorImage") {
        xMirrorFlip = !activeObjectToRepeat.flipX
      }

      if (patternType === "mirrorImage" && activeObjectToRepeat.flipY) {
        mirrorImage = true
      }
      addClonedObjectToCanvas(mirrorImage, xMirrorFlip, patternType)
    }

    rearrangeObjects(layers, selectedView)

    if (selectedAddon !== undefined) {

      dispatch(updateAddOnsList("image", selectedAddon))
    }
  }, [canvas])

  const changeSVGType = (svgType, callBack, baseURL) => {
    //switch size testing begin
    let type
    let safeZone
   
    type = svgModels.types
    safeZone = svgModels.safeZones
    for (let keys in type) {
      fabric.loadSVGFromURL(baseURL + "/" + type[keys], function (objects) {

        var group = new fabric.util.groupSVGElements(objects)
        group.fill = svgModels?.meshColor ? svgModels.meshColor : '#FFFFFF'
        group.name = keys
        group.svg = true
        group.selectable = false
        group.svgType = keys
        group.scaleX = group.scaleX * scaleMultiplier
        group.scaleY = group.scaleY * scaleMultiplier
        group.left = group.left * scaleMultiplier
        group.top = group.top * scaleMultiplier
        group.setCoords()
        if (canvas.transparentPrint) {
          group.transparentSVG = true
        }
        svgPath[keys] = new fabric.Path(group.d, { objectCaching: false })
        svgPath[keys].absolutePositioned = true
        svgPath[keys].scaleX = svgPath[keys].scaleX * scaleMultiplier
        svgPath[keys].scaleY = svgPath[keys].scaleY * scaleMultiplier
        svgPath[keys].left = svgPath[keys].left * scaleMultiplier
        svgPath[keys].top = svgPath[keys].top * scaleMultiplier
        svgPathRef.current = svgPath
        group.setCoords()

        groupArray[keys] = group
        canvas.add(group)

        canvas.sendToBack(group)

        if (svgModels.default === keys) {
          activeGroup = group
        }
      })

      if (safeZone[keys + 'SafeZone']) {
        fabric.loadSVGFromURL(baseURL + "/" + safeZone[keys + 'SafeZone'], (objects) => {
          let group = new fabric.util.groupSVGElements(objects)
          group.name = keys + 'safeZone'
          group.svg = true
          group.selectable = false
          group.svgType = keys
          group.scaleX = group.scaleX * scaleMultiplier
          group.scaleY = group.scaleY * scaleMultiplier
          group.left = group.left * scaleMultiplier
          group.top = group.top * scaleMultiplier
          group.setCoords()
          canvas.add(group)
          group.visible = false

          if (keys === Object.keys(type)[Object.keys(type).length - 1] && callBack) {

            callBack()
          }
          if (keys === Object.keys(type)[Object.keys(type).length - 1] && svgModels.transparentPrint) {

            renderOnceAfterLoadingCanvas("DTGCanvas")
          }
        })
      }

      canvas.renderAll()
    }
    initialRender = true
  }

  const createFinalClipPath = useCallback(() => {

    const group = new fabric.Group(Object.values(svgPath))
    canvas.renderAll()


  }, [canvas])

  const convertObjectURLToBase64 = async (objURL) => {
    return new Promise((resolve, reject) => fetch(objURL)
      .then((res) => res.blob())
      .then((blob) => {
        var reader = new FileReader();
        reader.readAsDataURL(blob);
        reader.onloadend = function () {
          var base64data = reader.result.split(',')[1];
          resolve(base64data)

        }
      }))
  }

  /**
  * @description For patterns, keep just a single copy of image & remove the rest (optimisation) 
  */
  const removePatternImagesFromCanvasJSON = (canvasJSON, img) => {
    let oneSaved = false;
    for (let i = 0; i < canvasJSON.objects.length; i++) {
      if (canvasJSON.objects[i].type === 'image' && canvasJSON.objects[i].uuid === img.uuid) {
        if (!oneSaved) {
          oneSaved = true
          continue
        }
        else {
          canvasJSON.objects.splice(i, 1)
          i = i - 1
        }
      }
    }
    return canvasJSON
  }

  /**
   * @description Generate the canvasJSON
   */
  const generateJSON = async (design, designModel) => {

    let tempCanvas = canvasRef.current;
    tempCanvas._objects[0].currentCanvasWidth = document.getElementById('2DCanvas')?.offsetWidth
    let canvasJSON = tempCanvas.toJSON(['uuid', 'svg', 'svgType', 'name', 'clonedImage', 'patternType', 'spacing', 'repeatingPattern', 'parentImageUuid', 'guideLine', 'clipImageParentUuid', 'clipDiff', 'baseImageParams', 'currentClip', 'currentCanvasWidth', 'transparentSVG'])
    canvasJSON['designDetails'] = JSON.parse(JSON.stringify(design))

    if (design.addons.image.length > 0) {

      for (let i = 0; i < design.addons.image.length; i++) {
        /**
       * @summary If pattern is applied for image, remove it from canvasJSON and keep a single copy (Optimisation)
       */
        if (design.addons.image[i].patternApplied) {
          canvasJSON = removePatternImagesFromCanvasJSON(canvasJSON, design.addons.image[i])
        }
      }

    }
    canvasJSON.designDetails.selectedAddOn = {}
    canvasJSON.designDetails.uploadedImages = []
    canvasJSON.designDetails.saveProduct = false
    if (mode === 'create') {
      canvasJSON.designDetails.fabricViewSelected = JSON.parse(designModel?.productVariants?.find(
        (item) => item.isDefaultTemplate
      ).designerJSON).default
    }
    else if (mode === 'edit' || mode === 'duplicate') {
      canvasJSON.designDetails.fabricViewSelected = designModel.savedDesign.designerJSON.default
    }

    return canvasJSON

  }



  const generateFinalMockupWithTemplate = () => {

    loadScene.generateMockup(canvas, svgModelConstants["pajamapants_M"])
  }


  const generatePrintFilesForDTGApparel = (productJSON, sizeList, canvas, sizesSelectedByUser, dpisOfSizesSelected) => {

    return new Promise((resolve, reject) => {
      canvas._objects.forEach(child => {

        if (child.svg && child.name?.includes("safeZone")) {
          child.visible = false
        } else if (!child.guideLine && child.clipImageParentUuid !== null) {
          child.visible = true
        }
        if (child.clipImageParentUuid) {
          child.visible = false
        }
  
        if (canvas.transparentPrint && child.transparentSVG) {
          child.opacity = 0
        }
      })
      canvas.renderAll()
      const frontImage = {}
      const backImage = {}
      const aiFilePath = designModel.baseURL + '/' + productJSON.modelPath.replace('fbx', 'png')
      let selectedSVGGuid = sizesSelectedByUser[0]
      fabric.Image.fromURL(aiFilePath, (finalOutDimensionFile) => {
        finalOutDimensionFile.visible = false
        canvas.backgroundColor = null
  
        const maxDimension = Math.max(finalOutDimensionFile.width, finalOutDimensionFile.height)
        const maxDimensionInInches = maxDimension / dpisOfSizesSelected[selectedSVGGuid]
 
        const types = Object.keys(productJSON.types)
        types.forEach(svgPanel => {
  
          canvas._objects.forEach(child => {
  
            if (child.svgType === svgPanel) {
              child.visible = true
            } else {
              child.visible = false
            }
            if (child.clipImageParentUuid || child.name?.includes("safeZone") || child.guideLine) {
              child.visible = false
            }
          })
          canvas.renderAll()
          const blob = new Blob([canvas.toSVG({
            encoding: 'ISO-8859-1', suppressPreamble: true, width: maxDimensionInInches + "in", height: maxDimensionInInches + "in"
          })], { type: 'image/svg+xml' });
          const reader = new FileReader()
          reader.readAsDataURL(blob);
          reader.onloadend = () => {
            var base64data = reader.result;
            for (let i = 0; i < sizesSelectedByUser.length; i++) {
              finalPrintableImageList[sizesSelectedByUser[i]] = base64data.split(',')[1]
              finalPrintFileDimensions[sizesSelectedByUser[i]] = { width: finalOutDimensionFile.width, height: finalOutDimensionFile.height }
            }
            if (svgPanel.includes("Front")) {
              frontImage = {imageType: 3, finalPrintableImageList, finalPrintFileDimensions  }
            } else {
              backImage = { imageType: 4, finalPrintableImageList, finalPrintFileDimensions }
            }
            if (svgPanel === types[types.length - 1]) {
              resolve({ frontImage, backImage })
            }
          }
        })
  
  
      }, { crossOrigin: 'anonymous' })
    })
  }

  const createFinalPrintImages = async (productList, sizesSelectedByUser, dpisOfSizesSelected) => {
    return new Promise((resolve, reject) => {
      const progressBarUnit = 100/sizesSelectedByUser.length
      let progress = 0;
      const scaleMultiplier = document.getElementById('2DCanvas')?.offsetWidth / 512
      const sizeList = []
      productList.forEach(child => {
        sizeList.push(child.size)
      })
      const canvas = canvasRef.current
      const canvasJSON = canvas.toJSON(['uuid', 'svg', 'svgType', 'name', 'clonedImage', 'patternType', 'spacing', 'repeatingPattern', 'parentImageUuid', 'guideLine', 'clipImageParentUuid', 'clipDiff', 'baseImageParams', 'currentClip', 'transparentSVG'])
      const designTemplateSVGList = []
      canvas._objects.forEach(child => {
        if (child.svg && child.name && !child.name?.includes("safeZone")) {
          designTemplateSVGList[child.name] = child
        }
      })
      const currentSize = canvas.currentSize ? canvas.currentSize : "S"
      if (sizeList.includes(currentSize)) {
        canvas.clipPath = null
        canvas._objects.forEach(child => {

          if (child.svg && child.name?.includes("safeZone")) {
            child.visible = false
          } else if (!child.guideLine && child.clipImageParentUuid !== null) {
            child.visible = true
          }
          if (child.clipImageParentUuid) {
            child.visible = false
          }
        })
        canvas.renderAll()
        const index = sizeList.findIndex(item => {
          return item === currentSize
        })
        let productName = productList.splice(index, 1)[0]
        sizeList.splice(index, 1)
        let selectedSVGGuid = sizesSelectedByUser.splice(index, 1)[0]
        const aiFilePath = designModel.baseURL + '/' + productName.modelPath.replace('fbx', 'png')


        fabric.Image.fromURL(aiFilePath, (finalOutDimensionFile) => {
          finalOutDimensionFile.visible = false
          const maxDimension = Math.max(finalOutDimensionFile.width, finalOutDimensionFile.height)
          const maxDimensionInInches = maxDimension / dpisOfSizesSelected[selectedSVGGuid]
          let outLineSVGPath = productName.modelPath.replace("FBXModel", "Images/OutlineSVG")
          outLineSVGPath = outLineSVGPath.replace("fbx", "svg")
          fabric.loadSVGFromURL(designModel.baseURL + '/' + outLineSVGPath, (outlineSVG) => {
            const group = new fabric.util.groupSVGElements(outlineSVG)
            group.name = "outline_" + selectedSVGGuid
            group.scaleX = group.scaleX * scaleMultiplier
            group.scaleY = group.scaleY * scaleMultiplier
            group.left = group.left * scaleMultiplier
            group.top = group.top * scaleMultiplier
            group.setCoords()
            canvas.add(group)
            canvas.renderAll()
            finalOutDimensionFile.visible = false
            const blob = new Blob([canvas.toSVG({
              encoding: 'ISO-8859-1', suppressPreamble: true, width: maxDimensionInInches + "in", height: maxDimensionInInches + "in"
            })], { type: 'image/svg+xml' });
            const reader = new FileReader()
            reader.readAsDataURL(blob);
            reader.onloadend = () => {
              progress+=progressBarUnit
              progressRef.current.setProgress(progress)
              progressRef.current.setMessage('Generating print files...')
              var base64data = reader.result;
              finalPrintableImageList[selectedSVGGuid] = base64data.split(',')[1]
              finalPrintFileDimensions[selectedSVGGuid] = { width: finalOutDimensionFile.width, height: finalOutDimensionFile.height }

              if (productList && productList.length === 0) {
                resolve({ finalPrintableImageList, finalPrintFileDimensions })
              } else {
                canvas.remove(group)
                canvas.renderAll()
                productName = productList.splice(0, 1)[0]
                const size = sizeList.splice(0, 1)[0]
                selectedSVGGuid = sizesSelectedByUser.splice(0, 1)[0]
                reAlignExistingTemplates(productName, size, canvasJSON, designTemplateSVGList, currentSize, true, productList, sizeList, resolve, selectedSVGGuid, sizesSelectedByUser, dpisOfSizesSelected, progress, progressBarUnit)
              }

            }
          })
        }, { crossOrigin: 'anonymous' })

      } else {
        productName = productList.splice(0, 1)[0]
        const size = sizeList.splice(0, 1)[0]
        selectedSVGGuid = sizesSelectedByUser.splice(0, 1)[0]
        reAlignExistingTemplates(productName, size, canvasJSON, designTemplateSVGList, currentSize, true, productList, sizeList, resolve, selectedSVGGuid, sizesSelectedByUser, dpisOfSizesSelected, progress, progressBarUnit)
      }




    })

  }

  const reAlignExistingTemplates = (productName, size, canvasJSON, designTemplateSVGList, currentSize, initial, productList, sizeList, resolve, selectedSVGGuid, sizesSelectedByUser, dpisOfSizesSelected, progress, progressBarUnit) => {
    const canvas = canvasRef.current
    if (!initial) {
      [...canvas._objects].forEach(child => {

        canvas.remove(child)
      })
      canvas.loadFromJSON(canvasJSON, () => {
        canvas.renderAll()
        startGenerating()
      })
    } else {
      startGenerating()
    }
    function startGenerating() {
      const finalSize = size
      const type = productName?.types
      const baseURL = designModel.baseURL
      const clipPath = []
      const scaleMultiplier = document.getElementById('2DCanvas')?.offsetWidth / 512
      const targetTemplateSVGList = []
      for (let keys in type) {

        fabric.loadSVGFromURL(baseURL + "/" + type[keys], function (objects) {

          const group = new fabric.util.groupSVGElements(objects)
          group.name = keys
          group.svg = true
          group.fill = designTemplateSVGList[keys.replace(finalSize, currentSize)].fill
          group.svgType = keys
          group.scaleX = group.scaleX * scaleMultiplier
          group.scaleY = group.scaleY * scaleMultiplier
          group.left = group.left * scaleMultiplier
          group.top = group.top * scaleMultiplier
          group.setCoords()
          clipPath[keys] = new fabric.Path(group.d, { objectCaching: false })
          clipPath[keys].absolutePositioned = true
          clipPath[keys].scaleX = clipPath[keys].scaleX * scaleMultiplier
          clipPath[keys].scaleY = clipPath[keys].scaleY * scaleMultiplier
          clipPath[keys].left = clipPath[keys].left * scaleMultiplier
          clipPath[keys].top = clipPath[keys].top * scaleMultiplier
          group.setCoords()
          targetTemplateSVGList[group.name] = group
          canvas.add(group)
          canvas.sendToBack(group)
          group.visible = false
          if (Object.keys(targetTemplateSVGList).length === Object.keys(type).length) {
            canvas.renderAll()

            startAligningAndScaling(clipPath, currentSize, finalSize, designTemplateSVGList, targetTemplateSVGList, canvasJSON, productList, sizeList, productName, resolve, selectedSVGGuid, sizesSelectedByUser, dpisOfSizesSelected, progress, progressBarUnit)
          }

        })
        canvas.renderAll()
      }
    }

  }

  const startAligningAndScaling = (clipPath, currentSize, finalSize, designTemplateSVGList, targetTemplateSVGList, canvasJSON, productList, sizeList, productName, resolve, selectedSVGGuid, sizesSelectedByUser, dpisOfSizesSelected, progress, progressBarUnit) => {
    const canvas = canvasRef.current
    canvas.clipPath = null;
    const templateToFlip = productName.templateToFlip
    const templatesToRotate = productName.templatesToRotate
    let templateName = undefined

    if (templatesToRotate) {
      templateName = Object.keys(templatesToRotate)[0]
    }

    /** 
      @summary: Used to properly position addons in panel that are at an angle 
      @description: scaleX and scaleY each elements separately, add everything to group -> rotate and then reposition the group
    **/
    if (templatesToRotate && templateName && Object.keys(targetTemplateSVGList).some(elem => Object.keys(templatesToRotate).includes(elem))) {

      const replacedText = templateName.replace(finalSize, currentSize)
      const addonsToRotateBeforeAdding = canvas._objects.filter(item => {

        return !item.svg && item.svgType === replacedText
      })
      if (addonsToRotateBeforeAdding && addonsToRotateBeforeAdding.length > 0) {
        const finalSVGTemplate = targetTemplateSVGList[templateName]
        const groupToAdd = new fabric.Group()
        canvas.add(groupToAdd)
        const currentSVGTemplate = designTemplateSVGList[replacedText]
        groupToAdd.left = currentSVGTemplate.getBoundingRect().left + currentSVGTemplate.getBoundingRect().width / 2
        groupToAdd.top = currentSVGTemplate.getBoundingRect().top + currentSVGTemplate.getBoundingRect().height / 2
        groupToAdd.originX = 'center'
        groupToAdd.originY = 'center'


        addonsToRotateBeforeAdding.forEach((item, index) => {
          if (item.text) {
            item.originX = 'left'
            item.originY = 'top'
          }

          let scaleXFactor
          let scaleYFactor
          if (templatesToRotate[templateName].angle === 90) {
            scaleXFactor = finalSVGTemplate.height / currentSVGTemplate.width
            scaleYFactor = finalSVGTemplate.width / currentSVGTemplate.height
          } else if (templatesToRotate[templateName].angle === -90) {
            scaleYFactor = finalSVGTemplate.width / currentSVGTemplate.height
            scaleXFactor = finalSVGTemplate.height / currentSVGTemplate.width

          } else {
            scaleXFactor = templatesToRotate[templateName].width / currentSVGTemplate.width
            scaleYFactor = templatesToRotate[templateName].height / currentSVGTemplate.height
          }
          groupToAdd.addWithUpdate(item)
          item.clipPath = null
          canvas.remove(item)
          canvas.renderAll()

          if (index === addonsToRotateBeforeAdding.length - 1) {
            groupToAdd.setCoords()
            groupToAdd.rotate(templatesToRotate[templateName].angle)
            groupToAdd.scaleX = groupToAdd.scaleY = Math.max(scaleXFactor, scaleYFactor)
            groupToAdd.left = finalSVGTemplate.getBoundingRect().left + finalSVGTemplate.getBoundingRect().width / 2
            groupToAdd.top = finalSVGTemplate.getBoundingRect().top + finalSVGTemplate.getBoundingRect().height / 2
            groupToAdd.clipPath = clipPath[templateName]
            groupToAdd.clipPathName = item
            groupToAdd.patternGroup = true
            groupToAdd.clipPath.absolutePositioned = true

          }
        })
        canvas.renderAll()
      }

    }

    /** 
     @summary: Used to properly position addons that are patterns
     @description: add every patterns to a group. Set position of the group as Minimum of left and top of the elements in the template. Scale the group with Maximum of scaleX, scaleY. Reposition the group to the position of the new template
    **/
    const patternGroup = []
    Object.keys(designTemplateSVGList).forEach(item => {

      if (canvas._objects.find(canvasObject => {
        return canvasObject.clonedImage && canvasObject.svgType === item
      })) {

        const replacedSVGType = item.replace(currentSize, finalSize)
        if (replacedSVGType !== templateName) {
          const finalSVGTemplate = targetTemplateSVGList[replacedSVGType]

          const scaleXFactor = targetTemplateSVGList[item.replace(currentSize, finalSize)].width / designTemplateSVGList[item].width
          const scaleYFactor = targetTemplateSVGList[item.replace(currentSize, finalSize)].height / designTemplateSVGList[item].height
          patternGroup[item] = new fabric.Group()
         
          patternGroup[item].left = designTemplateSVGList[item].left + designTemplateSVGList[item].getBoundingRect().width / 2
          patternGroup[item].top = designTemplateSVGList[item].top + designTemplateSVGList[item].getBoundingRect().height / 2
          patternGroup[item].originX = "center"
          patternGroup[item].originY = "center"
          canvas.add(patternGroup[item])

          const objectLength = canvas._objects.length
          const canvasObjects = [...canvas._objects]
          for (let i = 0; i < objectLength; i++) {

            if (canvasObjects[i].svgType === item && canvasObjects[i].clonedImage) {
              patternGroup[item].addWithUpdate(canvasObjects[i])


              canvasObjects[i].clipPath = null
              canvas.remove(canvasObjects[i])

            }
          }

         
          patternGroup[item]._calcBounds()

          patternGroup[item].scaleX = patternGroup[item].scaleY = Math.max(scaleXFactor, scaleYFactor)

          if (templateToFlip && templateToFlip.length > 0 && templateToFlip.includes(finalSVGTemplate.name)) {
            patternGroup[item].rotate(180)
            patternGroup[item].left = finalSVGTemplate.oCoords.tr.x - finalSVGTemplate.getBoundingRect().width / 2
            patternGroup[item].top = finalSVGTemplate.oCoords.bl.y - finalSVGTemplate.getBoundingRect().height / 2
          } else {
            patternGroup[item].left = finalSVGTemplate.getBoundingRect().left + finalSVGTemplate.getBoundingRect().width / 2
            patternGroup[item].top = finalSVGTemplate.getBoundingRect().top + finalSVGTemplate.getBoundingRect().height / 2
          }

          patternGroup[item].setCoords();

          const groupLength = patternGroup[item]._objects.length
         
          patternGroup[item].clipPath = clipPath[item.replace(currentSize, finalSize)]
          patternGroup[item].clipPathName = item
          patternGroup[item].patternGroup = true
          patternGroup[item].clipPath.absolutePositioned = true
          canvas.renderAll()


        }
      }


    });

    /** 
     @summary: Used to properly position addons except patterns and addons that are not on a rotated template
     @description: Separately scale and reposition the elements in a template. Rotate 180 deg if the target template has a uv flip.
     If maximum scale value is used the right side or bottom side (depending on target template's width and height to that of current template) of the image/text will be moved outside a bit, If minimum scale value is used there will be a gap eiher in the top side or the bottom side
   **/
    [...canvas._objects].forEach(child => {
      const replacedSVGType = child.svgType?.replace(currentSize, finalSize)
      if (!child.svg && !child.name?.includes("safeZone") && child.svgType && (templateName && !Object.keys(templatesToRotate).includes(replacedSVGType) || !templateName) && !child.clonedImage) {

        child.left = child.getBoundingRect().left + child.getBoundingRect().width / 2
        child.top = child.getBoundingRect().top + child.getBoundingRect().height / 2
        child.originX = 'center'
        child.originY = 'center'
        child.setCoords()

        const finalSVGTemplate = targetTemplateSVGList[replacedSVGType]

        let additionalOffsetToMove
        const currentSVGTemplate = designTemplateSVGList[child.svgType]
        const scaleXFactor = finalSVGTemplate.width / currentSVGTemplate.width
        const scaleYFactor = finalSVGTemplate.height / currentSVGTemplate.height
        let xOffsetToMove = (child.left - (currentSVGTemplate.getBoundingRect().left + currentSVGTemplate.getBoundingRect().width / 2)) * scaleXFactor
        let yOffsetToMove = (child.top - (currentSVGTemplate.getBoundingRect().top + currentSVGTemplate.getBoundingRect().height / 2)) * scaleYFactor

        if (scaleXFactor < scaleYFactor) {

          additionalOffsetToMove = child.scaleX * scaleXFactor
        } else if (scaleXFactor > scaleYFactor) {

          additionalOffsetToMove = child.scaleY * scaleYFactor
        }

        child.scaleX = child.scaleX * Math.max(scaleXFactor, scaleYFactor)
        child.scaleY = child.scaleY * Math.max(scaleXFactor, scaleYFactor)

        if (templateToFlip && templateToFlip.length > 0 && templateToFlip.includes(finalSVGTemplate.name)) {
          child.rotate(child.angle + 180)
          child.left = (finalSVGTemplate.oCoords.tr.x - finalSVGTemplate.getBoundingRect().width / 2 - xOffsetToMove)
          child.top = (finalSVGTemplate.oCoords.bl.y - finalSVGTemplate.getBoundingRect().height / 2 - yOffsetToMove)
        } else {
          child.left = (finalSVGTemplate.getBoundingRect().left + finalSVGTemplate.getBoundingRect().width / 2 + xOffsetToMove)
          child.top = (finalSVGTemplate.getBoundingRect().top + finalSVGTemplate.getBoundingRect().height / 2 + yOffsetToMove)

        }

        child.clipPath = clipPath[replacedSVGType]
        canvas.bringToFront(child)
      }

      if ((child.svg && child.svgType?.includes("_" + currentSize))) {

        child.visible = false
      } else if (!child.guideLine) {
        if (child.patternGroup) {

          child._objects.forEach(subChild => {
            subChild.visible = true
          })
        }

        child.visible = true
        canvas.renderAll()
      }
      if (child.clipImageParentUuid) {
        child.visible = false
      }
    })

    canvas.renderAll()
    const scaleMultiplier = document.getElementById('2DCanvas')?.offsetWidth / 512
    const aiFilePath = designModel.baseURL + '/' + productName.modelPath.replace('fbx', 'png')
    fabric.Image.fromURL(aiFilePath, (finalOutDimensionFile) => {
      let outLineSVGPath = productName.modelPath.replace("FBXModel", "Images/OutlineSVG")
      outLineSVGPath = outLineSVGPath.replace("fbx", "svg")
      fabric.loadSVGFromURL(designModel.baseURL + '/' + outLineSVGPath, (outlineSVG) => {
        const group = new fabric.util.groupSVGElements(outlineSVG)
        group.scaleX = group.scaleX * scaleMultiplier
        group.scaleY = group.scaleY * scaleMultiplier
        group.left = group.left * scaleMultiplier
        group.top = group.top * scaleMultiplier
        group.setCoords()
        canvas.add(group)
        canvas.renderAll()
        group.visible = true
        finalOutDimensionFile.visible = false
        const maxDimension = Math.max(finalOutDimensionFile.width, finalOutDimensionFile.height)
        const maxDimensionInInches = maxDimension / dpisOfSizesSelected[selectedSVGGuid]
        const blob = new Blob([canvas.toSVG({
          encoding: 'ISO-8859-1', suppressPreamble: true, width: maxDimensionInInches + "in", height: maxDimensionInInches + "in"
        })], { type: 'image/svg+xml' });
        const reader = new FileReader()
        reader.readAsDataURL(blob);
        reader.onloadend = () => {
          progress+=progressBarUnit
          progressRef.current.setProgress(progress)
          progressRef.current.setMessage('Applying your custom design...')
          var base64data = reader.result;
          finalPrintableImageList[selectedSVGGuid] = base64data.split(',')[1]
          finalPrintFileDimensions[selectedSVGGuid] = { width: finalOutDimensionFile.width, height: finalOutDimensionFile.height }
          productName = productList.splice(0, 1)
          let size = sizeList.splice(0, 1)
          selectedSVGGuid = sizesSelectedByUser.splice(0, 1)

          if (productName.length > 0 && size.length > 0) {

            reAlignExistingTemplates(productName[0], size[0], canvasJSON, designTemplateSVGList, currentSize, false, productList, sizeList, resolve, selectedSVGGuid[0], sizesSelectedByUser, dpisOfSizesSelected, progress, progressBarUnit)
          } else {

            resolve({ finalPrintableImageList, finalPrintFileDimensions })
          }
        }
      })

    }, { crossOrigin: 'anonymous' })

  }



  useEffect(() => {
    const callGenerateJSON = async (design, designModel) => {
      let json = await generateJSON(design, designModel)
      return json
    }
    if (design.saveProduct) {
      showProgressLoader(true)
      const sizesSelectedByUser = design.selectedPrintSizes// Pdt variant ID
      let obj = {}
      let defaultDesignerJSON;
      const dpisOfSizesSelected = {}
      /**
      * @description Step1: Generate canvas JSON (along with design details)
      */
      //  Note when saving , can't combine edit and duplicate. becuase, duplicate and create use the same save api.
      callGenerateJSON(design, designModel)
        .then((res) => {
// Step 1 : Creating basic skeleton of payload (Variable name is obj)
          if (mode === 'create') {
            obj = {
              customerGuid: userDetails.customerGuid,
              title: designModel.title,
              description: designModel.description,
              designDetails: JSON.stringify(res),
              productLibraryVariants: [],
              imagePlacement: designerJSON?.imagePlacement,
              backImagePlacement: designerJSON?.backImagePlacement,
              images: []
            }
          }
          else if (mode === 'duplicate') {
            obj = {
              customerGuid: userDetails.customerGuid,
              title: designModel.title,
              description: designModel.description,
              designDetails: JSON.stringify(res),
              productLibraryVariants: [],
              imagePlacement: designerJSON?.imagePlacement,
              backImagePlacement: designerJSON?.backImagePlacement,
              images: []
            }

          }
          else if (mode === 'edit') {
            obj = {
              productLibraryGuid: designModel.productLibraryGuid,
              title: designModel.title,
              description: designModel.description,
              designDetails: JSON.stringify(res),
              productLibraryVariants: [],
              images: []
            }
          }
// Step 2: Populating the productLibraryVarinats in payload + preparing designerJSOnArray
          if (mode === 'create') {
            sizesSelectedByUser.forEach((item) => {
              const productToAdd = designModel.productVariants.find((ele) => {
                return ele.productVariantGuid === item
              })

              obj.productLibraryVariants.push({
                productVarientId: productToAdd.productVariantId,
                price: 2 * productToAdd.price,
                imageGuids: [],
                designDetails: JSON.stringify(res)
              })

            })
            defaultDesignerJSON = JSON.parse(designModel.productVariants.find(item => item.isDefaultTemplate).designerJSON)

            dpisOfSizesSelected = {}
            sizesSelectedByUser.forEach((child) => {
              const tempVar = designModel.productVariants.find((item) => (item.productVariantGuid === child))

              designerJSONArray.push(JSON.parse(tempVar.designerJSON))
              dpisOfSizesSelected[child] = tempVar.dpi
            })
          }
          else if (mode === 'duplicate') {
            sizesSelectedByUser.forEach((item) => {
              const productToAdd = designModel.productLibraryVariants.find((ele) => {
                return ele.productVariantGuid === item
              })

              const productFromDuplicate = duplicateProductDetails?.productLibraryVariants.find((child) => {
                return productToAdd.productVariantId === child.productVarientId
              })

              obj.productLibraryVariants.push({
                productVarientId: productToAdd.productVariantId,
                price: productToAdd.price,
                imageGuids: [],
                designDetails: JSON.stringify(res)
              })

            })

            defaultDesignerJSON = designModel.savedDesign.designerJSON

            dpisOfSizesSelected = {}
            sizesSelectedByUser.forEach((child) => {
              const tempVar = designModel.productLibraryVariants.find((item) => (item.productVariantGuid === child))
              designerJSONArray.push(JSON.parse(tempVar.designerJSON))
              dpisOfSizesSelected[child] = tempVar.dpi
            })

          }
          else if (mode === 'edit') {

            sizesSelectedByUser.forEach((item) => {
              const productToAdd = designModel.productLibraryVariants.find((ele) => {
                return ele.productVariantGuid === item
              })

              obj.productLibraryVariants.push({
                productLibraryVariantId: Number(productToAdd.productLibraryVariantId),
                productVariantId: productToAdd.productVariantId,
                price: productToAdd.price,
                imageGuids: [],
                designDetails: JSON.stringify(res),
                removedImageIds: []
              })

            })
            defaultDesignerJSON = designModel.savedDesign.designerJSON
            dpisOfSizesSelected = {}
            sizesSelectedByUser.forEach((child) => {
              const tempVar = designModel.productLibraryVariants.find((item) => (item.productVariantGuid === child))
              designerJSONArray.push(JSON.parse(tempVar.designerJSON))
              dpisOfSizesSelected[child] = tempVar.dpi
            })

          }
// Step 3: Based on type of mockup needed we have two flows (With models or without models) 
  /**
                 * @description Function used to add printfile image data for both DTG and normal ones
                 */
          const addPrintImageDataToAPIPayload = (finalImagesToPrint, finalPrintFileDimensions, imageType = 3) => {
            Object.keys(finalImagesToPrint).forEach((item, index) => {
              let printImageGuid = uuidv4()
              obj.images.push({
                guid: printImageGuid,
                imageType,
                image: {
                  fileName: `printFile-${index + 1}.svg`,
                  fileData: finalImagesToPrint[item]
                },
                displayOrder: index
              })

              const itemProductVariant = product.productVarients.find((ele) => (ele.guid === item))
              
              let itemToAddImageGuidIndex;
              if (mode === 'create' || mode === 'duplicate') {
                itemToAddImageGuidIndex = obj.productLibraryVariants.findIndex((ele) => {
                  return ele.productVarientId == itemProductVariant.id

                })
              }
              else if (mode === 'edit') {
                itemToAddImageGuidIndex = obj.productLibraryVariants.findIndex((ele) => {
                  return ele.productVariantId == itemProductVariant.id

                })
              }

              obj.productLibraryVariants[itemToAddImageGuidIndex].imageGuids.push(printImageGuid)
              obj.productLibraryVariants[itemToAddImageGuidIndex].printFileWidth = finalPrintFileDimensions[item].width
              obj.productLibraryVariants[itemToAddImageGuidIndex].printFileHeight = finalPrintFileDimensions[item].height



            })
          } 
          if (defaultDesignerJSON.mockupModel && defaultDesignerJSON.cameraViewPositions && defaultDesignerJSON.cameraTargetViewPositions) {
            sceneRef?.current?.generateMockup(canvasRef.current, defaultDesignerJSON, () => {

              Promise.all(sceneRef?.current?.switchViewsAndTakeSnapShots(canvasRef.current, 'front')).then(async (res) => {
                let uuid;
                for (let value of res) {
                  if (mode === 'create') {
                    uuid = uuidv4()

                    obj.images.push({
                      imageType: 2,
                      guid: uuid,
                      image: {
                        fileName: `${value.key}.png`,
                        fileData: value.file
                      },
                      displayOrder: res.indexOf(value),
                    })

                    sizesSelectedByUser.forEach((ele) => {
                      const productToAdd = designModel.productVariants.find((child) => {
                        return child.productVariantGuid === ele
                      })
                      obj.productLibraryVariants.forEach((item) => {

                        if (!item.imageGuids)
                          item.imageGuids = []
                        if (item.productVarientId === productToAdd.productVariantId)
                          item.imageGuids.push(uuid)
                      })
                    })
                  }
                  else if (mode === 'duplicate') {
                    uuid = uuidv4()

                    obj.images.push({
                      imageType: 2,
                      guid: uuid,
                      image: {
                        fileName: `${value.key}.png`,
                        fileData: value.file
                      },
                      displayOrder: res.indexOf(value),
                    })

                    sizesSelectedByUser.forEach((ele) => {
                      const productToAdd = designModel.productLibraryVariants.find((child) => {
                        return child.productVariantGuid === ele
                      })
                      obj.productLibraryVariants.forEach((item) => {

                        if (!item.imageGuids)
                          item.imageGuids = []
                        if (item.productVarientId === productToAdd.productVariantId)
                          item.imageGuids.push(uuid)
                      })
                    })
                  }
                  else if (mode === 'edit') {
                    uuid = uuidv4()

                    obj.images.push({
                      imageType: 2,
                      guid: uuid,
                      image: {
                        fileName: `${value.key}.png`,
                        fileData: value.file
                      },
                      displayOrder: res.indexOf(value),
                    })

                    sizesSelectedByUser.forEach((ele) => {
                      const productToAdd = designModel.productLibraryVariants.find((child) => {
                        return child.productVariantGuid === ele
                      })
                      obj.productLibraryVariants.forEach((item) => {

                        if (!item.imageGuids)
                          item.imageGuids = []
                        if (item.productVariantId === productToAdd.productVariantId)
                          item.imageGuids.push(uuid)
                      })
                    })
                  }
                }
                /**
                 * @description Step 3: If there are addon images, push them to request payload
                 */
                const variantListToBeUsed = mode === 'create' ? designModel.productVariants : designModel.productLibraryVariants
                if (design.addons.image.length > 0) {
                  for (let i = 0; i < design.addons.image.length; i++) {

                    obj.images.push({
                      imageType: 1,
                      guid: design.addons.image[i].uuid,
                      displayOrder: i,
                      libraryImageId: design.addons.image[i].libraryImageId
                    })
                    sizesSelectedByUser.forEach((ele) => {
                      const productToAdd = variantListToBeUsed.find((child) => {
                        return child.productVariantGuid === ele
                      })
                      obj.productLibraryVariants.forEach((item) => {
                        if (mode === 'create' || mode === 'duplicate') {
                          if (item.productVarientId === productToAdd.productVariantId)
                            item.imageGuids.push(design.addons.image[i].uuid)
                        }
                        else if (mode === 'edit') {
                          if (item.productVariantId === productToAdd.productVariantId)
                            item.imageGuids.push(design.addons.image[i].uuid)
                        }


                      })

                    })


                  }




                }

              
                /**
                 * @description Step 4: Generating print svgs for each selected size of product
                 */
                let finalImagesToPrint, finalPrintFileDimensions, frontImage, backImage
                if(designerJSONArray[0]?.designType === 2){
                  const { frontImage: frontImageTemp, backImage: backImageTemp, imageType } = await generatePrintFilesForDTGApparel(designerJSONArray[0], undefined, canvasRef.current, sizesSelectedByUser, dpisOfSizesSelected)
                  frontImage = frontImageTemp;
                  backImage = backImageTemp;
                 [frontImage, backImage].forEach((item) => {
                  const {imageType,finalPrintableImageList, finalPrintFileDimensions  } = item
                  if(finalPrintFileDimensions 
                  && Object.keys(finalPrintFileDimensions).length !== 0){
                    
                  addPrintImageDataToAPIPayload(finalPrintableImageList, finalPrintFileDimensions, imageType)}
                 })
                }
                else{
                const  { finalPrintableImageList: finalImagesToPrintTemp, finalPrintFileDimensions: finalPrintFileDimensionsTemp } = await createFinalPrintImages(designerJSONArray, [...sizesSelectedByUser], dpisOfSizesSelected)
                finalImagesToPrint = finalImagesToPrintTemp
                finalPrintFileDimensions= finalPrintFileDimensionsTemp
                addPrintImageDataToAPIPayload(finalImagesToPrint, finalPrintFileDimensions)
                }
               

                // Adding removed image guid to removeImageGuids key of obj
                if (mode === 'edit' || mode === 'duplicate') {
                  const savedDesign = designModel.savedDesign
                  for (let j = 0; j < obj.productLibraryVariants.length; j++) {
                    let ele = obj.productLibraryVariants[j]
                    for (let i = 0; i < savedDesign.addons.image.length; i++) {
                      if (!ele.imageGuids.includes(savedDesign.addons.image[i].uuid)) {

                        if (ele.removedImageIds)
                          ele.removedImageIds.push(savedDesign.addons.image[i].libraryImageId)
                      }
                    }
                  }
                  for (let j = 0; j < obj.productLibraryVariants.length; j++) {
                    let ele = obj.productLibraryVariants[j]

                    for (let i = 0; i < designModel.productLibraryVariants.length; i++) {
                      if (ele.productVariantId === designModel.productLibraryVariants[i].productVariantId) {
                        designModel.productLibraryVariants[i].libraryVariantImages.forEach((item) => {
                          if (item.imageType === 2 || item.imageType === 3) {
                            ele.removedImageIds.push(item.libraryImageId)
                          }
                        })
                      }
                    }
                  }

                }

                /**
                * @description Step 5: Saving everything
                */
                 progressRef.current.setMessage('Almost there...saving your item to product library...')
                
                if (mode === 'create') {
                  dispatch(saveSelectedProductSizes(obj))
                    .then((res) => {
                      if (200 <= res.statusCode && res.statusCode < 300) {

                        NotificationManager.success('Product saved to product library', '', 5000)
                        dispatch(clearEntireState())
                        router.push('/productlibrary')

                      }
                    })
                    .catch((err) => {
                      console.log(err)
                      NotificationManager.error('Unexpected error occured. Failed to save product.', '', 10000)
                    })
                }
                else if (mode === 'edit') {

                  dispatch(updateProduct(obj))
                    .then((res) => {
                      if (200 <= res.statusCode && res.statusCode < 300) {

                        NotificationManager.success('Changes saved successfully', '', 5000)
                        dispatch(clearEntireState())
                        router.push('/productlibrary')
                      }
                    })
                    .catch((err) => {
                      console.log(err)
                      NotificationManager.error('Unexpected error occured. Failed to save product.', '', 10000)
                    })
                }
                else if (mode === 'duplicate') {

                  dispatch(saveSelectedProductSizes(obj))
                    .then((res) => {
                      if (200 <= res.statusCode && res.statusCode < 300) {

                        NotificationManager.success('Product duplicated and saved to product library', '', 5000)
                        dispatch(clearEntireState())
                        router.push('/productlibrary')

                      }
                    })
                    .catch((err) => {
                      console.log(err)
                      NotificationManager.error('Unexpected error occured. Failed to save product.', '', 10000)
                    })
                }

              })
            })

          } else {
            Promise.all(generateMockupImages(canvasRef, sceneRef, defaultDesignerJSON))
              .then(async (res) => {
                let uuid;
                for (let value of res) {
                  if (mode === 'create') {
                    uuid = uuidv4()

                    obj.images.push({
                      imageType: 2,
                      guid: uuid,
                      image: {
                        fileName: `${value.key}.png`,
                        fileData: value.file
                      },
                      displayOrder: res.indexOf(value),
                    })

                    sizesSelectedByUser.forEach((ele) => {
                      const productToAdd = designModel.productVariants.find((child) => {
                        return child.productVariantGuid === ele
                      })
                      obj.productLibraryVariants.forEach((item) => {

                        if (!item.imageGuids)
                          item.imageGuids = []
                        if (item.productVarientId === productToAdd.productVariantId)
                          item.imageGuids.push(uuid)
                      })
                    })
                  }
                  else if (mode === 'duplicate') {
                    uuid = uuidv4()

                    obj.images.push({
                      imageType: 2,
                      guid: uuid,
                      image: {
                        fileName: `${value.key}.png`,
                        fileData: value.file
                      },
                      displayOrder: res.indexOf(value),
                    })

                    sizesSelectedByUser.forEach((ele) => {
                      const productToAdd = designModel.productLibraryVariants.find((child) => {
                        return child.productVariantGuid === ele
                      })
                      obj.productLibraryVariants.forEach((item) => {

                        if (!item.imageGuids)
                          item.imageGuids = []
                        if (item.productVarientId === productToAdd.productVariantId)
                          item.imageGuids.push(uuid)
                      })
                    })
                  }
                  else if (mode === 'edit') {
                    uuid = uuidv4()

                    obj.images.push({
                      imageType: 2,
                      guid: uuid,
                      image: {
                        fileName: `${value.key}.png`,
                        fileData: value.file
                      },
                      displayOrder: res.indexOf(value),
                    })

                    sizesSelectedByUser.forEach((ele) => {
                      const productToAdd = designModel.productLibraryVariants.find((child) => {
                        return child.productVariantGuid === ele
                      })
                      obj.productLibraryVariants.forEach((item) => {

                        if (!item.imageGuids)
                          item.imageGuids = []
                        if (item.productVariantId === productToAdd.productVariantId)
                          item.imageGuids.push(uuid)
                      })
                    })
                  }
                }
                /**
                 * @description Step 3: If there are addon images, push them to request payload
                 */
                const variantListToBeUsed = mode === 'create' ? designModel.productVariants : designModel.productLibraryVariants
                if (design.addons.image.length > 0) {
                  for (let i = 0; i < design.addons.image.length; i++) {

                    obj.images.push({
                      imageType: 1,
                      guid: design.addons.image[i].uuid,
                      displayOrder: i,
                      libraryImageId: design.addons.image[i].libraryImageId
                    })
                    sizesSelectedByUser.forEach((ele) => {
                      const productToAdd = variantListToBeUsed.find((child) => {
                        return child.productVariantGuid === ele
                      })
                      obj.productLibraryVariants.forEach((item) => {
                        if (mode === 'create' || mode === 'duplicate') {
                          if (item.productVarientId === productToAdd.productVariantId)
                            item.imageGuids.push(design.addons.image[i].uuid)
                        }
                        else if (mode === 'edit') {
                          if (item.productVariantId === productToAdd.productVariantId)
                            item.imageGuids.push(design.addons.image[i].uuid)
                        }


                      })

                    })


                  }




                }

                /**
                 * @description Step 4: Generating print svgs for each selected size of product
                 */

                 let finalImagesToPrint, finalPrintFileDimensions, frontImage, backImage
                if(designerJSONArray[0]?.designType === 2){
                  const { frontImage: frontImageTemp, backImage: backImageTemp, imageType } = await generatePrintFilesForDTGApparel(designerJSONArray[0], undefined, canvasRef.current, sizesSelectedByUser, dpisOfSizesSelected)
                  frontImage = frontImageTemp;
                  backImage = backImageTemp;
                 [frontImage, backImage].forEach((item) => {
                  const {imageType, finalPrintableImageList, finalPrintFileDimensions  } = item
                  if(finalPrintFileDimensions 
                    && Object.keys(finalPrintFileDimensions).length !== 0){
                  addPrintImageDataToAPIPayload(finalPrintableImageList, finalPrintFileDimensions, imageType)}
                 })
                }
                else{
                const  { finalPrintableImageList: finalImagesToPrintTemp, finalPrintFileDimensions: finalPrintFileDimensionsTemp } = await createFinalPrintImages(designerJSONArray, [...sizesSelectedByUser], dpisOfSizesSelected)
                finalImagesToPrint = finalImagesToPrintTemp
                finalPrintFileDimensions= finalPrintFileDimensionsTemp
                addPrintImageDataToAPIPayload(finalImagesToPrint, finalPrintFileDimensions)
                }

                // Adding removed image guid to removeImageGuids key of obj
                if (mode === 'edit' || mode === 'duplicate') {
                  const savedDesign = designModel.savedDesign
                  for (let j = 0; j < obj.productLibraryVariants.length; j++) {
                    let ele = obj.productLibraryVariants[j]
                    for (let i = 0; i < savedDesign.addons.image.length; i++) {
                      if (!ele.imageGuids.includes(savedDesign.addons.image[i].uuid)) {
                        if (ele.removedImageIds)
                          ele.removedImageIds.push(savedDesign.addons.image[i].libraryImageId)
                      }
                    }
                  }
                  for (let j = 0; j < obj.productLibraryVariants.length; j++) {
                    let ele = obj.productLibraryVariants[j]

                    for (let i = 0; i < designModel.productLibraryVariants.length; i++) {
                      if (ele.productVariantId === designModel.productLibraryVariants[i].productVariantId) {
                        designModel.productLibraryVariants[i].libraryVariantImages.forEach((item) => {
                          if (item.imageType === 2 || item.imageType === 3) {
                            ele.removedImageIds.push(item.libraryImageId)
                          }
                        })
                      }
                    }
                  }

                }

                /**
                * @description Step 5: Saving everything
                */
                 progressRef.current.setMessage('Almost there...saving your item to product library...')
                if (mode === 'create') {
                  dispatch(saveSelectedProductSizes(obj))
                    .then((res) => {
                      if (200 <= res.statusCode && res.statusCode < 300) {

                        NotificationManager.success('Product saved to product library', '', 5000)
                        dispatch(clearEntireState())
                        router.push('/productlibrary')

                      }
                    })
                    .catch((err) => {
                      console.log(err)
                      NotificationManager.error('Unexpected error occured. Failed to save product.', '', 10000)
                    })
                }
                else if (mode === 'edit') {

                  dispatch(updateProduct(obj))
                    .then((res) => {
                      if (200 <= res.statusCode && res.statusCode < 300) {

                        NotificationManager.success('Changes saved successfully', '', 5000)
                        dispatch(clearEntireState())
                        router.push('/productlibrary')
                      }
                    })
                    .catch((err) => {
                      console.log(err)
                      NotificationManager.error('Unexpected error occured. Failed to save product.', '', 10000)
                    })
                }
                else if (mode === 'duplicate') {

                  dispatch(saveSelectedProductSizes(obj))
                    .then((res) => {
                      if (200 <= res.statusCode && res.statusCode < 300) {

                        NotificationManager.success('Product duplicated and saved to product library', '', 5000)
                        dispatch(clearEntireState())
                        router.push('/productlibrary')

                      }
                    })
                    .catch((err) => {
                      console.log(err)
                      NotificationManager.error('Unexpected error occured. Failed to save product.', '', 10000)
                    })
                }

              })
          }



        });


    }
  }, [design.saveProduct])

  const router = useRouter()


  useEffect(() => {
    let baseURL;
    let designerJSON;

    const getPhotoLibraryImages = async () => {
      let res = await dispatch(getLibraryImages())
      if (res?.response?.libraryImages) {
        return res?.response?.libraryImages
      }
      return []
    }

    const getProductDetails = async () => {
      const res = await dispatch(getProductDesignDetails({ productId, productVariantId }))
      baseURL = res.response.baseURL
      designerJSON = parseJSON(res.response.productVariants.find((item) => item.isDefaultTemplate)?.designerJSON, router)
      dispatch(storeDefaultDesignerJSON(designerJSON))
      initCanvas(baseURL, designerJSON, designModel)
      dispatch(addModelConfig(res.response))
    }
    const getProductLibraryDetails = async () => {
      const res = await dispatch(getProductLibraryDesignDetails({ productLibraryId, productLibraryVariantId }))
      baseURL = res.response.baseURL
      let jsonParsed = JSON.parse(res?.response?.productLibraryVariants[0]?.designDetails)
      designerJSON = jsonParsed?.designDetails?.designerJSON


      const { designDetails, ...rest } = jsonParsed
      let saveObj = { ...res.response, productLibraryVariants: [...res.response.productLibraryVariants], savedDesign: designDetails }

      saveObj.productLibraryVariants[0].designDetails = rest

      dispatch(addModelConfig(saveObj))

      dispatch(addInitialDesign(designDetails))
      initCanvas(baseURL, designerJSON, rest, designDetails)

    }

    if (mode) {
      if (mode === 'create' && productVariantId && productId) {
        showLoader(true)
        getProductDetails()
      }
      else if (mode === 'edit' && productLibraryId && productLibraryVariantId) {
        showLoader(true)
        getProductLibraryDetails()
      }
      else if (mode === 'duplicate' && productLibraryId && productLibraryVariantId) {
        showLoader(true)
        getProductLibraryDetails()
      }
    }
    return () => {
      canvas.dispose()
    }
  }, [])

  useEffect(() => {
    if (canvasRef.current?._objects?.length > 0) {
      registerCanvasEvents({
        canvasRef,
        design,
        dispatch,
        loadScene,
        initCanvas,
        initialRender,
        svgPath,
        svgModels,
        svgType,
        selectedObject,
        drawOutlineForSVG,
        addPatterns
      })
    }
    return () => {
      unregisterCanvasEvents({
        canvasRef,
        design,
        dispatch,
        loadScene,
        initCanvas,
        initialRender,
        svgPath,
        svgModels,
        svgType,
        selectedObject,
        drawOutlineForSVG,
        addPatterns
      })
    }
  }, [design.fabricViewSelected, initCanvasDone])


  return (
    <>
      <canvas
        ref={canvasRef}
        id={canvasId}
        className={className}
      />
    </>
  )
})
export default DCanvas
