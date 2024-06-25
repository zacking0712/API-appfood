CREATE DATABASE appfood


CREATE TABLE nguoi_dung(
	user_id INT PRIMARY KEY AUTO_INCREMENT,
	full_name VARCHAR(100),
	email VARCHAR(100),
	password VARCHAR(100),
)

INSERT INTO nguoi_dung (full_name, email, password)
VALUES
('Nguyen Van A', 'nguyenvana@example.com', 'password123'),
('Tran Thi B', 'tranthib@example.com', 'pass456'),
('Le Hoang C', 'lehoangc@example.com', 'qwerty789'),
('Pham Thi D', 'phamthid@example.com', 'abcd1234'),
('Nguyen Van E', 'nguyenvane@example.com', 'xyz987');

CREATE TABLE food(
	food_id INT PRIMARY KEY AUTO_INCREMENT,
	food_name VARCHAR(100),
	image VARCHAR(100),
	price FLOAT,
	description VARCHAR(500),
	type_id INT,
	
	FOREIGN KEY (type_id) REFERENCES food_type(type_id)
)

INSERT INTO food (food_name, image, price, description, type_id)
VALUES
('Pho', 'pho.jpg', 5.99, 'Traditional Vietnamese noodle soup', 1),
('Pizza', 'pizza.jpg', 9.99, 'Classic Italian dish with various toppings', 2),
('Sushi', 'sushi.jpg', 12.99, 'Delicious Japanese rice rolls with fish or vegetables', 3),
('Tacos', 'tacos.jpg', 7.99, 'Authentic Mexican street food with various fillings', 4),
('Curry', 'curry.jpg', 11.99, 'Spicy Indian dish with aromatic spices and sauce', 5);


CREATE TABLE order_(
	user_id INT,
	food_id INT,
	amount INT,
	code VARCHAR(100),
	arr_sub_id VARCHAR(100),
	
	FOREIGN KEY (user_id) REFERENCES nguoi_dung(user_id)
	FOREIGN KEY (food_id) REFERENCES food(food_id)
)

INSERT INTO order_ (user_id, food_id, amount, code, arr_sub_id)
VALUES
(1, 1, 2, 'ORDER123', 'SUB123'),
(2, 2, 1, 'ORDER456', 'SUB456'),
(3, 3, 3, 'ORDER789', 'SUB789'),
(4, 4, 2, 'ORDERABC', 'SUBABC'),
(5, 5, 1, 'ORDERDEF', 'SUBDEF');

CREATE TABLE sub_food(
	sub_id INT PRIMARY KEY AUTO_INCREMENT,
	sub_name VARCHAR(100),
	sub_price FLOAT,
	food_id INT,
	
	FOREIGN KEY food_id REFERENCES food(food_id)
)

INSERT INTO sub_food (sub_name, sub_price, food_id)
VALUES
('Extra Cheese', 1.50, 2),
('Bacon', 2.00, 2),
('Avocado', 1.75, 2),
('Extra Sauce', 0.50, 3),
('Spicy Mayo', 0.75, 3);

CREATE TABLE restaurant(
	res_id INT PRIMARY KEY AUTO_INCREMENT,
	res_name VARCHAR(100),
	image VARCHAR(100)
	description VARCHAR(500)
)

INSERT INTO restaurant (res_name, image, description)
VALUES
('Restaurant A', 'image_a.jpg', 'Cozy place with great food'),
('Restaurant B', 'image_b.jpg', 'Elegant dining experience'),
('Restaurant C', 'image_c.jpg', 'Casual place for family'),
('Restaurant D', 'image_d.jpg', 'Great atmosphere with live music'),
('Restaurant E', 'image_e.jpg', 'Outdoor seating with a view');

CREATE TABLE rate_res(
	user_id INT,
	res_id INT,
	amount INT,
	date_res DATETIME,
	
	FOREIGN KEY user_id REFERENCES nguoi_dung(user_id)
	FOREIGN KEY res_id REFERENCES restaurant(res_id)
)

INSERT INTO rate_res (user_id, res_id, amount, date_res)
VALUES
(1, 1, 5, '2024-05-01 19:00:00'),
(2, 2, 4, '2024-05-02 20:30:00'),
(3, 3, 3, '2024-05-03 18:45:00'),
(4, 4, 5, '2024-05-04 21:00:00'),
(5, 5, 4, '2024-05-05 19:30:00');

CREATE TABLE like_res(
	user_id INT,
	res_id INT,
	date_like DATETIME,
	
	FOREIGN KEY user_id REFERENCES nguoi_dung(user_id)
	FOREIGN KEY res_id REFERENCES restaurant(res_id)
)

INSERT INTO like_res (user_id, res_id, date_like)
VALUES
(1, 1, '2024-05-01 10:00:00'),
(2, 2, '2024-05-02 11:00:00'),
(3, 3, '2024-05-03 12:00:00'),
(4, 4, '2024-05-04 13:00:00'),
(5, 5, '2024-05-05 14:00:00');

CREATE TABLE food_type(
	type_id INT PRIMARY KEY AUTO_INCREMENT,
	type_name VARCHAR(100)
)

INSERT INTO food_type (type_name)
VALUES
('Vietnamese'),
('Italian'),
('Japanese'),
('Mexican'),
('Indian');

SELECT user_id, COUNT(*) AS like_count
FROM like_res
GROUP BY user_id
ORDER BY like_count DESC
LIMIT 5;

SELECT user_id, COUNT(*) AS like_count
FROM rate_res
GROUP BY user_id
ORDER BY like_count DESC
LIMIT 2;

SELECT user_id, COUNT(*) AS order_count
FROM order_
GROUP BY user_id
ORDER BY order_count DESC
LIMIT 1;

SELECT nd.user_id, nd.full_name
FROM nguoi_dung nd
LEFT JOIN like_res lr ON nd.user_id = lr.user_id
LEFT JOIN rate_res rr ON nd.user_id = rr.user_id
LEFT JOIN order_ o ON nd.user_id = o.user_id
WHERE lr.user_id IS NULL
  AND rr.user_id IS NULL
  AND o.user_id IS NULL;

