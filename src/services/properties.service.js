const Property = require('../model/properties.model');
const cache = require('memory-cache');

// Get total number of properties with caching
const getTotalProperties = async () => {
  let totalProperties = cache.get('totalProperties');
  
  if (totalProperties === null) {
    totalProperties = await Property.countDocuments();
    cache.put('totalProperties', totalProperties, 36000); // cache for 10 hours
  }

  return totalProperties;
};

// Add a new property
const addNewProperty = async (propertyData) => {
  try {
    const totalPropertiesBefore = await getTotalProperties();
    const propertyCount = await Property.countDocuments();
    const propertyNumber = `PR-${String(propertyCount + 1).padStart(4, '0')}`;
    propertyData.propertyNumber = propertyNumber;

    const newProperty = new Property(propertyData);
    await newProperty.save();

    cache.put('totalProperties', totalPropertiesBefore + 1, 3600000); // cache updated for 1 hour

    const totalPropertiesAfter = totalPropertiesBefore + 1;
    let percentageChange = 0;
    if (totalPropertiesBefore > 0) {
      percentageChange = ((totalPropertiesAfter - totalPropertiesBefore) / totalPropertiesBefore) * 100;
    }

    return {
      newProperty,
      totalPropertiesAfter,
      percentageChange: percentageChange.toFixed(2) + '%',
    };
  } catch (error) {
    throw new Error('Error adding new property: ' + error.message);
  }
};

// Get a property by ID
const getPropertyById = async (propertyId) => {
  return await Property.findById(propertyId)
    .populate('buildingId', 'name street city area')
    .populate('landlordId', 'name email');
};

// Get all properties with pagination and optional filtering
const getProperties = async (page = 1, limit = 10, filter = {}) => {
  try {
    const skip = (page - 1) * limit;

    // Prepare query for filtering properties
    const query = filter.status ? { status: filter.status } : {}; // Filter by status (vacant, occupied, etc.)

    if (filter.minRent || filter.maxRent) {
      query.rentAmount = {};
      if (filter.minRent) query.rentAmount.$gte = filter.minRent;
      if (filter.maxRent) query.rentAmount.$lte = filter.maxRent;
    }

    // Fetch the current number of properties based on the filters
    const currentPropertyCount = await Property.countDocuments(query);

    // Fetch properties from 5 minutes ago (or any other time window you prefer)
    const dateFiveMinutesAgo = new Date();
    dateFiveMinutesAgo.setMinutes(dateFiveMinutesAgo.getMinutes() - 5); // Subtract 5 minutes from current time
    
    const propertiesFiveMinutesAgo = await Property.find({
      createdAt: { $lte: dateFiveMinutesAgo },
      ...query, // Apply any additional filters
    }).countDocuments();

    // Calculate the percentage rate of change in the number of properties
    const percentageChange = propertiesFiveMinutesAgo === 0
      ? 0 // Avoid division by zero if no properties existed 5 minutes ago
      : ((currentPropertyCount - propertiesFiveMinutesAgo) / propertiesFiveMinutesAgo) * 100;

    // Fetch the properties with pagination
    const properties = await Property.find(query)
      .skip(skip)
      .limit(limit)
      .populate('buildingId', 'name street city area')
      .populate('landlordId', 'name email')
      .exec();

    // Calculate the total number of properties for pagination
    const totalProperties = await Property.countDocuments(query);

    // Return the properties along with additional data (pagination and percentage change)
    return {
      totalProperties,
      properties,
      totalPages: Math.ceil(totalProperties / limit),
      currentPage: page,
      percentageChange,
      currentPropertyCount,
      propertiesFiveMinutesAgo,
    };
  } catch (error) {
    throw new Error(`Error retrieving properties: ${error.message}`);
  }
};


// Update property data
const updateProperty = async (propertyId, propertyData) => {
  try {
    return await Property.findByIdAndUpdate(propertyId, propertyData, { new: true });
  } catch (error) {
    throw new Error('Error updating property: ' + error.message);
  }
};

// Batch update properties (update multiple properties at once)
const updatePropertiesBatch = async (propertyIds, propertyData) => {
  try {
    return await Property.updateMany({ _id: { $in: propertyIds } }, propertyData, { new: true });
  } catch (error) {
    throw new Error('Error batch updating properties: ' + error.message);
  }
};

// Delete a property
const deleteProperty = async (propertyId) => {
  try {
    return await Property.findByIdAndDelete(propertyId);
  } catch (error) {
    throw new Error('Error deleting property: ' + error.message);
  }
};

// Get properties by landlord ID
const getPropertiesByLandlord = async (landlordId) => {
  try {
    const properties = await Property.find({ landlordId })
      .populate('buildingId', 'name street city area')
      .populate('tenantId', 'name email');
    return properties;
  } catch (error) {
    throw new Error('Error fetching properties for landlord: ' + error.message);
  }
};

// Get properties by status (vacant, occupied, etc.)
const getPropertiesByStatus = async (status) => {
  try {
    return await Property.find({ status })
      .populate('buildingId', 'name street city area')
      .populate('landlordId', 'name email');
  } catch (error) {
    throw new Error(`Error fetching ${status} properties: ` + error.message);
  }
};

// Get properties within a specific rent range
const getPropertiesByRentRange = async (minRent, maxRent) => {
  try {
    const properties = await Property.find({
      rentAmount: { $gte: minRent, $lte: maxRent }
    })
      .populate('buildingId', 'name street city area')
      .populate('landlordId', 'name email');
    
    return properties;
  } catch (error) {
    throw new Error('Error fetching properties by rent range: ' + error.message);
  }
};

module.exports = {
  addNewProperty,
  getTotalProperties,
  getPropertyById,
  getProperties,
  updateProperty,
  updatePropertiesBatch,
  deleteProperty,
  getPropertiesByLandlord,
  getPropertiesByStatus,
  getPropertiesByRentRange,
};