import React from 'react'
import {
  AppBar,
  Box,
  Toolbar,
  IconButton,
  Typography,
  Menu,
  Container,
  Button,
  MenuItem
} from '@material-ui/core'
import MenuIcon from '@material-ui/icons/Menu'
import Image from 'next/image'

import HeaderLogo from '/static/images/MWW-Logo.png'
import style from './style'

const useStyles = style

const staticPages = [
  { title: 'Home', url: 'https://mwwondemand.com/' },
  { title: 'What we make', url: 'https://mwwondemand.com/mod/what-we-make/' },
  { title: 'How it works', url: 'https://mwwondemand.com/mod/how-it-works/' },
  { title: 'Company blog', url: 'https://mwwondemand.com/mod/blog/' }
]

const HeaderBar = () => {
  const classes = useStyles()
  const [anchorElNav, setAnchorElNav] = React.useState(null)

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget)
  }

  const handleCloseNavMenu = () => {
    setAnchorElNav(null)
  }

  return (
    <div className={classes.header_Wrapper}>
      <AppBar position='static'>
        <Container maxWidth='xl'>
          <Toolbar disableGutters>
            <Box sx={{ display: { xs: 'flex', md: 'none' } }}>
              <IconButton
                size='medium'
                aria-label='account of current user'
                aria-controls='menu-appbar'
                aria-haspopup='true'
                onClick={handleOpenNavMenu}
                color='default'
              >
                <MenuIcon />
              </IconButton>
              <Menu
                id='menu-appbar'
                anchorEl={anchorElNav}
                anchorOrigin={{
                  vertical: 'bottom',
                  horizontal: 'left'
                }}
                keepMounted
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'left'
                }}
                open={Boolean(anchorElNav)}
                onClose={handleCloseNavMenu}
                sx={{
                  display: { xs: 'block', md: 'none' }
                }}
              >
                {staticPages.map((page, index) => (
                  <MenuItem key={`staticlink-${index}`}>
                    <Typography>
                      <a href={page.url} target='_blank'>
                        {page.title}
                      </a>
                    </Typography>
                  </MenuItem>
                ))}
              </Menu>
            </Box>
            <div>
              <Image
                src={HeaderLogo}
                alt='Logo'
                // width={285}
                // height={29}
              />
            </div>

            <div className={classes.menuItem_Block}>
              {staticPages.map((page, index) => (
                <Button key={`${page}-${index}`} onClick={handleCloseNavMenu}>
                  <a href={page.url} target='_blank'>
                    {page.title}
                  </a>
                </Button>
              ))}
            </div>
          </Toolbar>
        </Container>
      </AppBar>
    </div>
  )
}
export default HeaderBar
