/* Your Code Here */

// Function to create employee record
function createEmployeeRecord(employeeData) {
    const [firstName, familyName, title, payPerHour] = employeeData;

    return {
        firstName: firstName,
        familyName: familyName,
        title: title,
        payPerHour: payPerHour,
        timeInEvents: [],
        timeOutEvents: []
    };
}

// Function to create employee records from an array of arrays(applying created EmployeeRecord to each set of data)
function createEmployeeRecords(employeeDataArray) {
    return employeeDataArray.map(createEmployeeRecord);
}

// Function to record a time-in event for an employee
function createTimeInEvent(employee, timeStamp) {
    const [date, hour] = timeStamp.split(' ');

    //add a TimeIn event
    employee.timeInEvents.push({
        type: "TimeIn",
        hour: parseInt(hour, 10),
        date: date
    });

    //return updated employee record
    return employee;
}

// Function to record a time-out event for an employee(similar to above but records time-out event)
function createTimeOutEvent(employee, timeStamp) {
    const [date, hour] = timeStamp.split(' ');

    employee.timeOutEvents.push({
        type: "TimeOut",
        hour: parseInt(hour, 10),
        date: date
    });

    return employee;
}

// Function to calculate hours worked by an employee on a specific date
function hoursWorkedOnDate(employee, date) {
    const timeIn = employee.timeInEvents.find(event => event.date === date);
    const timeOut = employee.timeOutEvents.find(event => event.date === date);

    const hoursWorked = (timeOut.hour - timeIn.hour) / 100;

    return hoursWorked;
}

// Function to calculate wages earned by an employee on a specific date
function wagesEarnedOnDate(employee, date) {
    const hoursWorked = hoursWorkedOnDate(employee, date);
    const wagesEarned = hoursWorked * employee.payPerHour;

    return wagesEarned;
}

// Function to calculate total wages earned by an employee for all dates worked
function allWagesFor(employee) {
    const datesWorked = employee.timeInEvents.map(event => event.date);
    const totalWages = datesWorked.reduce((total, date) => total + wagesEarnedOnDate(employee, date), 0);

    return totalWages;
}

// Function to find an employee by their first name
function findEmployeeByFirstName(srcArray, firstName) {
    return srcArray.find(employee => employee.firstName === firstName);
}

// Function to calculate total payroll for all employees
function calculatePayroll(employeeRecords) {
    const totalPayroll = employeeRecords.reduce((total, employee) => total + allWagesFor(employee), 0);
    return totalPayroll;
}

// Example usage:

// Create employee records
const employeeDataArray = [
    ["John", "Doe", "Developer", 25],
    ["Jane", "Smith", "Designer", 30]
];

const employees = createEmployeeRecords(employeeDataArray);

// Record time events
createTimeInEvent(employees[0], "2022-01-23 0800");
createTimeOutEvent(employees[0], "2022-01-23 1700");

// Calculate wages for a specific date
const date = "2022-01-23";
const wages = wagesEarnedOnDate(employees[0], date);
console.log(`Wages earned on ${date}: $${wages}`);

// Calculate total payroll for all employees
const totalPayroll = calculatePayroll(employees);
console.log(`Total payroll: $${totalPayroll}`);



// A MYSTERY ON THE HORIZON
/*
 We're giving you this function. Take a look at it, you might see some usage
 that's new and different. That's because we're avoiding a well-known, but
 sneaky bug that we'll cover in the next few lessons!

 As a result, the lessons for this function will pass *and* it will be available
 for you to use if you need it!
 */

// const allWagesFor = function () {
//     const eligibleDates = this.timeInEvents.map(function (e) {
//         return e.date
//     })

//     const payable = eligibleDates.reduce(function (memo, d) {
//         return memo + wagesEarnedOnDate.call(this, d)
//     }.bind(this), 0) // <== Hm, why did we need to add bind() there? We'll discuss soon!

//     return payable
// }

