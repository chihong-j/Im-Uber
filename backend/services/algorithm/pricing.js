function calculatePrice(distance, carBrand, rating, isElectric) {
    // Define impact factors for each variable
    const distanceFactor = 0.5;   // Adjust based on the actual impact on price
    const carBrandFactor = {      // Example car brand impact factors
        'Toyota': 1,
        'Honda': 1.2,
        'Tesla': 1.5,
        // Add more brands and factors as needed
    };
    const ratingFactor = 1.2;     // Adjust based on the actual impact on price
    const electricFactor = 1.1;   // Adjust based on the actual impact on price

    // Calculate the price based on the input variables
    let price = distance * distanceFactor;
    price *= carBrandFactor[carBrand] || 1;  // Use the factor for the specified car brand or default to 1
    price *= rating * ratingFactor;
    if (isElectric) {
        price *= electricFactor;
    }

    // Return the calculated price
    return price;
}
  
  // Example usage:
//   const inputDistance = 20;         // Example distance in miles
//   const inputCarBrand = 'Tesla';    // Example car brand
//   const inputRating = 4.8;          // Example driver rating
//   const inputIsElectric = true;     // Example whether the car is electric or not
  
//   const totalPrice = calculatePrice(inputDistance, inputCarBrand, inputRating, inputIsElectric);
//   console.log(`Total Price: $${totalPrice.toFixed(2)}`);
  