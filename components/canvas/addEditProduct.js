export const addEditProductToCanvas = (json, canvas, design, addPatterns, callBack, showLoader, scaleMultiplier) => {
  if (!canvas) {
    return
  }

  if (scaleMultiplier === 0) {
    scaleMultiplier = 1
  }

  canvas.loadFromJSON(json, (canvasAdded) => {

    const canvasObjects = [...canvas._objects]
    canvas.clipPath = null
    const lastIndexOfClonedImage = canvasObjects.findIndex((item) => {
      return item.clonedImage === true
    })

    canvas._objects.forEach(child => {

      if (!child.svg && !child.guideLine && child.clipPath) {
        child.clipPath?.scaleX = child.clipPath.scaleX * scaleMultiplier
        child.clipPath?.scaleY = child.clipPath.scaleY * scaleMultiplier
        child.clipPath?.left = child.clipPath.left * scaleMultiplier
        child.clipPath?.top = child.clipPath.top * scaleMultiplier
      }
      child.scaleX = child.scaleX * scaleMultiplier
      child.scaleY = child.scaleY * scaleMultiplier
      child.left = child.left * scaleMultiplier
      child.top = child.top * scaleMultiplier
      child.setCoords()

    })
    canvas.renderAll()
    const finalPatternAdded = false
    for (let i = 0; i < canvasObjects.length; i++) {
      if (canvasObjects[i].svg) {
        canvasObjects[i].selectable = false
      }
      if (canvasObjects[i].clonedImage) {
        showLoader(true)
        if (i === lastIndexOfClonedImage) {
          finalPatternAdded = true
        }
        addPatterns(
          canvasObjects[i].spacing,
          canvasObjects[i],
          canvasObjects[i].patternType,
          canvas,
          canvasObjects[i].svgType,
          undefined,
          design.layers,
          'edit',
          finalPatternAdded
        )
      }
    }

    if (callBack) {
      callBack()
    }

  })
}
