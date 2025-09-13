import { calculatePortfolioPerformance } from '../src/portfolio/portfolioPerformance';
import { findLargestHolding } from '../src/portfolio/portfolioPerformance';
import { calculateAssetAllocation } from '../src/portfolio/portfolioPerformance';

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

describe('findLargestHolding', () => {

    // Test 1: Regular assets
    it('should return the asset with the largest value', () => {
        const assets = [
            { name: 'House', value: 300000 },
            { name: 'Stocks', value: 100000 },
            { name: 'Bonds', value: 50000 }
        ];
        const largest = findLargestHolding(assets);
        expect(largest?.name).toBe('House');
        expect(largest?.value).toBe(300000);
    });

    // Test 2: Empty portfolio
    it('should return undefined for an empty portfolio', () => {
        const assets: any[] = [];
        const largest = findLargestHolding(assets);
        expect(largest).toBeUndefined();
    });

    // Test 3: Tied values
    it('should return the first asset with the largest value if there is a tie', () => {
        const assets = [
            { name: 'House', value: 100000 },
            { name: 'Stocks', value: 100000 },
            { name: 'Bonds', value: 50000 }
        ];
        const largest = findLargestHolding(assets);
        expect(largest?.name).toBe('House'); 
    });
});

describe('calculateAssetAllocation', () => {

    // Test 1: Regular assets, normal case
    it('should calculate the correct allocation percentages', () => {
        const assets = [
            { name: 'Stocks', value: 5000 },
            { name: 'Bonds', value: 5000 }
        ];
        const allocation = calculateAssetAllocation(assets);
        expect(allocation.Stocks).toBe(50); 
        expect(allocation.Bonds).toBe(50); 
    });

    // Test 2: Uneven distribution
    it('should calculate the correct allocation with uneven distribution', () => {
        const assets = [
            { name: 'Stocks', value: 7000 },
            { name: 'Bonds', value: 3000 }
        ];
        const allocation = calculateAssetAllocation(assets);
        expect(allocation.Stocks).toBe(70);
        expect(allocation.Bonds).toBe(30); 
    });

    // Test 3: Empty portfolio
    it('should return an empty allocation for an empty portfolio', () => {
        const assets: any[] = [];
        const allocation = calculateAssetAllocation(assets);
        expect(allocation).toEqual({});
    });
});