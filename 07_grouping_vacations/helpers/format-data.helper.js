

function formatData(data) {
  let formattedDevelopersData = [];

  for (const developerData of data) {
    const {
      user: { name: userName, _id: userId },
      usedDays,
      endDate,
      startDate,
      status,
    } = developerData;
    const existedDeveloperData = formattedDevelopersData.find(
      existedData => existedData.userId === userId
    );

    if (existedDeveloperData) {
      formattedDevelopersData = formattedDevelopersData.map(data => {
        if (data.userId === userId) {
          const updatedDeveloperData = {
            ...data,
            vacations: [
              ...data.vacations,
              { startDate, endDate, usedDays, status },
            ],
          };

          return updatedDeveloperData;
        }

        return data;
      });
    } else {
      const newDeveloperData = {
        userId,
        userName,
        vacations: [{ startDate, endDate, usedDays, status }],
      };
      formattedDevelopersData.push(newDeveloperData);
    }
  }

  return JSON.stringify(formattedDevelopersData, null, 2);
}

module.exports = { formatData };
