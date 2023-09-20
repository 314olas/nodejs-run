import axios, { AxiosResponse } from 'axios';
import { PUBLIC_HOLIDAYS_API_URL, SUPPORTED_COUNTRIES } from '../config';
import { validateInput, shortenPublicHoliday } from '../helpers';
import { PublicHoliday, PublicHolidayShort } from '../types';
import { getListOfPublicHolidays, checkIfTodayIsPublicHoliday, getNextPublicHolidays } from "./public-holidays.service";

describe('integrational test', () => {
    describe('getListOfPublicHolidays function', () => {
        it('should return an array', async () => {
            const data = {year: new Date().getFullYear(), country: SUPPORTED_COUNTRIES[1]}            
            const result: PublicHolidayShort[] = await getListOfPublicHolidays(data.year, data.country)
            expect(Array.isArray(result)).toBe(true);
        })

        it('should return an array with more than 0 items', async () => {
            const data = {year: new Date().getFullYear(), country: SUPPORTED_COUNTRIES[1]}
            const result: PublicHolidayShort[] = await getListOfPublicHolidays(data.year, data.country)
            expect(result.length).toBeGreaterThan(0)
        })

        it('should return an empty array', async () => {
            const data = {year: new Date().getFullYear(), country: ''}
            const result: PublicHolidayShort[] = await getListOfPublicHolidays(data.year, data.country)
            expect(result.length).toBe(0)
        })
    })

    describe('checkIfTodayIsPublicHoliday function', () => {
        it('should return boolean value (true or false)', async () => {           
            const result: boolean = await checkIfTodayIsPublicHoliday(SUPPORTED_COUNTRIES[1])
            expect(typeof result === 'boolean').toBe(true);
        })

        it('should return false', async () => {
            const data = {year: new Date().getFullYear(), country: ''}
            const result: boolean = await checkIfTodayIsPublicHoliday('')
            expect(result).toBe(false)
        })
    })

    describe('getNextPublicHolidays function', () => {
        it('should return an array', async () => {          
            const result: PublicHolidayShort[] = await getNextPublicHolidays(SUPPORTED_COUNTRIES[1])
            expect(Array.isArray(result)).toBe(true);
        })

        it('should return an array with more than 0 items', async () => {
            const result: PublicHolidayShort[] = await getNextPublicHolidays(SUPPORTED_COUNTRIES[1])
            expect(result.length).toBeGreaterThan(0)
        })

        it('should return an empty array', async () => {
            const result: PublicHolidayShort[] = await getNextPublicHolidays('')
            expect(result.length).toBe(0)
        })
    })
})