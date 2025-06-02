num = int(input("Enter a number: "))

negative = num < 0
num = abs(num)

rev_num = int(str(num)[::-1]) 
#converted into string, reversed it and back to int

if negative:
    rev_num = -rev_num
    
print("Reversed number:", rev_num)