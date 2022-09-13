import React from 'react'
import { Tab, Tabs } from '@material-ui/core'
import PropTypes from 'prop-types'
import style from './style'
import Dropzone from './dropzone'
import { Box, Typography } from '@material-ui/core'
import Icon from 'icomoons/Icon'
const useStyles = style

import PhotoLibrary from './photoLibrary'
//tab

const TabPanel = (props) => {
  const { children, value, index, ...other } = props

  return (
    <div
      role='tabpanel'
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && <>{children}</>}
    </div>
  )
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired
}

const a11yProps = (index) => {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`
  }
}

//tab

const UploadImage = ({ openTab, setUploadOpenTab, setModalClose, showLoader }) => {
  const classes = useStyles()
  // tab

  const handleChange = (event, newValue) => {
    setUploadOpenTab(newValue)
  }
  // tab

  return (
    <div className={classes.tabImageWrap}>
      <Tabs
        value={openTab}
        onChange={handleChange}
        aria-label='Image tabs'
        indicatorColor='primary'
      >
        <Tab label='Upload' {...a11yProps(0)} />
        <Tab label='Photo library' {...a11yProps(1)} />
      </Tabs>

      <div className={classes.ImagePanel}>
        <TabPanel
          value={openTab}
          index={0}
        >
          {/* <!--message--> */}
          <Box display='flex' alignItems='center' className={classes.warningMsg} marginBottom={2}>
            <Box mr={2} className={classes.warningIcon}>
              <Icon icon='warning-icon' size={20} />
            </Box>
            <Box pr={1}>
              <Typography variant='h4'>
                Images used will be saved to the Photo Library only if the product is saved
              </Typography>
            </Box>
          </Box>
          {/* <!--message--> */}
          <Dropzone setModalClose={setModalClose} showLoader={showLoader} />
        </TabPanel>
        <TabPanel value={openTab} index={1}>
          <PhotoLibrary setModalClose={setModalClose} showLoader={showLoader} />
        </TabPanel>
      </div>
    </div>
  )
}

export default UploadImage
