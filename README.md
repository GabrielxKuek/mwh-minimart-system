# mwh-minimart-system

im deploying this branch to render JUST FOR TESTING PURPOSES

# Base URL: localhost:8080/api
# Dashboard Endpoints

## Vouchers
GET /dashboard/voucher/all/:user_id - Get all vouchers for a user
GET /dashboard/voucher/redeemed/:user_id - Get redeemed vouchers for a user
GET /dashboard/voucher/unredeemed/:user_id - Get unredeemed vouchers for a user

## Requests
GET /dashboard/request/all/:user_id - Get all requests for a user
GET /dashboard/request/pending/:user_id - Get pending requests for a user
GET /dashboard/request/approved/:user_id - Get approved requests for a user
GET /dashboard/request/rejected/:user_id - Get rejected requests for a user

## Minimart Endpoints
GET /minimart/voucher/:user_id - Get all products
GET /minimart/request/:user_id - Get all requests for a user
POST /minimart/create - Create a new request

## Task Endpoints
GET /task/all/:user_id - Get all tasks for a user
GET /task/completed/:user_id - Get completed tasks for a user
GET /task/pending/:user_id - Get pending tasks for a user
GET /task/incomplete/:user_id - Get incomplete tasks for a user