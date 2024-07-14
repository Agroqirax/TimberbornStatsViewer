function getPlantingArea(resource) {
  if (!resource) {
    throw "Resource not defined";
  }
  const countArray =
    worldData["Singletons"]["PlantingService"]["PlantingMap"][resource];
  if (countArray) {
    const count = countArray.length;
    return count;
  } else {
    return 0;
  }
}

function getEntities(resource) {
  if (!resource) {
    throw "Resource not defined";
  }
  const countArray = worldData["Entities"];
  if (countArray) {
    const count = countArray.filter(
      (entity) => entity.Template === resource
    ).length;
    return count;
  } else {
    return 0;
  }
}

function getEntitiesGrown(resource) {
  if (!resource) {
    throw "Resource not defined";
  }
  const countArray = worldData["Entities"];
  if (countArray) {
    count = countArray.filter(
      (entity) =>
        entity.Template === resource &&
        entity.Components.Growable.GrowthProgress === 1.0
    ).length;
    return count;
  } else {
    return 0;
  }
}

function getSettlementStat(statId) {
  if (!statId) {
    throw "StatId not defined";
  }
  if (
    !worldData?.Singletons?.IncrementalStatisticCollector?.SettlementStatistics
  ) {
    throw "SettlementStatistics not defined, Game version likely pre 0.6";
  }
  const countArray =
    worldData.Singletons.IncrementalStatisticCollector.SettlementStatistics;
  for (obj of countArray) {
    if (obj.Id === statId) {
      return obj.Value;
    }
  }
  return 0;
}

function appendToTable(data, tableSelector, columnMappings) {
  // Select the tbody of the table using the provided table selector
  const tableBody = document.querySelector(tableSelector);

  if (!data) {
    throw "Data not defined, Game version likely pre 0.6";
  }
  if (!tableBody) {
    throw "Table not found using the selector: " + tableSelector;
  }
  if (!columnMappings) {
    throw "ColumnMappings not found";
  }

  data.forEach((item) => {
    // Create a new table row
    const row = document.createElement("tr");

    // Loop through column mappings to create and append cells
    columnMappings.forEach((mapping) => {
      const cell = document.createElement("td");
      cell.textContent = item[mapping];
      row.appendChild(cell);
    });

    // Append the row to the table body
    tableBody.appendChild(row);
  });
}

function getProductionAmount(good) {
  if (!good) {
    throw "Good not defined";
  }
  const producedBy = properties.game.Goods[good].ProducedBy;
  if (!producedBy) {
    throw "ProducedBy not defined";
  }
  const producedByArray = Array.isArray(producedBy) ? producedBy : [producedBy];

  let totalAmount = 0;

  producedByArray.forEach((producer) => {
    const factory = properties.game.Entities[producer];
    if (!factory) {
      throw "Cannot find entity '" + producer + "'.";
    }
    factory.Versions.forEach((version) => {
      const relevantEntities = worldData.Entities.filter(
        (entity) =>
          version.TemplateId === entity.Template &&
          entity.Components?.PausableBuilding?.Paused !== true
      );

      for (const recipeKey in version.Recipes) {
        const recipe = version.Recipes[recipeKey];
        const numBuildings = relevantEntities.filter((entity) => {
          const currentRecipe =
            entity.Components?.Manufactory?.CurrentRecipe ?? ".default";
          return currentRecipe === recipeKey;
        }).length;

        let amount =
          (24 / recipe[".duration"]) *
          (recipe.Output[good] || 0) *
          numBuildings;

        if (recipe[".duringWorkingHours"] !== false) {
          amount *= worldData.Singletons.WorkingHoursManager.WorkedPartOfDay;
        }

        totalAmount += amount;
      }
    });
  });

  // Prevent conversion errors, e.g. 0.1 + 0.2 => 0.30000000000000004
  return Math.round(totalAmount);
}

function getRequiredAmount(good) {
  if (!good) {
    throw "Good not defined";
  }
  const producedBy = properties.game.Goods[good].RequiredBy;
  if (!producedBy) {
    return 0;
  }
  const producedByArray = Array.isArray(producedBy) ? producedBy : [producedBy];

  let totalAmount = 0;

  producedByArray.forEach((requirerer) => {
    const factory = properties.game.Entities[requirerer];
    if (!factory) {
      throw "Cannot find entity '" + requirerer + "'.";
    }
    factory.Versions.forEach((version) => {
      const relevantEntities = worldData.Entities.filter(
        (entity) =>
          version.TemplateId === entity.Template &&
          entity.Components?.PausableBuilding?.Paused !== true
      );

      for (const recipeKey in version.Recipes) {
        const recipe = version.Recipes[recipeKey];
        const numBuildings = relevantEntities.filter((entity) => {
          const currentRecipe =
            entity.Components?.Manufactory?.CurrentRecipe ?? ".default";
          return currentRecipe === recipeKey;
        }).length;

        let amount =
          (24 / recipe[".duration"]) * (recipe.Input[good] || 0) * numBuildings;

        if (recipe[".duringWorkingHours"] !== false) {
          amount *= worldData.Singletons.WorkingHoursManager.WorkedPartOfDay;
        }

        totalAmount += amount;
      }
    });
  });

  // Prevent conversion errors, e.g. 0.1 + 0.2 => 0.30000000000000004
  return Math.round(totalAmount);
}

function getStorageAmount(good) {
  const relevantEntities = worldData.Entities;

  let totalAmount = 0;
  const allowedStorageTypes = properties.game.StorageTypes;

  relevantEntities.forEach((entity) => {
    allowedStorageTypes.forEach((storageType) => {
      if (
        entity.Components[storageType] &&
        entity.Components[storageType].Storage
      ) {
        entity.Components[storageType].Storage.Goods.forEach((item) => {
          if (item.Good.Id === good) {
            totalAmount += item.Amount;
          }
        });
      }
    });
  });

  return totalAmount;
}
