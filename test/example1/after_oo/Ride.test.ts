import Ride from '../../../src/example1/after_oo/Ride'
import NormalFareCalculator from '../../../src/example1/after_oo/Core/NormalFareCalculator'
import OvernightFareCalculator from '../../../src/example1/after_oo/Core/OvernightFareCalculator'
import OvernightSundayFareCalculator from '../../../src/example1/after_oo/Core/OvernightSundayFareCalculator'
import SundayFareCalculator from '../../../src/example1/after_oo/Core/SundayFareCalculator'

let ride: Ride

beforeEach(function () {
   const normalFareCalculator = new NormalFareCalculator()
   const sundayFareCalculator = new SundayFareCalculator(normalFareCalculator)
   const overnightSundayFareCalculator = new OvernightSundayFareCalculator(sundayFareCalculator)
   const overnightFareCalculator = new OvernightFareCalculator(overnightSundayFareCalculator)

   ride = new Ride(overnightFareCalculator)
})

it('Should apply normal fare', function () {
   ride.addSegment(10, new Date('2021-03-01T10:00:00'))
   const fare = ride.finish()
   expect(fare).toBe(21)
})

it('Should apply sunday fare', function () {
   ride.addSegment(10, new Date('2021-03-07T10:00:00'))
   const fare = ride.finish()
   expect(fare).toBe(29)
})

it('Should apply overnight fare', function () {
   ride.addSegment(10, new Date('2021-03-01T23:00:00'))
   const fare = ride.finish()
   expect(fare).toBe(39)
})

it('Should apply overnight sunday fare', function () {
   ride.addSegment(10, new Date('2021-03-07T23:00:00'))
   const fare = ride.finish()
   expect(fare).toBe(50)
})

it('Should throw invalid distance if distance is not a number', function () {
   expect(() => ride.addSegment(-3, new Date('2021-03-07T23:00:00'))).toThrowError(
      new Error('Invalid Distance'),
   )
})

it('Should throw invalid date if date is not a date', function () {
   expect(() => ride.addSegment(10, new Date('abcde'))).toThrowError(new Error('Invalid Date'))
})

it('Should return 10 as min fare', function () {
   ride.addSegment(1, new Date('2021-03-07T23:00:00'))
   const fare = ride.finish()
   expect(fare).toBe(10)
})
