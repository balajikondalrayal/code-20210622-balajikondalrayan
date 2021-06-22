import { getBMICategoryAndRisk } from "./util"  
import getData from './getData'
import writeData from'./writeData'

const run = async () => {
    const populateCategoryAndRisk = async (data) => {
        for(let i=0; i < data.length; i++) {
            const { HeightCm, WeightKg } = data[i]
            data[i] = { ...data[i], ...getBMICategoryAndRisk(WeightKg, HeightCm / 100) }
        }
        return data
    }

    const count = 100000 // Just change this 0 for just getting the given json data in question
    const batchSize = 10000
    // As of now, we are fetching the entire data ins ingle fetch
    // It should be migrated to batch fetch in future to optimize the performance
    const medicalData = getData(count)
    const data = await populateCategoryAndRisk(medicalData)

    // Below code is to write the data in batches
    // This should be migrated to updating the data in DB in batches to avoid the I/O memory exceed
    for(let i = 0; i< data.length/batchSize; i++) {
        const result = data.slice(i*batchSize, (i+1)*batchSize)
        writeData(result)
    }

    // Actually this can be calculated in DB itself by having index over the column category
    // I did this via js function because there is no access to DB conection
    const updatedData = getData(count)
    const overWeightedPeople = updatedData.reduce((accum, current) => {
        accum += current.category === 'overWeight' ? 1 : 0
        return accum
    }, 0)
    console.log('overWeightedPeople', overWeightedPeople)
}

run()