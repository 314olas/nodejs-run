import axios, { AxiosResponse } from "axios"
import { PUBLIC_HOLIDAYS_API_URL, SUPPORTED_COUNTRIES } from "../config"
import { AvailableCountries, LongWeekend } from "../types"
import { validateInput } from "../helpers"

describe('e2e test', () => { 

    const madeRequest = async <T>(URL: string): Promise<AxiosResponse<T>> => {
        return await axios.get(URL);
    };

    describe('LongWeekend endpoint', () => {
        const year = new Date().getFullYear();
        const country = SUPPORTED_COUNTRIES[1]
        const API_URL = `${PUBLIC_HOLIDAYS_API_URL}/LongWeekend/${year}/${country}`

        it('should return status 200', async () => {
            validateInput({year, country});

            try {
                const {status} = await madeRequest<LongWeekend[]>(API_URL);
                expect(status).toBe(200);
            } catch (error) {
                console.log(error);
            }
            
        })

        it('should return array with more then 1 item', async () => {
            validateInput({year, country});

            try {
                const {data: result} = await madeRequest<LongWeekend[]>(API_URL);
                expect(result.length).toBeGreaterThan(0);
            } catch (error) {
                console.log(error);
            }
        })

        it('should be thrown an Error', async () => {
            validateInput({year, country: ''});

            try {
                await madeRequest<LongWeekend[]>(API_URL);
            } catch (error) {
                expect(error).toBeInstanceOf(Error)
            }
        })
    })

    describe('AvailableCountries endpoint', () => {
        const API_URL = `${PUBLIC_HOLIDAYS_API_URL}/AvailableCountries`

        it('should return status 200', async () => {

            try {
                const {status} = await madeRequest<AvailableCountries[]>(API_URL);
                expect(status).toBe(200);
            } catch (error) {
                console.log(error);
            }
        })

        it('should return array with more then 1 item', async () => {

            try {
                const {data: result} = await madeRequest<AvailableCountries[]>(API_URL);
                expect(result.length).toBeGreaterThan(0);
            } catch (error) {
                console.log(error);
            }
        })
    })
})