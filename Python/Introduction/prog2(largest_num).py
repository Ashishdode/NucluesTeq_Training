x = input("Enter number 1: ")
y = input("Enter number 2: ")
z = input("Enter number 3: ")
if x>y and x>z:
    print(f"Number {x} is the largest")
elif y>x and y>z:
    print(f"Number {y} is the largest")
else :
    print(f"Number {z} is the largest")