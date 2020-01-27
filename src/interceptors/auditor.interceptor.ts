import {
  /* inject, */
  globalInterceptor,
  Interceptor,
  InvocationContext,
  InvocationResult,
  Provider,
  ValueOrPromise,
} from '@loopback/context';
import {ReviewRepository} from '../repositories/review.repository';
import {repository} from '@loopback/repository';
import {Review} from '../models';

/**
 * This class will be bound to the application as an `Interceptor` during
 * `boot`
 */
@globalInterceptor('', {tags: {name: 'auditor'}})
export class AuditorInterceptor implements Provider<Interceptor> {
  constructor(
    @repository(ReviewRepository) public reviewRepository: ReviewRepository,
  ) {}

  /**
   * This method is used by LoopBack context to produce an interceptor function
   * for the binding.
   *
   * @returns An interceptor function
   */
  value() {
    return this.intercept.bind(this);
  }

  /**
   * The logic to intercept an invocation
   * @param invocationCtx - Invocation context
   * @param next - A function to invoke next interceptor or the target method
   */
  async intercept(
    invocationCtx: InvocationContext,
    next: () => ValueOrPromise<InvocationResult>,
  ) {
    try {
      // Add pre-invocation logic here
      let count: number = (await this.reviewRepository.count()).count;
      console.log('count == ', count);

      let newReview: Review = new Review();
      newReview.reviewerName = 'AABBCC';
      newReview.comments = 'HHHHIIIIII';
      newReview.date = new Date().toString();
      await this.reviewRepository.create(newReview);

      const result = await next();
      // Add post-invocation logic here
      let count2: number = (await this.reviewRepository.count()).count;
      console.log('count2 == ', count2);
      return result;
    } catch (err) {
      // Add error handling logic here
      throw err;
    }
  }
}
