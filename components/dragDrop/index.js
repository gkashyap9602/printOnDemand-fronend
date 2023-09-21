import React, { Component } from 'react'
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd'
import DragableContent from 'components/dragableImage'

// fake data generator
// const getItems = (count) =>
//   Array.from({ length: count }, (v, k) => k).map((k) => ({
//     id: `item-${k}`,
//     content: `item ${k}`
//   }))

// a little function to help us with reordering the result
const reorder = (list, startIndex, endIndex) => {
  const result = Array.from(list)
  const [removed] = result.splice(startIndex, 1)
  result.splice(endIndex, 0, removed)

  return result
}

const grid = 8

const getItemStyle = (isDragging, draggableStyle) => ({
  // some basic styles to make the items look a bit nicer
  userSelect: 'none',
  margin: `0 12px 0 0`,

  // change background colour if dragging
  //   background: isDragging ? 'lightgreen' : 'grey',

  // change background colour if dragging
  //   background: isDragging ? 'lightgreen' : 'grey',

  // styles we need to apply on draggables
  ...draggableStyle
})

const getListStyle = (isDraggingOver) => ({
  background: isDraggingOver ? 'transparent' : '',
  display: 'flex',
  overflow: 'auto'
})

class DragDrop extends Component {
  constructor(props) {
    super(props)
    this.state = {
      items: []
    }
    this.onDragEnd = this.onDragEnd.bind(this)
    this.props = props
  }

  componentDidMount() {
    this.setState({ items: this.props.items })
  }

  componentDidUpdate(prevProps, prevState) {
    if (JSON.stringify(this.props.items) !== JSON.stringify(prevProps.items)) {
      this.setState({ items: this.props.items })
    }
  }

  onDragEnd(result) {
    // dropped outside the list
    if (!result.destination) {
      return
    }

    const items = reorder(this.state.items, result.source.index, result.destination.index)

    this.setState({
      items
    })
    this.props.setNewOrderedItems(items)
  }

  // Normally you would want to split things out into separate components.
  // But in this example everything is just done in one place for simplicity
  render() {
    const { hideBrowseFile, deleteImageCB } = this.props
    return (
      <DragDropContext onDragEnd={this.onDragEnd}>
        <Droppable droppableId='droppable' direction='horizontal'>
          {(provided, snapshot) => (
            <div
              ref={provided.innerRef}
              style={getListStyle(snapshot.isDraggingOver)}
              {...provided.droppableProps}
            >
              {this.state.items.map((item, index) => (
                <Draggable key={item.uuid} draggableId={item.uuid} index={index}>
                  {(provided, snapshot) => (
                    <div
                      ref={provided.innerRef}
                      {...provided.draggableProps}
                      {...provided.dragHandleProps}
                      style={getItemStyle(snapshot.isDragging, provided.draggableProps.style)}
                    >
                      <DragableContent
                        item={item}
                        hideBrowseFile={hideBrowseFile}
                        deleteImageCB={deleteImageCB}
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
    )
  }
}

export default DragDrop
