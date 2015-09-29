
//totalDegrees(data) This function can be passed uhdata and returns the total number of degrees awarded in the data set.
//pluck number of awards from every record
//reduce to one number

function arrayOfAwards(data) {
    return _.pluck(data, "AWARDS");
}

function totalDegrees(data) {
    return _.reduce(arrayOfAwards(data), function(memo, num){ return memo + num; }, 0);
}

//console.log(totalDegrees(uhdata));

//percentageHawaiian(data). This function can be passed uhdata and returns the percentage of degrees that were awarded to students of Hawaiian Legacy in the dataset.
//filter out only the awards that have HAWAIIAN_LEGACY === HAWAIIAN
//find the totaldegrees that are hawaiian

function findHawaiian(data) {
    return _.filter(data, function(record) { return record["HAWAIIAN_LEGACY"] === "HAWAIIAN"} );
}

function percentageHawaiian(data) {
    return totalDegrees(findHawaiian(data))/totalDegrees(data);
}

//console.log(percentageHawaiian(uhdata));

//totalDegreesByYear(data, year). This function can be passed uhdata and a year and returns the total number of degrees awarded in the passed year.
//filter out data by year wanted
//find totaldegrees for the filtered set

function findYear(data, year) {
    return _.filter(data, function(record) { return record["FISCAL_YEAR"] === year} );
}

function totalDegreesByYear(data, year) {
    return totalDegrees(findYear(data, year));
}

//console.log(totalDegreesByYear(uhdata, 2011));

//listCampuses(data). This function can be passed uhdata and returns an array containing all the campuses referenced in the passed dataset.
//pluck out all the compuses
// find only the unique names

function allCampuses(data) {
    return _.pluck(data, "CAMPUS");
}

function listCampuses(data) {
    return _.uniq(allCampuses(data));
}

//console.log(listCampuses(uhdata));

//listCampusDegrees(data). This function can be passed uhdata and returns an object where the property keys are campuses and the values are the number of degrees awarded by the campus.
//group by campuses
//find all degrees by campuses

function groupByCampus(data) {
    return _.groupBy(data, "CAMPUS");
}

function listCampusDegrees(data) {
    return _.mapObject(groupByCampus(data), totalDegrees);
}

//console.log(listCampusDegrees(uhdata));

//maxDegrees(data). This function can be passed uhdata and returns an integer indicating the maximum number of degrees awarded in a year.
//group by year
//find number awards in each year
//find the max number

function groupByYear(data) {
    return _.groupBy(data, "FISCAL_YEAR");
}

function listYearDegrees(data) {
    return _.mapObject(groupByYear(data), totalDegrees);
}

function maxDegrees(data) {
    return _.max(listYearDegrees(data));
}

//console.log(maxDegrees(uhdata));

//doctoralDegreePrograms(data). This function can be passed uhdata and returns a list of the degree programs (“CIP_DESC”) for which a doctoral degree is granted. (Doctoral Degrees)
//filter out by outcome that is Doctoral Degrees
//pluck out CIP_DESC
//uniq

function findDoctoralDegrees(data) {
    return _.filter(data, function(record) { return record["OUTCOME"] === "Doctoral Degrees"} );
}

function doctoralDegreePrograms(data) {
    return _.uniq(_.pluck(findDoctoralDegrees(data), "CIP_DESC"));
}

//console.log(doctoralDegreePrograms(uhdata));