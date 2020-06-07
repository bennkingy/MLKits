const outputs = [];
const k = 2;

function distance(pointA, pointB) {
  return Math.abs(pointA - pointB);
}

function onScoreUpdate(dropPosition, bounciness, size, bucketLabel) {
  // Ran every time a balls drops into a bucket
  outputs.push([dropPosition, bounciness, size, bucketLabel]);
  //console.log(outputs);
}

function splitDataset(data, testCount) {
  const shuffled = _.shuffle(data);
  const testSet = _.slice(shuffled, 0, testCount);
  const trainingSet = _.slice(shuffled, testCount);

  return [testSet, trainingSet];
}

function knn(data, point) {
    // K nearest neighbour algothrium 
    return _.chain(data)
    .map(row => [distance(row[0], point), row[3]])
    .sortBy(row => row[0])
    .slice(0,k)
    .countBy(row => row[1])
    .toPairs()
    .sortBy(row => row[1])
    .last()
    .first()
    .parseInt()
    .value()
}

function runAnalysis() {
  // Write code here to analyze stuff
  // K nearest neighbour algothrium 
  const testSetSize = 10;
  const [testSet, trainingSet] = splitDataset(outputs, testSetSize);

  let numberCorrect = 0;

  for (let i = 0; i < testSet.length; i++) {
    const bucket = knn(trainingSet, testSet[i][0])
    //console.log(bucket, testSet[i][3]);
    if(bucket === testSet[i][3]) {
      numberCorrect++
    }
  }

  console.log('Accuracy:', numberCorrect / testSetSize);

}