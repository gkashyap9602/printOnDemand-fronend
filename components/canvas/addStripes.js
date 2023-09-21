const addLines = (stripeType, spacing, adjustSpacing, pattern) => {
    if (left === undefined) {
        findCanvasParameters()
    }

    if (spacing === undefined) {
        spacing = 6
    }
    if (adjustSpacing) {
        canvas.remove(pattern)
        canvas.renderAll()
    }

    const lineArray = []
    let line
    let linePosition
    if (stripeType === 'horizontal') {
        linePosition = left + svgWidth / 2 + spacing / 2

        while (linePosition < left + svgWidth) {
            line = new fabric.Line([linePosition, top, linePosition, top + svgHeight], {
                stroke: 'black'
            })

            linePosition += line.getBoundingRect().width + spacing
            lineArray.push(line)
        }
        linePosition = left + svgWidth / 2 - spacing / 2

        while (linePosition > left) {
            line = new fabric.Line([linePosition, top, linePosition, top + svgHeight], {
                stroke: 'black'
            })
            linePosition -= line.getBoundingRect().width + spacing
            lineArray.push(line)
        }
        let lineGroup = new fabric.Group(lineArray)
        lineGroup.selectable = false
        lineGroup.svgType = svgType
        lineGroup.visibleAfterClip = true
        lineGroup.linePattern = true
        canvas.add(lineGroup)
    } else if (stripeType === 'vertical') {
        linePosition = top + svgHeight / 2 + spacing / 2

        while (linePosition < top + svgHeight) {
            line = new fabric.Line([left, linePosition, left + svgWidth, linePosition], {
                stroke: 'black'
            })

            linePosition += line.getBoundingRect().height + spacing
            lineArray.push(line)
        }
        linePosition = top + svgHeight / 2 - spacing / 2

        while (linePosition > top) {
            line = new fabric.Line([left, linePosition, left + svgWidth, linePosition], {
                stroke: 'black'
            })
            linePosition -= line.getBoundingRect().height + spacing
            lineArray.push(line)
        }
        let lineGroup = new fabric.Group(lineArray)
        lineGroup.selectable = false
        lineGroup.svgType = svgType
        lineGroup.visibleAfterClip = true
        lineGroup.linePattern = true
        canvas.add(lineGroup)
    }

    canvas.renderAll()
}