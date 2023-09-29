function createEmployeeRecord(employeeData) {
    return {
        firstName: employeeData[0],
        familyName: employeeData[1],
        title: employeeData[2],
        payPerHour: employeeData[3],
        timeInEvents: [],
        timeOutEvents: [],
    };
}

function createEmployeeRecords(employeesData) {
    return employeesData.map(createEmployeeRecord);
}

function createTimeInEvent(timestamp) {
    const [date, hour] = timestamp.split(" ");
    this.timeInEvents.push({
        type: "TimeIn",
        date,
        hour: parseInt(hour, 10),
    });
    return this;
}

function createTimeOutEvent(timestamp) {
    const [date, hour] = timestamp.split(" ");
    this.timeOutEvents.push({
        type: "TimeOut",
        date,
        hour: parseInt(hour, 10),
    });
    return this;
}

function hoursWorkedOnDate(date) {
    const timeIn = this.timeInEvents.find((event) => event.date === date);
    const timeOut = this.timeOutEvents.find((event) => event.date === date);
    return (timeOut.hour - timeIn.hour) / 100;
}

function wagesEarnedOnDate(date) {
    const hoursWorked = hoursWorkedOnDate.call(this, date);
    return hoursWorked * this.payPerHour;
}

function allWagesFor() {
    const dates = this.timeInEvents.map((event) => event.date);
    const totalWages = dates.reduce((total, date) => total + wagesEarnedOnDate.call(this, date), 0);
    return totalWages;
}

function findEmployeeByFirstName(srcArray, firstName) {
    return srcArray.find((employee) => employee.firstName === firstName);
}

function calculatePayroll(employees) {
    return employees.reduce((totalPay, employee) => totalPay + allWagesFor.call(employee), 0);
}
