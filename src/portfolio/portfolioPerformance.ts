interface PortfolioPerformance {
    initialInvestment: number;
    currentValue: number;
    profitOrLoss: number;
    percentageChange: number;
    performanceSummary: string;
}

export function calculatePortfolioPerformance(initialInvestment: number, currentValue: number): PortfolioPerformance {
    const profitOrLoss = currentValue - initialInvestment;
    const percentageChange = (profitOrLoss / initialInvestment) * 100;

    const performanceSummary = [
        { range: (percentageChange > 20), outcome: 'Portfolio gained significantly.' },
        { range: (percentageChange > 10 && percentageChange <= 20), outcome: 'Portfolio gained moderately.' },
        { range: (percentageChange > 0 && percentageChange <= 10), outcome: 'Portfolio gained slightly.' },
        { range: (percentageChange === 0), outcome: 'No change.' },
        { range: (percentageChange >= -10 && percentageChange < 0), outcome: 'Portfolio lost slightly.' },
        { range: (percentageChange >= -20 && percentageChange < -10), outcome: 'Portfolio lost moderately.' },
        { range: (percentageChange < -20), outcome: 'Portfolio lost significantly.' }
    ]
    .find(item => item.range)?.outcome || 'No change';  // Default to 'No change' if no match

    return {
        initialInvestment,
        currentValue,
        profitOrLoss,
        percentageChange,
        performanceSummary,
    };
}