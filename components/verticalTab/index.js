import * as React from 'react'
import PropTypes from 'prop-types'
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
  Tab,
  Tabs,
  Typography
} from '@material-ui/core'
// import Tabs from '@mui/material/Tabs';
// import Tab from '@mui/material/Tab';
// import Typography from '@mui/material/Typography';
// import Box from '@mui/material/Box';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore'
import { checkIfEmpty } from 'utils/helpers'

import { style } from './style'

const useStyles = style

export const VerticalTabs = ({ tabName, handleCategory, articles, search = null, listActive }) => {
  const classes = useStyles()
  return (
    <div>
      <div className={classes.VerticalTabs_Faq}>
        <Typography variant='body2'>Answers in following categories</Typography>

        <ul className={classes.Faq_List}>
          <li
            onClick={() => handleCategory()}
            className={
              listActive === ''
                ? classes.Faq_list_active
                : checkIfEmpty(search)
                ? ''
                : classes.Faq_list_active
            }
          >
            All categories
          </li>
          {tabName?.map((val, i) => (
            <li
              onClick={() => handleCategory(val)}
              className={
                listActive === val.id ? (!checkIfEmpty(search) ? '' : classes.Faq_list_active) : ''
              }
            >
              {val?.name}
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}

export const FaqAccordion = ({ articles, search = null }) => {
  const classes = useStyles()
  return (
    <div className={classes.accordion_FAQ}>
      {!checkIfEmpty(search) && (
        <Typography variant='body2' className={classes.Faq_Accordion_Head}>
          {/* Answers in following categories */}
          {articles?.length} results for '{search}' in all categories
        </Typography>
      )}
      <div className={classes.Faq_Accordion_Content}>
        {articles?.map((val) => (
          <div>
            <Accordion>
              <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls='panel1a-content'
                id='panel1a-header'
              >
                <Typography>{val?.title}</Typography>
              </AccordionSummary>
              <AccordionDetails>
                <Typography
                  dangerouslySetInnerHTML={{ __html: val?.body }}
                  className={classes.faq_detail}
                ></Typography>
              </AccordionDetails>
            </Accordion>
          </div>
        ))}
      </div>
    </div>
  )
}
