function GeographicEntity(_id,
                          type,
                          entityName,
                          continent,
                          subregion,
                          geometry,
                          geometryCoordinates, addedBy)
{
    this._id = _id;
    this.type = type;
    this.entityName = entityName;
    this.continent = continent;
    this.subregion = subregion;
    this.geometry = geometry;
    this.geometryCoordinates = geometryCoordinates;
    this.addedBy = addedBy;
}

module.exports = GeographicEntity;