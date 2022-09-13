import { changeSelectedAddOn, updateSelectedAddOn, changeImageDimensions, setCropStatus } from 'redux/actions/designToolActions'

const updateGreyScalePolygon = (canvas) => {

  if (canvas.getActiveObject() === undefined || canvas.getActiveObject() === null) {
    return
  }
  const greyOutPolygonLeft = canvas._objects.find(item => {
    return item.name === "greyOutPolygonleft"
  })
  const greyOutPolygonRight = canvas._objects.find(item => {
    return item.name === "greyOutPolygonright"
  })

  const coords = canvas.getActiveObject()?.calcCoords()
  const rectToClipWith = canvas._objects.find(item => {
    return item.clippingRetangle
  })
  rectToClipWith?.setCoords()

  let leftPointsForPolygon
  let rightPointsForPolygon

  (canvas.getActiveObject().oCoords.tl.x > canvas.getActiveObject().oCoords.tr.x && canvas.getActiveObject().oCoords.tl.y > canvas.getActiveObject().oCoords.tr.y) ? leftPointsForPolygon = [{ x: canvas.getActiveObject().oCoords.tl.x, y: canvas.getActiveObject().oCoords.tl.y },
  { x: canvas.getActiveObject().oCoords.tl.x, y: canvas.height },
  { x: 0, y: canvas.height },
  { x: 0, y: 0 },
  { x: canvas.getActiveObject().oCoords.br.x, y: 0 },
  { x: canvas.getActiveObject().oCoords.br.x, y: canvas.getActiveObject().oCoords.br.y },
  { x: canvas.getActiveObject().oCoords.tr.x, y: canvas.getActiveObject().oCoords.tr.y },
  { x: canvas.getActiveObject().oCoords.tl.x, y: canvas.getActiveObject().oCoords.tl.y }

  ] :
    leftPointsForPolygon = [{ x: canvas.getActiveObject().oCoords.tl.x, y: canvas.getActiveObject().oCoords.tl.y },
    { x: canvas.getActiveObject().oCoords.tl.x, y: 0 },
    { x: 0, y: 0 },
    { x: 0, y: canvas.height },
    { x: canvas.getActiveObject().oCoords.br.x, y: canvas.height },
    { x: canvas.getActiveObject().oCoords.br.x, y: canvas.getActiveObject().oCoords.br.y },
    { x: canvas.getActiveObject().oCoords.bl.x, y: canvas.getActiveObject().oCoords.bl.y },
    { x: canvas.getActiveObject().oCoords.tl.x, y: canvas.getActiveObject().oCoords.tl.y }
    ];

  (canvas.getActiveObject().oCoords.tl.x > canvas.getActiveObject().oCoords.tr.x && canvas.getActiveObject().oCoords.tl.y > canvas.getActiveObject().oCoords.tr.y) ?
    rightPointsForPolygon = [{ x: canvas.getActiveObject().oCoords.tl.x, y: canvas.getActiveObject().oCoords.tl.y },
    { x: canvas.getActiveObject().oCoords.tl.x, y: canvas.height },
    { x: canvas.width, y: canvas.height },
    { x: canvas.width, y: 0 },
    { x: canvas.getActiveObject().oCoords.br.x, y: 0 },
    { x: canvas.getActiveObject().oCoords.br.x, y: canvas.getActiveObject().oCoords.br.y },
    { x: canvas.getActiveObject().oCoords.bl.x, y: canvas.getActiveObject().oCoords.bl.y },
    { x: canvas.getActiveObject().oCoords.tl.x, y: canvas.getActiveObject().oCoords.tl.y }
    ] :
    rightPointsForPolygon = [{ x: canvas.getActiveObject().oCoords.tl.x - 0.5, y: canvas.getActiveObject().oCoords.tl.y },
    { x: canvas.getActiveObject().oCoords.tl.x, y: 0 },
    { x: canvas.width, y: 0 },
    { x: canvas.width, y: canvas.height },
    { x: canvas.getActiveObject().oCoords.br.x - 0.5, y: canvas.height },
    { x: canvas.getActiveObject().oCoords.br.x - 0.5, y: canvas.getActiveObject().oCoords.br.y },
    { x: canvas.getActiveObject().oCoords.tr.x, y: canvas.getActiveObject().oCoords.tr.y },
    { x: canvas.getActiveObject().oCoords.tl.x - 0.5, y: canvas.getActiveObject().oCoords.tl.y }

    ]

  greyOutPolygonLeft?.points = leftPointsForPolygon
  greyOutPolygonLeft.setCoords()
  greyOutPolygonLeft._setPositionDimensions({})

  greyOutPolygonRight?.points = rightPointsForPolygon
  greyOutPolygonRight.setCoords()
  greyOutPolygonRight._setPositionDimensions({})
  canvas.renderAll()
}

const handleSelectionCreated = (object, dispatch, design) => {

  if (object?.target?.imageClipHelper) {
    return
  }
  if (object?.target?.uuid) {
    dispatch(changeSelectedAddOn(object?.target?.uuid))
  } else {

    dispatch(updateSelectedAddOn({}))
  }

}

const handleSelectionCleared = (canvas, dispatch) => {

  dispatch(updateSelectedAddOn({}))
}

export const removeClonedImagesAndUpdate = (canvas, activeObject, selectedView, addPatterns) => {
  const objectsToRemove = []


  const syncClonedObjectDelete = new Promise((resolve, reject) => {
    canvas._objects.forEach((child) => {
      if (child.svgType === selectedView && child.clonedImage && child !== activeObject && child.parentImageUuid === activeObject.parentImageUuid) {
        objectsToRemove.push(child)
      }
    })
    objectsToRemove.forEach((child) => {
      canvas.remove(child)
    })
    canvas.renderAll()
    resolve()
  })

  syncClonedObjectDelete.then((res) => {

    addPatterns(activeObject.spacing, activeObject, activeObject.patternType, canvas, selectedView, undefined, canvas.layers)
  })
}

const respositionSelectedObject = (selectedObject, selectedView) => {
  selectedObject.left =
    selectedView.left +
    selectedView.width / 2 -
    selectedObject.getBoundingRect().width / 2 +
    Math.abs(selectedObject.left - selectedObject.getBoundingRect().left)
  selectedObject.top =
    selectedView.top +
    selectedView.height / 2 -
    selectedObject.getBoundingRect().height / 2 +
    Math.abs(selectedObject.top - selectedObject.getBoundingRect().top)
}

export const unregisterCanvasEvents = ({
  canvasRef,
  design,
  dispatch,
  loadScene,
  initialRender,
  initialColor,
  svgPath,
  svgModels,
  svgType,
  selectedObject,
  drawOutlineForSVG,
  addPatterns
}) => {
  const canvas = canvasRef.current

  for (const key in canvas?.__eventListeners) {
    if (key !== 'after:render') {
      canvas.__eventListeners[key] = []
    }
  }
}

export const registerCanvasEvents = ({
  canvasRef,
  design,
  dispatch,
  loadScene,
  initialRender,
  initialColor,
  svgPath,
  svgModels,
  svgType,
  selectedObject,
  drawOutlineForSVG,
  addPatterns
}) => {

  let outlineForSvg = []
  const canvas = canvasRef.current
  if (canvas._objects?.length > 0) {
    outlineForSvg = design?.fabricViewSelected
      ? drawOutlineForSVG(canvas, design?.fabricViewSelected)
      : drawOutlineForSVG(canvas, svgType)
  }

  canvas.on('object:modified', (object) => {

    if (object?.target?.clippingRetangle) {
      const rectToClip = object?.target
      const imageToClip = canvas._objects.find(item => {
        return item.uuid === rectToClip.imageUuid
      })

    }

    if (object.action === "scale" || object.action === "scaleX" || object.action === "scaleY") {

      object.target.objectCaching = false
      object.target.set('dirty', true)
      object.target?.clipPath?.objectCaching = false

      if (!object.target.text && !object.target.imageClipHelper) {
        dispatch(changeImageDimensions(object.target.uuid, object.target.width * object.target.scaleX, object.target.height * object.target.scaleY))
      }

    }
  })

  canvas.on('selection:created', (object) => handleSelectionCreated(object, dispatch))

  canvas.on('selection:updated', (object) => handleSelectionCreated(object, dispatch))

  canvas.on('selection:cleared', () => handleSelectionCleared(canvas, dispatch))

  canvas.on('mouse:down', (object) => {

    if (canvas.clippingStarted) {

      if (!object.target || !object?.target?.clippingRetangle) {
        dispatch(setCropStatus('none'))
      }
    }
    if (object.target && object.target.svg) {
      return
    }
    selectedObject = object.target
    if (selectedObject && outlineForSvg.length === 0) {
      outlineForSvg = drawOutlineForSVG(canvas, design.fabricViewSelected)
    }
    outlineForSvg.forEach((child) => {
      canvas.bringToFront(child)
    })
  })



  canvas.on('object:moved', (object) => {
    const translatedObject = object.target

    if (translatedObject?.clonedImage) {

      removeClonedImagesAndUpdate(canvas, translatedObject, design.fabricViewSelected, addPatterns)
    }
  })

  canvas.on('object:rotated', (object) => {
    const rotatedObject = object.target
    if (rotatedObject?.clonedImage) {
      removeClonedImagesAndUpdate(canvas, rotatedObject, design.fabricViewSelected, addPatterns)
    }
  })

  canvas.on('object:scaled', (object) => {
    object.target.objectCaching = false
    object.target.set('dirty', true)
    object.target?.clipPath?.objectCaching = false
    const scaledObject = object.target
    if (scaledObject?.clonedImage) {
      removeClonedImagesAndUpdate(canvas, scaledObject, design.fabricViewSelected, addPatterns)
    }
  })

  canvas.on('mouse:up', (object) => {
    if (selectedObject) {
      outlineForSvg.forEach((child) => {
        child.visible = false
      })
      if (selectedObject.clippingRetangle) {

        const imageToClip = canvas._objects.find(item => {
          return item.uuid === selectedObject.imageUuid
        })
        selectedObject.setCoords()
        const pointsToCheck = ["tl", "tr", "bl", "br"]
        let pointOutsideImage = false
        for (let i = 0; i < pointsToCheck.length; i++) {
          if (imageToClip.containsPoint(selectedObject.oCoords[pointsToCheck[i]])) {
            pointOutsideImage = false
            break
          } else {
            pointOutsideImage = true
          }
        }
        if (pointOutsideImage) {
          selectedObject.left = imageToClip.left
          selectedObject.top = imageToClip.top
          updateGreyScalePolygon(canvas)
        }

      } else {
        const selectedView = canvas._objects.find((item) => {
          return item.name === design?.fabricViewSelected
        })

        if (
          selectedObject.getBoundingRect().left + selectedObject.getBoundingRect().width <
          selectedView?.getBoundingRect().left ||
          selectedObject.getBoundingRect().left >
          selectedView?.getBoundingRect().left + selectedView?.getBoundingRect().width
        ) {
          respositionSelectedObject(selectedObject, selectedView)
        } else if (
          selectedObject.getBoundingRect().top + selectedObject.getBoundingRect().height <
          selectedView?.getBoundingRect().top ||
          selectedObject.getBoundingRect().top >
          selectedView?.getBoundingRect().top + selectedView?.getBoundingRect().height
        ) {
          respositionSelectedObject(selectedObject, selectedView)
        }
        canvas.renderAll()
        selectedObject = null
      }

    }
  })

  canvas.on('mouse:move', () => {
    if (selectedObject) {
      if (!selectedObject.clippingRetangle) {
        outlineForSvg.forEach((child) => {
          child.visible = true
        })
      }


      if (canvas.clippingStarted) {
        updateGreyScalePolygon(canvas)


      }
      canvas.renderAll()
    }
  })
}
