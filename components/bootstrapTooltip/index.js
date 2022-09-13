import React from 'react'
import { makeStyles, Tooltip } from '@material-ui/core'

export const TooltipBootstrap = ({ title, children, placement }) => {
  // tooltip
  const useStylesBootstrap = makeStyles((theme) => ({
    arrow: {
      color: theme.palette.common.black
    },
    tooltip: {
      backgroundColor: theme.palette.common.black,
      fontSize: '12px',
      textTransform: 'initial'
    }
  }))
  const BootstrapTooltip = (props) => {
    const classes = useStylesBootstrap()

    return <Tooltip arrow classes={classes} {...props} placement={placement} title={title} />
  }

  // tooltip
  return (
    <BootstrapTooltip title={title} placement={placement}>
      {children}
    </BootstrapTooltip>
  )
}
