import axios, { AxiosResponse } from 'axios';
import { PublicHolidayShort, ValidateInputFunction } from '../types';
import { getListOfPublicHolidays, checkIfTodayIsPublicHoliday, getNextPublicHolidays } from "./public-holidays.service";
import * as helpers from '../helpers';
import { SUPPORTED_COUNTRIES } from '../config';

describe('unit tests', () => {

    const setupValidateInputMock = (value: boolean= false) => {
        const validateInputMock = jest.spyOn(helpers, 'validateInput');
        if (!value) {
            validateInputMock.mockImplementation(() => {
                throw Error('my error message');
            })
        }
        validateInputMock.mockReturnValue(value);
    };

    describe('getListOfPublicHolidays function', () => {

        beforeEach(() => {
            jest.spyOn(axios, 'get');
        });
    
        afterEach(() => {
            jest.clearAllMocks();
        });

        const commonTestSetup = (mockedResultData: PublicHolidayShort[]) => {
            (axios.get as jest.MockedFunction<typeof axios.get>).mockResolvedValue({
              data: mockedResultData,
            } as AxiosResponse);
        };
    
        it('should return array of PublicHolidayShort', async () => {
            const data = {year: new Date().getFullYear(), country: SUPPORTED_COUNTRIES[1]};
            const mockedResultData: PublicHolidayShort[] = [
                {date: '', localName: 'localName', name: 'name'},
                {date: '', localName: 'localName1', name: 'name1'},
            ];
            
            setupValidateInputMock(true)
            commonTestSetup(mockedResultData);
    
            const result = await getListOfPublicHolidays(data.year, data.country);
            expect(result).toEqual(mockedResultData);
        })
    
        it('should return the empty array when country is empty', async () => {
            const data = {year: new Date().getFullYear(), country: ''};
            const mockedResultData: PublicHolidayShort[] = [];

            setupValidateInputMock()
            commonTestSetup(mockedResultData);
    
            const result = await getListOfPublicHolidays(data.year, data.country);
            expect(result).toEqual(mockedResultData);
        })
    
        it('should return the empty array when error is occured in the request', async () => {
            (axios.get as jest.MockedFunction<typeof axios.get>).mockRejectedValue(new Error('Network Error'));
            setupValidateInputMock(true)

            const result = await getListOfPublicHolidays(new Date().getFullYear(), '');
            expect(result).toEqual([]);
        })
    })
    
    describe('checkIfTodayIsPublicHoliday function', () => {
        beforeEach(() => {
            jest.spyOn(axios, 'get');
        });
    
        afterEach(() => {
            jest.clearAllMocks();
        })
    
        const commonTestSetup = (mockedResultData: number) => {
            (axios.get as jest.MockedFunction<typeof axios.get>).mockResolvedValue({
              status: mockedResultData,
            } as AxiosResponse);
        };
    
        it('should return true with status 200', async() => {
            commonTestSetup(200)
            setupValidateInputMock(true)
    
            const result = await checkIfTodayIsPublicHoliday(SUPPORTED_COUNTRIES[0])
            expect(result).toBe(true)
        })
    
    
        it('should return false when status is not 200', async() => {
            commonTestSetup(400)
            setupValidateInputMock(true)

            const result = await checkIfTodayIsPublicHoliday('')
            expect(result).toBe(false)
        })
    
        it('should return false when error is occured in the request', async () => {
            (axios.get as jest.MockedFunction<typeof axios.get>).mockRejectedValue(new Error('Network Error'));
            setupValidateInputMock(true)

            const result = await checkIfTodayIsPublicHoliday(SUPPORTED_COUNTRIES[0])
            expect(result).toBe(false)
        })
    })
    
    describe('getNextPublicHolidays function', () => {
        beforeEach(() => {
            jest.spyOn(axios, 'get');
        });
    
        afterEach(() => {
            jest.clearAllMocks();
        })
    
        const commonTestSetup = (mockedResultData: PublicHolidayShort[]) => {
            (axios.get as jest.MockedFunction<typeof axios.get>).mockResolvedValue({
              data: mockedResultData,
            } as AxiosResponse);
        };
    
        it('should return array of public holydays', async () => {
            const mockedResultData: PublicHolidayShort[] = [
                {
                    date: '',
                    localName: 'easeter',
                    name: 'easter'
                },
                {  
                    date: '',
                    localName: 'new year',
                    name: 'new year'
                },
            ]
            commonTestSetup(mockedResultData)
            setupValidateInputMock(true)
    
            const result = await getNextPublicHolidays(SUPPORTED_COUNTRIES[0])        
            expect(result).toEqual(mockedResultData)
        }) 
    
        it('should return an empty array', async () => {
            const mockedResultData: PublicHolidayShort[] = []
            commonTestSetup(mockedResultData)
            setupValidateInputMock()
    
            const result = await getNextPublicHolidays('')        
            expect(result).toEqual(mockedResultData)
        }) 
    
        it('should return the empty array when error is occured in the request', async () => {
            (axios.get as jest.MockedFunction<typeof axios.get>).mockRejectedValue(new Error('Network Error'));
            setupValidateInputMock(true)

            const result = await getNextPublicHolidays('')
            expect(result).toEqual([])
        })
    })
})
