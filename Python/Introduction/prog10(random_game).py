import random

number = random.randint(1, 10)
while True:
    guess = int(input("Enter a number between 1 and 10: "))
    if guess < number:
        print("Too low! Try again.")
    elif guess > number:
        print("Too high! Try again.")
    else:
        print("Great! You've guessed the number.")
        break