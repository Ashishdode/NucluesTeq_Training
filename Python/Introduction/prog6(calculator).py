expression = input("Enter a mathematical expression: ")

parts = expression.split()
if len(parts) != 3:
    print("Please enter a valid expression in the format 'a operator b'.")

else:
    try:
        a = float(parts[0])
        operator = parts[1]
        b = float(parts[2])

        if operator == '+':
            result = a + b
        elif operator == '-':
            result = a - b
        elif operator == '*':
            result = a * b
        elif operator == '/':
            if b == 0:
                raise ZeroDivisionError("Division by zero is not allowed.")
            result = a / b
        else:
            raise ValueError("Invalid operator. Use +, -, *, or /.")

        print(f"The result of {expression} is: {result}")

    except ValueError as ve:
        print(f"Value error: {ve}")
