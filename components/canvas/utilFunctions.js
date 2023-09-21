import * as THREE from 'three'

export const generateMockupImages = (canvasRef, sceneRef, svgModels) => {
  const canvas = canvasRef.current
  canvas.discardActiveObject()
  canvas._objects.forEach((child) => {
    if (child?.name?.includes('safeZone')) child.visible = false
  })
  canvas.renderAll()

  const loadScene = sceneRef.current
  const box = new THREE.Box3().setFromObject(loadScene.model)
  let mockupImages = {}
  let syncCaptureImagePromises = []

  if(svgModels.orientation === 90){
    loadScene.model.rotation.z = 0
  }else{
    loadScene.model.rotation.y = 0
  }
  const originalPosition={...loadScene.model.rotation}
  const views = (Object.keys(svgModels.types).length === 1 && svgModels.designType !== 2) ? {
    front: 0
  } : {
    front: 0,
    right: Math.PI / 2,
    back: Math.PI / 2,
    left: Math.PI / 2
  }
  const targetValue = new THREE.Vector3(0, box.max.y / 2, 0)
  const cameraInitialposition = new THREE.Vector3()
  if (svgModels.modelZoomOut) {
    cameraInitialposition.set(
      svgModels.modelZoomOut.x,
      svgModels.modelZoomOut.y,
      svgModels.modelZoomOut.z
    )
  } else if (svgModels.cameraPosition) {
    cameraInitialposition.set(
      svgModels.cameraPosition.x,
      svgModels.cameraPosition.y,
      svgModels.cameraPosition.z
    )
  } else {
    cameraInitialposition.set(0, box.max.y / 2, 0.8)
  }
  loadScene.camera.position.copy(cameraInitialposition)
  loadScene.camera.lookAt(targetValue)
  
  for (let i = 0; i < Object.keys(views).length; i++) {
    let key = Object.keys(views)[i]
    syncCaptureImagePromises.push(
      new Promise((resolve, reject) => {
        loadScene.model.rotateOnWorldAxis(new THREE.Vector3(0, 1, 0), views[key])
        loadScene.renderer.render(loadScene.scene, loadScene.camera)

        resolve({
          key: key,
          file: loadScene.renderer.domElement.toDataURL('image/png').split(',')[1]
        })
      })
    )
  }
  loadScene.model.rotation.set(originalPosition._x,originalPosition._y,originalPosition._z)
  return syncCaptureImagePromises
}

export const orientationIndicator = (canvas) => {
  const topText = new fabric.IText('Top', {
    fontSize: 17,
    fill: '#000000',
    originX: 'left',
    originY: 'top',
    editable: false,
    selectable: false
  })
  topText.name="top"
  const line = new fabric.Line([38, 5, 38, 20], {
    fill: 'black',
    stroke: 'black',
    strokeWidth: 1.5,
    selectable: false,
    evented: false
  })
  
  const triangle = new fabric.Triangle({
    width: 8,
    height: 10,
    
  });
  triangle.left = 34
  triangle.top=0

  // const triangle = new fabric.Polygon([{x:35, y:30},{x:45, y:30},{x:40, y:35},]);
  triangle.setCoords()
  topText.setCoords()
  line.setCoords()
  const arrowGroup= new fabric.Group([line,triangle])
  arrowGroup.name="arrow"
  
  const group = new fabric.Group([topText, arrowGroup])

  group.indicator = true
  line.setArrow = true
  canvas.add(group)
}
