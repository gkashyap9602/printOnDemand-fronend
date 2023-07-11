/* eslint-disable require-jsdoc */
import React from 'react'
import * as THREE from 'three'
import { FBXLoader } from 'three/examples/jsm/loaders/FBXLoader'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'
import { svgModelConstants } from 'constants/svgModelConstants'
export default class LoadScene {
  constructor(fabricCanvas, showLoader, linearProgressRef) {
    this.textures = {
      cotton: 'Images/Textures/linen_normal.png'

    }

    this.mockupGenerationStarted = false
    this.fabricCanvas = fabricCanvas
    this.showLoader = showLoader
    const scope = this

    this.scene = new THREE.Scene()
    THREE.ImageUtils.crossOrigin = 'anonymous'
    const container = document.getElementById('3DCanvas')
    THREE.Texture.prototype.crossOrigin = 'anonymous'
    THREE.TextureLoader.prototype.crossOrigin = 'anonymous'
    const texture = new THREE.Texture(container)
    texture.needsUpdate = true
    this.scene.background = new THREE.Color(0xf4f4f4)
    const viewWidth = document.getElementById('3DCanvas')?.offsetWidth
    const viewHeight = document.getElementById('3DCanvas')?.offsetHeight
    this.camera = new THREE.PerspectiveCamera(45, viewWidth / viewHeight, 0.01, 1000)
    this.renderer = new THREE.WebGLRenderer({
      canvas: container,
      antialias: true,
      preserveDrawingBuffer: true
    })
    this.renderer.setSize(viewWidth, viewHeight)

    window.addEventListener('resize', () => {
      this.renderer?.setSize(viewWidth, viewHeight)
      this.registerMouseListeners()
    })

    this.renderer.setClearColor(0xffffff, 0)
    this.renderer.shadowMap.enabled = true
    this.renderer.shadowMapSoft = true
    this.renderer.shadowMap.type = THREE.PCFSoftShadowMap


    this.controls = new OrbitControls(this.camera, container)
    this.controls.target.set(0, 0.2395, 0)

    this.controls.maxPolarAngle = 1.8898633306306627
    this.controls.minPolarAngle = 1

    this.controls.addEventListener('change', () => {
      this.renderScene()
    })

    const geometry = new THREE.PlaneGeometry(window.innerWidth, window.innerHeight, 5, 5)
    const material = new THREE.ShadowMaterial({
      color: 0x9b9b9b
    })
    this.plane = new THREE.Mesh(geometry, material)
    this.plane.name = 'shadow_plane'
    this.plane.rotateOnWorldAxis(new THREE.Vector3(1, 0, 0), THREE.Math.degToRad(-90))
    this.plane.position.y = 0
    this.plane.receiveShadow = true
    this.scene.add(this.plane)

    this.renderScene()

    const canvas = document.getElementById('2DCanvas')
    this.canvasTexture = new THREE.CanvasTexture(canvas)
    this.canvasTexture.repeat.set(1, 1)
    this.progressValue = 0;
    this.loadingManager = new THREE.LoadingManager()

    this.loadingManager.onStart = (url, loaded, total) => {

      this.progressValue = 0;
      linearProgressRef?.current?.setProgress(0)
    }

    this.loadingManager.onProgress = (url, loaded, total) => {
      this.progressValue = loaded / total * 100;
      linearProgressRef?.current?.setProgress(loaded / total * 100)
    }
    this.loadingManager.onLoad = () => {
      this.progressValue = 100;
      linearProgressRef?.current?.setProgress(100)
    }
    animate()
    function animate() {


      scope.id = requestAnimationFrame(animate)

      scope.renderer.render(scope.scene, scope.camera)
    }
  }

  preloadModel(modelPath, lightAdded, callBack, mode) {
    const svgKeys = Object.keys(this.svgModels.types)
    const fbxLoader = new FBXLoader(this.loadingManager)
    fbxLoader.load(
      modelPath,
      (model) => {
        model.scale.set(0.005, 0.005, 0.005)
        model.position.set(0, 0, 0)
        if (this.svgModels.backFacing) {
          model.rotation.y = Math.PI
        }
        if (this.svgModels?.unlockRotation) {
          this.controls.maxPolarAngle = Math.PI
          this.controls.minPolarAngle = 0
        } else {
          this.controls.maxPolarAngle = 1.8898633306306627
          this.controls.minPolarAngle = 1
        }
        let box = new THREE.Box3().setFromObject(model)
        if (this.svgModels.orientation) {
          model.rotateOnWorldAxis(new THREE.Vector3(1, 0, 0), THREE.Math.degToRad(90))
          box = new THREE.Box3().setFromObject(model)
          model.position.y += box.getSize(new THREE.Vector3()).y / 2
          if (this.svgModels.cameraPosition) {
            this.camera.position.set(
              this.svgModels.cameraPosition.x,
              box.max.y / 2,
              this.svgModels.cameraPosition.z
            )
          }
          box.setFromObject(model)

        } else if (this.svgModels.modelZoomOut) {
          this.camera.position.set(
            this.svgModels.modelZoomOut.x,
            box.max.y / 2,
            this.svgModels.modelZoomOut.z
          )

          this.camera.lookAt(new THREE.Vector3(0, box.max.y / 2, 0))
        } else {
          this.camera.position.set(0, 0, 1)
        }

        this.controls.maxDistance = this.camera.position.z + 0.2
        this.controls.minDistance = this.camera.position.z - 0.2
        if (this.controls.minDistance === 0) {
          this.controls.minDistance = 0.1
        }

        this.controls.target.set(0, box.max.y / 2, 0)
        this.camera.updateMatrixWorld(true)
        this.controls.update()
        this.model = model
        this.scene.add(model)
        this.plane.position.y = box.min.y
        model.traverse((child) => {
          if (child instanceof THREE.Mesh) {
            child.castShadow = true

            if (svgKeys.includes(child.name)) {
              const material = new THREE.MeshPhongMaterial()
              child.material = material
              child.material.bumpMap = this.loadedTextures['cotton']
              child.material.bumpMap.wrapS = THREE.RepeatWrapping
              child.material.bumpMap.wrapT = THREE.RepeatWrapping
              child.material.bumpMap.repeat.set(5, 5)
              child.material.bumpMap.anisotropy = this.renderer.capabilities.getMaxAnisotropy()
              child.material.bumpMap.minFilter = THREE.LinearFilter
              child.material.bumpMap.needsUpdate = true
              child.material.needsUpdate = true
              child.material.bumpScale = 0.001
            } else if (!this.svgModels.defaultMesh) {
              const material = new THREE.MeshPhongMaterial()
              child.material = material
              child.material.color = new THREE.Color(0xffffff)
              child.material.bumpMap = this.loadedTextures['cotton']
              child.material.bumpMap.wrapS = THREE.RepeatWrapping
              child.material.bumpMap.wrapT = THREE.RepeatWrapping
              child.material.bumpMap.repeat.set(5, 5)
              child.material.bumpMap.anisotropy = this.renderer.capabilities.getMaxAnisotropy()
              child.material.bumpMap.minFilter = THREE.LinearFilter
              child.material.bumpMap.needsUpdate = true
              child.material.needsUpdate = true
              child.material.bumpScale = 0.001
            }
            //Print File Bug Fix
            if (!svgKeys.includes(child.name) && this.svgModels.meshColor) {
              if(this.svgModels.meshColor.includes("0x")){
                child.material.color = new THREE.Color(this.svgModels.meshColor?.replace('0x', '#'))
              }else{
                child.material.color = new THREE.Color(this.svgModels.meshColor)
              } 
            }
            //Print File Bug Fix
            child.material.side = THREE.DoubleSide
          }
        })
        if (!lightAdded) {
          this.addLight()
        }

        this.mapMaterial()
        model.updateMatrixWorld()
        this.renderer.render(this.scene, this.camera)

        this.fabricCanvas.renderAll()
        // if (mode === 'edit' || mode === 'duplicate' || this.svgModels.transparentPrint) {
        //   callBack('3DModel')
        // } else {
        //   //this.showLoader(false)
        // }
        callBack('3DModel')
        this.registerMouseListeners()
      },
      (progress) => { },
      (error) => {
        console.log('error', error)
      }
    )
  }

  registerMouseListeners() {
    const view = document.getElementById('3DCanvas')
    const boundingRect = view?.getBoundingClientRect()
    const rayCaster = new THREE.Raycaster()
    view?.addEventListener('mousedown', (event) => {
      const cursorPosition = new THREE.Vector3(
        ((event.clientX - boundingRect.left) / view?.offsetWidth) * 2 - 1,
        -((event.clientY - boundingRect.top) / view.offsetHeight) * 2 + 1,
        0.5
      )
      rayCaster.setFromCamera(cursorPosition, this.camera)
      let intersects = []
      if(!this.model){
        return
      }
      intersects = rayCaster.intersectObjects([this.model], true)
      if (intersects?.length === 0) {
        this.fabricCanvas.discardActiveObject()
      }

    })
  }

  renderCanvas() {
    this.fabricCanvas._objects.forEach((child) => {
      if (child.name !== this.svgModels.default && child.svg === true) {
        child.visible = false
        this.model.getObjectByName('right_leg').material.map.needsUpdate = false
      }
    })
  }

  preLoadTextures(initialModel, modelName, designerJSON, callBack, mode, baseURL) {

    // this.textures["3DThumbnail"] = baseURL + designerJSON.types[designerJSON.default].replace('Images', '/Images/Thumbnail')
    //   .replace('svg', 'png')
    this.baseURL = baseURL
    //this.showLoader(true)
    const textureLoader = new THREE.TextureLoader()
    this.texturePromises = []
    this.loadedTextures = []
    this.svgModels = designerJSON
    for (const key in this.textures) {
      this.texturePromises.push(
        new Promise((resolve, reject) => {
          textureLoader.load(baseURL + '/' + this.textures[key], (texture) => {
            this.loadedTextures[key] = texture
            resolve(texture)
          })
        })
      )
    }

    Promise.all(this.texturePromises).then((res) => {
      if (initialModel) {
        this.preloadModel(modelName, false, callBack, mode)
      }
    })
  }

  renderScene() {
    this.renderer.render(this.scene, this.camera)
  }
  mapMaterial() {

    this.canvasTexture.wrapS = THREE.RepeatWrapping
    this.canvasTexture.wrapT = THREE.RepeatWrapping

    this.model.children.forEach((child) => {
      if (Object.keys(this.svgModels.types).includes(child.name) || child.name === "fringes") {
        child.material.map = this.canvasTexture.clone()
        child.material.map.needsUpdate = true
        child.material.map.anisotropy = this.renderer.capabilities.getMaxAnisotropy()
        child.material.map.minFilter = THREE.LinearFilter
        child.material.color = new THREE.Color(0xffffff)
      }
    })
  }

  generateMockup(canvas, svgModels, callBack) {
    this.mockupGenerationStarted = true
    this.finalMockupImages = []
    this.svgModels = svgModels
    this.cameraFinalPosition = { ...this.camera.position }
    this.controlsTargetPos = { ...this.controls.target }

    this.cameraPointLight.intensity = 0

    this.cameraViewPositions = this.svgModels.cameraViewPositions

    this.cameraTargetViewPositions = new THREE.Vector3(
      this.svgModels.cameraTargetViewPositions.x,
      this.svgModels.cameraTargetViewPositions.y,
      this.svgModels.cameraTargetViewPositions.z
    )


    this.renderer.gammaOutput = true
    canvas._objects.forEach((child) => {
      if (!child.name?.includes('safeZone') && !child.guideLine) {
        child.visible = true
      } else {
        child.visible = false
      }
    })
    canvas.clipPath = null
    canvas.discardActiveObject()
    canvas.renderAll()
    const fbxLoader = new FBXLoader()
    this.model.visible = false
    fbxLoader.load(this.baseURL + '/' + this.svgModels.mockupModel, (mockupModel) => {
      mockupModel.scale.set(0.005, 0.005, 0.005)

      mockupModel.position.set(0, 0, 0)
      this.scene.add(mockupModel)
      this.mockupModel = mockupModel
      this.mockupModel.updateMatrixWorld(true)
      this.canvasTexture.wrapS = THREE.RepeatWrapping
      this.canvasTexture.wrapT = THREE.RepeatWrapping


      mockupModel.traverse((child) => {
        child.visible = true
        if (Object.keys(this.svgModels.types).includes(child.name)) {
          const material = new THREE.MeshPhongMaterial()
          child.material = material
          child.material.color = new THREE.Color(0xffffff)
          child.material.bumpMap = this.loadedTextures['cotton']
          child.material.bumpMap.wrapS = THREE.RepeatWrapping
          child.material.bumpMap.wrapT = THREE.RepeatWrapping
          child.material.bumpMap.repeat.set(5, 5)
          child.material.bumpMap.anisotropy = 9007199254740991
          child.material.bumpMap.needsUpdate = true
          child.material.needsUpdate = true
          child.material.bumpScale = 0.001
          child.material.map = this.canvasTexture.clone()
          child.material.map.needsUpdate = true
          child.material.map.anisotropy = 9007199254740991
          child.material.color = new THREE.Color(0xffffff)
          child.material.map.encoding = THREE.sRGBEncoding
        } else {
          if (child instanceof THREE.Mesh) {

            child.material.alphaMap = null

            child.material.needsUpdate = true

          }
        }
      })
      this.renderer.render(this.scene, this.camera)

      THREE.DefaultLoadingManager.onLoad = () => {
        if (this.mockupModel && this.mockupGenerationStarted) {
          this.mockupGenerationStarted = false
          callBack()

        }


      };

    })
  }

  switchViewsAndTakeSnapShots(canvas, view) {
    const syncCaptureImagePromises = []


    for (let i = 0; i < Object.keys(this.cameraViewPositions).length; i++) {
      let key = Object.keys(this.cameraViewPositions)[i]

      this.mockupModel.children.forEach((child) => {
        if (child instanceof THREE.Mesh) {
          if (!Object.keys(this.svgModels.types).includes(child.name)) {
            if (child.name?.includes(key)) {
              child.visible = true
              this.renderer.render(this.scene, this.camera)
            } else {
              child.visible = false
            }
          }
        }
      })
      this.renderer.render(this.scene, this.camera)

      this.camera.position.set(
        this.cameraViewPositions[key].x,
        this.cameraViewPositions[key].y,
        this.cameraViewPositions[key].z
      )

      this.camera.lookAt(
        this.cameraTargetViewPositions.x,
        this.cameraTargetViewPositions.y,
        this.cameraTargetViewPositions.z
      )
      this.controls.update()
      this.renderer.render(this.scene, this.camera)


      syncCaptureImagePromises.push(
        new Promise((resolve, reject) => {


          resolve({
            key: key,
            file: this.renderer.domElement.toDataURL('image/jpg').split(',')[1]
          })
        })
      )

    }

    return syncCaptureImagePromises
  }

  removePreviewModel(canvas, currentView, designerJSON) {

    this.mockupGenerationStarted = false
    if (this.mockupModel.parent instanceof THREE.Scene) {

      this.scene.remove(this.mockupModel)
      this.mockupModel = null
      this.renderer.gammaOutput = false
    }
    this.model.visible = true
    this.cameraPointLight.intensity = 0.1
    this.camera.position.copy(this.cameraFinalPosition)
    this.camera.lookAt(this.controlsTargetPos)
    this.camera.updateMatrixWorld(true)
    this.controls.update()

    const svgType = currentView
    const safeZone = canvas._objects.find((item) => {
      if (item.name === svgType + 'safeZone') {
        return item
      }
    })
    safeZone?.visible = false;
    [...canvas._objects].forEach((child) => {
      if (child.guideLine) {
        canvas.remove(child)
      }
    })

    const objects = canvas.getObjects()

    objects.forEach((child) => {
      if (child.svg && child.svgType === svgType) {
        child.visible = true
      } else if (child.visible) {
        child.visible = false
      }

    })
    canvas.renderAll()

    objects.forEach((child) => {
      if (child.svgType === svgType && !child.svg && !child.repeatingPattern) {
        child.visible = true
      }
      if (child.clipImageParentUuid) {
        child.visible = false
      }
    })
    canvas.renderAll()
  }

  addLight() {
    const ambientLight = new THREE.AmbientLight(0x404040, 0.8)
    this.scene.add(ambientLight)
    const hemisphereLight = new THREE.HemisphereLight(0xffffff, 1.1)
    hemisphereLight.position.set(0, 500, 100)
    hemisphereLight.intensity = 1.1
    this.scene.add(hemisphereLight)
    this.hemisphereLight = hemisphereLight

    this.directionalLight = new THREE.DirectionalLight(0xffffff, 0)
    this.directionalLight.position.set(-8, 20, 10)
    this.directionalLight.shadow.mapSize.width = 2048 * 4
    this.directionalLight.shadow.mapSize.height = 2048 * 4
    this.scene.add(this.directionalLight)
    this.directionalLight.castShadow = true

    ambientLight.position.set(0, 10, 0)
    const pointLight = new THREE.PointLight(0xffffff, 0.5)
    pointLight.position.set(0, 10, 0)
    const modelBox = new THREE.Box3().setFromObject(this.model)
    this.cameraPointLight = new THREE.PointLight(0xffffff, 0.1)
    this.cameraPointLight.position.set(10, modelBox.getSize(new THREE.Vector3()).y / 2, -100)

    this.cameraPointLight.target = new THREE.Vector3(
      0,
      modelBox.getSize(new THREE.Vector3()).y / 2,
      0
    )
    this.scene.add(this.cameraPointLight)
    this.renderScene()
  }

  changeFabricMaterial(fabricPath) {
    const textureLoader = new THREE.TextureLoader()
    textureLoader.load(fabricPath, (fabricImage) => {
      this.fabricCanvas.clipPath = null
      this.fabricCanvas._objects.forEach((child) => {
        if (!child.guideLine) child.visible = true
      })
      this.fabricCanvas.renderAll()
      this.model.children.forEach((child) => {
        if (child.material?.bumpMap) {
          child.material.bumpMap = fabricImage
          child.material.bumpMap.wrapS = THREE.RepeatWrapping
          child.material.bumpMap.wrapT = THREE.RepeatWrapping
          child.material.bumpMap.anisotropy = this.renderer.capabilities.getMaxAnisotropy()
          child.material.bumpMap.minFilter = THREE.LinearFilter
          child.material.bumpMap.needsUpdate = true
          child.material.needsUpdate = true
          child.material.bumpScale = 0.0004
        }
      })
    })
  }

  rotateCameraToGetAngleViews() {
    this.model.rotateOnWorldAxis(new THREE.Vector3(0, 1, 0), THREE.Math.degToRad(90))
  }
}
