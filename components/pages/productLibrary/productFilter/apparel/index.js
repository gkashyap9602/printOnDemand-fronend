import React from 'react'
import { Box, Checkbox, FormControlLabel } from '@material-ui/core'
import { TreeView, TreeItem } from '@material-ui/lab'
import CheckIcon from '@material-ui/icons/Check'
import RadioButtonUncheckedIcon from '@material-ui/icons/RadioButtonUnchecked'
import Icon from 'icomoons/Icon'
import style from './style'
import ImageContainer from 'components/imageContainer'
import { TooltipBootstrap } from 'components/bootstrapTooltip'

const useStyles = style
const Apparel = ({ category, onCategoryChange }) => {
  const classes = useStyles()
  const handleOnChange = (e, guid) => {
    onCategoryChange(e.target, guid)
  }
  return (
    <TreeView
      className={classes.treeRoot}
      defaultCollapseIcon={<Icon icon='drop-down' size={16} />}
      defaultExpandIcon={<Icon icon='drop-right' size={16} />}
    >
      <TreeItem
        nodeId='1'
        label={
          <Box display='flex' alignItems='center' width='100%'>
            <Box className={classes.treeLabel_Img}>
              <ImageContainer
                url={category?.imageUrl}
                loaderSize={15}
                showLoader={false}
                alt='Product'
                w={61}
                h={59}
              />
            </Box>
            <TooltipBootstrap title={category?.name} placement='top'>
              <Box ml={2} className={classes.treeLabel_head}>
                {category?.name}
              </Box>
            </TooltipBootstrap>
          </Box>
        }
      >
        <div className={classes.childItem}>
          {/* <!--checkbox--> */}

          <div className={classes.pdtChecked}>
            {category?.subCategories?.map((subctgry, i) => (
              <FormControlLabel
                key={i}
                control={
                  <Checkbox
                    name={subctgry?.name}
                    checked={subctgry?.checked}
                    onChange={(e) => handleOnChange(e, subctgry?.guid)}
                    checkedIcon={<CheckIcon fontSize='medium' />}
                    icon={<RadioButtonUncheckedIcon color='primary' />}
                  />
                }
                label={subctgry?.name}
              />
            ))}
          </div>
        </div>
      </TreeItem>
    </TreeView>
  )
}

export default Apparel
