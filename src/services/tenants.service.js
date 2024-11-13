const Tenant = require('../model/tenants.model');
const Building = require('../model/building.model')
const Property = require('../model/properties.model')
const createTenant = async (tenantData) => {
  try {
    // Create the tenant using the provided data
    const tenant = new Tenant(tenantData);

    // Save the tenant
    await tenant.save();

    // Check if the tenant's apartmentId and propertyId are provided
    if (tenantData.apartmentId && tenantData.propertyId) {
      // Find the apartment and the specific property
      const apartment = await Building.findById(tenantData.apartmentId);
      const property = await Property.findById(tenantData.propertyId);

      // Ensure the apartment and property exist
      if (!apartment) {
        throw new Error('Apartment not found');
      }

      if (!property) {
        throw new Error('Property not found');
      }

      // Check if the property belongs to the specified apartment
      if (!apartment.properties.includes(property._id)) {
        throw new Error('The property does not belong to the specified apartment');
      }

      // Update the property's status to 'occupied' and link the tenant to the property
      property.status = 'occupied'; // Change property status to 'occupied'
      property.tenantId = tenant._id; // Link the tenant to the property

      // Save the updated property
      await property.save();

      // Optionally, you can also update the apartment or other related data as necessary
      // For example, you could check if the apartment has any other available properties
      const availableProperties = apartment.properties.filter(
        (propertyId) => propertyId !== property._id && property.status !== 'occupied'
      );

      // Save the updated apartment if necessary (e.g., update the availability status)
      await apartment.save();
    }

    // Populate apartmentId and propertyId to get apartment and building details along with the tenant
    const populatedTenant = await Tenant.findById(tenant._id)
      .populate('apartmentId')
      .populate('propertyId')
      .exec();

    return populatedTenant;
  } catch (error) {
    throw new Error(`Error creating tenant: ${error.message}`);
  }
};

const getTenantById = async (tenantId) => {
  try {
    const tenant = await Tenant.findById(tenantId).populate('apartmentId').exec();
    if (!tenant) {
      throw new Error('Tenant not found');
    }
    return tenant;
  } catch (error) {
    throw new Error(`Error retrieving tenant by ID: ${error.message}`);
  }
};

const updateTenant = async (tenantId, tenantData) => {
  try {
    const updatedTenant = await Tenant.findByIdAndUpdate(tenantId, tenantData, { new: true })
      .populate('apartmentId')  // Ensure apartmentId is populated after update
      .exec();
    if (!updatedTenant) {
      throw new Error('Tenant not found');
    }
    return updatedTenant;
  } catch (error) {
    throw new Error(`Error updating tenant: ${error.message}`);
  }
};

const deleteTenant = async (tenantId) => {
  try {
    const deletedTenant = await Tenant.findByIdAndDelete(tenantId);
    if (!deletedTenant) {
      throw new Error('Tenant not found');
    }
    return deletedTenant;
  } catch (error) {
    throw new Error(`Error deleting tenant: ${error.message}`);
  }
};

const getAllTenants = async (page = 1, limit = 10) => {
  try {
    const skip = (page - 1) * limit;

    // Fetch the current number of tenants
    const currentTenantCount = await Tenant.countDocuments();

    // Fetch tenants from 1 month ago (you can adjust this to a different time frame if needed)
    const dateOneMonthAgo = new Date();
    dateOneMonthAgo.setMonth(dateOneMonthAgo.getMonth() - 1);

    const dateFiveMinutesAgo = new Date();
    dateFiveMinutesAgo.setMinutes(dateFiveMinutesAgo.getMinutes() - 5);

    const tenantsOneMonthAgo = await Tenant.find({
      createdAt: { $lte: dateFiveMinutesAgo }
    }).countDocuments();

    // Calculate the percentage rate of change
    const percentageChange = currentTenantCount === 0
      ? 0 // Avoid division by zero if no tenants currently
      : ((currentTenantCount - tenantsOneMonthAgo) / currentTenantCount) * 100;

    // Fetch current tenants for pagination
    const tenants = await Tenant.find({})
      .skip(skip)
      .limit(limit)
      .populate('apartmentId')
      .exec();

    return {
      tenants,
      percentageChange,
      currentTenantCount,
      tenantsOneMonthAgo,
    };
  } catch (error) {
    throw new Error(`Error retrieving tenants: ${error.message}`);
  }
};

const getTenantsByApartmentId = async (apartmentId) => {
  try {
    const tenants = await Tenant.find({ apartmentId })
      .populate('apartmentId') // Populate apartment details
      .exec();
    return tenants;
  } catch (error) {
    throw new Error(`Error retrieving tenants by apartment ID: ${error.message}`);
  }
};

const getTenantsByLandlordId = async (landlordId) => {
  try {
    const tenants = await Tenant.find({ landlordId })
      .populate('apartmentId')  // You can also populate other details like landlord, apartment
      .exec();
    return tenants;
  } catch (error) {
    throw new Error(`Error retrieving tenants by landlord ID: ${error.message}`);
  }
};

const searchTenants = async (searchQuery) => {
  try {
    const tenants = await Tenant.find({
      $or: [
        { fullName: { $regex: searchQuery, $options: 'i' } },
        { email: { $regex: searchQuery, $options: 'i' } }
      ]
    }).populate('apartmentId')
      .exec();
    return tenants;
  } catch (error) {
    throw new Error(`Error searching tenants: ${error.message}`);
  }
};

const getTenantsByPaymentStatus = async (status) => {
  try {
    const tenants = await Tenant.find({
      'paymentHistory.status': status
    }).populate('apartmentId')  // Populate the apartmentId if needed
      .exec();
    return tenants;
  } catch (error) {
    throw new Error(`Error retrieving tenants by payment status: ${error.message}`);
  }
};

const updatePaymentHistory = async (tenantId, paymentData) => {
  try {
    const tenant = await Tenant.findById(tenantId);
    if (!tenant) {
      throw new Error('Tenant not found');
    }
    
    tenant.paymentHistory.push(paymentData); // Add new payment record
    await tenant.save();
    return tenant;
  } catch (error) {
    throw new Error(`Error updating payment history: ${error.message}`);
  }
};

const updateTenantStatus = async (tenantId, status) => {
  try {
    const tenant = await Tenant.findByIdAndUpdate(
      tenantId,
      { status },
      { new: true }
    ).populate('apartmentId') // You can populate relevant fields if needed
      .exec();
    
    if (!tenant) {
      throw new Error('Tenant not found');
    }
    return tenant;
  } catch (error) {
    throw new Error(`Error updating tenant status: ${error.message}`);
  }
};

const getPaymentHistory = async (tenantId) => {
  try {
    const tenant = await Tenant.findById(tenantId);
    if (!tenant) {
      throw new Error('Tenant not found');
    }
    return tenant.paymentHistory;  // Return the payment history array
  } catch (error) {
    throw new Error(`Error retrieving payment history: ${error.message}`);
  }
};

const checkRentDue = async (tenantId) => {
  try {
    const tenant = await Tenant.findById(tenantId);
    if (!tenant) {
      throw new Error('Tenant not found');
    }
    
    // Check if rent is due (assuming rentDueDate is a number representing the day of the month)
    const today = new Date().getDate();
    const isDue = tenant.rentDueDate === today;
    return isDue;
  } catch (error) {
    throw new Error(`Error checking rent due: ${error.message}`);
  }
};

const calculateTotalRentPaid = async (tenantId) => {
  try {
    const tenant = await Tenant.findById(tenantId);
    if (!tenant) {
      throw new Error('Tenant not found');
    }
    
    const totalPaid = tenant.paymentHistory.reduce((acc, payment) => acc + (payment.amount || 0), 0);
    return totalPaid;
  } catch (error) {
    throw new Error(`Error calculating total rent paid: ${error.message}`);
  }
};

const getTenantsDueForRenewal = async () => {
  try {
    const today = new Date();
    const tenants = await Tenant.find({
      leaseEnd: { $lte: today }
    }).populate('apartmentId')  // Populate apartment details if needed
      .exec();
    
    return tenants;
  } catch (error) {
    throw new Error(`Error retrieving tenants due for lease renewal: ${error.message}`);
  }
};
// Create a new payment for a tenant
const addPayment = async (tenantId, paymentData) => {
  try {
    const tenant = await Tenant.findById(tenantId);
    if (!tenant) {
      throw new Error('Tenant not found');
    }
    
    tenant.paymentHistory.push(paymentData); // Add new payment to tenant's payment history
    await tenant.save();
    
    return tenant;
  } catch (error) {
    throw new Error(`Error creating payment: ${error.message}`);
  }
};
// Check outstanding balance for a tenant
const checkOutstandingBalance = async (tenantId, totalRentDue) => {
  try {
    const totalPaid = await calculateTotalRentPaid(tenantId);
    const balanceDue = totalRentDue - totalPaid;
    return balanceDue;
  } catch (error) {
    throw new Error(`Error checking outstanding balance: ${error.message}`);
  }
};
// Get tenants with outstanding payments
const getTenantsWithOutstandingPayments = async () => {
  try {
    const tenants = await Tenant.find({
      "paymentHistory.status": { $ne: "paid" }
    }).populate('apartmentId');
    return tenants;
  } catch (error) {
    throw new Error(`Error retrieving tenants with outstanding payments: ${error.message}`);
  }
};

// Get tenants due for payment today
const getTenantsDueForPaymentToday = async () => {
  try {
    const today = new Date().getDate();
    const tenantsDueToday = await Tenant.find({ rentDueDate: today }).populate('apartmentId');
    return tenantsDueToday;
  } catch (error) {
    throw new Error(`Error retrieving tenants due for payment today: ${error.message}`);
  }
};

module.exports = {
  createTenant,
  getTenantById,
  updateTenant,
  deleteTenant,
  getAllTenants,
  getTenantsByApartmentId,
  getTenantsByLandlordId,
  searchTenants,
  getTenantsByPaymentStatus,
  updatePaymentHistory,
  updateTenantStatus,
  getPaymentHistory,
  checkRentDue,
  calculateTotalRentPaid,
  getTenantsDueForRenewal,
  addPayment,
  checkOutstandingBalance,
  getTenantsWithOutstandingPayments,
  getTenantsDueForPaymentToday,
};
