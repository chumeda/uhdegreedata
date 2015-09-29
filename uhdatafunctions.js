/* globals _, uhdata */
/* exported testdata, maxDegrees, uhdata, percentageHawaiian, totalDegreesByYear, listCampuses, listCampusDegrees, doctoralDegreePrograms */

//totalDegrees(data) This function can be passed uhdata and returns the total number of degrees awarded in the data set.
//pluck number of awards from every record
//reduce to one number
/**
 *
 * @param data an array that contains objects with information about different degrees earned
 * @returns an array of the numbers taken from the awards field of every object
 */

function arrayOfAwards(data) {
  return _.pluck(data, "AWARDS");
}

/**
 *
 * @param data an array that contains objects with information about different degrees earned
 * @returns the sum of all the numbers in the array
 */

function totalDegrees(data) {
  return _.reduce(arrayOfAwards(data), function (memo, num) {
    return memo + num;
  }, 0);
}



//percentageHawaiian(data). This function can be passed uhdata and returns the percentage of degrees that were awarded to students of Hawaiian Legacy in the dataset.
//filter out only the awards that have HAWAIIAN_LEGACY === HAWAIIAN
//find the totaldegrees that are hawaiian

/**
 *
 * @param data an array that contains objects with information about different degrees earned
 * @returns {Array.<T>|*} an array of only the data where the HAWAIIAN_LEGACY key is equal to HAWAIIAN
 */

function findHawaiian(data) {
  return _.filter(data, function (record) {
    return record["HAWAIIAN_LEGACY"] === "HAWAIIAN";
  });
}

/**
 *
 * @param data an array that contains objects with information about different degrees earned
 * @returns {number} the percentage of Hawaiian degrees distributed
 */

function percentageHawaiian(data) {
  return totalDegrees(findHawaiian(data)) / totalDegrees(data);
}



//totalDegreesByYear(data, year). This function can be passed uhdata and a year and returns the total number of degrees awarded in the passed year.
//filter out data by year wanted
//find totaldegrees for the filtered set

/**
 *
 * @param data an array that contains objects with information about different degrees earned
 * @param year the fiscal year that we want to examine
 * @returns {Array.<T>|*} finds all the objects where FISCAL_YEAR == year
 */

function findYear(data, year) {
  return _.filter(data, function (record) {
    return record["FISCAL_YEAR"] === year;
  });
}

/**
 *
 * @param data an array that contains objects with information about different degrees earned
 * @param year the fiscal year we want to examine
 * @returns {the} the total degrees awarded in the specified year
 */

function totalDegreesByYear(data, year) {
  return totalDegrees(findYear(data, year));
}


//listCampuses(data). This function can be passed uhdata and returns an array containing all the campuses referenced in the passed dataset.
//pluck out all the compuses
// find only the unique names

/**
 *
 * @param data an array that contains objects with information about different degrees earned
 * @returns {*} all the campuses for the degrees earned
 */

function allCampuses(data) {
  return _.pluck(data, "CAMPUS");
}

/**
 *
 * @param data an array that contains objects with information about different degrees earned
 * @returns {*} all campuses where a degree was earned but not repeated
 */

function listCampuses(data) {
  return _.uniq(allCampuses(data));
}


//listCampusDegrees(data). This function can be passed uhdata and returns an object where the property keys are campuses and the values are the number of degrees awarded by the campus.
//group by campuses
//find all degrees by campuses

/**
 *
 * @param data an array that contains objects with information about different degrees earned
 * @returns {*} information grouped by campuses
 */

function groupByCampus(data) {
  return _.groupBy(data, "CAMPUS");
}

/**
 *
 * @param data an array that contains objects with information about different degrees earned
 * @returns {*} returns an object where property keys are objects and the values are the number of degrees awarded
 */

function listCampusDegrees(data) {
  return _.mapObject(groupByCampus(data), totalDegrees);
}


//maxDegrees(data). This function can be passed uhdata and returns an integer indicating the maximum number of degrees awarded in a year.
//group by year
//find number awards in each year
//find the max number

/**
 *
 * @param data an array that contains objects with information about different degrees earned
 * @returns {*} all the data grouped by year
 */

function groupByYear(data) {
  return _.groupBy(data, "FISCAL_YEAR");
}

/**
 *
 * @param data an array that contains objects with information about different degrees earned
 * @returns {*}
 */

function listYearDegrees(data) {
  return _.mapObject(groupByYear(data), totalDegrees);
}

/**
 *
 * @param data data an array that contains objects with information about different degrees earned
 * @returns {number} returns an integer indicating the maximum number of degrees awarded in a year
 */

function maxDegrees(data) {
  return _.max(listYearDegrees(data));
}


//doctoralDegreePrograms(data). This function can be passed uhdata and returns a list of the degree programs (“CIP_DESC”) for which a doctoral degree is granted. (Doctoral Degrees)
//filter out by outcome that is Doctoral Degrees
//pluck out CIP_DESC
//uniq

/**
 *
 * @param data data an array that contains objects with information about different degrees earned
 * @returns {Array.<T>|*} only data with the outcome == doctoral degrees
 */

function findDoctoralDegrees(data) {
  return _.filter(data, function (record) {
    return record["OUTCOME"] === "Doctoral Degrees";
  });
}

/**
 *
 * @param data data an array that contains objects with information about different degrees earned
 * @returns {*} returns a list of the degree programs (“CIP_DESC”) for which a doctoral degree is granted
 */

function doctoralDegreePrograms(data) {
  return _.uniq(_.pluck(findDoctoralDegrees(data), "CIP_DESC"));
}

