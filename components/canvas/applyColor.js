export const changeColor = (imgColor, canvasRef, selectedView) => {
    const canvas = canvasRef.current
    if (!canvas || !canvas._objects) {
        return
    }
    const activeGroup = canvas._objects.find(item => {
        return item.name === selectedView
    })

    if (canvas.transparentPrint) {
        activeGroup?.transparentSVG = false
    }
    activeGroup?.fill = imgColor
    activeGroup?.set('dirty', true)
    canvas.renderAll()
}

export const changeColorForProduct = (imgColor, canvasRef, changeFabricSVG, svgType, sceneRef) => {

    const loadScene = sceneRef.current
    const canvas = canvasRef.current
    if (!canvas || !loadScene || !canvas._objects) {
        return
    }
    const ctx = canvas.getContext('2D')
    const syncColorChange = new Promise((resolve, reject) => {
        canvas.discardActiveObject()
        ctx.restore()
        ctx.save()
        canvas.clipPath = null
        canvas.getObjects().forEach(child => {

            if (!child?.name?.includes("safeZone") && !child?.invisibleOnModel) {
                child.visible = true
            }
            if (child.clipImageParentUuid) {
                child.visible = false
            }
        })
        canvas.getObjects().forEach((child) => {
            if (child.svg && !child.name.includes('safeZone')) {
                child.visible = true
                child.fill = imgColor
                if (canvas.transparentPrint) {
                    child.transparentSVG = false
                }
                child.set('dirty', true)
                loadScene.model.getObjectByName(child.name)?.material?.map.needsUpdate = true
                loadScene.model.getObjectByName(child.name)?.material?.needsUpdate = true
            }


        })
        resolve(canvas.renderAll())
    })

    syncColorChange.then((res) => {
        changeFabricSVG(svgType, true)
        canvas.renderAll()
    })
}