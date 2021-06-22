
// Making the desired range in an array to calculate the category and risk
// In future it should be moved to DB and fetching it with sort order ascending
const ranges = [18.49, 18.5, 25, 30, 35, 40]
const BMICategoryAndRisk = {
    18.49: { category: 'underWeight', risk: 'malNutrition' },
    18.5: { category: 'normalWeight', risk: 'low' },
    25: { category: 'overWeight', risk: 'enhanced' },
    30: { category: 'moderatelyObese', risk: 'medium' },
    35: { category: 'severelyObese', risk: 'high' },
    40: { category: 'verySeverelyObese', risk: 'veryHigh' }
}

const calculateBMI = (weight, height) => {
    if([parseInt(weight), parseInt(height)].includes(0)) {
        throw new Error('Weight or Height cannot be zero')
    }
    return Number((weight / (height * height)).toFixed(2))
}

const getBMICategoryAndRisk = (weight, height) => {
    const bmi = calculateBMI(weight, height)
    let bmiRange = ranges[ranges.length - 1]
    for (let i = 0; i < ranges.length; i++) {
        const range = ranges[i]
        if(bmi > range) {
            continue
        }
        if(bmi === range) {
            bmiRange = range
            break
        }
        if(bmi < range) {
            bmiRange = i === 0 ? range : ranges[i-1]
            break
        }
    }
    return { ...BMICategoryAndRisk[bmiRange], bmi }
}

export { calculateBMI, getBMICategoryAndRisk }