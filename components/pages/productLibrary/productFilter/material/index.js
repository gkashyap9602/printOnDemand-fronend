import React, { useState } from 'react'
import { Checkbox, FormControlLabel } from '@material-ui/core'
import { TreeView, TreeItem } from '@material-ui/lab'
import CheckIcon from '@material-ui/icons/Check'
import RadioButtonUncheckedIcon from '@material-ui/icons/RadioButtonUnchecked'

import Icon from 'icomoons/Icon'
import style from './style'
import { checkIfEmpty } from 'utils/helpers'

const useStyles = style
const Material = ({ material, onMaterialChange }) => {
  const classes = useStyles()
  const [node, setnode] = useState(['1'])
  const handleOnChange = (e, id) => {
    onMaterialChange(e.target, id)
  }
  return (
    <TreeView
      className={classes.treeRoot}
      expanded={node}
      defaultCollapseIcon={<Icon icon='drop-down' size={16} onClick={() => setnode([])} />}
      defaultExpandIcon={<Icon icon='drop-right' size={16} onClick={() => setnode(['1'])} />}
    >
      <TreeItem
        nodeId='1'
        label='Material'
        onClick={() => (checkIfEmpty(node) ? setnode(['1']) : setnode([]))}
      >
        <div className={classes.childItem}>
          {/* <!--checkbox--> */}
          {material?.map((mtrial, i) => (
            <div className={classes.pdtChecked} key={i}>
              <FormControlLabel
                control={
                  <Checkbox
                    name={mtrial?.materialName}
                    checked={mtrial?.checked}
                    onChange={(e) => handleOnChange(e, mtrial?.materialId)}
                    checkedIcon={<CheckIcon fontSize='medium' />}
                    icon={<RadioButtonUncheckedIcon color='primary' />}
                  />
                }
                label={mtrial?.materialName}
              />
            </div>
          ))}

          {/* <!--checkbox--> */}
        </div>
      </TreeItem>
    </TreeView>
  )
}

export default Material
