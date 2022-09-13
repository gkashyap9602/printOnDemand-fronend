const renderIcon = (icon) => {
  return function renderIcon(ctx, left, top, styleOverride, fabricObject) {
    var size = this.cornerSize
    ctx.save()
    ctx.translate(left, top)
    ctx.rotate(fabric.util.degreesToRadians(fabricObject.angle))
    ctx.drawImage(icon, -size / 2, -size / 2, size, size)
    ctx.restore()
  }
}

export const addControlButtons = (fabric, rotateObject, removeObject, baseURL) => {
  let deleteButton = document.createElement('img')
  let rotate90Button = document.createElement('img')
  let rotatenegative90Button = document.createElement('img')
  let resetButton = document.createElement('img')
  resetButton.crossOrigin = 'anonymous'
  rotate90Button.crossOrigin = 'anonymous'
  rotatenegative90Button.crossOrigin = 'anonymous'
  deleteButton.crossOrigin = 'anonymous'
  rotate90Button.src = baseURL + '/' + 'Images/rotate_90_degrees.svg'
  rotatenegative90Button.src = baseURL + '/' + 'Images/rotate_-90_degrees.svg'
  resetButton.src = baseURL + '/' + 'Images/reset.svg'
  //deleteButton.src = 'Images/delete.svg'

  fabric.Object.prototype.controls.rotate90Controls = new fabric.Control({
    x: 0.5,
    y: -0.5,
    offsetY: 0,
    offsetX: 20,
    cursorStyle: 'pointer',
    mouseUpHandler: () => {
      rotateObject(90)
    },
    render: renderIcon(rotate90Button),
    cornerSize: 19
  })

  fabric.Object.prototype.controls.rotateNegative90Controls = new fabric.Control({
    x: -0.5,
    y: -0.5,
    offsetY: 0,
    offsetX: -20,
    cursorStyle: 'pointer',
    mouseUpHandler: () => {
      rotateObject(-90)
    },
    render: renderIcon(rotatenegative90Button),
    cornerSize: 19
  })

  fabric.Object.prototype.controls.resetControls = new fabric.Control({
    x: 0,
    y: -0.5,
    offsetY: -20,
    offsetX: 0,
    cursorStyle: 'pointer',
    mouseUpHandler: () => {
      rotateObject('reset')
    },
    render: renderIcon(resetButton),
    cornerSize: 19
  })
}
