import { Button, CircularProgress } from '@material-ui/core';
import React from 'react';
import style from './style';


/**
 * Btn Custom component
 * @returns 
 */
function CustomButton({loaderBtn, label}) {
  const useStyles = style
  const classes = useStyles()
    return (
        <Button
        type='submit'
        disabled={loaderBtn}
        variant='contained'
        fullWidth
        className={classes.btn_Submit}
      >
           {loaderBtn && (
        <CircularProgress size={18}  className={classes.LoaderSession}/>
      )}
      {label}
      </Button>
    )
}

export default CustomButton;
