import { calculatePortfolioPerformance } from '../src/portfolio/portfolioPerformance';


describe('calculatePortfolioPerformance', () => {

    // Test 1: Significant gain
    it('should return "Portfolio gained significantly." when percentage change > 20%', () => {
        const performance = calculatePortfolioPerformance(10000, 15000);
        expect(performance.performanceSummary).toBe('Portfolio gained significantly.');
    });

    // Test 2: Moderate loss
    it('should return "Portfolio lost moderately." when percentage change is between -10% and -20%', () => {
        const performance = calculatePortfolioPerformance(10000, 8000);
        expect(performance.performanceSummary).toBe('Portfolio lost moderately.');
    });


    // Test 3: No change
    it('should return "No change." when current value equals initial investment', () => {
        const performance = calculatePortfolioPerformance(10000, 10000);
        expect(performance.performanceSummary).toBe('No change.');
    });
});