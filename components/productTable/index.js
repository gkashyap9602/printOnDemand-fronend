import React from 'react'
import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
  Accordion,
  AccordionDetails,
  AccordionSummary
} from '@material-ui/core'
import ExpandMoreIcon from '@material-ui/icons/ExpandMore'
import style from './style'

const useStyles = style
export const ProductTable = ({ className, product }) => {
  const classes = useStyles()
  return (
    <div className={classes.TabContainer}>
      <TableContainer component={Paper}>
        <Table className={`${classes.productTable} ${className}`}>
          <TableHead className={classes.table_Header}>
            <TableRow>
              <TableCell>
                <Typography variant='body1' className={classes.TextStyle}>
                  Process
                </Typography>
              </TableCell>
              <TableCell>
                <Typography variant='body1' className={classes.TextStyle}>
                  Materials
                </Typography>
              </TableCell>
              <TableCell>
                <Typography variant='body1' className={classes.TextStyle}>
                  Features
                </Typography>
              </TableCell>
              <TableCell>
                <Typography variant='body1' className={classes.TextStyle}>
                  Care & Cleaning
                </Typography>
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            <TableRow>
              <TableCell>
                <Typography variant='h4' className={classes.TextStyle}>
                  {product?.process || '---'}
                </Typography>
              </TableCell>
              <TableCell>
                <Typography variant='h4' className={classes.TextStyle}>
                  {product?.materialName || '---'}
                </Typography>
              </TableCell>
              <TableCell>
                <Typography variant='h4' className={classes.TextStyle}>
                  {product?.features || '---'}
                </Typography>
              </TableCell>
              <TableCell>
                <Typography variant='h4' className={classes.TextStyle}>
                  {product?.careInstructions || '---'}
                </Typography>
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  )
}

export const ProductAccordion = ({ product }) => {
  const classes = useStyles()
  return (
    <div>
      <Accordion className={classes.buildAccordion}>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls='panel1a-content'
          id='panel1a-header'
          className={classes.ShedCollapseHeader}
        >
          Process
        </AccordionSummary>
        <AccordionDetails className={classes.CollapseContent}>
          <div className={classes.SizeTableHeadRow}> {product?.process || '---'}</div>
        </AccordionDetails>
      </Accordion>
      <Accordion className={classes.buildAccordion}>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls='panel1a-content'
          id='panel1a-header'
          className={classes.ShedCollapseHeader}
        >
          Materials
        </AccordionSummary>
        <AccordionDetails className={classes.CollapseContent}>
          <div className={classes.SizeTableHeadRow}> {product?.materialName || '---'}</div>
        </AccordionDetails>
      </Accordion>
      <Accordion className={classes.buildAccordion}>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls='panel1a-content'
          id='panel1a-header'
          className={classes.ShedCollapseHeader}
        >
          Features
        </AccordionSummary>
        <AccordionDetails className={classes.CollapseContent}>
          <div className={classes.SizeTableHeadRow}> {product?.features || '---'}</div>
        </AccordionDetails>
      </Accordion>
      <Accordion className={classes.buildAccordion}>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls='panel1a-content'
          id='panel1a-header'
          className={classes.ShedCollapseHeader}
        >
          Care & Cleaning
        </AccordionSummary>
        <AccordionDetails className={classes.CollapseContent}>
          <div className={classes.SizeTableHeadRow}> {product?.careInstructions || '---'}</div>
        </AccordionDetails>
      </Accordion>
    </div>
  )
}
