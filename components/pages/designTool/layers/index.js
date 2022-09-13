import React, { useEffect } from 'react'
import { Grid, Collapse, List, ListItem, ListItemIcon, ListItemText } from '@material-ui/core'
import Icon from 'icomoons/Icon'
import style from './style'
import LayerItem from './layerItem'
import { useSelector, useDispatch } from 'react-redux'
import { reorderLayer } from 'redux/actions/designToolActions'
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd'

const useStyles = style

const Layers = ({ collapseLayer, handleCollapse }) => {
  const classes = useStyles()
  const [open, setOpen] = React.useState(collapseLayer)

  const design = useSelector((state) => state.design)
  const dispatch = useDispatch()

  const handleClick = () => {
    setOpen(!open)
    handleCollapse(!open)
  }
  useEffect(() => {
    setOpen(collapseLayer)
  }, [collapseLayer])

  const reorder = (list, startIndex, endIndex) => {
    const result = Array.from(list)
    const [removed] = result.splice(startIndex, 1)
    result.splice(endIndex, 0, removed)

    return result
  }

  const onDragEnd = (result) => {
    // dropped outside the list
    if (!result.destination) {
      return
    }
    dispatch(
      reorderLayer(
        reorder(
          design.layers[design.fabricViewSelected],
          result.source.index,
          result.destination.index
        ),
        result.destination.index
      )
    )
  }

  const getItemStyle = (isDragging, draggableStyle) => ({
    userSelect: 'none',
    // change background colour if dragging
    background: isDragging ? 'lightgreen' : 'none',

    // styles we need to apply on draggables
    ...draggableStyle
  })

  const getLayerTitle = (uuid, type) => {
    if (type === 'text') {
      return design.addons.text.find((item) => {
        return item.uuid === uuid
      }).text
    } else {
      return 'Image'
    }
  }

  const getLayerImage = (type, uuid) => {
    if (type !== 'image') {
      return null
    } else {
      return design.addons.image.find((item) => {
        return item.uuid === uuid
      }).file
    }
  }
  return (
    <Grid item xs={12} sm={12} md={12} lg={12} xl={12} className={classes.stickyLayer}>
      <List component='nav' aria-labelledby='nested-list-subheader' className={classes.layerWrap}>
        <ListItem button onClick={handleClick} className={classes.layerItem_Button}>
          <ListItemIcon>
            <Icon icon='layers' size={24} color='#8a8a9e' />
          </ListItemIcon>
          <ListItemText primary='Layers' className={classes.layerItem_Text} />
          <div className={classes.Layer_Count}>
            {design?.layers[design?.fabricViewSelected]
              ? design.layers[design.fabricViewSelected].length
              : 0}
          </div>
          {open ? (
            <Icon icon='drop-up' size={18} color='#8a8a9e' />
          ) : (
            <Icon icon='drop-down' size={18} color='#8a8a9e' />
          )}
        </ListItem>

        <Collapse in={open} timeout='auto' unmountOnExit>
          {design.layers[design.fabricViewSelected] ? (
            <>
              <DragDropContext onDragEnd={onDragEnd}>
                <Droppable droppableId='droppable'>
                  {(provided, snapshot) => (
                    <div
                      {...provided.droppableProps}
                      ref={provided.innerRef}
                      className={classes.layerContent}
                    >
                      {design.layers[design.fabricViewSelected].map((item, index) => (
                        <Draggable
                          key={item.uuid}
                          draggableId={item.uuid}
                          index={index}
                          isDragDisabled={item.locked}
                        >
                          {(provided, snapshot) => (
                            <div
                              ref={provided.innerRef}
                              {...provided.draggableProps}
                              {...provided.dragHandleProps}
                              style={getItemStyle(
                                snapshot.isDragging,
                                provided.draggableProps.style
                              )}
                            >
                              <LayerItem
                                uuid={item.uuid}
                                type={item.type}
                                title={getLayerTitle(item.uuid, item.type)}
                                locked={item.locked}
                                index={index}
                                image={getLayerImage(item.type, item.uuid)}
                                isDragging={snapshot.isDragging}
                              />
                            </div>
                          )}
                        </Draggable>
                      ))}
                      {provided.placeholder}
                    </div>
                  )}
                </Droppable>
              </DragDropContext>
            </>
          ) : (
            <div className={classes.layerMsg}>No layers added</div>
          )}
        </Collapse>
      </List>
    </Grid>
  )
}

export default Layers
