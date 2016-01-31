function GeographicEntity(_id,
                          type,
                          entityName,
                          continent,
                          subregion,
                          geometry,
                          geometryCoordinates)
{
    this._id = _id;
    this.type = type;
    this.entityName = entityName;
    this.continent = continent;
    this.subregion = subregion;
    this.geometry = geometry;
    this.geometryCoordinates = geometryCoordinates;
}

module.exports = GeographicEntity;