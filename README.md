# MWH Minimart System API Reference

## Base URL
```
localhost:8080/api
```

## Endpoints

### Get All Products

```http
GET /minimart/all
```

Returns a list of all products in the minimart system.

#### Response

```json
[
    {
        "product_id": "pfSpnciOkTxpOow0VFeE",
        "name": "Indomie",
        "description": "Indomie",
        "quantity": 0,
        "image_url": "https://firebasestorage.googleapis.com/v0/b/muhammadiyah-db.firebasestorage.app/o/product_images%2Findomie.jpg?alt=media&token=60ec882d-9d35-4f30-babb-ee693c6e964d",
        "point": 10
    },
    {
        "product_id": "zZplkwEvX17jr7Vp8R5c",
        "name": "Sour Patch Kids",
        "description": "Sour candy made of kids",
        "quantity": 71,
        "image_url": "https://firebasestorage.googleapis.com/v0/b/muhammadiyah-db.firebasestorage.app/o/product_images%2Fsour-patch-kid.jpg?alt=media&token=1c9a1be6-ad88-4eb6-ad62-837b2ab57e16",
        "point": 10
    }
]
```

### Purchase Products

```http
POST /minimart/purchase
```

Create a new purchase transaction for products.

#### Request Body

```json
{
    "code": "4321",
    "points_cost": 4,
    "productId": [
        {"zZp1kwEvX17jr7Vp8R5c": 1},
        {"pfSpnc1OkTxpOow0VFcE": 2}
    ],
    "status": "unclaimed",
    "userId": "ysqZyF75qJLzfcLFsyWo"
}
```

#### Response

```json
{
    "success": true,
    "data": {
        "id": "qNXLVOeztJIFAC2Lccuu",
        "code": "4321",
        "points_cost": 4,
        "productId": [
            {
                "zZp1kwEvX17jr7Vp8R5c": 1
            },
            {
                "pfSpnc1OkTxpOow0VFcE": 2
            }
        ],
        "status": "unclaimed",
        "userId": "ysqZyF75qJLzfcLFsyWo",
        "createdAt": "2025-01-16T19:35:38.639Z"
    }
}
```

### Dashboard
```http
GET /dashboard/data
```
Return total residents, total pending tasks, total pending requests, total low-stock items, recent changes to databases, and total number of approved items to display in the Dashboard.

### Request Management/History

```http
GET /requests
```
Return a list of all requests pending for Request Management and requests approved/rejected for Request History.

```http
PUT /requests/${requestId}/approve
```

Change status of request from pending to approved.

```http
PUT /requests/${requestId}/reject
```
Change status of request from pending to rejected.
