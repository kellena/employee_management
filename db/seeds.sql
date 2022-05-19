INSERT INTO emp_department (name)
VALUES ("Head Management"), ("Secondary Management"), ("Cooks"), ("Prep/Dish");


INSERT INTO emp_role (title, salary, department_id)
VALUES ("Head Chef", 65000, 1), 
        ("Sous Chef", 52000, 2),
         ("BOH Manager", 35000, 3),
         ("Closing Cook", 28000, 4),
         ("Line Cook", 25000, 4),
         ("Prep Cook", 260000, 4),
         ("Dishwasher", 170000, 4);
         

INSERT INTO employee (first_name, last_name, role_id)
VALUES  ("Drew", "Ledo", 1),
        ("James", "Rocket", 1),
        ("Jessie", "Rocket", 4),
        ("Meowth", "Thatsright", 4),
        ("Ash", "Ketchum", 4),
        ("Misty", "Wawa", 2),
        ("Brock", "Rock", 2),
        ("Erika", "Grass", 3),
        ("Sabrina", "Psychic", 3);