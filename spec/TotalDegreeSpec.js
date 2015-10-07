describe("Total Degree", function() {
  var testdata = uhdata.splice(0,10);

  it("should give the total number of degrees when passed an array of data", function() {
    expect(totalDegrees(testdata)).toBe(935);
  });

  it("should give an error message if there is no Awards Field", function() {
    var noAwardsField = testdata.concat({foo: "bar"});
    expect(function () {totalDegrees(noAwardsField);}).toThrowError("No Awards Field");
  });

  it("should give an error if the Awards Field is not an integer value", function() {
    var noAwardsField = testdata.concat({AWARDS: "bar"});
    expect(function () {totalDegrees(noAwardsField);}).toThrowError("Awards field can only be an integer");
  });

});
