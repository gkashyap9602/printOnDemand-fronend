export const makeGreyScaleImage = (canvas, svgType, rect, svgPath) => {
  const bound = rect.getBoundingRect()

  let leftPointsForPolygon
  let rightPointsForPolygon
  const rectToClipWith = canvas._objects.find((item) => {
    return item.clippingRetangle
  })
  canvas.getActiveObject().oCoords.tl.x > canvas.getActiveObject().oCoords.tr.x &&
  canvas.getActiveObject().oCoords.tl.y > canvas.getActiveObject().oCoords.tr.y
    ? (leftPointsForPolygon = [
        { x: canvas.getActiveObject().oCoords.tl.x, y: canvas.getActiveObject().oCoords.tl.y },
        { x: canvas.getActiveObject().oCoords.tl.x, y: canvas.height },
        { x: 0, y: canvas.height },
        { x: 0, y: 0 },
        { x: canvas.getActiveObject().oCoords.br.x, y: 0 },
        { x: canvas.getActiveObject().oCoords.br.x, y: canvas.getActiveObject().oCoords.br.y },
        { x: canvas.getActiveObject().oCoords.tr.x, y: canvas.getActiveObject().oCoords.tr.y },
        { x: canvas.getActiveObject().oCoords.tl.x, y: canvas.getActiveObject().oCoords.tl.y }
      ])
    : (leftPointsForPolygon = [
        { x: canvas.getActiveObject().oCoords.tl.x, y: canvas.getActiveObject().oCoords.tl.y },
        { x: canvas.getActiveObject().oCoords.tl.x, y: 0 },
        { x: 0, y: 0 },
        { x: 0, y: canvas.height },
        { x: canvas.getActiveObject().oCoords.br.x, y: canvas.height },
        { x: canvas.getActiveObject().oCoords.br.x, y: canvas.getActiveObject().oCoords.br.y },
        { x: canvas.getActiveObject().oCoords.bl.x, y: canvas.getActiveObject().oCoords.bl.y },
        { x: canvas.getActiveObject().oCoords.tl.x, y: canvas.getActiveObject().oCoords.tl.y }
      ])

  canvas.getActiveObject().oCoords.tl.x > canvas.getActiveObject().oCoords.tr.x &&
  canvas.getActiveObject().oCoords.tl.y > canvas.getActiveObject().oCoords.tr.y
    ? (rightPointsForPolygon = [
        { x: canvas.getActiveObject().oCoords.tl.x, y: canvas.getActiveObject().oCoords.tl.y },
        { x: canvas.getActiveObject().oCoords.tl.x, y: canvas.height },
        { x: canvas.width, y: canvas.height },
        { x: canvas.width, y: 0 },
        { x: canvas.getActiveObject().oCoords.br.x, y: 0 },
        { x: canvas.getActiveObject().oCoords.br.x, y: canvas.getActiveObject().oCoords.br.y },
        { x: canvas.getActiveObject().oCoords.bl.x, y: canvas.getActiveObject().oCoords.bl.y },
        { x: canvas.getActiveObject().oCoords.tl.x, y: canvas.getActiveObject().oCoords.tl.y }
      ])
    : (rightPointsForPolygon = [
        {
          x: canvas.getActiveObject().oCoords.tl.x - 0.5,
          y: canvas.getActiveObject().oCoords.tl.y
        },
        { x: canvas.getActiveObject().oCoords.tl.x, y: 0 },
        { x: canvas.width, y: 0 },
        { x: canvas.width, y: canvas.height },
        { x: canvas.getActiveObject().oCoords.br.x - 0.5, y: canvas.height },
        {
          x: canvas.getActiveObject().oCoords.br.x - 0.5,
          y: canvas.getActiveObject().oCoords.br.y
        },
        { x: canvas.getActiveObject().oCoords.tr.x, y: canvas.getActiveObject().oCoords.tr.y },
        { x: canvas.getActiveObject().oCoords.tl.x - 0.5, y: canvas.getActiveObject().oCoords.tl.y }
      ])

  const polygonRight = new fabric.Polygon(rightPointsForPolygon, {
    fill: 'rgba(216,216,216, 0.8)',
    clipPath: svgPath[svgType],
    imageClipHelper: true,
    absolutePositioned: true,
    objectCaching: false
  })
  const polygonLeft = new fabric.Polygon(leftPointsForPolygon, {
    fill: 'rgba(216,216,216, 0.8)',
    clipPath: svgPath[svgType],
    imageClipHelper: true,
    absolutePositioned: true,
    objectCaching: false
  })

  canvas.clippingStarted = true
  canvas.add(polygonLeft)
  canvas.add(polygonRight)
  canvas.renderAll()
  polygonLeft.selectable = false
  polygonRight.selectable = false
  polygonRight.name = 'greyOutPolygonright'
  polygonLeft.name = 'greyOutPolygonleft'

  canvas.setActiveObject(rectToClipWith)
  canvas.renderAll()
}

export const cropAndAddImageToScene = (canvas, svgType) => {
  if (!canvas) return
  const rectToClipWith = canvas._objects.find((item) => {
    return item.clippingRetangle
  })

  let bound = rectToClipWith.getBoundingRect()
  const imageToClip = canvas._objects.find((item) => {
    return item.uuid === rectToClipWith.imageUuid
  })

  const parentImageAngle = imageToClip.angle
  rectToClipWith.setCoords()
  imageToClip.setCoords()
  let clonedImageFinalPosition = { x: rectToClipWith.oCoords.tl.x, y: rectToClipWith.oCoords.tl.y }
  const imagePositionBeforeRotate = { x: imageToClip.oCoords.tl.x, y: imageToClip.oCoords.tl.y }
  const group = new fabric.Group()
  group.left = imageToClip.left
  group.top = imageToClip.top
  group.addWithUpdate(imageToClip)
  group.addWithUpdate(rectToClipWith)
  const groupItems = group._objects
  group.evented = false
  canvas.add(group)
  ;[...groupItems].forEach((child) => {
    canvas.remove(child)
  })
  group.rotate(-imageToClip.angle)
  group._restoreObjectsState()
  canvas.remove(group)
  ;[...groupItems].forEach((child) => {
    canvas.add(child)
    child.visible = false
  })
  imageToClip.setCoords()
  rectToClipWith.setCoords()
  let takeImagePosForRect = false
  let takeRectPositionForLeft = true
  let takeRectPositionForTop = true

  if (!rectToClipWith.isContainedWithinObject(imageToClip)) {
    if (rectToClipWith.oCoords.tl.x < imageToClip.oCoords.tl.x) {
      rectToClipWith.width -=
        (imageToClip.oCoords.tl.x - rectToClipWith.oCoords.tl.x) / rectToClipWith.scaleX
      rectToClipWith.left = imageToClip.oCoords.tl.x
      takeImagePosForRect = true
      takeRectPositionForLeft = false
    }
    if (rectToClipWith.oCoords.tl.y < imageToClip.oCoords.tl.y) {
      rectToClipWith.height -=
        (imageToClip.oCoords.tl.y - rectToClipWith.oCoords.tl.y) / rectToClipWith.scaleY
      rectToClipWith.top = imageToClip.oCoords.tl.y
      takeImagePosForRect = true
      takeRectPositionForTop = false
    }
    if (rectToClipWith.oCoords.tr.x > imageToClip.oCoords.tr.x) {
      rectToClipWith.width -=
        (rectToClipWith.oCoords.tr.x - imageToClip.oCoords.tr.x) / rectToClipWith.scaleX
    }
    if (rectToClipWith.oCoords.br.y > imageToClip.oCoords.br.y) {
      rectToClipWith.height -=
        (rectToClipWith.oCoords.br.y - imageToClip.oCoords.br.y) / rectToClipWith.scaleY
    }
    rectToClipWith.setCoords()
  }

  imageToClip.setCoords()

  rectToClipWith.setCoords()
  bound = rectToClipWith.getBoundingRect()

  canvas.renderAll()
  imageToClip.clone(
    (clonedImageToAdd) => {
      clonedImageToAdd.visible = true
      imageToClip.clipDiff = {
        leftDiff: rectToClipWith.oCoords.tl.x - imageToClip.oCoords.tl.x,
        topDiff: rectToClipWith.oCoords.tl.y - imageToClip.oCoords.tl.y
      }

      clonedImageToAdd.cropped = true
      if (!imageToClip.currentClip) {
        imageToClip.currentClip = { x: 0, y: 0 }
        imageToClip.baseImageParams = {
          width: imageToClip.width,
          height: imageToClip.height,
          left: imageToClip.left,
          top: imageToClip.top
        }
      }

      rectToClipWith.setCoords()
      imageToClip.setCoords()
      clonedImageToAdd.set({
        cropX:
          Math.abs(rectToClipWith.oCoords.tl.x - imageToClip.oCoords.tl.x) / imageToClip.scaleX +
          imageToClip.currentClip?.x,
        cropY:
          Math.abs(rectToClipWith.oCoords.tl.y - imageToClip.oCoords.tl.y) / imageToClip.scaleY +
          imageToClip.currentClip?.y,
        width: bound.width / imageToClip.scaleX,
        height: bound.height / imageToClip.scaleY,

        dirty: true
      })
      clonedImageToAdd.left = rectToClipWith.oCoords.tl.x
      clonedImageToAdd.top = rectToClipWith.oCoords.tl.y

      canvas.add(clonedImageToAdd)

      imageToClip.clipImageParentUuid = imageToClip.uuid
      imageToClip.uuid = ''
      imageToClip.visible = false
      if (takeImagePosForRect) {
        const groupWithImageAndRect = new fabric.Group()
        groupWithImageAndRect.left = imageToClip.oCoords.tl.x
        groupWithImageAndRect.top = imageToClip.oCoords.tl.y

        canvas.add(groupWithImageAndRect)

        groupWithImageAndRect.addWithUpdate(imageToClip)
        groupWithImageAndRect.addWithUpdate(rectToClipWith)

        canvas.remove(imageToClip)
        canvas.remove(rectToClipWith)
        groupWithImageAndRect.rotate(parentImageAngle)
        groupWithImageAndRect.left = imagePositionBeforeRotate.x
        groupWithImageAndRect.top = imagePositionBeforeRotate.y

        canvas.remove(groupWithImageAndRect)
        canvas.add(imageToClip)
        canvas.add(rectToClipWith)
        groupWithImageAndRect._restoreObjectsState()
        canvas.renderAll()
        clonedImageToAdd.rotate(parentImageAngle)
        clonedImageToAdd.left = rectToClipWith.left
        clonedImageToAdd.top = rectToClipWith.top
      } else {
        clonedImageToAdd.rotate(parentImageAngle)
        clonedImageToAdd.left = clonedImageFinalPosition.x
        clonedImageToAdd.top = clonedImageFinalPosition.y
      }

      canvas.requestRenderAll()
      const imageClipHelper = canvas._objects.filter((item) => {
        return item.imageClipHelper
      })
      ;[...imageClipHelper].forEach((child) => {
        canvas.remove(child)
      })
      canvas.clippingStarted = false
      canvas.setActiveObject(clonedImageToAdd)
    },
    ['uuid', 'svgType']
  )
}
