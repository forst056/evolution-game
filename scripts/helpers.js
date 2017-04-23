// Counts the number of instances of a target value in an array
countIf = function(arr,target) {
  var count = 0;
  for (var i = arr.length; i > 0; i--) {
    if (arr[i-1] === target) {
      count++;
    }
  }
  return count;
};
