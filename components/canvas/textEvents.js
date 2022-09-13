import { updateAddOnsList } from 'redux/actions/designToolActions.js'

export const addText = (text, canvasRef, findCanvasParameters, design, svgPath) => {
  const canvas = canvasRef?.current
  if (!canvas || !canvas._objects) {
    return
  }
  let left
  let top
  let svgWidth
  let svgHeight
  if (canvas._objects.length > 0) {
    ;[left, top, svgWidth, svgHeight] = findCanvasParameters(canvas, design.fabricViewSelected)
  }

  const savedCanvasWidth = canvas._objects.find((item) => {
    return item.currentCanvasWidth
  })

  const savedWidth = savedCanvasWidth ? savedCanvasWidth.currentCanvasWidth : 512
  const scaleMultiplier = document.getElementById('2DCanvas')?.offsetWidth / savedWidth
  const addedText = new fabric.IText(text.text, {
    fontSize: text.fontSize,
    fontFamily: text.textFont,
    fill: text.textColor,
    textAlign: 'center',
    originX: 'center',
    originY: 'center',
    editable: false
  })
  addedText.uuid = text.uuid
  addedText.set('dirty', true)
  addedText.left = left + svgWidth / 2
  addedText.top = top + svgHeight / 2 - addedText.height / 2
  addedText.scaleX = addedText.scaleX * scaleMultiplier
  addedText.scaleY = addedText.scaleY * scaleMultiplier
  addedText.clipPath = svgPath[design.fabricViewSelected]
  addedText.setCoords()
  addedText.set('dirty', true)
  canvas.add(addedText)
  addedText.svgType = design.fabricViewSelected
  canvas.setActiveObject(addedText)
}

export const changeTextParameters = (value, parameter, selectedAddon, canvasRef, dispatch) => {
  const canvas = canvasRef.current
  if (!canvas) {
    return
  }
  const textToChange = canvas.getActiveObject()

  switch (parameter) {
    case 'fill':
      textToChange.set({ fill: value })
      textToChange.set('dirty', true)
      break

    case 'fontSize':
    case 'fontFamily':
      textToChange.set(parameter, value)
      break

    case 'text':
      textToChange.text = value
      break
  }

  canvas.renderAll()
  dispatch(updateAddOnsList('text', selectedAddon))
}
