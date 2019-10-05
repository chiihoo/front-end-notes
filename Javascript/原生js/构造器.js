function Employee(name, dept) {
  this.name = name || "";
  this.dept = dept || "general";
}

function WorkerBee(name, dept, projs) {
  this.base = Employee;
  this.base(name, dept);
  this.projects = projs || [];
}

var mark=new WorkerBee("Smith,Mark","training",["javascript"]);
console.log(mark.name);
console.log(mark.dept);
console.log(mark.projects);