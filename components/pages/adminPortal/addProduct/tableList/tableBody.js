import React, { useCallback, useState } from 'react'
import {
  TableBody,
  TableRow,
  TableCell,
  Typography,
  TextField,
  IconButton,
  Button
} from '@material-ui/core'
import TemplateDoc from '/static/images/pdf.png'
import PSD from '/static/images/psd.png'
import illustrator from '/static/images/illustrator.png'
import Image from 'next/image'
import { useDropzone } from 'react-dropzone'
import { v4 as uuidv4 } from 'uuid'
import Icon from 'icomoons/Icon'
import style from './style'
import { NotificationManager } from 'react-notifications'
import { downloadFile } from 'utils/helpers'
import { TooltipBootstrap } from 'components/bootstrapTooltip'

const TableBodyList = ({
  tabClassName,
  tableDetails = [],
  deleteRow = () => {},
  tableValuesCB = () => {},
  templateUploaderCB = () => {},
  saveRowDataCB = () => {},
  removeTemplate = () => {}
}) => {
  const classes = style()
  let fileUploadedRow = {}
  const [symbolsArr] = useState(['e', 'E', '+', '-'])

  const onDrop = useCallback(
    (acceptedFiles) => {
      acceptedFiles.forEach((file) => {
        if (
          file?.type === 'application/pdf' ||
          file?.type === 'application/postscript' ||
          file?.type === ''
        ) {
          const existingTemplates = fileUploadedRow?.tableCell.filter(
            (item) => item.type === 'UPLOADER'
          )
          if (
            !existingTemplates[0].templateFiles?.some(
              (template) =>
                template.templateFormat === file?.type ||
                (file.type === '' && template.templateFormat === 'application/psd')
            )
          ) {
            const reader = new FileReader()
            reader.onload = () => {
              const binaryStr = reader.result
              templateUploaderCB({
                rowId: fileUploadedRow.uuid,
                uuid: uuidv4(),
                name: file.name,
                icon: ['file_download', 'pop-close'],
                templateFormat: file.type ? file.type : 'application/psd',
                templateType:
                  file?.type === 'application/pdf'
                    ? 1
                    : file?.type === 'application/postscript'
                    ? 3
                    : 2,
                size: file.size,
                imagePath: URL.createObjectURL(file),
                base64: binaryStr.split(',')[1]
              })
            }
            reader.readAsDataURL(file)
          } else {
            NotificationManager.warning('Same file format is already uploaded', '', 3000)
          }
        } else {
          NotificationManager.warning('Unsupported file format', '', 2000)
        }
      })
    },
    [fileUploadedRow]
  )

  const { acceptedFiles, getRootProps, getInputProps } = useDropzone({
    onDrop,
    noDragEventsBubbling: true,
    multiple: false
  })

  return (
    <TableBody>
      {tableDetails['body'].map((tableData, idx) => {
        const isEmpty = (str) => {
          return !str || str?.trim()?.length === 0
        }
        const isDisabled = tableData['tableCell'].filter(
          (cell) =>
            (cell.type === 'TEXT' && !cell.value) ||
            (cell.type === 'TEXT' && isEmpty(cell.value)) ||
            (cell.type === 'UPLOADER' && cell.templateFiles?.length < 1)
        ).length
        return (
          <TableRow className={classes.TabRowWrapper} key={tableData.uuid}>
            {tableData['tableCell']?.map((item) => {
              return (
                <TableCell className={classes.columnClassName} key={item.title}>
                  {(() => {
                    switch (item?.type) {
                      case 'UPLOADER':
                        return (
                          <div className={classes.templateWrap}>
                            {item.templateFiles?.map((tempItem) => (
                              <div key={tempItem.uuid} className={classes.templateFlex}>
                                <div className={classes.templateImg}>
                                  <Image
                                    src={
                                      tempItem.templateType === 1
                                        ? TemplateDoc
                                        : tempItem.templateType === 3
                                        ? illustrator
                                        : PSD
                                    }
                                    alt='Template'
                                    width={20}
                                    height={19}
                                    layout='responsive'
                                    objectFit='cover'
                                  />
                                </div>
                                <TooltipBootstrap title={tempItem.name} placement='top'>
                                  <div className={classes.tempName}>
                                    <Typography variant='h5'> {tempItem.name}</Typography>
                                  </div>
                                </TooltipBootstrap>
                                {!tempItem.base64 && (
                                  <TooltipBootstrap title='download' placement='top'>
                                    <div
                                      onClick={(e) => {
                                        downloadFile(tempItem.imagePath, tempItem.name)
                                      }}
                                      className={classes.templateIcon}
                                      style={{ marginRight: 3 }}
                                    >
                                      <Icon icon={tempItem.icon[0]} size={14} />
                                    </div>
                                  </TooltipBootstrap>
                                )}
                                <TooltipBootstrap title='delete' placement='top'>
                                  <div
                                    className={classes.templateIcon}
                                    onClick={() => removeTemplate(tempItem, item, tableData)}
                                  >
                                    <Icon icon={tempItem.icon[1]} size={14} />
                                  </div>
                                </TooltipBootstrap>
                              </div>
                            ))}

                            {item.templateFiles?.length < 3 && (
                              <div>
                                <IconButton
                                  {...getRootProps({
                                    className: 'dropzone',
                                    onClick: (e) => {
                                      fileUploadedRow = tableData
                                    }
                                  })}
                                  aria-label='add'
                                  className={classes.btnIconAdd}
                                >
                                  <input style={{ height: '100%' }} {...getInputProps()} />

                                  <Icon icon='add-icon' size={16} />
                                  <span className={classes.tooltiptext}>
                                    Supported format:PDF,PSD,AI
                                  </span>
                                </IconButton>
                              </div>
                            )}
                          </div>
                        )
                      case 'ICON':
                        return (
                          <TooltipBootstrap title='delete' placement='top'>
                            <IconButton
                              aria-label='delete'
                              disabled={!item.isDeletable}
                              onClick={() => deleteRow(tableData)}
                              className={classes.btnIconAction}
                            >
                              <Icon icon='delete' size={16} />
                            </IconButton>
                          </TooltipBootstrap>
                        )
                      case 'SAVE':
                        return (
                          <div className={classes.btnTabSave}>
                            <Button
                              disabled={isDisabled}
                              type='submit'
                              variant='contained'
                              className={classes.saveBtn}
                              onClick={() => saveRowDataCB(tableData, item.value)}
                            >
                              {item.value}
                            </Button>
                          </div>
                        )
                      default:
                        return (
                          <Typography variant='h4' className={classes.TextStyle}>
                            <TextField
                              disabled={item.isDisabled}
                              variant='outlined'
                              type={item.title === 'Price' ? 'number' : 'text'}
                              onKeyDown={(evt) =>
                                item.title === 'Price' &&
                                symbolsArr.includes(evt.key) &&
                                evt.preventDefault()
                              }
                              fullWidth
                              value={item.value}
                              placeholder='Enter value'
                              onChange={(e) => tableValuesCB(e, item, tableData)}
                              InputLabelProps={{
                                shrink: false
                              }}
                              FormHelperTextProps={{
                                className: classes.helperText
                              }}
                              inputProps={{
                                maxLength: 30
                              }}
                              onInput={(e) => {
                                if (`${e.target.value}`.length > 4 && item.title === 'Price') {
                                  e.target.value = e.target.value.slice(0, 10)
                                }
                              }}
                            />
                          </Typography>
                        )
                    }
                  })()}
                </TableCell>
              )
            })}
          </TableRow>
        )
      })}
    </TableBody>
  )
}

export default TableBodyList
