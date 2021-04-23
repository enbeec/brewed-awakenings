import { getEmployees, getOrders, dummies } from "./database.js"

const employees = getEmployees()
const orders = getOrders()

const employeeNameById = (id) => {
    let employee = dummies.employee
    for (const oneEmployee of employees) {
        if (oneEmployee.id === id) {
            employee = oneEmployee
        }
    }
    return employee.name
}

document.addEventListener(
    "click",
    clickEvent => {
        const itemClicked = clickEvent.target
        if (itemClicked.id.startsWith("employee")) {
            const [, employeeId] = itemClicked.id.split("--")
            let sales = 0
            let msg = `${employeeNameById(employeeId)} sold `

            for (const order of orders) {
                if (order.employeeId === employeeId) {
                    sales += 1
                }
            }

            if (sales <= 0) { msg += "bupkis." }
            else if (sales === 1) { msg += "a product." }
            else { msg += `${sales} products.` }

            window.alert(msg)
        }
    }
)

export const Employees = () => {
    let html = "<ul>"

    for (const employee of employees) {
        html += `<li id="employee--${employee.id}">${employee.name}</li>`
    }

    html += "</ul>"

    return html
}

