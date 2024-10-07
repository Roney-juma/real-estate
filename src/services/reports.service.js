




const getRentalIncomeReport = async (startDate, endDate) => {
    try {
      const payments = await Payment.find({
        date: { $gte: startDate, $lte: endDate },
        status: 'paid'
      });
  
      // Summing up total rental income
      const totalIncome = payments.reduce((acc, payment) => acc + payment.amount, 0);
      return {
        totalIncome,
        numberOfPayments: payments.length,
        startDate,
        endDate,
      };
    } catch (error) {
      throw new Error('Error fetching rental income report: ' + error.message);
    }
  };
  
  const getOccupancyRateReport = async (propertyId) => {
    try {
      const totalApartments = await Apartment.countDocuments({ propertyId });
      const occupiedApartments = await Apartment.countDocuments({ propertyId, isOccupied: true });
      
      const occupancyRate = (occupiedApartments / totalApartments) * 100;
      return {
        propertyId,
        totalApartments,
        occupiedApartments,
        occupancyRate: occupancyRate.toFixed(2) + '%',
      };
    } catch (error) {
      throw new Error('Error fetching occupancy rate report: ' + error.message);
    }
  };

  const getTenantPaymentHistory = async (tenantId) => {
    try {
      const payments = await Payment.find({ tenantId });
  
      const totalPaid = payments
        .filter(payment => payment.status === 'paid')
        .reduce((acc, payment) => acc + payment.amount, 0);
  
      const missedPayments = payments.filter(payment => payment.status === 'missed').length;
      const lateFees = payments.reduce((acc, payment) => acc + (payment.lateFee || 0), 0);
  
      return {
        tenantId,
        totalPaid,
        numberOfPayments: payments.length,
        missedPayments,
        lateFees,
        paymentHistory: payments,
      };
    } catch (error) {
      throw new Error('Error fetching tenant payment history: ' + error.message);
    }
  };

  const getOutstandingPaymentsReport = async () => {
    try {
      const outstandingPayments = await Payment.find({ status: 'unpaid' });
  
      const totalOutstandingAmount = outstandingPayments.reduce((acc, payment) => acc + payment.amount, 0);
  
      return {
        numberOfOutstandingPayments: outstandingPayments.length,
        totalOutstandingAmount,
        outstandingPayments,
      };
    } catch (error) {
      throw new Error('Error fetching outstanding payments report: ' + error.message);
    }
  };

  const getLeaseExpirationReport = async (startDate, endDate) => {
    try {
      const expiringLeases = await Lease.find({
        endDate: { $gte: startDate, $lte: endDate },
      });
  
      return {
        totalExpiringLeases: expiringLeases.length,
        expiringLeases,
        startDate,
        endDate,
      };
    } catch (error) {
      throw new Error('Error fetching lease expiration report: ' + error.message);
    }
  };

  const getPropertyFinancialReport = async (propertyId, startDate, endDate) => {
    try {
      const payments = await Payment.find({
        propertyId,
        date: { $gte: startDate, $lte: endDate },
        status: 'paid',
      });
  
      const totalRentCollected = payments.reduce((acc, payment) => acc + payment.amount, 0);
  
      const maintenanceRequests = await MaintenanceRequest.find({
        propertyId,
        completedAt: { $gte: startDate, $lte: endDate },
      });
  
      const totalMaintenanceCosts = maintenanceRequests.reduce((acc, request) => acc + request.cost, 0);
  
      const netIncome = totalRentCollected - totalMaintenanceCosts;
  
      return {
        propertyId,
        totalRentCollected,
        totalMaintenanceCosts,
        netIncome,
        startDate,
        endDate,
      };
    } catch (error) {
      throw new Error('Error fetching property financial report: ' + error.message);
    }
  };

  const getMonthlyRevenueReport = async (year, month) => {
    try {
      const startDate = new Date(year, month - 1, 1);
      const endDate = new Date(year, month, 0);
      
      const payments = await Payment.find({
        date: { $gte: startDate, $lte: endDate },
        status: 'paid',
      });
  
      const totalRevenue = payments.reduce((acc, payment) => acc + payment.amount, 0);
      
      return {
        totalRevenue,
        numberOfPayments: payments.length,
      };
    } catch (error) {
      throw new Error('Error fetching monthly revenue report: ' + error.message);
    }
  };
  
//   This method summarizes tenant payments over a specified period.

  const getTenantPaymentSummary = async (tenantId, startDate, endDate) => {
    try {
      const payments = await Payment.find({
        tenantId,
        date: { $gte: startDate, $lte: endDate },
      });
  
      const totalPaid = payments.reduce((acc, payment) => acc + payment.amount, 0);
      const missedPayments = payments.filter(payment => payment.status === 'missed').length;
  
      return {
        tenantId,
        totalPaid,
        missedPayments,
        paymentHistory: payments,
      };
    } catch (error) {
      throw new Error('Error fetching tenant payment summary: ' + error.message);
    }
  };
  module.exports = {
    getRentalIncomeReport,
    getTenantPaymentHistory,
    getPropertyFinancialReport,
    getOutstandingPaymentsReport,
    getOccupancyRateReport,
    getLeaseExpirationReport,
    getMonthlyRevenueReport,
    getTenantPaymentSummary,
  }