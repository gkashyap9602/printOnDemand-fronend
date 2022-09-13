import { DESIGNTOOL } from '../types/actions'

const intialState = {
  addons: {
    text: [],
    image: []
  },
  layers: {},
  selectedAddOn: {},
  fabricViewList: [],

  fabricViewSelected: '',
  fabricViewColor: {},
  fabricEntireProduct: {
    applyToAll: false,
    color: '#FFFFFF'
  },
  uploadedImages: [],
  selectedObjectPosition: '', //top, left, bottom, right. No need to save for individual items
  saveProduct: false,
  designerJSON: {},
  baseURL: '',
  selectedPrintSizes: [],
  cropStatus: 'none'
}

const designToolReducer = (state = intialState, action) => {
  switch (action.type) {
    case DESIGNTOOL.ADD_TEXT: {
      let obj = []
      if (state.layers[state.fabricViewSelected]) {
        obj = state.layers[state.fabricViewSelected]
      }
      return {
        ...state,
        addons: {
          ...state.addons,
          text: [...state.addons.text, { ...action.payload, locked: false }]
        },
        selectedAddOn: action.payload,
        layers: {
          ...state.layers,
          [state.fabricViewSelected]: [
            {
              // ...action.payload,
              uuid: action.payload.uuid,
              type: 'text',
              // title: action.payload.text,
              locked: false
            },
            ...obj
          ]
        }
      }
    }
    case DESIGNTOOL.UPLOAD_IMAGE: {
      return {
        ...state,
        uploadedImages: [...state.uploadedImages, { ...action.payload }]
      }
    }
    case DESIGNTOOL.ADD_IMAGE_TO_CANVAS: {
      let obj = []
      if (state.layers[state.fabricViewSelected]) {
        obj = state.layers[state.fabricViewSelected]
      }
      return {
        ...state,
        addons: {
          ...state.addons,
          image: [
            ...state.addons.image,
            { ...action.payload, locked: false, patternApplied: false, patternType: '' }
          ]
        },
        selectedAddOn: { ...action.payload, patternApplied: false, patternType: '' },
        layers: {
          ...state.layers,
          [state.fabricViewSelected]: [
            {
              // ...action.payload,
              uuid: action.payload.uuid,
              type: 'image',
              // title: action.payload.text,
              locked: false
            },
            ...obj
          ]
        }
      }
    }
    case DESIGNTOOL.REORDER_LAYER: {
      //When reordering, update the view's layer array and add the item moved to slected addon
      const uuid = action.payload.layerData[action.payload.destinationIndex].uuid
      let updatedData = {}
      if (action.payload.layerData[action.payload.destinationIndex].type === 'text') {
        updatedData = state.addons.text.find((item) => {
          return item.uuid === uuid
        })
      } else {
        updatedData = state.addons.image.find((item) => {
          return item.uuid === uuid
        })
      }
      return {
        ...state,
        layers: {
          ...state.layers,
          [state.fabricViewSelected]: action.payload.layerData
        },
        selectedAddOn: updatedData
      }
    }
    case DESIGNTOOL.LOCK_LAYER: {
      let layerToBeLocked = state.layers[state.fabricViewSelected].find((item) => {
        return item.uuid === action.payload.uuid
      })
      return {
        ...state,
        layers: {
          ...state.layers,
          [state.fabricViewSelected]: [
            ...state.layers[state.fabricViewSelected].slice(0, action.payload.index),
            { ...layerToBeLocked, locked: true },
            ...state.layers[state.fabricViewSelected].slice(action.payload.index + 1)
          ]
        }
      }
    }
    case DESIGNTOOL.UNLOCK_LAYER: {
      let layerToBeUnlocked = state.layers[state.fabricViewSelected].find((item) => {
        return item.uuid === action.payload.uuid
      })
      return {
        ...state,
        layers: {
          ...state.layers,
          [state.fabricViewSelected]: [
            ...state.layers[state.fabricViewSelected].slice(0, action.payload.index),
            { ...layerToBeUnlocked, locked: false },
            ...state.layers[state.fabricViewSelected].slice(action.payload.index + 1)
          ]
        }
      }
    }
    case DESIGNTOOL.DELETE_LAYER: {
      // Delete layer from layers array and addons array
      let layers_minus_layerToBeDeleted = state.layers[state.fabricViewSelected].filter((item) => {
        return item.uuid !== action.payload.uuid
      })
      let filteredAddonsArr = []
      if (action.payload.type === 'text') {
        filteredAddonsArr = state.addons.text.filter((item) => {
          return item.uuid !== action.payload.uuid
        })
        return {
          ...state,
          addons: { ...state.addons, text: filteredAddonsArr },
          selectedAddOn: {},
          layers: {
            ...state.layers,
            [state.fabricViewSelected]: [...layers_minus_layerToBeDeleted]
          }
        }
      } else {
        filteredAddonsArr = state.addons.image.filter((item) => {
          return item.uuid !== action.payload.uuid
        })
        return {
          ...state,
          addons: { ...state.addons, image: filteredAddonsArr },
          selectedAddOn: {},
          layers: {
            ...state.layers,
            [state.fabricViewSelected]: [...layers_minus_layerToBeDeleted]
          }
        }
      }
    }
    case DESIGNTOOL.CHANGE_COLOR_VIEW: {
      return {
        ...state,
        fabricViewColor: {
          ...state.fabricViewColor,
          [action.payload.fabricViewSelected]: action.payload.color
        }
      }
    }
    case DESIGNTOOL.CHANGE_COLOR_ALL: {
      let obj = {}
      for (let i = 0; i < state.fabricViewList.length; i++) {
        obj[state.fabricViewList[i]] = action.payload
      }
      return {
        ...state,
        fabricEntireProduct: {
          ...state.fabricEntireProduct,
          color: action.payload
        },
        fabricViewColor: {
          ...obj
        }
      }
    }
    case DESIGNTOOL.TOGGLE_APPLY_TO_ALL: {
      return {
        ...state,
        fabricEntireProduct: {
          ...state.fabricEntireProduct,
          applyToAll: !state.fabricEntireProduct.applyToAll
        }
      }
    }
    case DESIGNTOOL.CHANGE_VIEW: {
      return {
        ...state,
        fabricViewSelected: action.payload,
        fabricEntireProduct: {
          ...state.fabricEntireProduct,
          applyToAll: false
        }
      }
    }
    case DESIGNTOOL.UPDATE_FABRIC_VIEW_LIST: {
      return {
        ...state,
        fabricViewList: [...action.payload]
      }
    }
    case DESIGNTOOL.CHANGE_SELECTED_ADDON: {
      // If uuid in text, put that to selectedAddon, elseif in image, put that, else it means the item was deleted so jsut return state

      if (
        state.addons.text.find((item) => {
          return item.uuid === action.payload
        })
      )
        return {
          ...state,
          selectedAddOn: state.addons.text.find((item) => {
            return item.uuid === action.payload
          })
        }
      else if (
        state.addons.image.find((item) => {
          return item.uuid === action.payload
        })
      ) {
        return {
          ...state,
          selectedAddOn: state.addons.image.find((item) => {
            return item.uuid === action.payload
          })
        }
      } else {
        return state
      }
    }
    case DESIGNTOOL.UPDATE_SELECTED_ADDON: {
      return {
        ...state,
        selectedAddOn: action.payload
      }
    }
    case DESIGNTOOL.UPDATE_ADDONS_LIST: {
      if (action.payload.type === 'text') {
        let textListWithoutItem = state.addons.text.filter(
          (item) => item.uuid !== action.payload.data.uuid
        )
        return {
          ...state,
          addons: {
            ...state.addons,
            text: [...textListWithoutItem, action.payload.data]
          }
        }
      } else {
        let imageListWithoutItem = state.addons.image.filter(
          (item) => item.uuid !== action.payload.data.uuid
        )
        return {
          ...state,
          addons: {
            ...state.addons,
            image: [...imageListWithoutItem, action.payload.data]
          }
        }
      }
    }
    case DESIGNTOOL.CLEAR_ADD_ONS_LIST: {
      return {
        ...state,
        addons: {
          text: [],
          image: []
        }
      }
    }
    case DESIGNTOOL.CLEAR_ENTIRE_STATE: {
      return {
        ...state,
        addons: {
          text: [],
          image: []
        },
        layers: {},
        selectedAddOn: {},
        fabricViewList: [],

        fabricViewSelected: '',
        fabricViewColor: {},
        fabricEntireProduct: {
          applyToAll: false,
          color: '#FFFFFF'
        },
        uploadedImages: [],
        selectedObjectPosition: '', //top, left, bottom, right. No need to save for individual items
        saveProduct: false
      }
    }
    case DESIGNTOOL.SAVE_PRODUCT: {
      return { ...state, saveProduct: true }
    }

    case DESIGNTOOL.UPDATE_SELECTED_OBJECT_POSITION: {
      return {
        ...state,
        selectedObjectPosition: action.payload
      }
    }
    case DESIGNTOOL.CHANGE_PATTERN: {
      // const restOfImages = state.addons.image.filter((item) => {
      //   return item.uuid != action.payload.img.uuid
      // })
      return {
        ...state,
        addons: {
          ...state.addons
          // image: [
          //   ...restOfImages,
          //   {
          //     ...action.payload.img,
          //     patternApplied: action.payload.patternType === 'none' ? false : true,
          //     patternType: action.payload.patternType
          //   }
          // ]
        },
        selectedAddOn: {
          ...action.payload.img,
          patternApplied: action.payload.patternType === 'none' ? false : true,
          patternType: action.payload.patternType,
          patternSpacing: action.payload.patternSpacing
        }
      }
    }
    case DESIGNTOOL.CHANGE_PATTERN_SPACING: {
      // const restOfImages = state.addons.image.filter((item) => {
      //   return item.uuid != action.payload.img.uuid
      // })
      return {
        ...state,
        addons: {
          ...state.addons
          // image: [
          //   ...restOfImages,
          //   // {
          //   //   ...action.payload.img,
          //   //   patternApplied: action.payload.patternType === 'none' ? false : true,
          //   //   patternType: action.payload.patternType
          //   // }
          // ]
        },
        selectedAddOn: {
          ...action.payload.img,
          patternSpacing: action.payload.patternSpacing
          // patternApplied: action.payload.patternType === 'none' ? false : true,
          // patternType: action.payload.patternType
        }
      }
    }
    case DESIGNTOOL.CHANGE_IMAGE_DIMENSIONS_FROM_CANVAS: {
      let imageToUpdateDimensions = state.addons.image.find((item) => {
        return item.uuid === action.payload.uuid
      })
      imageToUpdateDimensions.width = action.payload.width
      imageToUpdateDimensions.height = action.payload.height
      const restOfTheImages = state.addons.image.filter((item) => {
        return item.uuid != action.payload.uuid
      })
      return {
        ...state,
        addons: {
          ...state.addons,
          image: [...restOfTheImages, imageToUpdateDimensions]
        },
        selectedAddOn: {
          ...state.selectedAddOn,
          width: action.payload.width,
          height: action.payload.height
        }
      }
    }
    case DESIGNTOOL.ADD_IMAGE_INITIAL_DIMENSIONS: {
      const imageToFind = state.addons.image.find((item) => item.uuid === action.payload.uuid)
      const otherImages = state.addons.image.filter((item) => item.uuid != action.payload.uuid)

      return {
        ...state,
        addons: {
          ...state.addons,
          image: [
            ...otherImages,
            {
              ...imageToFind,
              initialWidth: action.payload.width,
              initialHeight: action.payload.height
            }
          ]
        },
        selectedAddOn: {
          ...state.selectedAddOn,
          initialWidth: action.payload.width,
          initialHeight: action.payload.height
        }
      }
    }
    case DESIGNTOOL.ADD_INITIAL_DESIGN: {
      return {
        ...action.payload
      }
    }
    case DESIGNTOOL.SELECT_PRODUCT_SIZES: {
      return {
        ...state,
        selectedPrintSizes: [...action.payload]
      }
    }
    case DESIGNTOOL.STORE_DEFAULT_DESIGNER_JSON: {
      return {
        ...state,
        designerJSON: action.payload
      }
    }
    case DESIGNTOOL.SET_CROP_STATUS: {
      return {
        ...state,
        cropStatus: action.payload
      }
    }
    default:
      return state
  }
}

export default designToolReducer
