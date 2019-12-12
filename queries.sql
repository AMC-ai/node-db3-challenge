-- Multi-Table Query Practice

-- Display the ProductName and CategoryName for all products in the database. Shows 77 records.
SELECT ProductName, CategoryName
FROM category
    JOIN product
    ON product.CategoryID = category.id;

-- Display the order Id and shipper CompanyName for all orders placed before August 9 2012. Shows 429 records.
select o.id
    , s.companyName as shipperName
    , o.OrderDate
from [order] as o
    join shipper as s
    on o.shipvia = s.id
where o.OrderDate < '2012-08-09';

-- Display the name and quantity of the products ordered in order with Id 10251. Sort by ProductName. Shows 3 records.
select p.productname, p.quantityperunit
from product as p
    inner join orderdetail as od on od.productid = p.id
    inner join [order] as o on  od.orderid = o.id
where o.id = '10251'
order by productname;

-- Display the OrderID, Customer's Company Name and the employee's LastName for every order. All columns should be labeled clearly. Displays 16,789 records.
select o.id, c.companyname, e.lastname
from [order] as o
    inner join customer as c on o.customerid = c.id
    inner join employee as e on o.employeeid = e.id;