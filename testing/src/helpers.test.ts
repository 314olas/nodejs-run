import { validateInput, shortenPublicHoliday } from "./helpers";
import { PublicHoliday, PublicHolidayShort } from './types';

describe('helpers functions', () => {
    describe('validateInput function', () => {
        it('should throw an error when country is not supported', () => {
            const data = {year: 1999, country: 'UK'}
            expect(() => {
                validateInput(data)
            }).toThrowError(`Country provided is not supported, received: ${data.country}`)
        })
    
        it('should throw an error when year is not current', () => {
            const data = {year: 1999, country: 'GB'}
            expect(() => {
                validateInput(data)
            }).toThrowError(`Year provided not the current, received: ${data.year}`)
        })
    
        it('should return true if country is supported', () => {
            const data = {year: new Date().getFullYear(), country: 'GB'}
            const result = validateInput(data);
            expect(result).toBe(true)
        })
    })
    
    describe('shortenPublicHoliday function', () => {
        it('should return shortenPublicHoliday object', () => {
            const shortHolyday: PublicHolidayShort = {
                date: '',
                name: 'Easter',
                localName: 'Easter',
            }
        
            const holiday: PublicHoliday = {
                ...shortHolyday,
                counties: [''],
                countryCode: '',
                fixed: true,
                global: true,
                launchYear: 1999,
                types: ['']
            }
            const result: PublicHolidayShort = shortenPublicHoliday(holiday);
            expect(result).toEqual(shortHolyday)
        })
    
    })     
})
