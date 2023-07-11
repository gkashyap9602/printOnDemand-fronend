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

export const changeColorForProduct = (imgColor, canvasRef, changeFabricSVG, svgType, sceneRef, design) => {

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

        if (design.designerJSON.designType !== 2 || design.designerJSON.types.length === 1) {
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
                    loadScene.model?.getObjectByName(child.name)?.material?.map.needsUpdate = true
                    loadScene.model?.getObjectByName(child.name)?.material?.needsUpdate = true
                }


            })
        } else {

            Object.keys(design.designerJSON.types).forEach(designPanels => {

                canvas._objects.forEach(canvasChild => {

                    if (canvasChild.svgType === designPanels && !canvasChild.name?.includes("safeZone") && !canvasChild.invisibleOnModel && !canvasChild.clipImageParentUuid) {

                        canvasChild.visible = true
                    } else {

                        canvasChild.visible = false
                    }
                    if (canvasChild.svg && !canvasChild.name.includes('safeZone')) {
                        canvasChild.fill = imgColor
                        if (canvas.transparentPrint) {
                            canvasChild.transparentSVG = false
                        }
                        canvasChild.set('dirty', true)
                    }
                })

                canvas.renderAll()
                loadScene.model?.getObjectByName(designPanels)?.material?.map.needsUpdate = true
                loadScene.model?.getObjectByName(designPanels)?.material?.needsUpdate = true
                loadScene.renderer.render(loadScene.scene, loadScene.camera)
            })
        }
        // canvas.getObjects().forEach(child => {

        //     if (!child?.name?.includes("safeZone") && !child?.invisibleOnModel) {
        //         child.visible = true
        //     }
        //     if (child.clipImageParentUuid) {
        //         child.visible = false
        //     }
        // })
        // canvas.getObjects().forEach((child) => {
        //     if (child.svg && !child.name.includes('safeZone')) {
        //         child.visible = true
        //         child.fill = imgColor
        //         if (canvas.transparentPrint) {
        //             child.transparentSVG = false
        //         }
        //         child.set('dirty', true)
        //         loadScene.model?.getObjectByName(child.name)?.material?.map.needsUpdate = true
        //         loadScene.model?.getObjectByName(child.name)?.material?.needsUpdate = true
        //     }


        // })
        resolve(canvas.renderAll())
    })

    syncColorChange.then((res) => {
        changeFabricSVG(svgType, true)
        canvas.renderAll()
    })
}