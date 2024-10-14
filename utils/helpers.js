
export function  getPhoneNumberForCountry (countryCode){
    
        switch (countryCode) {
            case 'India (भारत)':
                const randomDigits = Array.from({ length: 10 }, () => Math.floor(Math.random() * 10)).join('');
                return `${randomDigits}`;   // Explicit cast to string
            case 'Canada':
                const areaCodes = [
                  368, 587, 825, 236, 672, 778, 474, 639, 263, 354, 367, 438, 468, 579, 581,
                  873, 226, 249, 289, 343, 365, 437, 548, 647, 683, 742, 753, 431, 584, 428,
                  782,
                ];
                const randomAreaCode =
                areaCodes[Math.floor(Math.random() * areaCodes.length)];
            
              // Generate a 3-digit central office code (first digit must be between 2-9)
              const centralOfficeCode = Math.floor(200 + Math.random() * 800);
            
              // Generate a 4-digit line number
              const lineNumber = Math.floor(1000 + Math.random() * 9000);
            
              // Format the number
              const formattedNumber = `${randomAreaCode}${centralOfficeCode}${lineNumber}`;
            
              return formattedNumber;
        
        }
      
}

export function  getPhoneNumberForCountries (countryCode){
    
  switch (countryCode) {
      case 'India (भारत)':
          const randomDigits = Array.from({ length: 10 }, () => Math.floor(Math.random() * 10)).join('');
          return `${randomDigits}`;   // Explicit cast to string
      case 'Canada':
        const areaCodes = [
          368, 587, 825, 236, 672, 778, 474, 639, 263, 354, 367, 438, 468, 579, 581,
          873, 226, 249, 289, 343, 365, 437, 548, 647, 683, 742, 753, 431, 584, 428,
          782,
        ];
        const randomAreaCode =
        areaCodes[Math.floor(Math.random() * areaCodes.length)];
    
      // Generate a 3-digit central office code (first digit must be between 2-9)
      const centralOfficeCode = Math.floor(200 + Math.random() * 800);
    
      // Generate a 4-digit line number
      const lineNumber = Math.floor(1000 + Math.random() * 9000);
    
      // Format the number
      const formattedNumber = `${randomAreaCode}${centralOfficeCode}${lineNumber}`;
    
      return formattedNumber;
       
  
  }

}

export function generateCanadaMobileNumber() {
  // Randomly select an area code (3 digits)
  const areaCodes = [
    368, 587, 825, 236, 672, 778, 474, 639, 263, 354, 367, 438, 468, 579, 581,
    873, 226, 249, 289, 343, 365, 437, 548, 647, 683, 742, 753, 431, 584, 428,
    782
  ];

  const randomAreaCode =
    areaCodes[Math.floor(Math.random() * areaCodes.length)];

  // Generate a 3-digit central office code (first digit must be between 2-9)
  const centralOfficeCode = Math.floor(200 + Math.random() * 800);

  // Generate a 4-digit line number
  const lineNumber = Math.floor(1000 + Math.random() * 9000);

  // Format the number
  const formattedNumber = `${randomAreaCode}${centralOfficeCode}${lineNumber}`;

  return formattedNumber;
}
    export function getRandomNumber(min = 0, max = 100) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }
  
  
  export function generateCouponCode() {
    return `COUPON${getRandomNumber(1000, 9999)}`; // Generates a 4-digit coupon code
  }
  
 
  
  export const couponDiscountType = ["percentage", "amount"];
 

