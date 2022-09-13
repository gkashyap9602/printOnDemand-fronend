export const statusTabList = [
  {
    id: 1,
    name: 'active',
    icon: 'active-outlined',
    color: '#75ca9e',
    count: 0,
    status: 'Active customers',
    statusId: 1,
    activeIcon: 'active-filled',
    text: '',
    bgActive: '#75ca9e',
    userBG: ''
    // ab: tab_ActiveCustomer
  },
  {
    id: 2,
    name: 'pending',
    icon: 'pending-outlined',
    color: '#dfb02a',
    count: 0,
    status: 'Pending activation',
    statusId: 3,
    activeIcon: 'pending-filled',
    bgActive: '#dfb02a',
    text: 'Activation pending',
    userBG: '#fcb357'
  },
  {
    id: 3,
    name: 'disabled',
    icon: 'disabled-outlined',
    color: '#fb413f',
    count: 0,
    status: 'Deactivated',
    statusId: 2,
    activeIcon: 'disabled-filled',
    bgActive: '#fb413f',
    text: 'Deactivated',
    userBG: '#fb413f'
  },
  // {
  //   id: 4,
  //   name: 'inactive',
  //   icon: 'inactive-outlined',
  //   color: '#6b757f',
  //   count: 0,
  //   status: 'Inactive',
  //   statusId: 4,
  //   activeIcon: 'inactive-filled',
  //   bgActive: '#6b757f',
  //   text: '',
  //   userBG: ''
  // },
  {
    id: 4,
    name: 'total',
    icon: 'total-outlined',
    color: '#a57fff',
    count: 0,
    status: 'Total',
    statusId: 0,
    activeIcon: 'total-filled',
    bgActive: '#a57fff',
    text: '',
    userBG: ''
  }
]

export const SIGNUP_FIELDS = [
  {
    label: 'First name',
    name: 'firstName',
    type: 'text',
    placeholder: 'Enter first name',
    isRequired: true,
    //  tabIndex: 1,
    size: {
      xs: 12,
      sm: 12,
      md: 6,
      lg: 6,
      xl: 6
    }
  },
  {
    label: 'Last name',
    name: 'lastName',
    type: 'text',
    placeholder: 'Enter last name',
    isRequired: true,
    // tabIndex: 2,
    size: {
      xs: 12,
      sm: 12,
      md: 6,
      lg: 6,
      xl: 6
    }
  },
  {
    label: 'Email',
    name: 'email',
    type: 'text',
    // tabIndex: 3,
    iconProps: {
      icon: 'email',
      size: 20,
      color: '#babac9'
    },
    checkIfValidEmail: true,
    size: {
      xs: 12,
      sm: 12,
      md: 12,
      lg: 12,
      xl: 12
    },
    placeholder: 'Enter email',
    isRequired: true
  },
  {
    label: 'Password',
    name: 'password',
    type: 'password',
    tooltip: true,
    checkIfValidPassword: true,
    // tabIndex: 4,
    iconProps: {
      icon: 'eye-hide',
      size: 20,
      color: '#babac9'
    },
    size: {
      xs: 12,
      sm: 12,
      md: 6,
      lg: 6,
      xl: 6
    },
    placeholder: 'Enter password',
    isRequired: true
  },
  {
    label: 'Password confirmation',
    name: 'confirmPassword',
    type: 'password',
    //  tabIndex: 5,
    iconProps: {
      icon: 'eye-hide',
      size: 20,
      color: '#babac9'
    },
    size: {
      xs: 12,
      sm: 12,
      md: 6,
      lg: 6,
      xl: 6
    },
    placeholder: 'Enter password',
    isRequired: true
  }
]

export const LOGIN_FIELDS = [
  {
    label: 'Email',
    name: 'email',
    iconProps: {
      icon: 'email',
      size: 20,
      color: '#babac9'
    },
    checkIfValidEmail: true,
    //  tabIndex: 1,
    size: {
      xs: 12,
      sm: 12,
      md: 12,
      lg: 12,
      xl: 12
    },
    placeholder: 'Enter email',
    isRequired: true
  },
  {
    label: 'Password',
    name: 'password',
    type: 'password',
    checkIfValidPassword: true,
    // tabIndex: 2,
    iconProps: {
      icon: 'eye-hide',
      size: 20,
      color: '#babac9'
    },
    size: {
      xs: 12,
      sm: 12,
      md: 12,
      lg: 12,
      xl: 12
    },
    placeholder: 'Enter password',
    isRequired: true
  }
]

export const FORGOT_FIELDS = [
  {
    label: 'Email',
    name: 'email',
    checkIfValidEmail: true,
    iconProps: {
      icon: 'email',
      size: 20,
      color: '#babac9'
    },
    size: {
      xs: 12,
      sm: 12,
      md: 12,
      lg: 12,
      xl: 12
    },
    placeholder: 'Enter email',
    isRequired: true
  }
]

export const CREATE_FIELDS = [
  {
    label: 'New password',
    name: 'newPassword',
    tooltip: true,
    type: 'password',
    iconProps: {
      icon: 'eye-hide',
      size: 20,
      color: '#babac9'
    },
    size: {
      xs: 12,
      sm: 12,
      md: 12,
      lg: 12,
      xl: 12
    },
    placeholder: 'Enter new password',
    isRequired: true
  },
  {
    label: 'Confirm password',
    name: 'confirmPassword',
    type: 'password',
    iconProps: {
      icon: 'eye-hide',
      size: 20,
      color: '#babac9'
    },
    size: {
      xs: 12,
      sm: 12,
      md: 12,
      lg: 12,
      xl: 12
    },
    placeholder: 'Enter password',
    isRequired: true
  }
]

export const BASIC_INFO = [
  {
    label: 'First name',
    name: 'firstName',
    type: 'text',
    placeholder: 'Enter first name',
    isRequired: true,
    // tabIndex: 1,
    size: {
      xs: 12,
      sm: 12,
      md: 6,
      lg: 6,
      xl: 6
    }
  },
  {
    label: 'Last name',
    name: 'lastName',
    type: 'text',
    placeholder: 'Enter last name',
    isRequired: true,
    //  tabIndex: 2,
    size: {
      xs: 12,
      sm: 12,
      md: 6,
      lg: 6,
      xl: 6
    }
  },
  {
    label: 'Email',
    name: 'email',
    type: 'text',
    // tabIndex: 3,
    iconProps: {
      icon: 'email',
      size: 20,
      color: '#babac9'
    },
    checkIfValidEmail: true,
    size: {
      xs: 12,
      sm: 12,
      md: 12,
      lg: 12,
      xl: 12
    },
    placeholder: 'Enter email',
    isRequired: true
  }
]

export const SHIPPING_INFO = [
  {
    label: 'Company name',
    name: 'companyName',
    type: 'text',
    placeholder: 'Enter company name',
    isRequired: true,
    // tabIndex: 5,
    iconProps: {
      icon: ''
    },
    size: {
      xs: 12,
      sm: 12,
      md: 6,
      lg: 6,
      xl: 6
    }
  },
  {
    label: 'Contact name',
    name: 'contactName',
    type: 'text',
    placeholder: 'Enter contact name',
    isRequired: true,
    //  tabIndex: 6,
    iconProps: {
      icon: ''
    },
    size: {
      xs: 12,
      sm: 12,
      md: 6,
      lg: 6,
      xl: 6
    }
  },
  {
    label: 'Address line 1',
    name: 'address1',
    type: 'text',
    iconProps: {
      icon: ''
    },
    // tabIndex: 7,
    size: {
      xs: 12,
      sm: 12,
      md: 12,
      lg: 12,
      xl: 12
    },
    placeholder: 'Enter address',
    isRequired: true
  },
  {
    label: ' Address line 2',
    name: 'address2',
    type: 'text',
    iconProps: {
      icon: ''
    },
    // tabIndex: 8,
    size: {
      xs: 12,
      sm: 12,
      md: 12,
      lg: 12,
      xl: 12
    },
    placeholder: 'Enter address (Optional)',
    isRequired: false
    //   tabIndex: 10,
  },
  {
    type: 'select',
    id: 'countryId',
    name: 'country',
    label: 'Country',
    placeholder: 'Country',
    variant: 'outlined',
    fullWidth: true,
    isRequired: true,
    //  tabIndex: 11,
    size: {
      xs: 12,
      sm: 12,
      md: 4,
      lg: 4,
      xl: 4
    },
    iconProps: {
      icon: ''
    }
  },
  {
    type: 'text',
    id: 'stateId',
    name: 'stateName',
    label: 'State',
    placeholder: 'State',
    variant: 'outlined',
    isRequired: true,
    fullWidth: true,
    //  tabIndex: 12,
    size: {
      xs: 12,
      sm: 12,
      md: 4,
      lg: 4,
      xl: 4
    },
    iconProps: {
      icon: ''
    },
    options: []
  },
  {
    type: 'text',
    id: 'cityId',
    name: 'city',
    label: 'City',
    placeholder: 'City',
    variant: 'outlined',
    fullWidth: true,
    isRequired: true,
    //  tabIndex: 13,
    size: {
      xs: 12,
      sm: 12,
      md: 4,
      lg: 4,
      xl: 4
    },
    iconProps: {
      icon: ''
    }
  },
  {
    label: 'Zip code',
    name: 'zipCode',
    type: 'text',
    iconProps: {
      icon: ''
    },
    //  tabIndex: 14,
    size: {
      xs: 12,
      sm: 12,
      md: 12,
      lg: 12,
      xl: 12
    },
    placeholder: 'Enter zip code',
    isRequired: true,
    checkIfNumber: false
  }
  // {
  //   label: 'NC sales and tax registration number',
  //   name: 'taxNum',
  //   type: 'text',
  //   iconProps: {
  //     icon: ''
  //   },
  //   size: {
  //     xs: 12,
  //     sm: 12,
  //     md: 12,
  //     lg: 12,
  //     xl: 12
  //   },
  //   placeholder: 'Enter tax registration number',
  //   isRequired: true
  // }
]

export const BILLING_INFO = [
  {
    label: 'Company email',
    name: 'companyEmail',
    type: 'text',
    //  tabIndex: 15,
    checkIfValidEmail: true,
    placeholder: 'Enter company email',
    isRequired: true,
    iconProps: {
      icon: ''
    },
    size: {
      xs: 12,
      sm: 12,
      md: 12,
      lg: 12,
      xl: 12
    }
  },
  {
    label: 'Contact phone',
    name: 'companyPhone',
    type: 'text',
    placeholder: 'Enter contact phone',
    isRequired: true,
    //  tabIndex: 16,
    iconProps: {
      icon: ''
    },
    size: {
      xs: 12,
      sm: 12,
      md: 6,
      lg: 6,
      xl: 6
    },
    checkIfNumber: false
  },
  {
    label: 'Tax ID',
    name: 'taxId',
    type: 'text',
    iconProps: {
      icon: ''
    },
    //  tabIndex: 17,
    size: {
      xs: 12,
      sm: 12,
      md: 6,
      lg: 6,
      xl: 6
    },
    placeholder: 'Enter Tax ID',
    isRequired: true
  }
]

export const BILLING_INFO_WITHOUT_TAXID = [
  {
    label: 'Company email',
    name: 'companyEmail',
    type: 'text',
    //  tabIndex: 15,
    checkIfValidEmail: true,
    placeholder: 'Enter company email',
    isRequired: true,
    iconProps: {
      icon: ''
    },
    size: {
      xs: 12,
      sm: 12,
      md: 12,
      lg: 12,
      xl: 12
    }
  },
  {
    label: 'Contact phone',
    name: 'companyPhone',
    type: 'text',
    placeholder: 'Enter contact phone',
    isRequired: true,
    //   tabIndex: 16,
    iconProps: {
      icon: ''
    },
    size: {
      xs: 12,
      sm: 12,
      md: 12,
      lg: 12,
      xl: 12
    },
    checkIfNumber: false
  }
]

export const PAYMENT_INFO = [
  {
    label: 'Name on card',
    name: 'userId',
    id: 'hiddenId',
    key: 'hiddenId',
    type: 'text',
    placeholder: 'Enter name',
    //  tabIndex: 18,
    iconProps: {
      icon: ''
    },
    size: {
      xs: 12,
      sm: 12,
      md: 12,
      lg: 12,
      xl: 12
    }
  },
  {
    label: 'Name on card',
    name: 'customerId',
    id: 'hiddenId',
    key: 'hiddenId',
    type: 'text',
    placeholder: 'Enter name',
    //  tabIndex: 18,
    iconProps: {
      icon: ''
    },
    size: {
      xs: 12,
      sm: 12,
      md: 12,
      lg: 12,
      xl: 12
    }
  },
  {
    label: 'Name on card',
    name: 'name',
    type: 'text',
    placeholder: 'Enter name',
    isRequired: true,
    //  tabIndex: 18,
    iconProps: {
      icon: ''
    },
    size: {
      xs: 12,
      sm: 12,
      md: 12,
      lg: 12,
      xl: 12
    }
  },
  {
    label: 'Card number',
    name: 'ccNumber',
    type: 'text',
    classEncrypt: 'pt-encrypt',
    placeholder: 'Enter card number',
    isRequired: true,
    // checkIfNumber: true,
    //  tabIndex: 19,
    iconProps: {
      icon: ''
    },
    size: {
      xs: 12,
      sm: 12,
      md: 12,
      lg: 12,
      xl: 12
    }
  },
  {
    label: 'Expiration month',
    name: 'expirationMonth',
    type: 'select',
    //  tabIndex: 20,
    iconProps: {
      icon: ''
    },

    size: {
      xs: 12,
      sm: 12,
      md: 6,
      lg: 6,
      xl: 6
    },
    placeholder: 'Select month',
    isRequired: true,

    options: Array.from({ length: 12 }, (_, i) => {
      return { value: i + 1, label: i + 1 }
    })
  },
  {
    label: 'Expiration year',
    name: 'expirationYear',
    type: 'select',
    //  tabIndex: 21,
    options: Array.from(Array(50), (_, i) => {
      return {
        value: (i + new Date().getFullYear()).toString(),
        label: (i + new Date().getFullYear()).toString()
      }
    }),
    iconProps: {
      icon: ''
    },

    size: {
      xs: 12,
      sm: 12,
      md: 6,
      lg: 6,
      xl: 6
    },
    placeholder: 'Select year',
    isRequired: true
  }
]

export const CARD_INFO = [
  {
    label: 'Address line 1',
    name: 'address1',
    type: 'text',
    iconProps: {
      icon: ''
    },
    //  tabIndex: 22,
    size: {
      xs: 12,
      sm: 12,
      md: 12,
      lg: 12,
      xl: 12
    },
    placeholder: 'Enter address',
    isRequired: true
  },

  {
    label: 'Contact phone',
    name: 'phone',
    type: 'text',
    placeholder: 'Enter contact phone',
    isRequired: false,
    //  tabIndex: 16,
    iconProps: {
      icon: ''
    },
    size: {
      xs: 12,
      sm: 12,
      md: 12,
      lg: 12,
      xl: 12
    },
    checkIfNumber: false
  },
  // {
  //   label: ' Address line 2',
  //   name: 'address2',
  //   type: 'text',
  //   iconProps: {
  //     icon: ''
  //   },
  //   size: {
  //     xs: 12,
  //     sm: 12,
  //     md: 12,
  //     lg: 12,
  //     xl: 12
  //   },
  //   placeholder: 'Enter address',
  //   isRequired: false,
  //   iconProps: {
  //     icon: ''
  //   }
  // },
  // {
  //   type: 'text',
  //   id: 'countryId',
  //   name: 'country',
  //   label: 'Country',
  //   placeholder: 'Country',
  //   variant: 'outlined',
  //   fullWidth: true,
  //   isRequired: true,
  //   size: {
  //     xs: 12,
  //     sm: 12,
  //     md: 4,
  //     lg: 4,
  //     xl: 4
  //   },
  //   iconProps: {
  //     icon: ''
  //   },
  //   options: [
  //     {
  //       value: 'M',
  //       label: 'US'
  //     },
  //     {
  //       value: 'F',
  //       label: 'UK'
  //     },
  //     {
  //       value: 'O',
  //       label: 'USA'
  //     }
  //   ]
  // },

  {
    type: 'select',
    id: 'countryId',
    name: 'country',
    label: 'Country',
    placeholder: 'Country',
    variant: 'outlined',
    fullWidth: true,
    isRequired: false,
    //  tabIndex: 11,
    size: {
      xs: 12,
      sm: 12,
      md: 4,
      lg: 4,
      xl: 4
    },
    iconProps: {
      icon: ''
    }
  },
  {
    type: 'text',
    id: 'stateId',
    name: 'stateName',
    label: 'State code',
    placeholder: 'State code',
    variant: 'outlined',
    isRequired: false,
    fullWidth: true,
    //  tabIndex: 12,
    size: {
      xs: 12,
      sm: 12,
      md: 4,
      lg: 4,
      xl: 4
    },
    iconProps: {
      icon: ''
    },
    options: []
  },
  {
    type: 'text',
    id: 'cityId',
    name: 'city',
    label: 'City',
    placeholder: 'City',
    variant: 'outlined',
    fullWidth: true,
    isRequired: true,
    //  tabIndex: 13,
    size: {
      xs: 12,
      sm: 12,
      md: 4,
      lg: 4,
      xl: 4
    },
    iconProps: {
      icon: ''
    }
  },
  // {
  //   type: 'text',
  //   name: 'stateName',
  //   label: 'State',
  //   placeholder: 'State',
  //   variant: 'outlined',
  //   isRequired: true,
  //   fullWidth: true,
  //   //  tabIndex: 23,
  //   size: {
  //     xs: 12,
  //     sm: 12,
  //     md: 6,
  //     lg: 6,
  //     xl: 6
  //   },
  //   iconProps: {
  //     icon: ''
  //   },
  //   options: []
  // },
  // {
  //   type: 'text',
  //   name: 'city',
  //   label: 'City',
  //   placeholder: 'City',
  //   variant: 'outlined',
  //   fullWidth: true,
  //   isRequired: true,
  //   //  tabIndex: 24,
  //   size: {
  //     xs: 12,
  //     sm: 12,
  //     md: 6,
  //     lg: 6,
  //     xl: 6
  //   },
  //   iconProps: {
  //     icon: ''
  //   }
  // },
  {
    label: 'Zip code',
    name: 'zipCode',
    type: 'text',
    iconProps: {
      icon: ''
    },
    //  tabIndex: 25,
    size: {
      xs: 12,
      sm: 12,
      md: 12,
      lg: 12,
      xl: 12
    },
    placeholder: 'Enter zip code',
    isRequired: true,
    checkIfNumber: false
  }
]

export const UPDATE_PWD_FIELDS = [
  {
    label: 'Old password',
    name: 'oldPassword',
    type: 'password',
    iconProps: {
      icon: 'eye-hide',
      size: 20,
      color: '#babac9'
    },
    size: {
      xs: 12,
      sm: 12,
      md: 12,
      lg: 12,
      xl: 12
    },
    placeholder: 'Enter old password',
    isRequired: true
  },
  {
    label: 'New password',
    name: 'newPassword',
    type: 'password',
    iconProps: {
      icon: 'eye-hide',
      size: 20,
      color: '#babac9'
    },
    size: {
      xs: 12,
      sm: 12,
      md: 12,
      lg: 12,
      xl: 12
    },
    placeholder: 'Enter new password',
    isRequired: true,
    tooltip: true,
    checkIfValidPassword: true
  },
  {
    label: 'Confirm password',
    name: 'confirmPassword',
    type: 'password',
    iconProps: {
      icon: 'eye-hide',
      size: 20,
      color: '#babac9'
    },
    size: {
      xs: 12,
      sm: 12,
      md: 12,
      lg: 12,
      xl: 12
    },
    placeholder: 'Enter password',
    isRequired: true
  }
]

export const ADD_PRODUCT = [
  {
    label: 'Title',
    name: 'title',
    type: 'text',
    placeholder: 'Enter the title',
    isRequired: true,
    //  tabIndex: 1,
    iconProps: {
      icon: ''
    },
    size: {
      xs: 12,
      sm: 12,
      md: 12,
      lg: 12,
      xl: 12
    }
  },
  {
    label: 'Descripton',
    name: 'description',
    type: 'multiText',
    multiline: true,
    rows: 7,
    isDisabled: false,
    placeholder: 'Enter the description',
    isRequired: true,
    //  tabIndex: 2,
    iconProps: {
      icon: ''
    },
    size: {
      xs: 12,
      sm: 12,
      md: 12,
      lg: 12,
      xl: 12
    }
  },
  {
    id: 'process',
    name: 'process',
    label: 'Process',
    placeholder: 'Enter the process (Optional)',
    variant: 'outlined',
    fullWidth: true,
    type: 'multiText',
    multiline: true,
    rows: 5,
    isRequired: false,
    size: {
      xs: 12,
      sm: 12,
      md: 12,
      lg: 12,
      xl: 12
    },
    iconProps: {
      icon: ''
    }
  },
  {
    type: 'multiText',
    multiline: true,
    rows: 5,
    id: 'features',
    name: 'features',
    label: 'Features',
    placeholder: 'Enter the features (Optional)',
    variant: 'outlined',
    fullWidth: true,
    isRequired: false,
    size: {
      xs: 12,
      sm: 12,
      md: 12,
      lg: 12,
      xl: 12
    },
    iconProps: {
      icon: ''
    }
  },
  {
    label: 'Production time',
    name: 'productionDuration',
    type: 'text',
    placeholder: 'Enter the production time (Optional)',
    isRequired: false,
    iconProps: {
      icon: ''
    },
    size: {
      xs: 12,
      sm: 12,
      md: 12,
      lg: 12,
      xl: 12
    }
  }
]
export const PRODUCT_LIBRARY_DUPLICATE = [
  {
    label: 'Title',
    name: 'title',
    type: 'text',
    placeholder: 'Enter the title',
    isRequired: true,
    tabIndex: 1,
    iconProps: {
      icon: ''
    },
    size: {
      xs: 12,
      sm: 12,
      md: 6,
      lg: 6,
      xl: 6
    }
  },
  {
    label: 'Descripton',
    name: 'description',
    type: 'multiText',
    multiline: true,
    rows: 8,
    placeholder: 'Enter the description',
    isRequired: true,
    tabIndex: 2,
    iconProps: {
      icon: ''
    },
    size: {
      xs: 12,
      sm: 12,
      md: 12,
      lg: 12,
      xl: 12
    }
  }
]
export const PRODUCT_LIBRARY_DETAILS = [
  {
    label: 'Title',
    name: 'title',
    type: 'text',
    // isDisabled: true,
    placeholder: 'Enter the title',
    isRequired: true,
    //  tabIndex: 1,
    iconProps: {
      icon: ''
    },
    size: {
      xs: 12,
      sm: 12,
      md: 6,
      lg: 6,
      xl: 6
    }
  },
  {
    label: 'Descripton',
    name: 'description',
    type: 'multiText',
    multiline: true,
    rows: 8,
    // isDisabled: true,
    placeholder: 'Enter the description',
    isRequired: true,
    //  tabIndex: 2,
    iconProps: {
      icon: ''
    },
    size: {
      xs: 12,
      sm: 12,
      md: 12,
      lg: 12,
      xl: 12
    }
  }
]
export const EDIT_PRODUCT_LIBRARY = [
  {
    label: 'Cost price',
    name: 'costPrice',
    type: 'text',
    isDisabled: true,
    placeholder: 'Cost price',
    isRequired: true,
    //  tabIndex: 5,
    iconProps: {
      icon: ''
    },
    size: {
      xs: 12,
      sm: 12,
      md: 12,
      lg: 12,
      xl: 12
    }
  },
  {
    label: 'Retail price',
    name: 'price',
    step: 'any',
    type: 'number',
    placeholder: 'Retail price',
    isRequired: true,
    //  tabIndex: 5,
    iconProps: {
      icon: ''
    },
    size: {
      xs: 12,
      sm: 12,
      md: 12,
      lg: 12,
      xl: 12
    }
  },
  {
    label: 'Profit',
    name: 'profit',
    type: 'text',
    isDisabled: true,

    placeholder: 'Profit',
    isRequired: true,
    iconProps: {
      icon: ''
    },
    size: {
      xs: 12,
      sm: 12,
      md: 12,
      lg: 12,
      xl: 12
    }
  },
  {
    label: 'Profit % (Approximate)',
    name: 'profitPercentage',
    type: 'number',
    step: 'any',
    placeholder: 'Profit %',
    isRequired: true,
    iconProps: {
      icon: ''
    },
    size: {
      xs: 12,
      sm: 12,
      md: 12,
      lg: 12,
      xl: 12
    }
  }
]
export const ADD_PRODUCT2 = [
  {
    label: 'Category',
    name: 'category',
    type: 'select',
    placeholder: 'Select category',
    isRequired: true,
    iconProps: {
      icon: ''
    },
    size: {
      xs: 12,
      sm: 12,
      md: 12,
      lg: 12,
      xl: 12
    }
  },
  {
    type: 'select',
    id: 'subcategoryId',
    name: 'subcategory',
    label: 'Subcategory',
    placeholder: 'Select sub category',
    variant: 'outlined',
    fullWidth: true,
    isRequired: true,
    size: {
      xs: 12,
      sm: 12,
      md: 12,
      lg: 12,
      xl: 12
    },
    iconProps: {
      icon: ''
    }
  },
  {
    type: 'select',
    id: 'fabricId',
    name: 'fabric',
    label: 'Select fabric',
    placeholder: 'Select fabric',
    variant: 'outlined',
    fullWidth: true,
    isRequired: false,
    //  tabIndex: 4,
    size: {
      xs: 12,
      sm: 12,
      md: 12,
      lg: 12,
      xl: 12
    },
    iconProps: {
      icon: ''
    }
  },
  {
    type: 'multiText',
    multiline: true,
    rows: 5,
    id: 'constructionId',
    name: 'construction',
    label: 'Construction',
    placeholder: 'Enter the construction (Optional)',
    variant: 'outlined',
    fullWidth: true,
    isRequired: false,
    size: {
      xs: 12,
      sm: 12,
      md: 12,
      lg: 12,
      xl: 12
    },
    iconProps: {
      icon: ''
    }
  },
  {
    type: 'multiText',
    multiline: true,
    rows: 5,
    id: 'careInstructions',
    name: 'careInstructions',
    label: 'Care instructions',
    placeholder: 'Enter the care instructions (Optional)',
    variant: 'outlined',
    fullWidth: true,
    isRequired: false,
    size: {
      xs: 12,
      sm: 12,
      md: 12,
      lg: 12,
      xl: 12
    },
    iconProps: {
      icon: ''
    }
  }
]

export const orderTab = [
  {
    id: 1,
    name: 'totalCount',
    icon: 'orders-tab',
    color: '#75ca9e',
    count: 0,
    status: 'Total orders',
    statusId: 1,
    activeIcon: 'orders-filled',
    bgActive: '#75ca9e',
    text: '',
    userBG: '',
    key: null
    // ab: tab_ActiveCustomer
  },
  {
    id: 2,
    name: 'new',
    key: 1,
    icon: 'orders-pending',
    color: '#59abff',
    count: 0,
    status: 'New',
    statusId: 3,
    activeIcon: 'orders-pending-active',
    bgActive: '#59abff',
    text: 'New',
    userBG: '#fcb357'
  },
  {
    id: 3,
    name: 'cancelled',
    icon: 'orders-cancelled',
    color: '#a39e9e',
    count: 0,
    key: 5,
    status: 'Cancelled',
    statusId: 2,
    activeIcon: 'orders-cancelled',
    bgActive: '#a39e9e',
    text: 'Deactivated',
    userBG: '#fb413f'
  },
  {
    id: 4,
    name: 'error',
    key: 3,
    icon: 'orders-error',
    color: '#fb413f',
    count: 0,
    status: 'Error',
    statusId: 4,
    activeIcon: 'orders-error-active',
    bgActive: '#fb413f',
    text: '',
    userBG: ''
  },
  {
    id: 5,
    name: 'inProduction',
    icon: 'orders-inproduct',
    key: 2,
    color: '#f6bb14',
    count: 0,
    status: 'In production',
    statusId: 5,
    activeIcon: 'orders-inproduct-active',
    bgActive: '#f6bb14',
    text: '',
    userBG: ''
  },
  {
    id: 6,
    name: 'shipped',
    icon: 'shipping-info',
    color: '#8e5ffe',
    key: 4,
    count: 0,
    status: 'Shipped',
    statusId: 6,
    activeIcon: 'orders-shipping-active',
    bgActive: '#8e5ffe',
    text: '',
    userBG: ''
  }
]

export const OrderDetailsTab = [
  {
    id: 1,
    name: 'overview',
    icon: 'orders-tab',
    color: '#75ca9e',
    status: 'Order overview',
    statusId: 1,
    activeIcon: 'orders-filled',
    bgActive: '#75ca9e',
    text: '',
    userBG: ''
    // ab: tab_ActiveCustomer
  },
  {
    id: 2,
    name: 'variants',
    countValue: true,
    icon: 'order-variant',
    color: '#a57fff',
    status: 'Ordered variants',
    statusId: 3,
    activeIcon: 'order-filled-variant',
    bgActive: '#a57fff',
    text: 'New',
    userBG: '#fcb357'
  }
]

export const ORDER_INFORMATION = [
  { label: 'MWW order#', name: 'mwwOrderId' },
  { label: 'Customer name', name: 'customerName' },
  { label: 'Email', name: 'shippingAddress.companyEmail' },
  { label: 'Phone', name: 'shippingAddress.contactPhone' },
  { label: 'Order date', name: 'orderDate', type: 'date' },
  { label: 'Shipping method', name: 'shippingMethodName' },
  { label: 'Shipping account number', name: 'shippingAccountNumber' },
  { label: 'Tracking number', name: 'trackingNumbers' }
]
export const SHPPING_INFORMATION = [
  { label: 'Shipping address', name: 'shippingAddress' },
  { label: 'Email', name: 'shippingAddress.companyEmail' },
  { label: 'Phone', name: 'shippingAddress.contactPhone' }
]

export const BILLING_INFORMATION = [
  { label: 'Billing address', name: 'billingAddress' },
  { label: 'Email', name: 'billingAddress.companyEmail' },
  { label: 'Phone', name: 'billingAddress.contactPhone' }
]

export const SHIPPING_ADDRESS = [
  {
    label: 'Company name',
    name: 'companyName',
    type: 'text',
    placeholder: 'Enter company name',
    isRequired: false,
    iconProps: {
      icon: ''
    },
    size: {
      xs: 12,
      sm: 12,
      md: 6,
      lg: 6,
      xl: 6
    }
  },
  {
    label: 'Contact name',
    name: 'contactName',
    type: 'text',
    placeholder: 'Enter contact name',
    isRequired: true,
    iconProps: {
      icon: ''
    },
    size: {
      xs: 12,
      sm: 12,
      md: 6,
      lg: 6,
      xl: 6
    }
  },
  {
    label: 'Contact phone',
    name: 'contactPhone',
    type: 'text',
    placeholder: 'Enter contact phone',
    isRequired: true,
    iconProps: {
      icon: ''
    },
    size: {
      xs: 12,
      sm: 12,
      md: 6,
      lg: 6,
      xl: 6
    }
  },
  {
    label: 'Company email',
    name: 'companyEmail',
    type: 'text',
    checkIfValidEmail: true,
    placeholder: 'Enter company email',
    isRequired: false,
    iconProps: {
      icon: ''
    },
    size: {
      xs: 12,
      sm: 12,
      md: 6,
      lg: 6,
      xl: 6
    }
  },
  {
    label: 'Address line 1',
    name: 'address1',
    type: 'text',
    iconProps: {
      icon: ''
    },
    size: {
      xs: 12,
      sm: 12,
      md: 12,
      lg: 12,
      xl: 12
    },
    placeholder: 'Enter address',
    isRequired: true
  },
  {
    label: 'Address line 2',
    name: 'address2',
    type: 'text',
    iconProps: {
      icon: ''
    },
    size: {
      xs: 12,
      sm: 12,
      md: 12,
      lg: 12,
      xl: 12
    },
    placeholder: 'Enter address (Optional)',
    isRequired: false
  },
  {
    label: 'Country',
    name: 'country',
    type: 'select',
    placeholder: 'Enter country',
    isRequired: true,
    iconProps: {
      icon: ''
    },
    size: {
      xs: 12,
      sm: 12,
      md: 4,
      lg: 4,
      xl: 4
    }
  },
  {
    label: 'State',
    name: 'stateName',
    type: 'text',
    placeholder: 'Enter state',
    isRequired: true,
    iconProps: {
      icon: ''
    },
    size: {
      xs: 12,
      sm: 12,
      md: 4,
      lg: 4,
      xl: 4
    }
  },
  {
    label: 'City',
    name: 'city',
    type: 'text',
    placeholder: 'Enter city',
    isRequired: true,
    iconProps: {
      icon: ''
    },
    size: {
      xs: 12,
      sm: 12,
      md: 4,
      lg: 4,
      xl: 4
    }
  },
  {
    label: 'Zip code',
    name: 'zipCode',
    type: 'text',
    iconProps: {
      icon: ''
    },
    //  tabIndex: 14,
    size: {
      xs: 6,
      sm: 6,
      md: 6,
      lg: 6,
      xl: 6
    },
    placeholder: 'Enter zip code',
    isRequired: true,
    checkIfNumber: false
  }
]

export const BILLING_ADDRESS = [
  {
    label: 'Company name',
    name: 'companyName',
    type: 'text',
    placeholder: 'Enter company name',
    isRequired: false,
    iconProps: {
      icon: ''
    },
    size: {
      xs: 12,
      sm: 12,
      md: 6,
      lg: 6,
      xl: 6
    }
  },
  {
    label: 'Contact name',
    name: 'contactName',
    type: 'text',
    placeholder: 'Enter contact name',
    isRequired: true,
    iconProps: {
      icon: ''
    },
    size: {
      xs: 12,
      sm: 12,
      md: 6,
      lg: 6,
      xl: 6
    }
  },

  {
    label: 'Contact phone',
    name: 'contactPhone',
    type: 'text',
    placeholder: 'Enter contact phone',
    isRequired: true,
    iconProps: {
      icon: ''
    },
    size: {
      xs: 12,
      sm: 12,
      md: 6,
      lg: 6,
      xl: 6
    }
  },
  {
    label: 'Company email',
    name: 'companyEmail',
    checkIfValidEmail: true,
    type: 'text',
    placeholder: 'Enter company email',
    isRequired: true,
    iconProps: {
      icon: ''
    },
    size: {
      xs: 12,
      sm: 12,
      md: 6,
      lg: 6,
      xl: 6
    }
  },
  {
    label: 'Address line 1',
    name: 'address1',
    type: 'text',
    iconProps: {
      icon: ''
    },
    size: {
      xs: 12,
      sm: 12,
      md: 12,
      lg: 12,
      xl: 12
    },
    placeholder: 'Enter address',
    isRequired: true
  },
  {
    label: 'Address line 2',
    name: 'address2',
    type: 'text',
    iconProps: {
      icon: ''
    },
    size: {
      xs: 12,
      sm: 12,
      md: 12,
      lg: 12,
      xl: 12
    },
    placeholder: 'Enter address (Optional)',
    isRequired: false
  },
  {
    label: 'Country',
    name: 'country',
    type: 'select',
    placeholder: 'Enter country',
    isRequired: true,
    iconProps: {
      icon: ''
    },
    size: {
      xs: 12,
      sm: 12,
      md: 4,
      lg: 4,
      xl: 4
    }
  },
  {
    label: 'State',
    name: 'stateName',
    type: 'text',
    placeholder: 'Enter state',
    isRequired: true,
    iconProps: {
      icon: ''
    },
    size: {
      xs: 12,
      sm: 12,
      md: 4,
      lg: 4,
      xl: 4
    }
  },
  {
    label: 'City',
    name: 'city',
    type: 'text',
    placeholder: 'Enter city',
    isRequired: true,
    iconProps: {
      icon: ''
    },
    size: {
      xs: 12,
      sm: 12,
      md: 4,
      lg: 4,
      xl: 4
    }
  },

  {
    label: 'Zip code',
    name: 'zipCode',
    type: 'text',
    iconProps: {
      icon: ''
    },
    //  tabIndex: 14,
    size: {
      xs: 6,
      sm: 6,
      md: 6,
      lg: 6,
      xl: 6
    },
    placeholder: 'Enter zip code',
    isRequired: true,
    checkIfNumber: false
  }
]
export const storeUploadsTab = [
  {
    id: 1,
    name: 'total',
    icon: 'orders-tab',
    color: '#75ca9e',
    count: 0,
    status: 'Total uploads',
    statusId: 1,
    activeIcon: 'orders-filled',
    bgActive: '#75ca9e',
    text: '',
    userBG: '',
    key: null
    // ab: tab_ActiveCustomer
  },
  {
    id: 2,
    name: 'processing',
    key: 1,
    icon: 'orders-pending',
    color: '#59abff',
    count: 0,
    status: 'Processing',
    statusId: 3,
    activeIcon: 'orders-pending-active',
    bgActive: '#59abff',
    text: 'retry',
    userBG: '#fcb357'
  },
  {
    id: 3,
    name: 'failed',
    icon: 'orders-error',
    color: '#fb413f',
    count: 0,
    key: 5,
    status: 'Failed',
    statusId: 2,
    activeIcon: 'orders-error-active',
    bgActive: '#a39e9e',
    text: 'Deactivated',
    userBG: '#fb413f'
  },
  {
    id: 4,
    name: 'completed',
    key: 3,
    icon: 'store-complete',
    color: '#fb413f',
    count: 0,
    status: 'Completed',
    statusId: 4,
    activeIcon: 'orders-error-active',
    bgActive: '#fb413f',
    text: '',
    userBG: ''
  }
]
export const SHIPPING_INFO_ADMIN = [
  {
    label: 'Company name',
    name: 'companyName',
    type: 'text',
    placeholder: 'Enter company name',
    isRequired: true,
    // tabIndex: 5,
    iconProps: {
      icon: ''
    },
    size: {
      xs: 12,
      sm: 12,
      md: 6,
      lg: 6,
      xl: 6
    }
  },
  {
    label: 'Contact name',
    name: 'contactName',
    type: 'text',
    placeholder: 'Enter contact name',
    isRequired: true,
    //  tabIndex: 6,
    iconProps: {
      icon: ''
    },
    size: {
      xs: 12,
      sm: 12,
      md: 6,
      lg: 6,
      xl: 6
    }
  },
  {
    label: 'Address line 1',
    name: 'address1',
    type: 'text',
    iconProps: {
      icon: ''
    },
    // tabIndex: 7,
    size: {
      xs: 12,
      sm: 12,
      md: 12,
      lg: 12,
      xl: 12
    },
    placeholder: 'Enter address',
    isRequired: true
  },
  {
    label: ' Address line 2',
    name: 'address2',
    type: 'text',
    iconProps: {
      icon: ''
    },
    // tabIndex: 8,
    size: {
      xs: 12,
      sm: 12,
      md: 12,
      lg: 12,
      xl: 12
    },
    placeholder: 'Enter address (Optional)',
    isRequired: false
    //   tabIndex: 10,
  },
  {
    type: 'select',
    id: 'countryId',
    name: 'country',
    label: 'Country',
    placeholder: 'Country',
    variant: 'outlined',
    fullWidth: true,
    isRequired: true,
    //  tabIndex: 11,
    size: {
      xs: 12,
      sm: 12,
      md: 4,
      lg: 4,
      xl: 4
    },
    iconProps: {
      icon: ''
    }
  },
  {
    type: 'select',
    id: 'stateId',
    name: 'stateName',
    label: 'State',
    placeholder: 'State',
    variant: 'outlined',
    isRequired: true,
    fullWidth: true,
    //  tabIndex: 12,
    size: {
      xs: 12,
      sm: 12,
      md: 4,
      lg: 4,
      xl: 4
    },
    iconProps: {
      icon: ''
    },
    options: []
  },
  {
    type: 'text',
    id: 'cityId',
    name: 'city',
    label: 'City',
    placeholder: 'City',
    variant: 'outlined',
    fullWidth: true,
    isRequired: true,
    //  tabIndex: 13,
    size: {
      xs: 12,
      sm: 12,
      md: 4,
      lg: 4,
      xl: 4
    },
    iconProps: {
      icon: ''
    }
  },
  {
    label: 'Company email',
    name: 'companyEmail',
    type: 'text',
    //  tabIndex: 15,
    checkIfValidEmail: true,
    placeholder: 'Enter company email',
    isRequired: true,
    iconProps: {
      icon: ''
    },
    size: {
      xs: 12,
      sm: 12,
      md: 6,
      lg: 6,
      xl: 6
    }
  },
  {
    label: 'Contact phone',
    name: 'companyPhone',
    type: 'text',
    placeholder: 'Enter contact phone',
    isRequired: true,
    //  tabIndex: 16,
    iconProps: {
      icon: ''
    },
    size: {
      xs: 12,
      sm: 12,
      md: 6,
      lg: 6,
      xl: 6
    },
    checkIfNumber: false
  },
  {
    label: 'Zip code',
    name: 'zipCode',
    type: 'text',
    iconProps: {
      icon: ''
    },
    //  tabIndex: 14,
    size: {
      xs: 12,
      sm: 12,
      md: 12,
      lg: 12,
      xl: 12
    },
    placeholder: 'Enter zip code',
    isRequired: true,
    checkIfNumber: false
  },
  {
    label: 'Tax id',
    name: 'taxId',
    type: 'text',
    iconProps: {
      icon: ''
    },
    size: {
      xs: 12,
      sm: 12,
      md: 12,
      lg: 12,
      xl: 12
    },
    placeholder: 'Enter tax id',
    isRequired: true
  }
]

export const BILLING_INFO_ADMIN = [
  {
    label: 'Company name',
    name: 'companyName',
    type: 'text',
    placeholder: 'Enter company name',
    isRequired: true,
    // tabIndex: 5,
    iconProps: {
      icon: ''
    },
    size: {
      xs: 12,
      sm: 12,
      md: 6,
      lg: 6,
      xl: 6
    }
  },
  {
    label: 'Contact name',
    name: 'contactName',
    type: 'text',
    placeholder: 'Enter contact name',
    isRequired: true,
    //  tabIndex: 6,
    iconProps: {
      icon: ''
    },
    size: {
      xs: 12,
      sm: 12,
      md: 6,
      lg: 6,
      xl: 6
    }
  },
  {
    label: 'Address line 1',
    name: 'address1',
    type: 'text',
    iconProps: {
      icon: ''
    },
    // tabIndex: 7,
    size: {
      xs: 12,
      sm: 12,
      md: 12,
      lg: 12,
      xl: 12
    },
    placeholder: 'Enter address',
    isRequired: true
  },
  {
    label: ' Address line 2',
    name: 'address2',
    type: 'text',
    iconProps: {
      icon: ''
    },
    // tabIndex: 8,
    size: {
      xs: 12,
      sm: 12,
      md: 12,
      lg: 12,
      xl: 12
    },
    placeholder: 'Enter address (Optional)',
    isRequired: false
    //   tabIndex: 10,
  },
  {
    type: 'select',
    id: 'countryId',
    name: 'country',
    label: 'Country',
    placeholder: 'Country',
    variant: 'outlined',
    fullWidth: true,
    isRequired: true,
    //  tabIndex: 11,
    size: {
      xs: 12,
      sm: 12,
      md: 4,
      lg: 4,
      xl: 4
    },
    iconProps: {
      icon: ''
    }
  },
  {
    type: 'select',
    id: 'stateId',
    name: 'stateName',
    label: 'State',
    placeholder: 'State',
    variant: 'outlined',
    isRequired: true,
    fullWidth: true,
    //  tabIndex: 12,
    size: {
      xs: 12,
      sm: 12,
      md: 4,
      lg: 4,
      xl: 4
    },
    iconProps: {
      icon: ''
    },
    options: []
  },
  {
    type: 'text',
    id: 'cityId',
    name: 'city',
    label: 'City',
    placeholder: 'City',
    variant: 'outlined',
    fullWidth: true,
    isRequired: true,
    //  tabIndex: 13,
    size: {
      xs: 12,
      sm: 12,
      md: 4,
      lg: 4,
      xl: 4
    },
    iconProps: {
      icon: ''
    }
  },
  {
    label: 'Company email',
    name: 'companyEmail',
    type: 'text',
    //  tabIndex: 15,
    checkIfValidEmail: true,
    placeholder: 'Enter company email',
    isRequired: true,
    iconProps: {
      icon: ''
    },
    size: {
      xs: 12,
      sm: 12,
      md: 6,
      lg: 6,
      xl: 6
    }
  },
  {
    label: 'Contact phone',
    name: 'companyPhone',
    type: 'text',
    placeholder: 'Enter contact phone',
    isRequired: true,
    //  tabIndex: 16,
    iconProps: {
      icon: ''
    },
    size: {
      xs: 12,
      sm: 12,
      md: 6,
      lg: 6,
      xl: 6
    },
    checkIfNumber: false
  },
  {
    label: 'Zip code',
    name: 'zipCode',
    type: 'text',
    iconProps: {
      icon: ''
    },
    //  tabIndex: 14,
    size: {
      xs: 12,
      sm: 12,
      md: 12,
      lg: 12,
      xl: 12
    },
    placeholder: 'Enter zip code',
    isRequired: true,
    checkIfNumber: false
  }
]

export const CARD_INFO_ADMIN = [
  {
    label: 'Address line 1',
    name: 'streetAddress',
    type: 'text',
    iconProps: {
      icon: ''
    },
    //  tabIndex: 22,
    size: {
      xs: 12,
      sm: 12,
      md: 12,
      lg: 12,
      xl: 12
    },
    placeholder: 'Enter address',
    isRequired: true
  },

  {
    label: 'Contact phone',
    name: 'phone',
    type: 'text',
    placeholder: 'Enter contact phone',
    isRequired: false,
    //  tabIndex: 16,
    iconProps: {
      icon: ''
    },
    size: {
      xs: 12,
      sm: 12,
      md: 12,
      lg: 12,
      xl: 12
    },
    checkIfNumber: false
  },
  {
    type: 'select',
    id: 'countryId',
    name: 'countryCode',
    label: 'Country',
    placeholder: 'Country',
    variant: 'outlined',
    fullWidth: true,
    isRequired: false,
    //  tabIndex: 11,
    size: {
      xs: 12,
      sm: 12,
      md: 4,
      lg: 4,
      xl: 4
    },
    iconProps: {
      icon: ''
    }
  },
  {
    type: 'text',
    id: 'stateId',
    name: 'stateCode',
    label: 'State code',
    placeholder: 'State code',
    variant: 'outlined',
    isRequired: false,
    fullWidth: true,
    //  tabIndex: 12,
    size: {
      xs: 12,
      sm: 12,
      md: 4,
      lg: 4,
      xl: 4
    },
    iconProps: {
      icon: ''
    },
    options: []
  },
  {
    type: 'text',
    id: 'cityId',
    name: 'city',
    label: 'City',
    placeholder: 'City',
    variant: 'outlined',
    fullWidth: true,
    isRequired: true,
    size: {
      xs: 12,
      sm: 12,
      md: 4,
      lg: 4,
      xl: 4
    },
    iconProps: {
      icon: ''
    }
  },
  {
    label: 'Zip code',
    name: 'zip',
    type: 'text',
    iconProps: {
      icon: ''
    },
    //  tabIndex: 25,
    size: {
      xs: 12,
      sm: 12,
      md: 12,
      lg: 12,
      xl: 12
    },
    placeholder: 'Enter zip code',
    isRequired: true,
    checkIfNumber: false
  }
]
