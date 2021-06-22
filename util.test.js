// const { calculateBMI } = require('./util')
import { calculateBMI, getBMICategoryAndRisk } from './util'

test('should generate bmi', () => {
    const bmi = calculateBMI(50, 1.71)
    expect(bmi).toBe(17.1)
})

test('should generate bmi', () => {
    const bmi = calculateBMI(60, 1.71)
    expect(bmi).toBe(20.52)
})

test('should throw error', () => {
    expect(() => calculateBMI(0, 1.71)).toThrow('Weight or Height cannot be zero')
})

test('should generate bmi category underWeight and risk malnutrition', () => {
    const result = getBMICategoryAndRisk(50, 1.71)
    expect(result.category).toBe('underWeight')
    expect(result.risk).toBe('malNutrition')
})

test('should generate bmi category normalWeight and risk low', () => {
    const result = getBMICategoryAndRisk(60, 1.71)
    expect(result.category).toBe('normalWeight')
    expect(result.risk).toBe('low')
})

test('should throw error for bad data', () => {
    expect(() => getBMICategoryAndRisk(0, 1.71)).toThrow('Weight or Height cannot be zero')
})