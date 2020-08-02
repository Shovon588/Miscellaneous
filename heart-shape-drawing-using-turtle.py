import turtle
from time import sleep


# Setup
obj = turtle.Turtle()
obj.speed(1)

window = turtle.Screen()
window.bgcolor('black')

obj.goto(0,-100)
obj.pensize(10)
obj.color('red')



# Draw heart
obj.left(140)
obj.forward(180)
obj.circle(-90,200)
obj.setheading(60)
obj.circle(-90,200)
obj.forward(180)


# Draw arrow
obj.setheading(140)

obj.pensize(5)
obj.forward(150)

obj.setheading(210)
obj.pensize(10)
obj.forward(150)

obj.setheading(180)
obj.forward(40)
obj.setheading(360)
obj.forward(40)
obj.setheading(-90)
obj.forward(40)
obj.setheading(90)
obj.forward(40)



obj.setheading(-210)
obj.setheading(390)
obj.pensize(5)
obj.forward(150)

obj.pensize(10)
obj.forward(420)

obj.setheading(180)
obj.forward(50)
obj.setheading(360)
obj.forward(50)
obj.setheading(-105)
obj.forward(50)

turtle.done()
