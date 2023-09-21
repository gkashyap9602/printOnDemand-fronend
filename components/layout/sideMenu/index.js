import React from 'react'
import { Drawer, List, useTheme, IconButton } from '@material-ui/core'
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft'
import ChevronRightIcon from '@material-ui/icons/ChevronRight'
import clsx from 'clsx'
import MenuItem from './menuItem'
import style from '../style'
import Icon from 'icomoons/Icon'
import ToggleDrawer from '../toggleDrawer'

const useStyles = style

const SideMenu = ({ handleOnClick = () => {}, ...props }) => {
  const classes = useStyles()

  const {
    open = false,
    setOpen = false,
    handleDrawerClose = () => {
      setOpen(false)
    },
    handleDrawerOpen,
    hideMenuXs,
    handleCloseXs,
    updateOrderQuery = () => {},
    updateProductQuery = () => {},
    updateProductLibraryQuery = () => {}
  } = props
  const theme = useTheme()

  return (
    <>
      <div className={classes.SideDrawer}>
        <Drawer
          variant='permanent'
          className={clsx(classes.drawer, {
            [classes.drawerOpen]: open,
            [classes.drawerClose]: !open
          })}
          classes={{
            paper: clsx({
              [classes.drawerOpen]: open,
              [classes.drawerClose]: !open
            })
          }}
        >
          <div className={classes.toolbar}>
            <IconButton onClick={handleDrawerClose}>
              {theme.direction === 'rtl' ? <ChevronRightIcon /> : <ChevronLeftIcon />}
            </IconButton>
          </div>

          <List className={classes.XsMenuList}>
            <MenuItem
              handleOnClick={handleOnClick}
              updateOrderQuery={updateOrderQuery}
              updateProductQuery={updateProductQuery}
              updateProductLibraryQuery={updateProductLibraryQuery}
            />
          </List>
          {open ? (
            <div className={classes.bgLogo_Expand}></div>
          ) : (
            <div className={classes.bgLogo_Collapse}></div>
          )}
          {open && (
            <a
              className={classes.privacy_Policy}
              href='https://mwwondemand.com/privacy-policy/'
              target='_blank'
            >
              Privacy policy
            </a>
          )}
          {open ? (
            <div className={classes.bgMenu_Expand} onClick={handleDrawerOpen}>
              <Icon icon='arrow_back' size={20} color='#9A9AB0' />
            </div>
          ) : (
            <div className={classes.bgMenu_Collapse} onClick={handleDrawerOpen}>
              <Icon icon='arrow_forward' size={20} color='#9A9AB0' />
            </div>
          )}
        </Drawer>

        {/* <!--hidden xs-->*/}
        <ToggleDrawer
          open={hideMenuXs}
          handleClose={handleCloseXs}
          component={
            <div>
              <div className={classes.hideMenuClose} onClick={handleCloseXs}>
                <Icon icon='pop-close' size={22} color='#9A9AB0' />
              </div>
              <List className={classes.XsMenuList}>
                <MenuItem
                  updateOrderQuery={updateOrderQuery}
                  updateProductQuery={updateProductQuery}
                  handleOnClick={handleOnClick}
                  updateProductLibraryQuery={updateProductLibraryQuery}
                />
              </List>
            </div>
          }
        />
        {/* <!--hidden xs-->*/}
      </div>
    </>
  )
}

export default SideMenu
