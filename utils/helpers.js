import CryptoJS, { AES, enc } from 'crypto-js'
import { NotificationManager } from 'react-notifications'
import axios from 'axios'
export const downloadFile = (url, fileName) => {
  fetch(url, {
    method: 'GET'
  })
    .then((response) => response.blob())
    .then((blob) => {
      const urlf = window.URL.createObjectURL(new Blob([blob]))
      const link = document.createElement('a')
      link.href = fileName.split('.').pop() === 'ai' ? url : urlf
      link.target = fileName.split('.').pop() === 'pdf' ? '__blank' : ''
      link.setAttribute('download', fileName)
      document.body.appendChild(link)
      link.click()
      link.parentNode.removeChild(link)
    })
}

/**
 * Check if Empty
 * @param {*} value
 * @returns
 */

export const checkIfEmpty = (value) =>
  value === undefined ||
  value === null ||
  (typeof value === 'object' && Object.keys(value).length === 0) ||
  (typeof value === 'string' && value.trim().length === 0)

/**
 * Check if Email
 * @param {*} value
 * @returns
 */
export const checkIfEmail = (value) => /\S+@\S+\.\S+/.test(value)
export const checkInvalidDomain = (value) =>
  value.split('@')[1] &&
  ((value.split('@')[1].split('.')[0] && value.split('@')[1].split('.')[0].includes('+')) ||
    (value.split('@')[1].split('.')[1] && value.split('@')[1].split('.')[1].includes('+')))
export const partialEmail = (value) => value.replace(/(\w{3})[\w.-]+@([\w.]+\w)/, '$1***@$2')

export const checkIfValidPwd = (value) =>
  /^(?=.*\d)(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z]).{8,}$/.test(value)

export const getObjectValue = (object, keys) =>
  keys.split('.').reduce((o, k) => (o || {})[k], object)

/**
 * Validate form fields
 * @param {*} data
 * @param {*} fields
 * @returns
 */
export const validateFields = (data, fields, isSignup = false) => {
  const errors = {}
  fields.forEach((element) => {
    if (checkIfEmpty(data?.[element?.name]) && element?.isRequired) {
      errors[element?.name] = `${element?.label} is required`
    } else if (
      element?.checkIfValidEmail &&
      !checkIfEmpty(data?.[element?.name]) &&
      (!checkIfEmail(data?.[element?.name]) || checkInvalidDomain(data?.[element?.name]))
    ) {
      errors[element?.name] = `Invalid email address`
    } else if (element?.checkIfNumber && !new RegExp('^[0-9]+$').test(data?.[element?.name])) {
      errors[element?.name] = `Please enter a valid number`
    } else if (
      element?.checkIfValidPassword &&
      !checkIfValidPwd(data?.[element?.name]) &&
      isSignup
    ) {
      // Password must contain 8 characters with upper, case, lower case , special case and a number
      errors[element?.name] = `Please enter a strong password`
    }
  })
  return errors
}

/**
 * encrypt  Using AES
 * @param {*} value
 * @returns
 */
export const encryptUsingAES = (value) => {
  const AESKey = 'KPMO456EHA90G007'
  const encryptkey = CryptoJS.enc.Utf8.parse(AESKey)
  const iv = CryptoJS.enc.Utf8.parse(AESKey)
  const encrypted = CryptoJS.AES.encrypt(CryptoJS.enc.Utf8.parse(value), encryptkey, {
    keySize: 128 / 8,
    iv,
    mode: CryptoJS.mode.CBC,
    padding: CryptoJS.pad.Pkcs7
  })
  return encrypted.toString()
}

export const throttle = (InputFunction, delay) => {
  let shouldThrottle = false
  return function () {
    if (!shouldThrottle) {
      shouldThrottle = true
      InputFunction.call(this, arguments)
      setTimeout(() => {
        shouldThrottle = false
      }, delay)
    }
  }
}

export const calculateProfitPercent = (cost, profit) => {
  return ((parseFloat(profit) * 100) / cost).toFixed(3)
}
export const calculateProfit = (cost, profitPercentage) => {
  return (parseFloat(profitPercentage) / 100) * cost.toFixed(3)
}

export const isActiveInternet = (router, routePath) => {
  if (navigator.onLine) {
    router.push(routePath)
  } else {
    NotificationManager.error('No active internet connection.', '', 10000)
  }
}
export const formatUTC = (dateInt, addOffset = false) => {
  let date = !dateInt || dateInt.length < 1 ? new Date() : new Date(dateInt)
  if (typeof dateInt === 'string') {
    return date
  } else {
    const offset = addOffset ? date.getTimezoneOffset() : -date.getTimezoneOffset()
    const offsetDate = new Date()
    offsetDate.setTime(date.getTime() + offset * 60000)
    return offsetDate
  }
}

export const compareObjs = (obj1, obj2) => {
  return JSON.stringify(obj1) === JSON.stringify(obj2)
}

export const calculateAmountWithQuantity = (qty, amount) => {
  return (parseFloat(qty) * parseFloat(amount)).toFixed(2)
}

export const calculateAmountOfOrder = (arrayValue) => {
  return !checkIfEmpty(arrayValue)
    ? parseFloat(
        arrayValue.map((val) => val?.price * val?.quantity).reduce((a, b) => a + b)
      ).toFixed(2)
    : 0
}
export const calculateTotalAmount = (count) => {
  return count?.length === 1
    ? parseFloat(count[0].totalPrice).toFixed(2)
    : count
        .reduce(
          (previousValue, currentValue) =>
            parseFloat(previousValue) + parseFloat(currentValue.totalPrice),
          0
        )
        .toFixed(2)
}

/**
 * s2ab
 * @param {*} s
 * @returns
 */
export const s2ab = (s) => {
  var buf = new ArrayBuffer(s.length)
  var view = new Uint8Array(buf)
  for (var i = 0; i != s.length; ++i) view[i] = s.charCodeAt(i) & 0xff
  return buf
}
export const daysBtwDate = (date_1, date_2) => {
  let difference = date_1.getTime() - date_2.getTime()
  let TotalDays = Math.ceil(difference / (1000 * 3600 * 24))
  return TotalDays
}
export const checkifValidUrl = (URL) => {
  if (!checkIfEmpty(URL)) {
    var res = URL.match(
      /(http(s)?:\/\/.)?(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/g
    )
    if (res == null) return false
    else return true
  }
}
export const hasWhiteSpace = (s) => {
  return /\s/g.test(s)
}

export const validateDecimal = (val) => {
  const isNumber = /^\d*\.?\d*$/.test(val)
  if (isNumber) {
    if (`${val}`?.includes('.')) {
      return `${val?.split?.('.')?.[0]?.slice(0, 4)}.${
        val?.split?.('.')[1]?.length > 2 ? val?.split?.('.')?.[1].slice(0, 2) : val?.split('.')?.[1]
      }`
    } else if (!val?.includes('.')) {
      return val?.split?.('.')?.[0]?.slice(0, 4)
    }
  } else {
    const res = val?.replace(/[^0-9.]/g, '')
    return countInstances(`${val}`, '.') > 1
      ? parseFloat(res)?.toFixed(2)
      : val?.replace(/[^0-9.]/g, '')
  }
}
function countInstances(string, word) {
  return string?.split(word)?.length - 1
}

/**
 * getBase64
 * @param {*} file
 * @returns
 */
export const getBase64 = (file, fileName = false) => {
  return new Promise((resolve, reject) => {
    var blob = new Blob([s2ab(atob(file))], {
      type: ''
    })
    let objectURL = window.URL.createObjectURL(blob)
    let anchor = document.createElement('a')
    anchor.href = objectURL
    anchor.download = fileName ? `${fileName}.xlsx` : 'excel.xlsx'
    anchor.click()
  })
}

export const getZendeskApi = (url) => {
  return new Promise((resolve, reject) => {
    axios
      .get(`${process.env.ZENDESK_URL}/${url}`, {
        headers: {
          Authorization: `Basic ${Buffer.from(
            `administrator@mwwondemand.com:bfNAhEaC4pEm3Yc!`
          ).toString('base64')}`
          // Authorization: `Basic ${Buffer.from('nimisha.pk@fingent.com').toString(
          //   'base64'
          // )}:token/CCA0I4rymuz8CvG3AxyzMpL8vhNNttWeNnYL2xo0`

          // CCA0I4rymuz8CvG3AxyzMpL8vhNNttWeNnYL2xo0`
        }
      })
      .then((response) => {
        resolve(response.data)
      })
      .catch((Err) => {
        reject(Err)
      })
  })
}
export const selectFieldFormat = (list) => {
  return list?.map(({ id, name, code }) => ({
    id,
    label: name,
    value: code
  }))
}

export const raiseTicket = (url, data) => {
  return new Promise((resolve, reject) => {
    axios
      .post(`${process.env.ZENDESK_URL}/${url}`, data, {
        headers: {
          Authorization: `Basic ${Buffer.from(
            `administrator@mwwondemand.com:bfNAhEaC4pEm3Yc!`
          ).toString('base64')}`
        }
      })
      .then((response) => {
        resolve(response.data)
      })
      .catch((Err) => {
        reject(Err)
      })
  })
}

export const parseJSON = (json, router) => {
  try {
    return JSON.parse(json)
  } catch (err) {
    router.push('/catalog')
    NotificationManager.error(
      'The designer tool is unavailable for this Product. Please contact the administrator for more details.',
      '',
      10000
    )
    console.log(err)
  }
}

export const decryptId = (str) => {
  const decodedStr = decodeURIComponent(str)
  return AES.decrypt(decodedStr, 'Mww#CustomerID').toString(enc.Utf8)
}
export const encryptId = (str) => {
  const ciphertext = AES.encrypt(str, 'Mww#CustomerID')
  const dt = encodeURIComponent(ciphertext.toString())
  return dt
}
// export const abc = () => {
//   getUser[SessionShopify()
//   const res = await fetchShippingMethods()
//   console.log({ res })
//   if (200 <= res.statusCode) {
//     return res?.response
//   } else {
//     return null
//   }
// }

export const isShopifyApp = () => {
  try {
    return window.self !== window.top
  } catch (e) {
    return true
  }
}

export const getEntityName = (key) => {
  switch (key) {
    case 1:
      return 'User'
    case 2:
      return 'Category'
    case 3:
      return 'Product'
    case 4:
      return 'Product variant'
    case 5:
      return 'Product library'
    case 6:
      return 'Product library variant'
    case 7:
      return 'Order'
    case 8:
      return 'Store'
    case 9:
      return 'Store order'
    case 10:
      return 'Variable types'
    case 11:
      return 'Order line items'
    case 12:
      return 'Activity log'
    default:
      break
  }
}
export const getActionType = (key) => {
  switch (key) {
    case 0:
      return 'None'
    case 1:
      return 'Login'
    case 2:
      return 'Logout'
    case 3:
      return 'View'
    case 4:
      return 'Create'
    case 5:
      return 'Modify'
    case 6:
      return 'Delete'
    case 7:
      return 'BulkCreate'
    case 8:
      return 'Listing'
    default:
      break
  }
}
