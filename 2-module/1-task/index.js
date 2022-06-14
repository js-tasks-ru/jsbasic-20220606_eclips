function sumSalary(salaries) {
  let summary = 0;
  for(const property in salaries) {
    value = salaries[property];
    if(value.constructor != Number || isNaN(value) || !isFinite(value)) {
      continue;
    }
    summary += value;
  }
  return summary;  
}
