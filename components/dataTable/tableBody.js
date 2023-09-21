import React, { useState } from 'react'
import {
  TableBody,
  TableRow,
  TableCell,
  Typography,
  CircularProgress,
  FormControlLabel,
  Checkbox,
  IconButton,
  Collapse,
  Box
} from '@material-ui/core'
import TemplateDoc from '/static/images/pdf.png'
import PSD from '/static/images/psd.png'
import illustrator from '/static/images/illustrator.png'
import { MoreActions } from 'components/formElements'
import CheckIcon from '@material-ui/icons/Check'
import RadioButtonUncheckedIcon from '@material-ui/icons/RadioButtonUnchecked'

import style from './style'
import moment from 'moment'
import Image from 'next/image'
import { calculateAmountOfOrder, checkIfEmpty, downloadFile, getObjectValue } from 'utils/helpers'
import SimpleReactLightbox from 'simple-react-lightbox'
import LightBoxGallery from 'components/lightBoxGallery'
import { NotificationManager } from 'react-notifications'
import Icon from 'icomoons/Icon'
import { TooltipBootstrap } from 'components/bootstrapTooltip'
import clsx from 'clsx'

const statusColor = {
  0: {
    bg: '#e6fff2',
    border: '#e8eeeb',
    color: '#75ca9e'
  },
  1: {
    bg: '#e6fff2',
    border: '#e8eeeb',
    color: '#75ca9e'
  },
  2: {
    bg: '#FAE5E5',
    border: '#ede9dc',
    color: '#FA5A59'
  },
  3: {
    bg: '#faf5e6',
    border: '#ede9dc',
    color: '#e2b432'
  }
}

const orderStatusColor = {
  0: {
    bg: '#e6fff2',
    border: '#e8eeeb',
    color: '#75ca9e'
  },
  1: {
    bg: '#dce9f6',
    border: '#d6dfe7',
    color: '#59abff'
  },
  2: {
    bg: '#faf5e6',
    border: '#ede9dc',
    color: '#e2b432'
  },
  3: {
    bg: '#FAE5E5',
    border: '#f2e2e2',
    color: '#FA5A59'
  },
  4: {
    bg: '#e7e0f9',
    border: '#e0dcea',
    color: '#8e5ffe'
  },
  5: {
    bg: '#e7e0e0',
    border: '#c9c6c6',
    color: '#898484'
  },
  6: {
    bg: '#E6D8C9',
    border: '#DFD0C0',
    color: '#947F68'
  }
}
const storeUploadsColor = {
  1: {
    bg: '#E6D8C9',
    border: '#DFD0C0',
    color: '#947F68'
  },
  2: {
    bg: '#E6D8C9',
    border: '#DFD0C0',
    color: '#947F68'
  },
  3: {
    bg: '#e7e0f9',
    border: '#e0dcea',
    color: '#8e5ffe'
  },
  4: {
    bg: '#FAE5E5',
    border: '#f2e2e2',
    color: '#FA5A59'
  },
  5: {
    bg: '#E6D8C9',
    border: '#DFD0C0',
    color: '#947F68'
  }
}
const TableBodyContent = ({
  tableLoader = false,
  lists = [],
  options = [],
  statusLoader = [],
  tableTitles = [],
  statusChanger = () => {},
  isExtraFieldReq = false,
  isCheck = false,
  nodataMessage = null,
  checkBoxHandler = () => {},
  collapse = false
}) => {
  const classes = style()
  const [open, setOpen] = useState([])
  const [row, setrow] = useState([])

  return (
    <TableBody>
      {tableLoader && (
        <TableRow>
          <TableCell style={{ textAlign: 'center' }} colSpan={tableTitles?.length + 1}>
            <CircularProgress size={25} className={classes.LoaderSession} />
          </TableCell>
        </TableRow>
      )}
      {!tableLoader &&
        lists?.map((list, idx) => {
          return (
            <>
              <TableRow
                className={classes.TabRowWrapper}
                key={idx}
                style={{ borderBottom: 'unset' }}
              >
                {isExtraFieldReq && (
                  <TableCell className={classes.tabCheck}>
                    <div className={classes.bgCheckBox}>
                      <FormControlLabel
                        control={
                          <Checkbox
                            className={!list?.designerAvailable && classes.disable}
                            name='cutomerStatusChanger'
                            checkedIcon={<CheckIcon fontSize='medium' />}
                            icon={<RadioButtonUncheckedIcon color='primary' />}
                            checked={
                              isCheck &&
                              isCheck.includes(list.userGuid || list.libraryVariantId || list?.guid)
                            }
                            onChange={(e) => checkBoxHandler(e, list)}
                          />
                        }
                      />
                    </div>
                  </TableCell>
                )}
                {tableTitles?.map((title, tIdx) => {
                  return (
                    <TableCell
                      // className={classes.columnClassName}
                      className={clsx(
                        `${classes.columnClassName}`,
                        `${title?.type === 'store' ? classes.storeClass : ''}`
                      )}
                      style={{
                        whiteSpace: title?.apiName === 'createdOn' && 'nowrap',
                        textDecoration: list?.isProductVariantDeleted && 'line-through'
                      }}
                      key={tIdx}
                    >
                      {(() => {
                        switch (title?.type) {
                          case 'date':
                            return (
                              <Typography variant='h4' className={classes.TextStyle}>
                                {list[title.apiName]
                                  ? moment(moment.utc(list[title.apiName]))
                                      .local()
                                      .format('YYYY-MMM-DD hh:mm A')
                                  : '---'}
                              </Typography>
                            )
                          case 'dateWithoutTime':
                            return (
                              <Typography variant='h4' className={classes.TextStyle}>
                                {moment(moment.utc(list[title.apiName]))
                                  .local()
                                  .format('YYYY-MMM-DD')}
                              </Typography>
                            )
                          case 'price':
                            return (
                              <Typography variant='h4' className={classes.TextStyle}>
                                {`$${parseFloat(list[title.apiName]).toFixed(2)}`}
                              </Typography>
                            )
                          case 'totalPrice':
                            return (
                              <Typography variant='h4' className={classes.TextStyle}>
                                {`$${calculateAmountOfOrder(list?.[title?.key])}`}
                              </Typography>
                            )
                          case 'source':
                            return (
                              <Typography variant='h4' className={classes.TextStyle}>
                                {list?.[title?.apiName] === 1 && 'Merch maker'}
                                {list?.[title?.apiName] === 2 && 'MWW system'}
                                {list?.[title?.apiName] === 3 && 'Shopify'}
                                {/* {list?.[title?.apiName] === 4 && 'Etsy'} */}
                                {list?.[title?.apiName] === 5 && 'Excel upload'}
                              </Typography>
                            )
                          case 'sliderImage':
                            return (
                              <SimpleReactLightbox>
                                <LightBoxGallery images={list[title.apiName]} />
                              </SimpleReactLightbox>
                            )

                          case 'options':
                            return list[title.apiName]?.map((val) => (
                              <Typography variant='h4' className={classes.TextStyle}>
                                {val?.variableOptionValue}
                              </Typography>
                            ))
                          case 'store':
                            return list[title.apiName]?.map((val) => (
                              <Typography variant='h4' className={classes.TextStyle}>
                                {val?.storeName}
                              </Typography>
                            ))
                          case 'iconWithTooltip':
                            return checkIfEmpty(list[title.apiName]) ? (
                              list['submissionDueDate'] ? (
                                <IconButton aria-label='expand row' size='small'>
                                  <TooltipBootstrap
                                    title={`The order will be placed after the set delay`}
                                    placement={'top'}
                                  >
                                    <div>
                                      <Icon icon='clock' size={18} />
                                    </div>
                                  </TooltipBootstrap>
                                </IconButton>
                              ) : (
                                '---'
                              )
                            ) : (
                              <Typography variant='h4' className={classes.TextStyle}>
                                {checkIfEmpty(list[title.apiName]) ? '---' : list[title.apiName]}
                              </Typography>
                            )
                          case 'templates':
                            return checkIfEmpty(list[title.apiName])
                              ? '---'
                              : list[title.apiName]?.map((val, i) => (
                                  <Typography
                                    variant='h4'
                                    className={[classes.TextStyle, classes.linktemplate].join(' ')}
                                  >
                                    <a
                                      style={{
                                        color: 'blue',
                                        textDecoration: 'underline',
                                        cursor: 'pointer'
                                      }}
                                      target='__blank'
                                      href='#'
                                      download={''}
                                      onClick={(e) => {
                                        e.preventDefault()
                                        if (navigator.onLine) {
                                          NotificationManager.info(
                                            'The template will download shortly'
                                          )
                                          downloadFile(val?.fileUrl, val?.fileName)
                                        } else {
                                          NotificationManager.error(
                                            'No active internet connection',
                                            '',
                                            10000
                                          )
                                        }
                                      }}
                                    >
                                      {`${val?.fileName?.split('.').pop()}`}
                                    </a>
                                  </Typography>
                                ))
                          case 'object':
                            return (
                              <Typography variant='h4' className={classes.TextStyle}>
                                {getObjectValue(list, title.apiName) || '---'}
                              </Typography>
                            )
                          case 'status':
                            return (
                              <Typography variant='h4' className={classes.TextStyle}>
                                <div
                                  style={{
                                    border: `1px solid ${statusColor[list[title.apiName]]?.border}`,
                                    backgroundColor: statusColor[list[title.apiName]]?.bg,
                                    color: statusColor[list[title.apiName]]?.color
                                  }}
                                  className={classes.statusColor}
                                >
                                  {statusLoader && statusLoader.includes(list.userGuid) ? (
                                    <CircularProgress size={14} className={classes.LoaderSession} />
                                  ) : list[title.apiName] === 1 ? (
                                    'Active'
                                  ) : list[title.apiName] === 3 ? (
                                    'Pending'
                                  ) : (
                                    'Deactivated'
                                  )}
                                </div>
                              </Typography>
                            )
                          case 'orderStatus':
                            return (
                              <Typography variant='h4' className={classes.TextStyle}>
                                <div
                                  style={{
                                    border: `1px solid ${
                                      orderStatusColor[list[title.apiName]]?.border
                                    }`,
                                    backgroundColor: orderStatusColor[list[title.apiName]]?.bg,
                                    color: orderStatusColor[list[title.apiName]]?.color
                                  }}
                                  className={classes.statusColor}
                                >
                                  {(() => {
                                    switch (list[title.apiName]) {
                                      case 1:
                                        return 'New'

                                      case 2:
                                        return 'In production'

                                      case 3:
                                        return 'Error'

                                      case 4:
                                        return 'Shipped'

                                      case 5:
                                        return 'Cancelled'

                                      case 6:
                                        return 'Received'

                                      default:
                                        return 'Cancelled'
                                    }
                                  })()}
                                </div>
                              </Typography>
                            )
                          case 'storeUploadsStatus':
                            return (
                              <Typography variant='h4' className={classes.TextStyle}>
                                <div
                                  style={{
                                    border: `1px solid ${
                                      storeUploadsColor[list[title.apiName]]?.border
                                    }`,
                                    backgroundColor: storeUploadsColor[list[title.apiName]]?.bg,
                                    color: storeUploadsColor[list[title.apiName]]?.color
                                  }}
                                  className={classes.statusColor}
                                >
                                  {(() => {
                                    switch (list[title.apiName]) {
                                      case 1:
                                        return 'Processing'

                                      case 2:
                                        return 'Processing'

                                      case 3:
                                        return 'Completed'

                                      case 4:
                                        return 'Failed'

                                      case 5:
                                        return 'Processing'

                                      default:
                                        return ''
                                    }
                                  })()}
                                </div>
                              </Typography>
                            )
                          default:
                            return (
                              <Typography
                                variant='h4'
                                className={classes.TextStyle}
                                style={{
                                  color:
                                    title.apiName === 'displayId' &&
                                    list['orderType'] === 2 &&
                                    '#cf7f1d',
                                  whiteSpace: title.apiName === 'displayId' && 'nowrap'
                                }}
                              >
                                {title.isShippingValue
                                  ? checkIfEmpty(list.shippingAddress?.[title?.shippingAPIname])
                                    ? title.name === 'Company name'
                                      ? '---'
                                      : list[title.apiName]
                                    : list?.shippingAddress?.[title?.shippingAPIname]
                                  : list[title.apiName] || '---'}
                              </Typography>
                            )
                        }
                      })()}
                    </TableCell>
                  )
                })}
                {!checkIfEmpty(options) && (
                  <TableCell className={classes.columnClassName}>
                    <Typography variant='h4' className={classes.TextStyle}>
                      <MoreActions
                        options={options}
                        rawDteails={list}
                        isActionChange={statusChanger}
                      />
                    </Typography>
                  </TableCell>
                )}
                {collapse && (
                  <TableCell>
                    <IconButton
                      aria-label='expand row'
                      size='small'
                      onClick={() => {
                        if (open.includes(list?.guid)) {
                          setOpen(open.filter((ele) => ele !== list?.guid))
                        } else {
                          setOpen([...open, list?.guid])
                        }
                      }}
                    >
                      {open.includes(list?.guid) ? (
                        <Icon icon='drop-right' size={22} />
                      ) : (
                        <Icon icon='drop-down' size={22} />
                      )}
                    </IconButton>
                  </TableCell>
                )}
              </TableRow>
              {collapse && open.includes(list?.guid) && (
                <TableRow>
                  <TableCell colspan={4}>
                    <Collapse in={open} timeout='auto' unmountOnExit>
                      <Box sx={{ margin: 1 }}>
                        <Typography variant='h6' gutterBottom component='div'>
                          <div className={classes.templateWrap}>
                            {checkIfEmpty(list?.productVarientTemplates)
                              ? ' --'
                              : list?.productVarientTemplates?.map((val, i) => (
                                  <>
                                    <div
                                      className={classes.sizeTemplateFlex}
                                      onClick={(e) => {
                                        e.preventDefault()
                                        if (navigator.onLine) {
                                          NotificationManager.info(
                                            'The template will download shortly'
                                          )
                                          downloadFile(val?.fileUrl, val?.fileName)
                                        } else {
                                          NotificationManager.error(
                                            'No active internet connection',
                                            '',
                                            10000
                                          )
                                        }
                                      }}
                                    >
                                      <div className={classes.templateImg}>
                                        <Image
                                          src={
                                            val?.imageType === 1
                                              ? TemplateDoc
                                              : val?.imageType === 2
                                              ? PSD
                                              : illustrator
                                          }
                                          alt='Template'
                                          width={20}
                                          height={19}
                                          layout='responsive'
                                          objectFit='cover'
                                        />
                                      </div>
                                      <TooltipBootstrap title={`${val?.fileName}`} placement='top'>
                                        <div className={classes.sizeText}>
                                          <Typography variant='h4'>{`${val?.fileName}`}</Typography>
                                        </div>
                                      </TooltipBootstrap>
                                    </div>
                                  </>
                                ))}
                          </div>
                        </Typography>
                      </Box>
                    </Collapse>
                  </TableCell>
                </TableRow>
              )}
            </>
          )
        })}

      {!tableLoader && !lists?.length && (
        <TableRow>
          <TableCell colSpan={tableTitles?.length + 1}>
            <Typography variant='h4' className={classes.TextStyle}>
              <span className={classes.DataLength}>
                {nodataMessage ? nodataMessage : 'No data found!'}
              </span>
            </Typography>
          </TableCell>
        </TableRow>
      )}
    </TableBody>
  )
}

export default TableBodyContent
