
## Description

### User

- role: Admin or Manager.
- User can log-in, refresh and sign-out.
- After logging in, the user can get data about him.
- Using an access token, user can make a request to receive order data.
- Only admin can create manager and url for activate account or recovery password.
- Before logging in, the manager must activate his account.
- Get all managers with orders statistic (each page displays 10 users, sorting is done by default, newest users are first).

### Order

- Each page displays 25 orders, you can also navigate between pages and sort them in descending and ascending order
(?order=-name or ?order=name), except for group.
- If the order does not have a manager, then when the status is updated to "In work", 
this manager is automatically assigned to track the order.
- Only the manager of this order can change the order details or if there is no manager for this order.
- Order data fields specified in the form may be sent empty.
- Before changing a group field, the user must create a group using the create group method.
- Filtering by fields is available: first name, last name, age, email address, phone, status, course, course_format,
course_type, manager, start_date, end_date.
- if the order status changes to New then the manager and _userId fields will become null.


### Comment

The user can leave comments under the order only where there is no manager or he himself is the manager of this order, 
after which his name is entered in the manager column and the status changes to “In work”.

### Group

- any user can get all groups.
- any user can create group (group name must be unique).

### Frontend

- The button in the filter, when clicked, downloads an Excel file with orders.
- Clicking on the logo in the header will take you to the orders page.
- Only administrator can log in to the admin panel page.
- If the access token has expired, it will be updated automatically if the refresh token has not expired yet.
- create group is in the order update modal window.
- Clicking on the logo takes you to the orders page.

## Installation

```bash
#install all dependencies and dev dependencies in package.json
$ cd backend
$ npm install
$ cd ..

#install all dependencies and dev dependencies in package.json
$ cd frontend
$ npm install
$ cd ..
```

## Env File

- all configurations are in the main folder in the backend/.env file

## Running the app

```bash
#backend
$ start:dev

#fronted
$ dev
```