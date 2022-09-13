import * as THREE from 'three'

export const generateMockupImages = (canvasRef, sceneRef, svgModels) => {
  const canvas = canvasRef.current
  canvas.discardActiveObject()
  canvas.renderAll()

  const loadScene = sceneRef.current
  const box = new THREE.Box3().setFromObject(loadScene.model)
  let mockupImages = {}
  let syncCaptureImagePromises = []
  loadScene.model.rotation.y = 0
  const views = {
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
  return syncCaptureImagePromises
}
