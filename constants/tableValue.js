export const TABLE_TITLES = {
  CUSTOMER_LIST_TABLE_TITLE: [
    {
      id: 7,
      name: 'Customer ID',
      apiName: 'payTraceId',
      sortName: 'payTraceId',
      isAscending: false,
      isShippingValue: false,
      isCheckBox: false
    },
    {
      id: 1,
      name: 'Company name',
      apiName: 'firstName',
      sortName: 'companyName',
      isAscending: false,
      isShippingValue: true,
      shippingAPIname: 'companyName',
      isCheckBox: false
    },
    {
      id: 2,
      name: 'Contact name',
      apiName: 'fullName',
      sortName: '',
      isAscending: false,
      isShippingValue: true,
      shippingAPIname: 'contactName',
      isCheckBox: false
    },
    {
      id: 3,
      name: 'Email',
      apiName: 'email',
      sortName: '',
      isAscending: false,
      isShippingValue: true,
      shippingAPIname: 'companyEmail',
      isCheckBox: false
    },
    {
      id: 4,
      name: '# of orders',
      apiName: 'noOfOrders',
      sortName: '',
      isAscending: false,

      isCheckBox: false
    },
    {
      id: 5,
      name: 'Created date',
      apiName: 'createdOn',
      sortName: 'createdOn',
      type: 'dateWithoutTime',
      isAscending: true,
      isCheckBox: false,
      lgWidth: true
    },
    {
      id: 6,
      name: 'Account status',
      apiName: 'status',
      sortName: '',
      isAscending: false,
      type: 'status',
      isCheckBox: false
    }
  ],
  PRODUCT_VARIANT_TITLE: [
    {
      id: 1,
      name: 'Images',
      apiName: 'productLibraryVariantImages',
      type: 'sliderImage',
      sortName: '',
      isAscending: false,
      isCheckBox: false
    },
    {
      id: 2,
      name: 'Variant options',
      apiName: 'productVarientOptions',
      sortName: '',
      type: 'options',
      isAscending: false,
      isCheckBox: false
    },
    {
      id: 3,
      name: 'Retail Price',
      type: 'price',
      apiName: 'retailPrice',
      sortName: '',
      isAscending: false,

      isCheckBox: false
    },
    {
      id: 4,
      name: 'Cost price',
      type: 'price',
      apiName: 'costPrice',
      sortName: '',
      isAscending: false,

      isCheckBox: false
    },
    {
      id: 5,
      name: 'Profit',
      apiName: 'profit',
      sortName: '',
      isAscending: false,
      isCheckBox: false
    },
    {
      id: 5,
      name: 'Profit %',
      apiName: 'profitPercentage',
      sortName: '',
      isAscending: false,
      isCheckBox: false
    },
    {
      id: 6,
      name: 'Store',
      apiName: 'storeProducts',
      type: 'store',
      sortName: '',
      isAscending: false,

      isCheckBox: false
    }
  ],

  ORDER_VARIANT: [
    {
      id: 1,
      name: 'Product',
      apiName: 'productTitle'
    },
    {
      id: 2,
      name: 'Variant',
      apiName: 'variantOptions',
      sortName: '',
      type: 'options',
      isAscending: false,
      isCheckBox: false
    },
    {
      id: 3,
      name: 'Price',
      type: 'price',
      apiName: 'price'
    },

    {
      id: 4,
      name: 'Quantity',
      apiName: 'quantity'
    }
  ],
  PRODUCT_SIZE: [
    {
      id: 2,
      name: 'Variants',
      apiName: 'varientOptions',
      sortName: '',
      type: 'options',
      isAscending: false,
      isCheckBox: false
    },

    {
      id: 1,
      name: 'Price',
      type: 'price',
      apiName: 'price',
      sortName: '',
      isAscending: false,
      isCheckBox: false
    }
    // {
    //   id: 1,
    //   name: 'Templates',
    //   type: 'templates',
    //   apiName: 'productVarientTemplates',
    //   sortName: '',
    //   isAscending: false,
    //   isCheckBox: false
    // }
  ],
  SIZE_CHART: [
    {
      id: 1,
      name: '',
      apiName: 'key',
      sortName: '',
      isAscending: false,
      isCheckBox: false
    },

    {
      id: 1,
      name: 'S',
      apiName: 's',
      sortName: '',
      isAscending: false,
      isCheckBox: false
    },
    {
      id: 1,
      name: 'M',
      apiName: 'm',
      sortName: '',
      isAscending: false,
      isCheckBox: false
    },
    {
      id: 1,
      name: 'L',
      apiName: 'l',
      sortName: '',
      isAscending: false,
      isCheckBox: false
    },
    {
      id: 1,
      name: 'XL',
      apiName: 'xl',
      sortName: '',
      isAscending: false,
      isCheckBox: false
    },
    {
      id: 1,
      name: '2XL',
      apiName: '2xl',
      sortName: '',
      isAscending: false,
      isCheckBox: false
    },
    {
      id: 1,
      name: '3XL',
      apiName: '3xl',
      sortName: '',
      isAscending: false,
      isCheckBox: false
    }
  ],
  ORDER_LIST: [
    {
      id: 1,
      name: 'Order #',
      apiName: 'displayId',
      sortName: 'displayId',
      isAscending: true,
      isCheckBox: false
    },
    {
      id: 2,
      name: 'MWW order #',
      apiName: 'mwwOrderId',
      sortName: 'mwwOrderId',
      isAscending: true,
      type: 'iconWithTooltip',
      isCheckBox: false
    },
    {
      id: 3,
      name: 'Customer name',
      apiName: 'customerName',
      sortName: 'customerName',
      isAscending: false,
      isCheckBox: false
    },
    {
      id: 4,
      name: 'Order amount',
      apiName: 'amount',
      type: 'price',
      key: 'lineItems',
      sortName: '',
      isAscending: false,
      isCheckBox: false
    },
    {
      id: 5,
      name: 'Order date',
      apiName: 'orderDate',
      sortName: 'orderDate',
      isAscending: false,
      type: 'date',
      isCheckBox: false,
      lgWidth: true
    },
    {
      id: 6,
      name: 'Store name',
      apiName: 'storeName',
      sortName: 'storeName',
      isAscending: false,
      type: 'storeName'
    },
    {
      id: 7,
      name: 'Order status',
      apiName: 'status',
      sortName: '',
      isAscending: false,
      type: 'orderStatus',
      isCheckBox: false
    }
  ],
  STORE_UPLOADS_LIST: [
    {
      id: 1,
      name: 'Product name',
      apiName: 'productLibraryTitle',
      sortName: '',
      isAscending: true,
      isCheckBox: false
    },
    {
      id: 2,
      name: 'Store',
      apiName: 'storeName',
      sortName: '',
      isAscending: true,
      type: 'iconWithTooltip',
      isCheckBox: false
    },
    {
      id: 3,
      name: 'Upload date',
      apiName: 'uploadDate',
      sortName: 'uploadDate',
      type: 'date',
      isAscending: false,
      isCheckBox: false
    },
    {
      id: 4,
      name: 'Upload status',
      apiName: 'pushStatus',
      sortName: '',
      type: 'storeUploadsStatus',
      isAscending: false,
      isCheckBox: false
    }
  ],
  ADMIN_ORDER_LIST: [
    {
      id: 1,
      name: 'Order #',
      apiName: 'displayId',
      sortName: 'displayId',
      isAscending: true,
      isCheckBox: false
    },
    {
      id: 2,
      name: 'MWW order #',
      apiName: 'mwwOrderId',
      sortName: 'mwwOrderId',
      isAscending: true,
      type: 'iconWithTooltip',
      isCheckBox: false
    },
    {
      id: 3,
      name: 'Customer name',
      apiName: 'customerName',
      sortName: 'customerName',
      isAscending: false,
      isCheckBox: false
    },
    {
      id: 4,
      name: 'Order amount',
      apiName: 'amount',
      type: 'price',
      key: 'lineItems',
      sortName: '',
      isAscending: false,
      isCheckBox: false
    },
    {
      id: 5,
      name: 'Order date',
      apiName: 'orderDate',
      sortName: 'orderDate',
      isAscending: false,
      type: 'date',
      isCheckBox: false,
      lgWidth: true
    },
    {
      id: 6,
      name: 'Source',
      apiName: 'source',
      isAscending: false,
      type: 'source'
    },
    {
      id: 7,
      name: 'Order status',
      apiName: 'status',
      sortName: '',
      isAscending: false,
      type: 'orderStatus',
      isCheckBox: false
    }
  ]
}
