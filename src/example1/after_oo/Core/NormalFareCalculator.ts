import FareCalculator from '../Interfaces/FareCalculator'
import Segment from '../Segment'

export default class NormalFareCalculator implements FareCalculator {
   FARE = 2.1

   constructor(readonly next?: FareCalculator) {}

   calculate(segment: Segment): number {
      if (!segment.isOvernight() && !segment.isSunday()) {
         return segment.distance * this.FARE
      }
      if (!this.next) throw new Error('')
      return this.next?.calculate(segment)
   }
}
