import { Grid, Typography } from '@material-ui/core'
import TextInput from 'components/TextInput'
import { BASIC_INFO } from 'constants/fields'
import { useEffect } from 'react'
import { connect } from 'react-redux'
import { Field, reduxForm, change as changeFieldValue } from 'redux-form'
import { style } from 'styles/profile'
const useStyles = style

/**
 * BASIC INFO ADMIN
 * @param {*} param0
 * @returns
 */
function BasicInfo({ handleChange, errors, data, changeFieldValue }) {
  const classes = useStyles()
  /**
   * Set data options in the required format
   */
  useEffect(async () => {
    Object.entries(data)?.map((val) => changeFieldValue('BasicInfoForm', val?.[0], val?.[1]))
  }, [data])
  //html
  return (
    <div className={classes.bgProfile_Wrap}>
      <Typography variant='h1'>Basic profile</Typography>
      <form name='BasicInfoForm'>
        <div className={classes.formWrapper}>
          <Grid container spacing={2}>
            {BASIC_INFO?.map((field, i) => (
              <Grid item {...field.size} key={i}>
                <Field
                  {...field}
                  component={TextInput}
                  onChange={(value) => handleChange(field?.name, value)}
                  helperText={errors?.[field?.name]}
                />
              </Grid>
            ))}
          </Grid>
        </div>
      </form>
    </div>
  )
}

//export
export default reduxForm({
  form: 'BasicInfoForm'
})(connect(() => {}, { changeFieldValue })(BasicInfo))
