// Base constants for population and area scaling
export const basePopulation = 1810037 // 1946 total
export const baseArea = 6209 // km^2, approx for West Bank & Gaza

// Simple number formatter
export function formatNumber(num, decimals = 0) {
  return num.toLocaleString('en-US', {
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals
  })
}

// Interpolate filter function
export function interpolate(text, city) {
  const currentYear = new Date().getFullYear()

  text = text.replace(new RegExp('{city}', 'g'), city.name)

  text = text.replace(new RegExp('\\{population\\|([0-9]+)\\}', 'g'), (match, capture) => {
    return formatNumber(parseInt(capture) * city.population / basePopulation, 0)
  })

  text = text.replace(new RegExp('\\{area\\|([0-9.]+)\\}', 'g'), (match, capture) => {
    return formatNumber(parseFloat(capture) * city.area / baseArea, 1) + ' km²'
  })

  text = text.replace(new RegExp('\\{year\\|([0-9]{4})\\}', 'g'), (match, capture) => {
    return parseInt(capture) + currentYear - 1946
  })

  return text
}

