

export const XpathsEvent = {
    eventManagement:'xpath=/html/body/div[4]/div[1]/div/ul/li[9]/a/span[1]',
    manageEvents:'xpath=/html/body/div[4]/div[1]/div/ul/li[9]/ul/li[1]/a/span[1]',
    addEvent:'xpath=/html/body/div[4]/div[2]/div/div[2]/div/div/div[1]/div[2]/a[2]',
    dropdownSelect:"xpath=/html/body/div[4]/div[2]/div/div[2]/div/div/div[2]/form/div[1]/div[7]/div/span/span[1]/span/span[2]/b",                 
    dropdownSelector: "xpath=/html/body/span/span/span[2]/ul/li[1]",                
    timezoneDropdown: "xpath=/html/body/div[4]/div[2]/div/div[2]/div/div/div[2]/form/div[1]/div[8]/div/div/p/label/i",                      
    timezoneOption: "xpath=/html/body/div[4]/div[2]/div/div[2]/div/div/div[2]/form/div[1]/div[8]/div/div/div/ul/li[2]/label",           
    submitButton:'xpath=//*[@id="submitUser"]',
    eventAddingSuccess:'xpath=/html/body/div[4]/div[2]/div/div[2]/div/div/div[2]/div[2]/div[1]',
   

  };
  export const XpathsVoucher = {
    eventManagement:'xpath=/html/body/div[4]/div[1]/div/ul/li[9]/a/span[1]',
    manageVoucher:'xpath=/html/body/div[4]/div[1]/div/ul/li[9]/ul/li[2]/a/span[1]',
    addVoucher:'xpath=/html/body/div[4]/div[2]/div/div[2]/div/div/div[1]/div[2]/a[3]',
    submitButton:'xpath=//*[@id="submitUser"]',
    selectEvent: 'xpath=/html/body/div[4]/div[2]/div/div[2]/div/div/div[2]/form/div[1]/div[1]/div/div/p/label/i',
    selectOption:'xpath=/html/body/div[4]/div[2]/div/div[2]/div/div/div[2]/form/div[1]/div[1]/div[1]/div/div/ul/li[2]/label',
    voucherSuccess:'xpath=/html/body/div[4]/div[2]/div/div[2]/div/div/div[2]/div[2]/div[1]',
    
  };

  export const XpathsCustomer = {
    manageCustomer: 'xpath=/html/body/div[4]/div[1]/div/ul/li[3]/a/span[1]',
    customerSelect: 'xpath=/html/body/div[4]/div[1]/div/ul/li[3]/ul/li[1]/a/span[1]',
    addCustomer: 'xpath=/html/body/div[4]/div[2]/div/div[2]/div/div/div[1]/div[2]/a[1]',
    submitButton: 'xpath=//*[@id="submitUser"]',
    dropdownSelector: 'xpath=/html/body/div[4]/div[2]/div/div[2]/div/div/div[2]/form/div[1]/div[3]/div/div[1]/div/div',
    dropdownOption: 'xpath=/html/body/div[4]/div[2]/div/div[2]/div/div/div[2]/form/div[1]/div[3]/div/div[1]/div/ul/li[14]/span[1]',
    customerAddingSuccess: 'xpath=/html/body/div[4]/div[2]/div/div[2]/div/div/div[2]/div/div[1]',
  }

  export const XpathsRestAdmin ={
    manageRestaurantAdmin: 'xpath=/html/body/div[4]/div[1]/div/ul/li[3]/a/span[1]',
    adminSelect: 'xpath=/html/body/div[4]/div[1]/div/ul/li[3]/ul/li[2]/a/span[1]',
    addAdmin: 'xpath=/html/body/div[4]/div[2]/div/div[2]/div/div/div[1]/div[2]/a',
    submitButton: 'xpath=//*[@id="submitUser"]',
    restaurantDropdown: 'xpath=/html/body/div[4]/div[2]/div/div[2]/div/div/div[2]/form/div[1]/div[1]/div/div/p/label/i',
    dropdownOption: 'xpath=/html/body/div[4]/div[2]/div/div[2]/div/div/div[2]/form/div[1]/div[1]/div/div/div/ul/li[16]/label',
    dropdownSelector: 'xpath=/html/body/div[4]/div[2]/div/div[2]/div/div/div[2]/form/div[1]/div[5]/div/div[1]/div/div',
    resturantAdminDD: 'xpath=/html/body/div[4]/div[2]/div/div[2]/div/div/div[2]/form/div[1]/div[2]/div/select/option[2]',
    adminAddSuccess: 'xpath=/html/body/div[4]/div[2]/div/div[2]/div/div/div[2]/div/div[1]',
  }
  
 // XPaths of Restaurants Management
export const XpathsRestaurants = {
  selectManageRestaurantNav:
    "xpath=/html/body/div[4]/div[1]/div/ul/li[4]/a/span[1]",
  addRestaurant:
    "xpath=/html/body/div[4]/div[2]/div/div[2]/div/div/div[1]/div[2]/a[2]",
  parentRestaurantDropdown:
    "xpath=/html/body/div[4]/div[2]/div/div[2]/div/div/div[2]/form/div[1]/div[1]/div/div/p/span",
  parentRestaurantname:
    "xpath=/html/body/div[4]/div[2]/div/div[2]/div/div/div[2]/form/div[1]/div[1]/div/div/div/ul/li[2]/label",
  planRestaurantDropdown:
    "xpath=/html/body/div[4]/div[2]/div/div[2]/div/div/div[2]/form/div[1]/div[5]/div/div/p/label/i",
  planTypeExpertRestaurant:
    "xpath=/html/body/div[4]/div[2]/div/div[2]/div/div/div[2]/form/div[1]/div[5]/div/div/div/ul/li[2]/label",
  planTypeEssentialRestaurant:
    "xpath=/html/body/div[4]/div[2]/div/div[2]/div/div/div[2]/form/div[1]/div[5]/div/div/div/ul/li[3]/label",
  planTypeFreeRestaurant:
    "xpath=/html/body/div[4]/div[2]/div/div[2]/div/div/div[2]/form/div[1]/div[5]/div/div/div/ul/li[4]/label",
  topCategoriesRestaurantDropdown:
    "xpath=/html/body/div[4]/div[2]/div/div[2]/div/div/div[2]/form/div[1]/div[6]/div/div/p/span",
  selectTopCategory1:
    "xpath=/html/body/div[4]/div[2]/div/div[2]/div/div/div[2]/form/div[1]/div[6]/div/div/div/ul/li[1]/label",
  selectTopCategory2:
    "xpath=/html/body/div[4]/div[2]/div/div[2]/div/div/div[2]/form/div[1]/div[6]/div/div/div/ul/li[2]/label",
  selectTopCategory3:
    "xpath=/html/body/div[4]/div[2]/div/div[2]/div/div/div[2]/form/div[1]/div[6]/div/div/div/ul/li[3]/label",
  selectTopCategory4:
    "xpath=/html/body/div[4]/div[2]/div/div[2]/div/div/div[2]/form/div[1]/div[6]/div/div/div/ul/li[4]/label",
  selectTopCategory5:
    "xpath=/html/body/div[4]/div[2]/div/div[2]/div/div/div[2]/form/div[1]/div[6]/div/div/div/ul/li[5]/label",
  selectTopCategory6:
    "xpath=/html/body/div[4]/div[2]/div/div[2]/div/div/div[2]/form/div[1]/div[6]/div/div/div/ul/li[6]/label",
  countryDropdown:
    "xpath=/html/body/div[4]/div[2]/div/div[2]/div/div/div[2]/form/div[1]/div[24]/div/div/p/label/i",
  canadaCountry:
    "xpath=/html/body/div[4]/div[2]/div/div[2]/div/div/div[2]/form/div[1]/div[24]/div/div/div/ul/li[12]/label",
  billingCountryDropdown:
    "xpath=/html/body/div[4]/div[2]/div/div[2]/div/div/div[2]/form/div[1]/div[26]/div[5]/div/div/p/label/i",
  billingCountry:
    "xpath=/html/body/div[4]/div[2]/div/div[2]/div/div/div[2]/form/div[1]/div[26]/div[5]/div/div/div/ul/li[12]/label",
  orderModeDining: 'xpath=//*[@id="order_mode_dining"]',
  orderModeTakeAway: 'xpath=//*[@id="order_mode_takeaway"]',
  submitButton: 'xpath=//*[@id="submitRestaurant"]',
  restaurantAddingSuccess:
    "xpath=/html/body/div[4]/div[2]/div/div[2]/div/div/div[2]/div/div[1]",
};

// XPaths of Coupon Dropdown
export const XpathsCoupon = {
  restaurantDropdown:
    "xpath=/html/body/div[4]/div[2]/div/div[2]/div/div/div[2]/form/div[1]/div[2]/div[1]/div/p/label/i",
  selectRestaurantOption:
    "xpath=/html/body/div[4]/div[2]/div/div[2]/div/div/div[2]/form/div[1]/div[2]/div[1]/div/div/ul/li[51]/label",
  submitButton: 'xpath=//*[@id="submitCoupon"]',
  couponTypeDropdown:
    "xpath=/html/body/div[4]/div[2]/div/div[2]/div/div/div[2]/form/div[1]/div[3]/div/div/p/label",
  selectCouponType:
    "xpath=/html/body/div[4]/div[2]/div/div[2]/div/div/div[2]/form/div[1]/div[3]/div/div/div/ul/li[3]/label",
  validOnDaysDropdown:
    "xpath=/html/body/div[4]/div[2]/div/div[2]/div/div/div[2]/form/div[1]/div[17]/div/div/p/label/i",
  selectDayOption:
    "xpath=/html/body/div[4]/div[2]/div/div[2]/div/div/div[2]/form/div[1]/div[17]/div/div/div/p[1]/label",
  mealTimeDropdown:
    "xpath=/html/body/div[4]/div[2]/div/div[2]/div/div/div[2]/form/div[1]/div[18]/div/div/p/label/i",
  selectMealTime:
    "xpath=/html/body/div[4]/div[2]/div/div[2]/div/div/div[2]/form/div[1]/div[18]/div/div/div/p[1]/label",
  orderModeDropdown:
    "xpath=/html/body/div[4]/div[2]/div/div[2]/div/div/div[2]/form/div[1]/div[19]/div/div/p/label/i",
  selectOrderMode:
    "xpath=/html/body/div[4]/div[2]/div/div[2]/div/div/div[2]/form/div[1]/div[19]/div/div/div/p[1]/label",
  selectManageCouponNav:
    "xpath=/html/body/div[4]/div[1]/div/ul/li[13]/a/span[1]",
  selectManageCoupon:
    "xpath=/html/body/div[4]/div[1]/div/ul/li[13]/ul/li[1]/a/span[1]",
  dashboard: "xpath=/html/body/div[4]/div[1]/div/ul/li[2]/a/span[1]",
  dashboardAddCoupon:"xpath=/html/body/div[4]/div[2]/div/div[2]/div/div/div[1]/div[2]/a[3]",
};
